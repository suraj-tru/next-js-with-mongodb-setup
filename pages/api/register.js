import clientPromise from "../../lib/mongodb";

import bcrypt from 'bcryptjs';
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("node-next-api");
  switch (req.method) {
    case "POST":

      try {

const body =  JSON.parse(req.body)
    // Get user input
        const { first_name, last_name, email, password } = body;
    // Validate user input
    if (!(first_name && last_name && email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database

        const oldUser = await db.collection("users").findOne({ "email": email });

    if (oldUser) {
      return res.status(409).json({ message: "User Already Exist. Please Login" });
    }

    //Encrypt user password
   const  encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database

     const user  =  await db.collection("users").insertOne({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

return res.json({ status: 200, data: user, message: "user created successfully", success: true});
    // // Create token
    // const token = jwt.sign(
    //   { user_id: user._id, email },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "2h",
    //   }
    // );
    // // save user token
    // user.token = token;
    // // return new user
    // res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
      break;
    case "GET":
      const allUser = await db.collection("users").find({}).toArray();
      res.json({ status: 200, data: allUser });
      break;
  }
}