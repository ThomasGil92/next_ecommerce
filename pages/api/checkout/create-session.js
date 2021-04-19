const Stripe = require("stripe");
const stripe = new Stripe(process.env.SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { total, address } = req.body;/* 
      total=Number.parseFloat(total).toFixed(2) */
      const t=total*100
      
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        /* shipping_address_collection:{
          allowed_countries:["FR"]
        }, */
        metadata: {
          first_name: address.first_name,
          last_name: address.last_name,
          address: address.address,
          zip_code: address.zip_code,
          country: address.country,
          city: address.city,
        },
        line_items: [
          {
            name: "test",
            images: ["https://picsum.photos/200"],
            currency: "eur",
            amount: Math.trunc(t),
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/cart/success",
        cancel_url: "https://example.com/cancel",
      });
      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
};
