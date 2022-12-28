import connectDB from "../../../middleware/connectDB";
import Product from "../../../models/product";

const handler = async (req, res) => {
    if(req.method === 'PUT') {
        try {
            const {productId} = req.query
            console.log(productId)
            const product = await Product.findByIdAndUpdate(productId, req.body, {new: true})
            console.log(product)
            res.status(200).json({ success: true, product })
        } catch (error) {
            res.status(500).json({ success: false, error: "Some Internal error occured while updating product in database" })
        }
    } else {
        res.status(400).json({success: false, error: 'Bad Request'})
    }
}

export default connectDB(handler)