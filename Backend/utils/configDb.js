import mongoose from "mongoose";

// Import dotenv and call config method
import dotenv from 'dotenv';

//config .dotenv
dotenv.config();


export const connectDb = async () => {
    try {
        await mongoose.connect(
            process.env.URI
            
            
        );
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
