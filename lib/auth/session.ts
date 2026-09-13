import "server-only";
import { jwtVerify, SignJWT } from "jose";

const secret = process.env.SESSION_SECRET;

function getEncodedKey() {
  if (!secret) {
    throw new Error(
      "SESSION_SECRET is not set. Generate one (see .env.example) before using admin auth.",
    );
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  /** Minimal, non-sensitive claim — just enough to prove "this is the admin". */
  role: "admin";
  [key: string]: unknown;
}

export async function encryptSession(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getEncodedKey());
}

export async function decryptSession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, getEncodedKey(), {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}
