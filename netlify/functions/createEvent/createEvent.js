import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const mongoClient = new MongoClient(process.env.MONGODB_URI);
const clientPromise = mongoClient.connect();

export const handler = async (req) => {
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const data = JSON.parse(req.body);
    await collection.insertOne({ ...data });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Created",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.toString() }),
    };
  }
};
