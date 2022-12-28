const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, required: true },
    products: [{
        name: { type: String, required: true },
        size: { type: String },
        color: { type: String },
        qty: { type: Number, default: 1 },
        price: { type: Number, required: true },
        image: { type: String, required: true },
    }],
    streetaddress: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    deliverytype: { type: String, required: true },
    cost: {type: Number, required: true},
    status: { type: String, default: "Pending" }
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("orders", orderSchema)