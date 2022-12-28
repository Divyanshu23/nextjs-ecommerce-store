import connectDB from "../../middleware/connectDB";
import Product from "../../models/product";
const jwt = require('jsonwebtoken')

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const authToken = req.headers['auth-token']
            const data = await jwt.verify(authToken, process.env.JWT_SECRET)
            if (data.admin) {
                const products = []
                for (let i = 0; i < req.body.length; i++) {
                    const product = new Product(req.body[i])
                    products.push(await product.save())
                }
                res.status(200).json({ success: true, products })
            } else
                res.status(403).json({ success: false, error: 'Access Denied' })
        } catch (error) {
            res.status(500).json({ success: false, error: "Some Internal error occured while saving product into database" })
        }
    } else {
        res.status(400).json({ success: false, error: 'Bad Request' })
    }
}

export default connectDB(handler)