const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { date } = require('zod');

const router = express.Router();

router.get('/', async (req, res) => {

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

router.post('/', async (req, res) => {
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

router.post('/amount', async (req, res) => {

    const start =  req.body.start || new Date(new Date().getDate());
    const end = req.body.end ||  new Date().toISOString();
    
    const amount = await Account.find({
        "date": {
            "$gt": start,
            "$lt": end
        }
    }, "price -_id")

    var total = 0

    amount.map((price) => {
        total += parseInt(price.price)
    })

    return res.send({
        total,
        amount
    })

})

module.exports = router