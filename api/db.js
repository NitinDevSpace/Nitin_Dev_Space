import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URL;

if (!uri) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env"
	);
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
	client = new MongoClient(uri);
	global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
