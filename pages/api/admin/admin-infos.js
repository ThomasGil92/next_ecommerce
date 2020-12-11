import dbConnect from "../../../utils/dbConnect";
import Admin from "../../../models/Admin";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.body;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        Admin.findOne({ id }).exec(
          (err, admin) => {
            if (err) {
              return res.status(400).json({
                error: "User not found",
              });
            }
           
            return res.status(200).json({
              admin
            });
          },
        );
      } catch ({ error }) {
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}