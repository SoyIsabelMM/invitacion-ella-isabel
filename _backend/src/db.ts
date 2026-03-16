import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/rsvp';
let client: MongoClient;
let db: Db;

export async function connectDb(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  return db;
}

export function getDb(): Db {
  if (!db) throw new Error('Database not connected. Call connectDb() first.');
  return db;
}

export async function closeDb(): Promise<void> {
  if (client) await client.close();
}
