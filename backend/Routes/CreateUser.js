const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecretKey = "aB3dEfGhIjKlMnOpQrStUvWxYz0123"


// signup router

// router.post("/createuser",
//     [
//         body('email').isEmail(),
//         body('name').isLength({ min: 5 }),
//         body('password', 'Incorrect Password').isLength({ min: 5 })
//         // body('password','Incorrect Password').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long')
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const salt = await bcrypt.genSalt(10);
//         let securePassword = await bcrypt.hash(req.body.password, salt)

//         try {
//             await User.create({
//                 name: req.body.name,
//                 password: securePassword,
//                 email: req.body.email,
//                 location: req.body.location
//             }).then(res.json({ success: true }));

//         } catch (error) {
//             // console.log(error);
//             res.json({ success: false });
//         }
//     }
// )



router.post(
    "/createuser",
    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', 'Incorrect Password').isLength({ min: 5 })
    ],
    async (req, res) => {
        // 🔹 Check for Validation Errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        try {
            // 🔹 Hash Password
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);

            // 🔹 Create New User
            const newUser = await User.create({
                name: req.body.name,
                password: securePassword,
                email: req.body.email,
                location: req.body.location
            });

            return res.status(201).json({ success: true, message: "User Created Successfully" });

        } catch (error) {
            console.error("Signup Error:", error);
            return res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
);

// login router

router.post("/loginuser",
    [
        body('email').isEmail(),
        body('password', 'Incorrect Password').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ message: "Incorrect password" });
            }

            const passwordCompare = await bcrypt.compare(req.body.password, userData.password)

            if (!passwordCompare) {
                return res.status(400).json({ message: "Incorrect password" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecretKey)
            return res.json({ success: true, authToken:authToken });

        } catch (error) {
            console.log(error);
            console.log({ sucess: false });
        }
    }
)

module.exports = router;
