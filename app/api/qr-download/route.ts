import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get("fileId")?.trim();

    if (!fileId) {
        return NextResponse.json(
            { error: "ไม่พบรหัสไฟล์ QR Code" },
            { status: 400 },
        );
    }

    if (!/^[\w-]+$/.test(fileId)) {
        return NextResponse.json(
            { error: "รหัสไฟล์ QR Code ไม่ถูกต้อง" },
            { status: 400 },
        );
    }

    const imageUrl = `https://lh3.googleusercontent.com/d/${fileId}=s0`;

    try {
        const response = await fetch(imageUrl, {
            cache: "no-store",
            headers: {
                Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: "ไม่สามารถดึง QR Code จาก Google Drive ได้" },
                { status: response.status },
            );
        }

        const contentType = response.headers.get("content-type") || "image/png";
        const arrayBuffer = await response.arrayBuffer();

        return new NextResponse(arrayBuffer, {
            status: 200,
            headers: {
                "Content-Type": contentType,
                "Content-Disposition": 'attachment; filename="oombam-blossom-fc-qr.png"',
                "Cache-Control": "no-store, max-age=0",
            },
        });
    } catch (error) {
        console.error("QR download proxy failed:", error);

        return NextResponse.json(
            { error: "เกิดข้อผิดพลาดขณะดาวน์โหลด QR Code" },
            { status: 500 },
        );
    }
}
