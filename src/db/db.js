import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Already connected to the database");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "todos",
    });
    console.log("MongoDB connected");
    isConnected = true;
  } catch ({ mesage }) {
    console.log(mesage);
  }
};
