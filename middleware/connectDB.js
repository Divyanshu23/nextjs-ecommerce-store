import mongoose, { mongo } from "mongoose";

const connectDB = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI, { serverSelectionTimeoutMS: 10000 })
        return handler(req, res)
    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}

export default connectDB