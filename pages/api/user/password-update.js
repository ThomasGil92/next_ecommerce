import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { method } = req;
  const { email, password } = req.body.state;
  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        jwt.verify(
          req.body.token,
          process.env.JWT_ACCOUNT_ACTIVATION,
          function (err, decoded) {
            if (err) {
              console.log(err);
              return res.status(401).json({
                error: "Expired link. Try again",
              });
            }
            User.findOne({ email }, (err, user) => {
              user.password = password;
              user.save((err, result) => {
                if (err) {
                  console.log("USER UPDATE ERROR", err);
                  return res.status(400).json({
                    error: "User update failed",
                  });
                }
                console.log(result);
              });
            });
            return res.status(200).json({message:"Password updated"});
          },
        );
      } catch ({ error }) {
        console.log(error);
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
