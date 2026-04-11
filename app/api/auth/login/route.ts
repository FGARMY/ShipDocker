import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { verifyPassword } from "@/lib/security/hash";
import { signAccessToken, signRefreshToken } from "@/lib/security/jwt";
import { errorResponse, successResponse, AppError } from "@/lib/utils/errors";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email },
      include: { store: true },
    });

    if (!user) throw new AppError(401, "Invalid credentials", "AUTH_FAILED");

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) throw new AppError(401, "Invalid credentials", "AUTH_FAILED");

    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    const payload = { id: user.id, email: user.email, role: "admin" as const, storeId: user.storeId };
    const token = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return successResponse({
      token,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        store: { id: user.store.id, name: user.store.name },
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
