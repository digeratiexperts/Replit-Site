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
      String(reason).includes('Connection terminated') ||
      String(reason).includes('connection to server')) {
    console.log('⚠️ Database connection error handled (non-fatal)');
    return;
  }
});

async function initDb(): Promise<boolean> {
  if (initAttempted) return dbReady;
  initAttempted = true;
  
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.log("⚠️ DATABASE_URL not set - running in memory-only mode");
    return false;
  }

  // Determine if this is a Neon database or standard PostgreSQL
  const isNeonDb = databaseUrl.includes('neon.tech') || databaseUrl.includes('neon.com');
  
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
        connectionString: databaseUrl,
        connectionTimeoutMillis: 5000,
        max: 10,
        idleTimeoutMillis: 30000,
      });
      
      pool.on('error', (err) => {
        const errMsg = String(err.message);
        if (!errMsg.includes('endpoint has been disabled') && 
            !errMsg.includes('Connection terminated')) {
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
            console.log(`✅ Database connected successfully (${isNeonDb ? 'Neon' : 'PostgreSQL'})`);
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

// Export a function to get database connection status
export function getDatabaseStatus(): { connected: boolean; type: string } {
  const databaseUrl = process.env.DATABASE_URL || '';
  const isNeonDb = databaseUrl.includes('neon.tech') || databaseUrl.includes('neon.com');
  return {
    connected: dbReady,
    type: dbReady ? (isNeonDb ? 'neon' : 'postgresql') : 'memory'
  };
}

const initPromise = initDb();

export { pool, db, dbReady, initPromise, initAttempted };
