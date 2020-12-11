import dbConnect from "../../../utils/dbConnect";
import Admin from "../../../models/Admin";
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const AWS = require("aws-sdk");
const { registerEmailParamsForSuperAdmin } = require("../../../utils/email");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;
        const superadmin = await Admin.findOne({ email });
        if (superadmin !== null) {
          return res.status(400).json({error:"Superadmin already exist"});
        }
        const token = jwt.sign(
          { email, password },
          process.env.JWT_ACCOUNT_ACTIVATION,
          {
            expiresIn: "10m",
          },
        );
        console.log(token);
        const params = registerEmailParamsForSuperAdmin(email, token);
        console.log(params);
        var sendEmailOnRegister = ses.sendEmail(params).promise();
        sendEmailOnRegister
          .then((data) => {
            console.log("email submitted to SES", data);
            res.json({
              message: `Email has been sent to ${email}, Follow the instructions to complete your registration`,
            });
          })
          .catch((error) => {
            console.log("ses email on register", error);
            res.json({
              message: `We could not verify your email. Please try again`,
            });
          });
      } catch (error) {
        res.status(400).json({ error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
