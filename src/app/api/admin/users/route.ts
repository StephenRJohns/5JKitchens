import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, username: true, email: true, role: true, forcePasswordChange: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const { username, email, password, role, forcePasswordChange } = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: "Username, email and password are required." }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] },
  });
  if (existing) {
    return NextResponse.json({ error: "Username or email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { username, email, passwordHash, role: role || "user", forcePasswordChange: forcePasswordChange ?? false },
    select: { id: true, username: true, email: true, role: true, forcePasswordChange: true, createdAt: true },
  });
  return NextResponse.json(user, { status: 201 });
}
