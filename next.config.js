require("dotenv").config();

module.exports = {
  env: {
    PUBLISHABLE_KEY: process.env.PUBLISHABLE_KEY,
    PRIVATE_KEY: process.env.PRIVATE_KEY
  }
};
