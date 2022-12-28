import connectDB from "../../middleware/connectDB";
import Pincode from "../../models/pincode";


const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const data = await Pincode.findOne({pincode: req.body.pincode})
            if(data) {
                res.status(200).json({success: true, data})
            } else {
                res.status(404).json({success: false, msg: "Pincode not found"})
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, error: "Some Internal error occured while saving product into database" })
        }
    } else {
        res.status(400).json({ success: false, error: 'Bad Request' })
    }
}

export default connectDB(handler)