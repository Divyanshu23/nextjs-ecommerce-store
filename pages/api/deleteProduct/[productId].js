import connectDB from "../../../middleware/connectDB";
import Product from "../../../models/product";

const handler = async (req, res) => {
    if(req.method === 'DELETE') {
        try {
            const {productId} = req.query
            await Product.findByIdAndDelete(productId)
            res.status(200).json({ success: true})
        } catch (error) {
            res.status(500).json({ success: false, error: "Some Internal error occured while updating product in database" })
        }
    } else {
        res.status(400).json({success: false, error: 'Bad Request'})
    }
}

export default connectDB(handler)