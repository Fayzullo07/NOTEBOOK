require("dotenv").config();

const { env } = process;

module.exports = {
  PORT: env.PORT,
  MONGO_URL: env.MONGO_URL,
  CLOUDINARY_CLOUD_NAME: env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: env.CLOUDINARY_API_SECRET,
};
