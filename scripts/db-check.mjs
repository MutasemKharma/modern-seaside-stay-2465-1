import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const start = Date.now();
  // Simple connectivity + schema check
  const [{ now }] = await prisma.$queryRawUnsafe(
    "SELECT NOW() as now"
  );
  // Count across pg_catalog to ensure perms (lightweight)
  const [{ count }] = await prisma.$queryRawUnsafe(
    "SELECT COUNT(*)::int as count FROM pg_catalog.pg_tables"
  );

  const ms = Date.now() - start;
  console.log(
    `✅ Database reachable. NOW=${now?.toISOString?.() ?? now} | tables=${count} | ${ms}ms`
  );
}

main()
  .catch((err) => {
    console.error("❌ DB check failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });