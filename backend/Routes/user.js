// backend/routes/user.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Account, Party } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    Email: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        Email: req.body.Email
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        })
    }

    const usernameexist = await User.findOne({
        username: req.body.Email
    })

    if (usernameexist) {
        return res.status(411).json({
            message: "username already exist"
        })
    }

    const user = await User.create({
        Email: req.body.Email,
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: 0,
        contact: 'Your Contact',
        UPI: 'Your UPI ID'
    })
    const userId = user._id;

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


const signinBody = zod.object({
    Email: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        Email: req.body.Email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })
})


router.put("/", authMiddleware, async (req, res) => {

    const check = await User.findOneAndUpdate({
        _id: req.userId
    }, req.body)

    if (check) {
        return res.json({
            message: "Updated successfully"
        })
    }
})

router.get('/', authMiddleware, async (req, res) => {
    try {

        const user = await User.findById(req.userId, {
            password: 0,
            __v: 0
        })

        res.send({
            user
        })
    } catch (error) {
        res.send({
            error
        })
    }

})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        "$or": [{
            "firstName": {
                "$regex": filter, "$options": "i"
            }
        },
        {
            "lastName": {
                "$regex": filter, "$options": "i"
            }
        },
        {
            "username": {
                "$regex": filter, "$options": "i"
            }
        }]
    }).limit(10)

    res.json({
        user: users.map(user => ({
            username: user.username.toLowerCase(),
            _id: user._id
        }))
    })
})

router.delete('/', authMiddleware, async (req, res) => {

    try {
        const response = await Promise.all([
            User.deleteOne({
                _id: req.userId
            }),
            Party.deleteOne({
                userId: req.userId
            })
        ])
        return res.send({ message: "Deleted Successfully" })

    } catch (error) {
        res.status(404).send("somthing went wrong")
    }
})

module.exports = router;