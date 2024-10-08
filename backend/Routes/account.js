const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account, Party } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {

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

router.get('/past', authMiddleware, async (req, res) => {

    try {

        const item = await Account.find({
            userId: req.userId
        }).limit(10).sort({ 'date': -1 })

        res.send(item)

    } catch (error) {
        res.send({ error })
    }


})

router.post('/', authMiddleware, async (req, res) => {
    try {

        const body = req.body
        const user = await Account.create({
            userId: req.userId,
            heading: body.heading,
            price: body.price,
            date: body.date,
            type: body.type
        })

        return res.send({
            message: "item added successfully"
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/amount', authMiddleware, async (req, res) => {

    try {
        const start = req.body.start;
        const end = req.body.end;
        const userId = new mongoose.Types.ObjectId(req.userId)

        const amount = await Account.find({
            userId: req.userId,
            date: {
                "$gt": start,
                "$lt": end
            }
        })

        var total = 0

        amount.map((price) => {
            total += parseInt(price.price)
        })

        const trip = await Party.aggregate([
            {
                $match: {
                    userId
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: { $sum: ["$total", "$balance"] } }
                }
            },
            {
                $project: {
                    total: { $toDouble: "$total" }
                }
            }
        ])

        const triptotal = trip.length > 0 ? trip[0].total : 0

        return res.send({
            total,
            amount,
            triptotal
        })

    } catch (error) {
        console.log(error)
    }
})

router.post('/monthly', authMiddleware, async (req, res) => {

    try {

        const type = req.body.type;
        const userId = new mongoose.Types.ObjectId(req.userId)


        if (type == 'custom' || type == 'month') {

            const startDate = new Date(req.body.startdate);
            const endDate = new Date(req.body.enddate);

            const expenses = await Account.aggregate([
                {
                    $match: {
                        userId,
                        date: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$date" },
                            month: { $month: "$date" },
                            day: { $dayOfMonth: "$date" }
                        },
                        total: { $sum: "$price" }
                    }
                },
                {
                    $sort: {
                        "_id.year": 1,
                        "_id.month": 1,
                        "_id.day": 1
                    }
                }
            ]);

            const numberOfDays = Math.ceil((endDate - startDate + 1) / (1000 * 60 * 60 * 24));
            const daysArray = [];
            const currentDate = new Date(startDate);
            var data = Array(numberOfDays).fill(0)
            var i = 0
            while (currentDate <= endDate) {
                const day = String(currentDate.getDate()).padStart(2, '0');
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                daysArray.push(`${month}-${day}`);
                currentDate.setDate(currentDate.getDate() + 1);
            }


            expenses.map((expense) => {
                const date = new Date(`${expense._id.year}-${String(expense._id.month).padStart(2, '0')}-${String(expense._id.day).padStart(2, '0')}`)
                const count = Math.ceil((date - startDate + 1) / (1000 * 60 * 60 * 24))
                data[count] = parseInt(expense.total)
            })

            res.json({
                data,
                daysArray
            });
        }

        else {

            const expenses = await Account.aggregate([
                {
                    $match: {
                        userId
                    }
                },
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

            const daysArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            var data = Array(12).fill(0)
            expenses.map((expense) => {
                data[expense._id - 1] = parseInt(expense.total)
            })

            res.json({
                data,
                daysArray
            });
        }



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/past', async (req, res) => {
    try {

        const Id = req.query.Id;
        const deleted = await Account.deleteOne({
                _id : Id
            })
        
        if(deleted){
            res.send("deleted")
        }

    } catch (error) {
        console.log(error)
    }
})


module.exports = router