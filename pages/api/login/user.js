import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body
        User.findOne({ email }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: 'Admin with that email does not exist. Please register.'
                });
            }
            // authenticate
            if (!user.authenticate(password)) {
                return res.status(400).json({
                    error: 'Email and password do not match'
                });
            }
            // generate token and send to client
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            const { _id, email } = user;
    
            return res.status(200).json({
                token,
                user: { _id, email }
            })
        });
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
export const config = {
  api: {
    externalResolver: true,
  },
}
