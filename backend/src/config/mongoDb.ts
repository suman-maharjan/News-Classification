import mongoose from "mongoose";
import { DB_URL } from "../constants/envConstants";

const initMongoDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Mongo Database Connected!!`);
  } catch (error) {
    console.log(`Mongo Database Connection Error:`, error);
  }
};

export default initMongoDatabase;
