const jwt = require('jsonwebtoken');

import connectDB from "../../middleware/connectDB";
import Order from "../../models/order";

const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            const authToken = req.headers['auth-token']
            const user = await jwt.verify(authToken, process.env.JWT_SECRET)
            const orders = await Order.find({userid:user._id})
            res.json({success: true, orders, user})
        } catch (error) {
            res.status(500).json({ success: false, error: 'Some Internal error occured while signing up' })
        }
    } else {
        res.status(400).json({ success: false, error: "Bad Request" })
    }
}

export default connectDB(handler)