import dbConnect from "../../../utils/dbConnect";
import Admin from "../../../models/Admin";
const jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  const { method } = req;
  const { _id, name, password } = req.body.profile;
  await dbConnect();

  switch (method) {
    case "PUT":
      try {
        Admin.findOne(
            { _id},(err,admin)=>{
                admin.password=password
                admin.name=name
                admin.save((err, result) => {
                    if (err) {
                        console.log('USER UPDATE ERROR', err);
                        return res.status(400).json({
                            error: 'User update failed'
                        });
                    }
                    const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
                        expiresIn: "7d",
                      });
                      const { _id, email, role, completed_profile } = admin;
          
                      return res.status(200).json({
                        token,
                        admin: { _id, email, role, completed_profile },
                      });
                });
                
            }
        )
        /* Admin.findOne({ _id }, {  $set:{password} }).exec(
          (err, admin) => {
            if (err) {
              return res.status(400).json({
                error: "User not found",
                message:req.body
              });
            }
            console.log(admin);
            const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
              expiresIn: "7d",
            });
            const { _id, email, role, completed_profile } = admin;

            return res.status(200).json({
              token,
              admin: { _id, email, role, completed_profile },
            });
          },
        ); */
      } catch ({ error }) {
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
