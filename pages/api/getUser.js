import connectDB from "../../middleware/connectDB";
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if(req.method === 'GET') {
        const authToken = req.headers["auth-token"]
        try {
            const user = await jwt.verify(authToken, process.env.JWT_SECRET)
            res.status(200).json({ success: true, user })
        } catch (error) {
            res.status(500).json({ success: false, error: 'Some Internal error occured while fetching prodcuts from database' })
        }
    } else {
        res.status(400).json({ success: false, error: "Bad Request" })
    }
}

export default connectDB(handler)