import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
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
            const {
              first_name,
              last_name,
              address,
              zip_code,
              city,
              country,
              email,
              password,
            } = jwt.decode(token);
            User.findOne({ email }).exec((err, user) => {
              if (user) {
                return res.status(401).json({
                  error: "User already exist",
                });
              }
            });

            const newUser = new User({
              first_name,
              last_name,
              address,
              zip_code,
              city,
              country,
              email,
              password,
            });
            newUser.save((err, result) => {
              if (err) {
                return res.status(401).json({
                  error: "Error saving user in database. Try later",
                });
              }
              return res.status(200).json({
                message: "Registration success. Please login.",
                result
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
