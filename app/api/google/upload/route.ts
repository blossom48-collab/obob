import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "node:stream";

const MAX_FILE_SIZE = 4 * 2048 * 2048;
const EVENT_PROMO_TYPE = "event-promo";
const PUBLIC_SLIP_TYPE = "public-slip";

function getOAuthClient() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
        throw new Error("Google OAuth environment variables are not configured.");
    }

    return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

function getBangkokDateStamp() {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Bangkok",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).formatToParts(new Date());

    const values = Object.fromEntries(
        parts
            .filter((part) => part.type !== "literal")
            .map((part) => [part.type, part.value]),
    );

    return `${values.year}${values.month}${values.day}`;
}

function getFileExtension(file: File) {
    const originalName = file.name.trim();
    const match = originalName.match(/(\.[a-zA-Z0-9]{1,8})$/);

    if (match?.[1]) {
        return match[1].toLowerCase();
    }

    switch (file.type) {
        case "image/jpeg":
            return ".jpg";
        case "image/png":
            return ".png";
        case "image/webp":
            return ".webp";
        case "image/gif":
            return ".gif";
        case "application/pdf":
            return ".pdf";
        default:
            return ".jpg";
    }
}

function escapeDriveQueryValue(value: string) {
    return value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

function serializeDriveFile(file: {
    id?: string | null;
    name?: string | null;
    mimeType?: string | null;
    size?: string | null;
    webViewLink?: string | null;
    webContentLink?: string | null;
    createdTime?: string | null;
    modifiedTime?: string | null;
}) {
    return {
        id: file.id ?? "",
        name: file.name ?? "",
        mimeType: file.mimeType ?? "",
        imageUrl: file.id
            ? `https://lh3.googleusercontent.com/d/${file.id}=w1600`
            : "",
        size: file.size ?? undefined,
        webViewLink:
            file.webViewLink ??
            (file.id
                ? `https://drive.google.com/file/d/${file.id}/view`
                : ""),
        webContentLink: file.webContentLink ?? null,
        createdTime: file.createdTime ?? undefined,
        modifiedTime: file.modifiedTime ?? undefined,
    };
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const uploadType = String(formData.get("uploadType") ?? "").trim();
        const isEventPromoUpload = uploadType === EVENT_PROMO_TYPE;
        const isPublicSlipUpload = uploadType === PUBLIC_SLIP_TYPE;

        const cookieRefreshToken = request.cookies.get("google_drive_refresh_token")?.value;
        const publicRefreshToken = isPublicSlipUpload
            ? process.env.GOOGLE_DRIVE_PUBLIC_UPLOAD_REFRESH_TOKEN
            : "";
        const refreshToken = publicRefreshToken || cookieRefreshToken;

        if (!refreshToken) {
            return NextResponse.json(
                {
                    error: isPublicSlipUpload
                        ? "ระบบอัปโหลดสลิปสาธารณะยังไม่ได้ตั้งค่า Google Drive"
                        : "ยังไม่ได้เชื่อมต่อ Google Drive",
                    code: isPublicSlipUpload
                        ? "PUBLIC_UPLOAD_NOT_CONFIGURED"
                        : "GOOGLE_NOT_CONNECTED",
                },
                { status: 401 },
            );
        }

        if (!(file instanceof File)) {
            return NextResponse.json(
                {
                    error: "ไม่พบไฟล์ที่ต้องการอัปโหลด",
                    code: "FILE_REQUIRED",
                },
                { status: 400 },
            );
        }

        if (file.size === 0) {
            return NextResponse.json(
                {
                    error: "ไฟล์ว่างเปล่า",
                    code: "EMPTY_FILE",
                },
                { status: 400 },
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                {
                    error: "ไฟล์มีขนาดใหญ่เกิน 4 MB",
                    code: "FILE_TOO_LARGE",
                },
                { status: 413 },
            );
        }

        const allowedTypes = new Set(
            isEventPromoUpload
                ? [
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "image/gif",
                ]
                : isPublicSlipUpload
                    ? [
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                        "image/gif",
                        "application/pdf",
                    ]
                    : [
                        "image/jpeg",
                        "image/png",
                        "image/webp",
                        "image/gif",
                        "application/pdf",
                        "application/msword",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        "application/vnd.ms-excel",
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        "application/vnd.ms-powerpoint",
                        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    ],
        );

        if (!allowedTypes.has(file.type)) {
            return NextResponse.json(
                {
                    error: isEventPromoUpload
                        ? "รูปโปรโมทต้องเป็น JPG, PNG, WEBP หรือ GIF"
                        : isPublicSlipUpload
                            ? "สลิปรองรับ JPG, PNG, WEBP, GIF หรือ PDF"
                            : "รองรับรูปภาพ และ PDF, Word, Excel, PowerPoint",
                    code: "UNSUPPORTED_FILE_TYPE",
                },
                { status: 415 },
            );
        }

        const folderId = isEventPromoUpload
            ? process.env.GOOGLE_DRIVE_EVENT_PROMO_UPLOAD_FOLDER_ID
            : process.env.GOOGLE_DRIVE_UPLOAD_FOLDER_ID;

        if (!folderId) {
            return NextResponse.json(
                {
                    error: isEventPromoUpload
                        ? "ยังไม่ได้กำหนด GOOGLE_DRIVE_EVENT_PROMO_UPLOAD_FOLDER_ID"
                        : "ยังไม่ได้กำหนดโฟลเดอร์สำหรับอัปโหลด",
                    code: isEventPromoUpload
                        ? "EVENT_PROMO_UPLOAD_FOLDER_NOT_CONFIGURED"
                        : "UPLOAD_FOLDER_NOT_CONFIGURED",
                },
                { status: 500 },
            );
        }

        const oauth2Client = getOAuthClient();
        oauth2Client.setCredentials({
            refresh_token: refreshToken,
        });

        const drive = google.drive({
            version: "v3",
            auth: oauth2Client,
        });

        let uploadName = file.name;

        if (isPublicSlipUpload) {
            const stampParts = new Intl.DateTimeFormat("en-GB", {
                timeZone: "Asia/Bangkok",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hourCycle: "h23",
            }).formatToParts(new Date());

            const values = Object.fromEntries(
                stampParts
                    .filter((part) => part.type !== "literal")
                    .map((part) => [part.type, part.value]),
            );

            const extension = getFileExtension(file);
            const randomPart = crypto.randomUUID().slice(0, 8);
            uploadName = `SLIP_${values.year}${values.month}${values.day}_${values.hour}${values.minute}${values.second}_${randomPart}${extension}`;
        } else if (isEventPromoUpload) {
            const dateStamp = getBangkokDateStamp();
            const prefix = `${dateStamp}_`;
            const escapedFolderId = escapeDriveQueryValue(folderId);
            const escapedPrefix = escapeDriveQueryValue(prefix);

            const existing = await drive.files.list({
                q: `'${escapedFolderId}' in parents and trashed = false and mimeType contains 'image/' and name contains '${escapedPrefix}'`,
                fields: "files(name)",
                pageSize: 1000,
                supportsAllDrives: true,
                includeItemsFromAllDrives: true,
            });

            let maxSequence = 0;
            const pattern = new RegExp(`^${dateStamp}_(\\d+)(?:\\.[^.]+)?$`, "i");

            for (const existingFile of existing.data.files ?? []) {
                const match = existingFile.name?.match(pattern);
                if (match?.[1]) {
                    maxSequence = Math.max(maxSequence, Number(match[1]));
                }
            }

            const sequence = String(maxSequence + 1).padStart(2, "0");
            uploadName = `${dateStamp}_${sequence}${getFileExtension(file)}`;
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const created = await drive.files.create({
            requestBody: {
                name: uploadName,
                parents: [folderId],
            },
            media: {
                mimeType: file.type || "application/octet-stream",
                body: Readable.from(buffer),
            },
            fields:
                "id,name,mimeType,size,webViewLink,webContentLink,createdTime,modifiedTime",
            supportsAllDrives: true,
        });

        return NextResponse.json({
            success: true,
            uploadType: isPublicSlipUpload
                ? PUBLIC_SLIP_TYPE
                : isEventPromoUpload
                    ? EVENT_PROMO_TYPE
                    : "default",
            file: serializeDriveFile(created.data),
        });
    } catch (error) {
        console.error("Google Drive upload failed:", error);

        const message =
            error instanceof Error
                ? error.message
                : "ไม่สามารถอัปโหลดไฟล์ไป Google Drive ได้";

        return NextResponse.json(
            {
                error: message,
                code: "GOOGLE_DRIVE_UPLOAD_FAILED",
            },
            { status: 500 },
        );
    }
}
