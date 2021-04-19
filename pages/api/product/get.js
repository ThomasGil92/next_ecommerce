import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";
import Category from "../../../models/Category";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const products = await Product.find({}).populate("categorie");
        res.status(200).json({ success: true,products:products });
      } catch ({ error, message }) {
        res.status(400).json({ error, message:"Aucun produit trouvé" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
