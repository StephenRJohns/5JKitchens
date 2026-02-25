import nodemailer from "nodemailer";

interface Attachment {
  filename: string;
  content: Buffer;
}

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  text: string;
  attachments?: Attachment[];
}

function createTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    // Return a test account transport for dev/preview (logs to console)
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user, pass },
  });
}

export async function sendEmail(options: SendEmailOptions): Promise<{ ok: boolean; message: string }> {
  const transport = createTransport();
  const from = process.env.SMTP_FROM || "5JKitchens <noreply@5jkitchens.com>";

  if (!transport) {
    // No SMTP configured — log and pretend success (useful in dev)
    console.log("[Email - SMTP not configured]", {
      to: options.to,
      subject: options.subject,
      text: options.text.slice(0, 100),
      attachments: options.attachments?.map((a) => a.filename),
    });
    return { ok: true, message: "Email logged to console (SMTP not configured)." };
  }

  await transport.sendMail({
    from,
    to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
    subject: options.subject,
    text: options.text,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
    })),
  });

  return { ok: true, message: "Email sent successfully." };
}
