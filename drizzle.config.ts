import type { Config } from "drizzle-kit";
import { config } from "dotenv";

// Load .env.local explicitly
config({ path: ".env.local" });

export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;