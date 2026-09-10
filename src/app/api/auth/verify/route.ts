import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token || !email) {
    return NextResponse.redirect(new URL("/login?error=InvalidVerificationLink", req.url));
  }

  try {
    const existingToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        identifier: email,
      },
    });

    if (!existingToken) {
      return NextResponse.redirect(new URL("/login?error=TokenNotFound", req.url));
    }

    if (new Date(existingToken.expires) < new Date()) {
      return NextResponse.redirect(new URL("/login?error=TokenExpired", req.url));
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.redirect(new URL("/login?error=UserNotFound", req.url));
    }

    await prisma.user.update({
      where: { email },
      data: {
        emailVerified: new Date(),
        email: existingToken.identifier, // Ensure it's correctly mapped
      },
    });

    await prisma.verificationToken.delete({
      where: {
        token: existingToken.token,
      },
    });

    return NextResponse.redirect(new URL("/login?verified=true", req.url));
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.redirect(new URL("/login?error=VerificationFailed", req.url));
  }
}
