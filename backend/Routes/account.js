const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');

const router = express.Router();

router.get('/', authMiddleware ,async (req, res) => {

    try {
        const user = await Account.findOne({
            userId: req.userId
        })

        return res.send({
            user
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/', authMiddleware ,async (req, res) => {
    try {

        const body = req.body
        const user = await Account.create({
            userId: req.userId,
            heading: body.heading,
            price: body.price,
            date: body.date,
            type:body.type
        })

        return res.send({
            message : "item added successfully"
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/amount', authMiddleware ,async (req, res) => {

    const start =  req.body.start || new Date(new Date().getDate());
    const end = req.body.end ||  new Date().toISOString();
    
    const amount = await Account.find({
        "date": {
            "$gt": start,
            "$lt": end
        }
    })
    console.log(start)
    console.log(end)
    var total = 0

    amount.map((price) => {
        total += parseInt(price.price)
    })

    return res.send({
        total,
        amount
    })

})

router.get('/monthly', authMiddleware ,async (req , res )=> {

    try {
        const expenses = await Account.aggregate([
            {
                $group: {
                    _id: { $month: "$date" },
                    total: { $sum: "$price" }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        var data = Array(12).fill(0)
        expenses.map((expense)=>{
            data[expense._id-1]=parseInt(expense.total)
        })

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router