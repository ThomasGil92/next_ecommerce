require("dotenv").config();

module.exports = {
  env: {
    PUBLISHABLE_KEY: process.env.PUBLISHABLE_KEY,
    SECRET_KEY: process.env.SECRET_KEY,
    NEXT_API: process.env.NEXT_API,
    REST_API:process.env.REST_API,
  }
};
