const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    sizes: [{
        size: { type: String },
        colors: [{ type: String }],
        images: [{ type: String, required: true }],
        qty: [{ type: Number, required: true }],
        price: [{ type: Number, required: true }],
    }],
    star: { type: Number }
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("products", productSchema)