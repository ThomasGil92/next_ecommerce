import dbConnect from "../../../utils/dbConnect";
import Admin from "../../../models/Admin";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { method } = req;
  const { _id, email, password,name } = req.body.profile;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        Admin.findOneAndUpdate(
          { _id },
          { $set: { email, name } },
          {new:true}
          /* 
            { new: true },*/
        ).exec((err, admin) => {
          if (err) {
            return res.status(400).json({
              error: "User not found",
            });
          }
          console.log(admin);
          const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          const { _id, email, role, completed_profile, name } = admin;

          return res.status(200).json({
            token,
            admin: { _id, email, role, completed_profile, name },
          });
        });
      } catch ({ error }) {
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
