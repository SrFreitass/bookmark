import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

import postgres from "postgres";

const sql = postgres("postgres://", { max: 1 });
const db = drizzle(sql,  { schema: schema });


export { db };

