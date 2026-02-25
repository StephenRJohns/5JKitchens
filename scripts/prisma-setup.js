#!/usr/bin/env node
// Swaps Prisma provider from sqlite -> postgresql when DATABASE_URL is a Postgres URL.
// Also updates migration_lock.toml so `prisma migrate deploy` doesn't fail with P3019.
const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
const lockPath = path.join(__dirname, "../prisma/migrations/migration_lock.toml");
const dbUrl = process.env.DATABASE_URL || "";

if (dbUrl.startsWith("postgresql://") || dbUrl.startsWith("postgres://")) {
  // Update schema provider
  let schema = fs.readFileSync(schemaPath, "utf8");
  schema = schema.replace('provider = "sqlite"', 'provider = "postgresql"');
  fs.writeFileSync(schemaPath, schema);

  // Update migration lock provider
  if (fs.existsSync(lockPath)) {
    let lock = fs.readFileSync(lockPath, "utf8");
    lock = lock.replace('provider = "sqlite"', 'provider = "postgresql"');
    fs.writeFileSync(lockPath, lock);
  }

  console.log("✅ Prisma schema + migration lock updated to postgresql provider");
} else {
  console.log("ℹ️  Using sqlite provider (local)");
}
