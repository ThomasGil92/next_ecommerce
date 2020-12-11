var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    categoryName:{
      type:String,
      default:""
    },
    imageUrl:{
      type:String,
    },
  },
  {
    timestamps: true,
    collection: "category",
  },
);




export default mongoose.models.Category || mongoose.model("Category", categorySchema);
