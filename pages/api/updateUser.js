import connectDB from "../../middleware/connectDB";
const jwt = require('jsonwebtoken');

import User from "../../models/user";

const handler = async (req, res) => {
    if(req.method === 'PUT') {
        const authToken = req.headers["auth-token"]
        try {
            let user = await jwt.verify(authToken, process.env.JWT_SECRET)
            user = await User.findByIdAndUpdate(req.body._id, req.body, {new: true})
            res.status(200).json({ success: true, user })
        } catch (error) {
            res.status(500).json({ success: false, error: 'Some Internal error occured while fetching prodcuts from database' })
        }
    } else {
        res.status(400).json({ success: false, error: "Bad Request" })
    }
}

export default connectDB(handler)