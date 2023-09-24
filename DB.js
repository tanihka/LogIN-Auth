import mongoose from "mongoose";

const DB_Connection = async (URL) => {
  try {
    const DB_collection = {
      dbName : "S_Task"
    }

    await mongoose.connect(URL, DB_collection);
    console.log("db connection established");
  } catch (err) {
    console.error(err);
  }
};

export default DB_Connection;
