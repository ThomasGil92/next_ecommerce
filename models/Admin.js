import mongoose from "mongoose";
const crypto = require("crypto");

const adminSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      default:""
    },
    email: {
      type: String,
      required: true,
    },
    completed_profile:{
      type:Boolean,
      default :false
    },
    role: {
      type: Number,
      default: 1,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: String,
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "admin",
  },
);

adminSchema
  .virtual("password")
  .set(function (password) {
    // create temp variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encrypt password
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

adminSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

export default mongoose.models.Admin || mongoose.model("Admin", adminSchema);
