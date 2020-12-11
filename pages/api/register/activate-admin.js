import dbConnect from "../../../utils/dbConnect";
import Admin from "../../../models/Admin";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { method } = req;
  const { token } = req.body;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        jwt.verify(
          token,
          process.env.JWT_ACCOUNT_ACTIVATION,
          function (err, decoded) {
            if (err) {
              return res.status(401).json({
                message: "Expired link. Try again"
              });
            }
            const { email, password } = jwt.decode(token);
            Admin.findOne({ email }).exec((err, admin) => {
              if (admin) {
                return res.status(401).json({
                  error: "Email is taken",
                });
              }
            });

            const newAdmin = new Admin({ email, password, role: 1 });
            newAdmin.save((err, result) => {
              if (err) {
                return res.status(401).json({
                  error: "Error saving user in database. Try later",
                });
              }
              return res.status(200).json({
                message: "Registration success. Please login.",
              });
            });
          },
        );
      } catch ({error,message}) {
        res.status(400).json({ error,message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
