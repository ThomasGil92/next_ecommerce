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
                error: "Expired link. Try again",
              });
            }
            const { email, password } = jwt.decode(token);
            Admin.findOne({ email }).exec((err, superadmin) => {
              if (superadmin) {
                return res.status(401).json({
                  error: "Email is taken",
                });
              }
            });

            const newSuperAdmin = new Admin({ email, password, role: 2 });
            newSuperAdmin.save((err, result) => {
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
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
