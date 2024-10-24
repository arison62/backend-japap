import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL

export const connectDB = async () => {
    try {
        if(!DATABASE_URL) throw new Error("DATABASE_URL is not defined");
        await mongoose.connect(DATABASE_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}