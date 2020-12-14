import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";

export default async function handler(req, res) {
  const { method } = req;
  const { _id, stock,description,price,productName } = req.body.toUpdate;

  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        Product.findOneAndUpdate(
          { _id },
          { $set: { stock, productName, price, description } },
          { new: true },
        ).exec((err, product) => {
          if (err) {
            return res.status(400).json({
              error: "Product not found",
            });
          }

          return res.status(200).json({
            product,
          });
        });
      } catch ({ error }) {
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
