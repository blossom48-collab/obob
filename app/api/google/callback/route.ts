import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

function redirectWithStatus(request: NextRequest, status: string) {
    const url = new URL("/", request.url);
    url.searchParams.set("google_drive", status);
    return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
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

    const error = request.nextUrl.searchParams.get("error");
    if (error) {
        return redirectWithStatus(request, "denied");
    }

    const code = request.nextUrl.searchParams.get("code");
    const state = request.nextUrl.searchParams.get("state");
    const savedState = request.cookies.get("google_oauth_state")?.value;

    if (!code) {
        return NextResponse.json(
            { error: "Missing Google authorization code." },
            { status: 400 },
        );
    }

    if (!state || !savedState || state !== savedState) {
        return NextResponse.json(
            { error: "Invalid OAuth state. Please start the Google connection again." },
            { status: 400 },
        );
    }

    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri,
    );

    try {
        const { tokens } = await oauth2Client.getToken(code);

        if (!tokens.refresh_token) {
            return NextResponse.json(
                {
                    error:
                        "Google did not return a refresh token. Start the connection again.",
                },
                { status: 400 },
            );
        }

        const response = redirectWithStatus(request, "connected");

        response.cookies.set("google_drive_refresh_token", tokens.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 365,
        });

        response.cookies.set("google_oauth_state", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        });

        return response;
    } catch (tokenError) {
        console.error("Google OAuth token exchange failed:", tokenError);

        return NextResponse.json(
            {
                error: "Google authorization code could not be exchanged for tokens.",
            },
            { status: 500 },
        );
    }
}
