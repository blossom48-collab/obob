import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { Readable } from "node:stream";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

function getOAuthClient() {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
        throw new Error("Google OAuth environment variables are not configured.");
    }

    return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

export async function POST(request: NextRequest) {
    try {
        const refreshToken = request.cookies.get("google_drive_refresh_token")?.value;

        if (!refreshToken) {
            return NextResponse.json(
                {
                    error: "ยังไม่ได้เชื่อมต่อ Google Drive",
                    code: "GOOGLE_NOT_CONNECTED",
                },
                { status: 401 },
            );
        }

        const folderId = process.env.GOOGLE_DRIVE_UPLOAD_FOLDER_ID;

        if (!folderId) {
            return NextResponse.json(
                {
                    error: "ยังไม่ได้กำหนดโฟลเดอร์สำหรับอัปโหลด",
                    code: "UPLOAD_FOLDER_NOT_CONFIGURED",
                },
                { status: 500 },
            );
        }

        const formData = await request.formData();
        const file = formData.get("file");

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

        const allowedTypes = new Set([
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
        ]);

        if (!allowedTypes.has(file.type)) {
            return NextResponse.json(
                {
                    error: "รองรับรูปภาพ และ PDF, Word, Excel, PowerPoint",
                    code: "UNSUPPORTED_FILE_TYPE",
                },
                { status: 415 },
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

        const buffer = Buffer.from(await file.arrayBuffer());

        const created = await drive.files.create({
            requestBody: {
                name: file.name,
                parents: [folderId],
            },
            media: {
                mimeType: file.type || "application/octet-stream",
                body: Readable.from(buffer),
            },
            fields: "id,name,mimeType,size,webViewLink,webContentLink",
            supportsAllDrives: true,
        });

        return NextResponse.json({
            success: true,
            file: {
                id: created.data.id,
                name: created.data.name,
                mimeType: created.data.mimeType,
                size: created.data.size,
                webViewLink:
                    created.data.webViewLink ??
                    `https://drive.google.com/file/d/${created.data.id}/view`,
                webContentLink: created.data.webContentLink ?? null,
            },
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
