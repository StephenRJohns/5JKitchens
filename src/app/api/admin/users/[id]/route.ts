import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { username, email, password, role, forcePasswordChange } = await request.json();

  const existing = await prisma.user.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "User not found." }, { status: 404 });

  const data: Record<string, unknown> = {};
  if (username) data.username = username;
  if (email) data.email = email;
  if (role) data.role = role;
  if (typeof forcePasswordChange === "boolean") data.forcePasswordChange = forcePasswordChange;
  if (password) data.passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({
    where: { id: params.id },
    data,
    select: { id: true, username: true, email: true, role: true, forcePasswordChange: true, createdAt: true },
  });
  return NextResponse.json(user);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const existing = await prisma.user.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "User not found." }, { status: 404 });

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
