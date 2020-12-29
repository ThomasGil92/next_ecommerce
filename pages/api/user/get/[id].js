import dbConnect from "../../../../utils/dbConnect";
import User from "../../../../models/User";

export default async function handler(req, res) {
  const { method } = req;
  const _id = req.query.id;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const user = await User.findById({ _id });
        const {
          email,
          address,
          first_name,
          last_name,
          zip_code,
          city,
          country,
        } = user;
        res.status(200).json({
          success: true,
          user: {
            email,
            address,
            first_name,
            last_name,
            zip_code,
            city,
            country,
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
