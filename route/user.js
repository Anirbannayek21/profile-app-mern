const express = require("express");
const Users = require("../model/userSchema");
const bcrypt = require('bcryptjs');
const auth = require("../src/middleware/auth");
const multer = require("multer")
const path = require("path")

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../server/client/public/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({
    storage: storage
})

router.post("/register", async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    // let token;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(401).json({
            message: "please fill the form properly."
        })
    }
    try {
        const existingUser = await Users.findOne({ email: email, phone: phone });

        if (existingUser) {
            return res.status(422).json({ message: "email already used" })
        }

        const userData = new Users({
            name, email, phone, work, password
        })

        if (password === cpassword) {
            userData.save(async (error, data) => {
                if (error) {
                    return res.status(400).json({ message })
                }


                if (data) {
                    const token = await data.generateAuthToken();
                    // console.log(token);

                    res.cookie("jwt_token", token, {
                        expires: new Date(Date.now() + 25892000000),
                        httpOnly: false
                    })

                    res.status(200).json({
                        message: "successfully register"
                    })
                }
            })
        }
        else {
            return res.status(400).json({ message: "check your passwords again" })
        }
    } catch (error) {
        return res.status(400).json({ message: "something wrong happen. please check again" })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            error: "please fill the form properly."
        })
    }

    try {
        const loginUser = await Users.findOne({ email: email });

        if (!loginUser) {
            return res.status(400).json({
                error: "invalid email / password"
            })
        }

        const isMatch = await bcrypt.compare(password, loginUser.password);


        if (isMatch) {
            // receive token after login
            const token = await loginUser.generateAuthToken();
            // console.log(token);
            res.cookie("jwt_token", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: false
            })

            res.status(200).json({
                message: "user signin successfully"
            })
        }
        else {
            res.status(400).json({
                error: "invalid email / password"
            })
        }
    } catch (error) {
        return res.status(400).json({
            error: "invalid email / password"
        })
    }
})

router.get("/about", auth, (req, res) => {
    res.send(req.rootUser)
})

router.post("/contact", async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const data = await Users.findOne({ email: email })

        if (data) {
            const document = await Users.findByIdAndUpdate(data._id, {
                $push: {
                    messages: {
                        message: message,
                    }
                }
            })

            return res.status(200).json({ message: "message saved" })
        }

        return res.status(400).json({ message: "log in first to send message" })


    } catch (error) {
        res.status(400).json({ message: "something wrong happen" })
    }
})

router.post("/addpic", auth, upload.single("profilePic"), async (req, res) => {
    // console.log(req.file.originalname);
    await Users.findByIdAndUpdate({ _id: req.rootUser._id }, {
        profilePic: req.file.originalname,
    }).then((result) => {
        res.status(200).json({ message: "update successfull" })
    }).catch((error) => {
        res.status(400).json({ error: "update unsuccessfull" })
    })
})


router.post("/addsocial", auth, async (req, res) => {
    const data = req.body;
    // console.log(data);
    await Users.findByIdAndUpdate({ _id: req.rootUser._id }, {
        $addToSet: {
            social: {
                $each: data
            }
        }
    }).then((result) => res.status(200).json({ message: "saved" })).catch((error) => res.status(400).json({ message: "error" }))
})

router.get("/logout", (req, res) => {
    res.clearCookie("jwt_token", { path: "/" })
    res.status(200).send({ message: "logout successfully" })
})
module.exports = router