import dbConnect from "../../../utils/dbConnect";
import Category from "../../../models/Category";

export default async function handler(req, res) {
  const { method } = req;
  const { categoryName,imageUrl } = req.body.categorieFields;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
       
            Category.findOne({ categoryName }).exec((err, category) => {
              if (category) {
                return res.status(401).json({
                  error: "This category already exist",
                });
              }
            });

            const newCategory = new Category({ categoryName,imageUrl });
            newCategory.save((err, result) => {
              if (err) {
                return res.status(401).json({
                  error: "Error saving category in database. Try later",
                });
              }
              return res.status(200).json({
                message: "Category have been successfully saved.",
              });
            });
          
      } catch ({error,message}) {
        res.status(400).json({ error,message });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
