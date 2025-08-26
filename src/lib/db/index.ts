import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

function createPool() {
  if (!connectionString) {
    if (process.env.CI) {
      console.warn("Database connection not available during CI build. Using mock connection.");
      return new Pool({ connectionString: "postgresql://mock:mock@localhost:5432/mock" });
    } else {
      throw new Error("データベース接続文字列が正しく設定されていません");
    }
  } else {
    return new Pool({ connectionString });
  }
}

const pool = createPool();
export const db = drizzle(pool, { schema });
export type DbType = typeof db;
