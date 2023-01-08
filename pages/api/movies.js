import clientPromise from "../../lib/mongodb";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
/* JWT secret key */
const KEY = process.env.JWT_KEY;
export default async (req, res) => {
   try {
       const client = await clientPromise;
       const db = client.db("sample_mflix");
       const movies = await db
           .collection("movies")
           .find({})
           .limit(5)
           .toArray();
       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};