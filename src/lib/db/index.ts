import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("データベース接続文字列が正しく設定されていません");
}

const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });

export type DbType = typeof db;
