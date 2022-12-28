const mongoose = require("mongoose")

const pincodeSchema = new mongoose.Schema({
    pincode: {type: Number, required: true},
    district: {type: String, required: true},
    state: {type: String, required: true}
});

mongoose.models = {}
export default mongoose.model("pincodes", pincodeSchema)