import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req
  console.log(req.body);
  
  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })
        if (!user) {
          return res.status(400).json({ success: false })
        }
       return res.status(200).json({ success: true, data: user })

      } catch ({ error }) {
        console.log(error);
        return res.status(400).json({ error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
