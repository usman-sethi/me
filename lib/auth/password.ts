import "server-only";
import bcrypt from "bcryptjs";

export async function hashPassword(plainTextPassword: string) {
  return bcrypt.hash(plainTextPassword, 12);
}

export async function verifyPassword(plainTextPassword: string, hash: string) {
  return bcrypt.compare(plainTextPassword, hash);
}
