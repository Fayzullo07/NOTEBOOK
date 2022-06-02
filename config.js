require("dotenv").config();

const { env } = process;

module.exports = {
  PORT: env.PORT,
  MONGO_URL: env.MONGO_URL,
};
