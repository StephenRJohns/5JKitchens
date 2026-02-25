import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json({ error: "User not found." }, { status: 404 });

  const existing = await prisma.subscriber.findUnique({ where: { email: user.email } });

  if (existing) {
    await prisma.subscriber.delete({ where: { email: user.email } });
    return NextResponse.json({ subscribed: false });
  } else {
    await prisma.subscriber.create({ data: { email: user.email } });
    return NextResponse.json({ subscribed: true });
  }
}
