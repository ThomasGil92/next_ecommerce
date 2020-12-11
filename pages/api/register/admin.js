import dbConnect from "../../../utils/dbConnect";
import Admin from "../../../models/Admin";
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const AWS = require("aws-sdk");
const { registerEmailParamsForAdmin } = require("../../../utils/email");

AWS.config.update({
  accessKeyId: "AKIARGDELGJFVZ6LZLU2",
  secretAccessKey: "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",
  region: 'us-east-1',
});

const ses = new AWS.SES({ apiVersion: "2010-12-01" });

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (admin !== null) {
          return res.status(400).json({error:"admin already exist"});
        }
        const token = jwt.sign(
          { email, password },
          process.env.JWT_ACCOUNT_ACTIVATION,
          {
            expiresIn: "10m",
          },
        );
        const params = registerEmailParamsForAdmin(email, token);
        var sendEmailOnRegister = ses.sendEmail(params).promise();
        sendEmailOnRegister
          .then((data) => {
            console.log("email submitted to SES", data);
            res.json({
              message: `Email has been sent to ${email}, Follow the instructions to complete your registration`,
            })
          })
          .catch((error) => {
            console.log("ses email on register", error);
           res.json({
              error,
              message: `We could not verify your email. Please try again`,
            })
          })
      } catch (error) {
        console.log(error)
       res.status(405);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
