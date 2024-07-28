import { MongoClient } from 'mongodb';
import fs from 'fs';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// MongoDB URI
const mongoURI = process.env.MONGO_URL;

// Create a new MongoClient
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
async function main() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Specify the database and collection
    const database = client.db('test');
    const collection = database.collection('jobs');

    // Read the JSON file
    const data = fs.readFileSync('jobs-data.json', 'utf8');
    const jobsData = JSON.parse(data);

    // Insert the data into the collection
    const result = await collection.insertMany(jobsData);

    console.log(`${result.insertedCount} documents were inserted`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
