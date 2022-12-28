const jwt = require('jsonwebtoken');

import connectDB from "../../middleware/connectDB";
import Order from "../../models/order";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const {authToken, address, cart} = req.body
            const user = await jwt.verify(authToken, process.env.JWT_SECRET)
            let products = []
            let cost = 0
            for (let i = 0; i < cart.length; i++) {
                products.push({name: cart[i].name, size: cart[i].size, color: cart[i].color, qty: cart[i].qty, price: cart[i].price, image: cart[i].image})
                cost += cart[i].price
            }
            let order =new Order({userid: user._id, products, streetaddress: address.streetAddress, district: address.district, state: address.state, deliverytype: address.deliverytype ? address.deliverytype: "Normal Delivery", cost:cost })
            await order.save()
            res.status(200).json({success: true, order: order})
        } catch (error) {
            res.status(500).json({ success: false, error: 'Some Internal error occured while signing up' })
        }
    } else {
        res.status(400).json({ success: false, error: "Bad Request" })
    }
}

export default connectDB(handler)