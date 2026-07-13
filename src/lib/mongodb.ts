import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not defined in environment");
}

// Log the URI (password hidden) on first load
console.log("🔧 Using MongoDB URI:", MONGODB_URI.replace(/\/\/(.*):(.*)@/, "//$1:****@"));

let cached = (global as any).mongoCache as {
  conn?: typeof mongoose;
  promise?: Promise<typeof mongoose>;
  failed?: boolean;
};

if (!cached) {
  cached = (global as any).mongoCache = {};
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  // Reset cached promise on failure so next request tries again
  if (cached.failed) {
    cached.promise = undefined;
    cached.failed = false;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI!, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      })
      .then((m) => {
        console.log("✅ MongoDB Connected successfully");
        return m;
      })
      .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        cached.failed = true;
        cached.promise = undefined;
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}