import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { google } from "googleapis";

export async function GET(request: Request) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;

    if (!clientId || !clientSecret || !redirectUri) {
        return NextResponse.json(
            {
                error: "Google OAuth environment variables are not configured.",
            },
            { status: 500 },
        );
    }

    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri,
    );

    const state = randomBytes(32).toString("hex");

    const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        include_granted_scopes: true,
        scope: ["https://www.googleapis.com/auth/drive.file"],
        state,
    });

    const response = NextResponse.redirect(authUrl);

    response.cookies.set("google_oauth_state", state, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 10 * 60,
    });

    return response;
}
