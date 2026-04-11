import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/security/hash";
import { signAccessToken, signRefreshToken } from "@/lib/security/jwt";
import { errorResponse, successResponse, AppError } from "@/lib/utils/errors";
import { STORE_ID } from "@/lib/utils/constants";
import { z } from "zod";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// POST /api/customers/register
export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action") || "register";

    if (action === "login") {
      return handleLogin(req);
    }

    const body = await req.json();
    const { email, password, firstName, lastName } = registerSchema.parse(body);

    const existing = await prisma.customer.findFirst({
      where: { storeId: STORE_ID, email },
    });

    if (existing) throw new AppError(409, "An account with this email already exists", "EMAIL_EXISTS");

    const passwordHash = await hashPassword(password);
    const customer = await prisma.customer.create({
      data: { storeId: STORE_ID, email, passwordHash, firstName, lastName },
    });

    const payload = { id: customer.id, email: customer.email, role: "customer" as const };
    const token = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return successResponse({
      token,
      refreshToken,
      customer: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
      },
    }, 201);
  } catch (error) {
    return errorResponse(error);
  }
}

async function handleLogin(req: NextRequest) {
  const body = await req.json();
  const { email, password } = loginSchema.parse(body);

  const customer = await prisma.customer.findFirst({
    where: { storeId: STORE_ID, email },
  });

  if (!customer) throw new AppError(401, "Invalid credentials", "AUTH_FAILED");

  const valid = await verifyPassword(password, customer.passwordHash);
  if (!valid) throw new AppError(401, "Invalid credentials", "AUTH_FAILED");

  await prisma.customer.update({ where: { id: customer.id }, data: { lastLoginAt: new Date() } });

  const payload = { id: customer.id, email: customer.email, role: "customer" as const };
  const token = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  return successResponse({
    token,
    refreshToken,
    customer: {
      id: customer.id,
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
    },
  });
}
