import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    // the exclamation mark is used to tell typescript that we are sure that the variable is not null

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running: ",
        err,
      );
      process.exit(); 
    });
  } catch (error) {
    console.log("Error connecting mongoDB: ", error);
  }
};
