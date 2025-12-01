import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

let pool: Pool | null = null;
let db: any = null;
let dbReady = false;
let initAttempted = false;

process.on('unhandledRejection', (reason) => {
  if (String(reason).includes('endpoint has been disabled') || 
      String(reason).includes('Connection terminated')) {
    console.log('⚠️ Database connection error handled (non-fatal)');
    return;
  }
});

async function initDb(): Promise<boolean> {
  if (initAttempted) return dbReady;
  initAttempted = true;
  
  if (!process.env.DATABASE_URL) {
    console.log("⚠️ DATABASE_URL not set - running in memory-only mode");
    return false;
  }

  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      console.log("⚠️ Database connection timeout - using in-memory storage");
      if (pool) {
        pool.end().catch(() => {});
        pool = null;
      }
      resolve(false);
    }, 8000);

    try {
      pool = new Pool({ 
        connectionString: process.env.DATABASE_URL,
        connectionTimeoutMillis: 5000,
        max: 1,
      });
      
      pool.on('error', (err) => {
        if (!String(err.message).includes('endpoint has been disabled')) {
          console.log('⚠️ Database pool error:', err.message);
        }
      });
      
      pool.connect()
        .then(client => {
          return client.query('SELECT 1').then(() => {
            client.release();
            clearTimeout(timeout);
            db = drizzle({ client: pool as Pool, schema });
            dbReady = true;
            console.log("✅ Database connected successfully");
            resolve(true);
          });
        })
        .catch((error) => {
          clearTimeout(timeout);
          console.log("⚠️ Database connection failed:", error.message);
          if (pool) {
            pool.end().catch(() => {});
            pool = null;
          }
          resolve(false);
        });
    } catch (error: any) {
      clearTimeout(timeout);
      console.log("⚠️ Database initialization error:", error.message);
      resolve(false);
    }
  });
}

const initPromise = initDb();

export { pool, db, dbReady, initPromise, initAttempted };
