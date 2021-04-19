import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method } = req;
  const {
    productName,
    price,
    description,
    stock,
    categorie,
    imageUrl,
  } = req.body.productFields;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        Product.findOne({ productName }).exec((err, product) => {
          if (product) {
            return res.status(401).json({
              error: "This product already exist",
            });
          }
        });

        const newProduct = new Product({
          productName,
          price,
          description,
          stock,
          categorie,
          imageUrl,
        });
        newProduct.save((err, result) => {
          if (err) {
            return res.status(401).json({
              error: "Error saving product in database. Try later",
            });
          }
          return res.status(200).json({
            message: "Product have been successfully saved.",
          });
        });
      } catch ({ error, message }) {
        res.status(400).json({ error, message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
