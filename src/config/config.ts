import dotenv from "dotenv";
dotenv.config();
const { DB_URI, PORT, GOOGLE_APPLICATION_CREDENTIALS } = process.env;
export default {
  dataBaseUrl: DB_URI!,
  port: PORT,
  googleCreds: GOOGLE_APPLICATION_CREDENTIALS!,
};
