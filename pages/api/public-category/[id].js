import dbConnect from "../../../utils/dbConnect";
import Category from "../../../models/Category";

export default async function handler(req, res) {
  const { method } = req;
console.log(req.query.id)
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const category = await Category.findById(req.query.id)
        res.status(200).json({ success: true,category:category });
      } catch ({ error, message }) {
        res.status(400).json({ error, message:"Aucune catégorie trouvé" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}