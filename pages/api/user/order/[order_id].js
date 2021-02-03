import dbConnect from "../../../../utils/dbConnect";
import Order from "../../../../models/Order";

export default async function handler(req, res) {
  const {
    query: { order_id },
    method,
  } = req;
  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const order = await Order.findById({ _id: order_id });
        return res.status(200).json({
          success: true,
          order,
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
