import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { decryptSession } from "@/lib/auth/session";
import { SESSION_COOKIE } from "@/lib/auth/dal";
import { cloudinary } from "@/lib/cloudinary/config";

export async function POST() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await decryptSession(token);

  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = { timestamp, folder: "usman-sethi-portfolio/projects" };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET ?? "",
  );

  return NextResponse.json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    folder: paramsToSign.folder,
  });
}
