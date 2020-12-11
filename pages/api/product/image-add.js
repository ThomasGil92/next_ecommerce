import dbConnect from "../../../utils/dbConnect";
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  const { method } = req;
  const fileStr = req.body.file;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {});
        console.log(uploadResponse);
        return res.json({ msg: 'yaya',uploadResponse });
      } catch ({ error, message }) {
        res.status(400).json({ messsage:"rrrr" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
