import connectDB from "../../middleware/connectDB";

import User from "../../models/user";

const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const validateEmail = (email) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { name, email, password } = req.body
            if (name.length === 0) {
                return res.status(422).json({ success: false, error: "Name must not be empty" })
            } else if (!validateEmail(email)) {
                return res.status(422).json({ success: false, error: "Email must be valid" })
            } else if (password.length < 6) {
                return res.status(422).json({ success: false, error: "Password must be atleast 6 characters long" })
            }

            if (name != process.env.ADMIN_NAME || email != process.env.ADMIN_EMAIL) {
                return res.status(403).json({ success: false, error: "Access Denied" })
            }

            const hashedPassword = CryptoJS.AES.encrypt(password, process.env.HASHING_SECRET).toString();
            const user = new User({ name, email, password: hashedPassword, admin: true })
            await user.save()

            const authToken = await jwt.sign({ _id: user._id, name: user.name, email: user.email, password: user.password, admin: true }, process.env.JWT_SECRET)
            res.status(200).json({ success: true, authToken })
        } catch (error) {
            res.status(500).json({ success: false, error: 'Some Internal error occured while signing up' })
        }
    } else {
        res.status(400).json({ success: false, error: "Bad Request" })
    }
}

export default connectDB(handler)