import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req
  await dbConnect();
console.log(id)
  switch (method) {
    case "GET":
      try {
        const user = await User.findById({_id:id});
        const {
          email,
          address,
          first_name,
          last_name,
          zip_code,
          city,
          country,
        } = user;
        console.log(user)
        res.status(200).json({
          success: true,
          data: {
            user: {
              email,
              address,
              first_name,
              last_name,
              zip_code,
              city,
              country,
            },
          },
        });
      } catch ({ error, message }) {
        res.status(400).json({ error, message: "Aucun utilisateur trouvé" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
