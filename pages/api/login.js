import clientPromise from "../../lib/mongodb";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
/* JWT secret key */
const KEY = process.env.JWT_KEY;
export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("node-next-api");
    const { method } = req;
    try {
      switch (method) {
        case 'POST':
          /* Get Post Data */
          const { email, password } = req.body;
          /* Any how email or password is blank */
          if (!email || !password) {
            return res.status(400).json({
              status: 'error',
              error: 'Request missing username or password',
            });
          }
        //check the user email in the database
              const user = await db.collection("users").findOne({ "email": email });
          /* Check if exists */
              if (!user) {
                  return res.json({ statusCode: 404,  status: 'error', error: 'User Not Found Please Enter valid user Detail'});
              }
          if (user) {
              const userEmail = user.email;
              const userFirstName = user.first_name;
              const userlastName = user.last_name;
              const userPassword = user.password;
            /* Check and compare password */
            bcrypt.compare(password, userPassword).then(isMatch => {
              /* User matched */
              if (isMatch) {
                /* Create JWT Payload */
                const payload = {

                  email: userEmail,
                  firstname: userFirstName,
                    lastname: userlastName
                };
                /* Sign token */
                jwt.sign(
                  payload,
                  KEY,
                  {
                    expiresIn: 31556926, // 1 year in seconds
                  },
                  (err, token) => {
                    /* Send succes with token */
                      res.status(200).json({
                      loggedIn:true,
                      success: true,
                      token: 'Bearer ' + token,
                    });
                  },
                );
              } else {
                /* Send error with message */
                res
                  .status(400)
                  .json({ status: 'error', error: 'Password incorrect' });
              }
            });
          }
          break;
        case 'PUT':
          break;
        case 'PATCH':
          break;
        default:
          break;
      }
    } catch (error) {
      throw error;
    }
  }