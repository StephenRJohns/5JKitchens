#!/usr/bin/env node
// Swaps Prisma provider from sqlite -> postgresql when DATABASE_URL is a Postgres URL.
// Runs before `prisma generate` so Railway builds work seamlessly.
const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
const dbUrl = process.env.DATABASE_URL || "";

if (dbUrl.startsWith("postgresql://") || dbUrl.startsWith("postgres://")) {
  let schema = fs.readFileSync(schemaPath, "utf8");
  schema = schema.replace('provider = "sqlite"', 'provider = "postgresql"');
  fs.writeFileSync(schemaPath, schema);
  console.log("✅ Prisma schema updated to postgresql provider");
} else {
  console.log("ℹ️  Using sqlite provider (local)");
}
