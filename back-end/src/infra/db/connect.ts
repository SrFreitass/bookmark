import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from "postgres";
import * as schema from './schema';

const sql = postgres(process.env.DATABASE_URL || "", { max: 10 });
const db = drizzle(sql,  { schema: schema });

await migrate(db, { migrationsFolder: 'drizzle'})

export { db };

