import dbConnect from "../../../utils/dbConnect";
import Category from "../../../models/Category";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const categories = await Category.find({});
        res.status(200).json({ success: true,categories:categories });
      } catch ({ error, message }) {
        res.status(400).json({ error, message:"Aucune catégorie trouvée" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
