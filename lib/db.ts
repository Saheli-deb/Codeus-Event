
// // lib/db.ts
// import mongoose from 'mongoose'

// /**
//  * Reuse a global cached connection to avoid Next.js hot-reload issues.
//  */
// declare global {
//   // eslint-disable-next-line no-var
//   var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
// }

// let cached = global._mongoose
// if (!cached) {
//   cached = global._mongoose = { conn: null, promise: null }
// }

// export async function connectMongo() {
//   if (cached.conn) return cached.conn

//   if (!cached.promise) {
//     const uri = process.env.MONGODB_URI
//     if (!uri) throw new Error('Missing MONGODB_URI in .env.local')

//     cached.promise = mongoose
//       .connect(uri, {
//         dbName: 'code_n_cauldrons',
//       })
//       .then((m) => m)
//   }

//   cached.conn = await cached.promise
//   return cached.conn
// }
// lib/db.ts
import mongoose from 'mongoose'

declare global {
  // eslint-disable-next-line no-var
  var _mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
}

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

export async function connectMongo() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Missing MONGODB_URI in .env.local');

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { dbName: 'code_n_cauldrons' }).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
