import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const files = formData.getAll("attachments") as File[];

  if (!subject || !message) {
    return NextResponse.json({ error: "Subject and message are required." }, { status: 400 });
  }

  const subscribers = await prisma.subscriber.findMany({ select: { email: true } });
  if (subscribers.length === 0) {
    return NextResponse.json({ error: "No subscribers found." }, { status: 400 });
  }

  const attachments = await Promise.all(
    files
      .filter((f) => f.size > 0)
      .map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
  );

  const emails = subscribers.map((s) => s.email);

  const result = await sendEmail({
    to: emails,
    subject,
    text: message,
    attachments,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, sent: emails.length, message: result.message });
}
