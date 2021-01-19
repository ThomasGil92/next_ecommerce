import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";
const _ = require("lodash");
const AWS = require("aws-sdk");
const { checkoutSuccessEmail } = require("../../../utils/email");

AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
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
        const { email } = req.body.user;
        const { config } = req.body.cs;
        const user = await User.findOne({ email });
        console.log(JSON.parse(config.data))
        const params = checkoutSuccessEmail(email,JSON.parse(config.data) );

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
      } catch (err) {
        res.status(400).json(err);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
