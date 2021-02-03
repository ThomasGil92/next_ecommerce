import dbConnect from "../../utils/dbConnect";
import Order from "../../models/Order";
import Admin from "../../models/Admin";
import User from "../../models/User";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
          User.findById(req.body.user._id).exec((err, user) => {
            if (!user) {
              return res.status(401).json({
                error: "Please try again",
              });
            }

            const newOrder = new Order({
              shipping_address: {
                first_name: user.first_name,
                last_name: user.last_name,
                address: user.address,
                country: user.country,
                zip_code: user.zip_code,
                city: user.city,
                email: user.email,
              },
              ordered_objects: {
                list: req.body.cart,
                price: Number.parseFloat(req.body.sub_total).toFixed(2),
              },
            });
            newOrder.save((err, result) => {
              if (err) {
                return res.status(401).json({
                  error: err,
                });
              }
              user.orders.push(result._id);
              user.save((err, userUpdated) => {
                if (err) {
                  return res.status(401).json({
                    error: err,
                  });
                }
                console.log(userUpdated);
              });
              return res.status(200).json({
                message: "Order have been successfully saved.",
              });
            });
          });
      } catch ({ error, message }) {
        res.status(400).json({ error, message });
      }
      break;
    case "GET":
      try {
        const orders = await Order.find({});
        res.status(200).json({ success: true, orders });
      } catch ({ error, message }) {
        res.status(400).json({ error, message: "Aucun produit trouvé" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
