import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName, email, phone, address1, address2, city, state, zip, country, items, subtotal } = body;

  if (!firstName || !lastName || !email || !address1 || !city || !state || !zip) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const order = await prisma.order.create({
    data: {
      firstName,
      lastName,
      email,
      phone: phone || null,
      address1,
      address2: address2 || null,
      city,
      state,
      zip,
      country: country || "US",
      items: JSON.stringify(items),
      subtotal,
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true, orderId: order.id });
}
