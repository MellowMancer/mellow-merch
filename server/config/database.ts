import mongoose from 'mongoose';

const DEFAULT_URI = 'mongodb://localhost:27017/vibe-cart';

export async function connectToDatabase(uri = process.env.MONGODB_URI ?? DEFAULT_URI): Promise<void> {
  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  });
}

export async function disconnectFromDatabase(): Promise<void> {
  await mongoose.disconnect();
}

