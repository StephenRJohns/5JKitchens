import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({ where: { username: "butterchef" } });
  if (!existing) {
    const passwordHash = await bcrypt.hash("qw12QW!@", 10);
    await prisma.user.create({
      data: {
        username: "butterchef",
        email: "admin@5jkitchens.com",
        passwordHash,
        role: "admin",
        forcePasswordChange: false,
      },
    });
    console.log("✅ Admin user seeded: butterchef");
  } else {
    console.log("ℹ️  Admin user already exists, skipping seed.");
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
