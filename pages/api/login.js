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
            const { email, password } = req.body
            if (!validateEmail(email)) {
                return res.status(422).json({ success: false, error: "Email must be valid" })
            } else if (password.length < 6) {
                return res.status(422).json({ success: false, error: "Password must be atleast 6 characters long" })
            }

            const user = await User.findOne({ email })
            if (user) {
                const bytes = CryptoJS.AES.decrypt(user.password, process.env.HASHING_SECRET);
                const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
                // console.log(originalPassword, password)
                if (originalPassword === password) {
                    const authToken = await jwt.sign({ _id: user._id, name: user.name, email, password }, process.env.JWT_SECRET)
                    res.status(200).json({ success: true, authToken, isAdmin: user.admin })
                } else {
                    res.status(403).json({ success: false, error: "Access denied" })
                }
            } else {
                res.status(403).json({ success: false, error: "Access denied" })
            }
        } catch (error) {
            res.status(500).json({ success: false, error: 'Some Internal error occured while signing up' })
        }
    } else {
        res.status(400).json({ success: false, error: "Bad Request" })
    }
}

export default connectDB(handler)