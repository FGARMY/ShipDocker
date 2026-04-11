import jwt from "jsonwebtoken";
import { AppError } from "@/lib/utils/errors";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "dev-refresh-secret";

export interface TokenPayload {
  id: string;
  email: string;
  role: "admin" | "customer";
  storeId?: string;
}

export function signAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "30d" });
}

export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    throw new AppError(401, "Invalid or expired access token", "AUTH_INVALID_TOKEN");
  }
}

export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch {
    throw new AppError(401, "Invalid or expired refresh token", "AUTH_INVALID_REFRESH");
  }
}

export function extractToken(authHeader: string | null): string {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(401, "Authorization header required", "AUTH_MISSING");
  }
  return authHeader.slice(7);
}
