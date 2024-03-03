import { Db, MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_PROJECT = process.env.MONGODB_PROJECT;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (!MONGODB_PROJECT) {
  throw new Error("Please define the MONGODB_PROJECT environment variable inside .env.local");
}

var mongoClient: Db;

async function getConnection() {
  if (MONGODB_URI) mongoClient = (await MongoClient.connect(MONGODB_URI)).db(MONGODB_PROJECT);
}

async function dbConnect() {
  if (!mongoClient) {
    await getConnection();
  }
  return mongoClient;
}

export default dbConnect;
