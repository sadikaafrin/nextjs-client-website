// pages/api/user.js in YOUR FRONTEND app
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  // Set CORS headers - not strictly needed for same-origin but good practice
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    let client;
    
    try {
      client = new MongoClient(uri);
      await client.connect();
      const database = client.db('furniture_db'); 
      const usersCollection = database.collection('users');

      const { email, name, image, provider } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }

      // Upsert user data
      const result = await usersCollection.updateOne(
        { email },
        {
          $set: {
            name,
            image,
            provider,
            lastLogin: new Date(),
          },
          $setOnInsert: {
            email,
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );

      const user = await usersCollection.findOne({ email });

      res.status(200).json({
        success: true,
        message: "User data saved to MongoDB",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
          provider: user.provider,
        },
      });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    } finally {
      if (client) {
        await client.close();
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}