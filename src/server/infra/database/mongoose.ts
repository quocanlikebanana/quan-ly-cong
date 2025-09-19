import "server-only";
import mongoose from 'mongoose';
import configs from "@/lib/configs";

const connection: { isConnected?: number } = {}

/**
 * Using singleton pattern to manage MongoDB connection
 * to avoid multiple connections in serverless environments.
 * @returns Promise<void>
 * @description Connects to MongoDB using Mongoose.
 */
async function connectMongo() {
	const mongoUri = configs.db.uri;
	if (!mongoUri) {
		throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
	}

	if (connection.isConnected) {
		console.log('MongoDB is already connected');
		return;
	}

	try {
		const db = await mongoose.connect(mongoUri, {});
		connection.isConnected = db.connections[0].readyState;
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		throw new Error('Failed to connect to MongoDB');
	}
}

export default connectMongo;