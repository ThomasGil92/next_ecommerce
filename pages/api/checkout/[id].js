
const stripe = require("stripe")(process.env.SECRET_KEY);


export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req
console.log(id)
  switch (method) {
    case "GET":
      try {
        const session = await stripe.checkout.sessions.retrieve(id);
        
       return res.status(200).json({session});
      } catch ({ error, message }) {
        res.status(400).json({ error, message: "Aucun utilisateur trouvé" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}


/* export default async (req, res) => {
    const {
      query: { id },
      method,
    } = req
    try {
      console.log(req.body)
      const session = await stripe.checkout.sessions.retrieve(id);
      res.status(200).json("dhsudhfdsufh");
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
};
 */