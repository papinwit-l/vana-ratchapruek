// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME || "Leads";

// Rate limiting: Map<IP, timestamp[]>
const submissions = new Map<string, number[]>();
const RATE_LIMIT_ENABLED = process.env.RATE_LIMIT_ENABLED !== "false"; // default: on
const RATE_LIMIT = 3;
const RATE_WINDOW = 30 * 60 * 1000; // 30 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = submissions.get(ip) || [];

  // Remove expired entries
  const recent = timestamps.filter((t) => now - t < RATE_WINDOW);
  submissions.set(ip, recent);

  if (recent.length >= RATE_LIMIT) return true;

  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Rate limiting
    if (RATE_LIMIT_ENABLED) {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

      if (isRateLimited(ip)) {
        return NextResponse.json(
          { error: "Too many submissions. Please try again later." },
          { status: 429 },
        );
      }
    }

    const body = await req.json();
    const { firstName, lastName, email, mobile, hearAbout, company } = body;

    // Honeypot check — "company" should be empty
    if (company) {
      // Silently reject — don't let bots know they were caught
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !mobile?.trim()
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const timestamp = new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A:F`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            timestamp,
            firstName.trim(),
            lastName.trim(),
            email.trim(),
            mobile.trim(),
            hearAbout || "",
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Sheets API error:", error);
    return NextResponse.json(
      { error: "Failed to submit registration." },
      { status: 500 },
    );
  }
}
