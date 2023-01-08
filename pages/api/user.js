import clientPromise from "../../lib/mongodb";
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("node-next-api");
  switch (req.method) {
    case "GET":
      const allUser = await db.collection("users").find({}).toArray();
      res.json({ status: 200, data: allUser });
      break;
  }
}

