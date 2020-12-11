var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  { ObjectId } = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    imageUrl:{
      type:String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
    categorie: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "product",
  },
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
