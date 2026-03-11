import mongoose from "mongoose";
export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.mongo_url!);
        const connection = mongoose.connection;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}