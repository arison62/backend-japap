import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL

export const connectDB = async () => {
    try {
        if(!DATABASE_URL) throw new Error("DATABASE_URL is not defined");
        let conn = await mongoose.createConnection(DATABASE_URL);
        console.log("MongoDB connected");
        return conn;
    } catch (error) {
        console.log(error);
    }
}