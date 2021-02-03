import dbConnect from "../../../utils/dbConnect";
import Admin from "../../../models/Admin";
const jwt = require("jsonwebtoken");



export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body
        Admin.findOne({ email }).exec((err, admin) => {
            if (err || !admin) {
                return res.status(400).json({
                    error: 'Admin with that email does not exist. Please register.'
                });
            }
            // authenticate
            if (!admin.authenticate(password)) {
                return res.status(400).json({
                    error: 'Email and password do not match'
                });
            }
            // generate token and send to client
            const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            const { _id, email, role,completed_profile,name } = admin;
    
            return res.status(200).json({
                token,
                admin: { _id, email, role,completed_profile,name }
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
