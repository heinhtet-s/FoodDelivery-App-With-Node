import mongoose from "mongoose";
export const connectDB = async () => {
  const { MONGO_URI }: any = process.env;
  console.log(MONGO_URI);
  try {
    const conn: any = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connnected: ${conn.connection.host}`);
  } catch (error: any) {
    console.log(`Error: ${error.message}`);
    process.exit();
  }
};
