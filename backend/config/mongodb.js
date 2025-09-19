import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Mongoose connected to DB");
        });
        await mongoose.connect(`${process.env.MONGO_URI}/e-commerce`);
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

export default connectDB;