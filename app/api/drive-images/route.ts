import { NextRequest, NextResponse } from "next/server";

type DriveFile = {
    id: string;
    name: string;
    mimeType: string;
    resourceKey?: string;
};

function extractFolderId(value: string) {
    const input = value.trim();

    // Standard Google Drive folder URL:
    // https://drive.google.com/drive/folders/FOLDER_ID
    const folderMatch = input.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    if (folderMatch) {
        return folderMatch[1];
    }

    // Also allow a raw folder ID.
    if (/^[a-zA-Z0-9_-]{10,}$/.test(input)) {
        return input;
    }

    return null;
}

export async function GET(request: NextRequest) {
    try {
        const apiKey = process.env.GOOGLE_DRIVE_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "GOOGLE_DRIVE_API_KEY is not configured." },
                { status: 500 },
            );
        }

        const folderUrl = request.nextUrl.searchParams.get("folder");

        if (!folderUrl) {
            return NextResponse.json(
                { error: "Missing folder parameter." },
                { status: 400 },
            );
        }

        const folderId = extractFolderId(folderUrl);

        if (!folderId) {
            return NextResponse.json(
                { error: "Invalid Google Drive folder link." },
                { status: 400 },
            );
        }

        const params = new URLSearchParams({
            q: `'${folderId}' in parents and trashed = false`,
            key: apiKey,
            orderBy: "name",
            pageSize: "1000",
            fields: "files(id,name,mimeType,resourceKey)",
            supportsAllDrives: "true",
            includeItemsFromAllDrives: "true",
        });

        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
            {
                method: "GET",
                cache: "no-store",
            },
        );

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    error:
                        data?.error?.message ||
                        "Google Drive API could not read this folder.",
                },
                { status: response.status },
            );
        }

        const files = (data.files ?? []) as DriveFile[];

        const images = files
            .filter((file) => file.mimeType?.startsWith("image/"))
            .map((file) => ({
                id: file.id,
                name: file.name,
                mimeType: file.mimeType,
                resourceKey: file.resourceKey ?? null,
                imageUrl: `https://lh3.googleusercontent.com/d/${file.id}=s0`,
            }));

        return NextResponse.json({
            folderId,
            count: images.length,
            images,
        });
    } catch (error) {
        console.error("Drive images API error:", error);

        return NextResponse.json(
            { error: "Unable to load images from Google Drive." },
            { status: 500 },
        );
    }
}
