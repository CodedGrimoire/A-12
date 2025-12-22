import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO;

if (!MONGO_URI) {
  throw new Error("Missing MONGO environment variable");
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI as string, {
        dbName: "carexyz",
      })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
