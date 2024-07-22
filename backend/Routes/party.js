const express = require('express');
const { authMiddleware } = require('../middleware');
const { Party, User, Partygroup } = require('../db');
const { default: mongoose } = require('mongoose');
const { promise } = require('zod');

const router = express.Router();

router.get('/trip', authMiddleware, async (req, res) => {
    try {

        const Id = req.query.id
        const [parties, group] = await Promise.all([Party.find({
            Id
        }), Partygroup.findOne({
            Id
        })])

        const userId = parties.map(party => party.userId)

        const users = await User.find({
            _id: { $in: userId }
        }, {
            password: 0
        })

        const partyuser = parties.map((party) => {
            return {
                ...party.toObject(),
                user: users.filter(user => user._id.toString() == party.userId.toString())
            }
        })

        res.send({ group, partyuser })

    } catch (error) {
        res.send({ error })
    }
})


router.get('/', authMiddleware, async (req, res) => {

    try {
        const userId = new mongoose.Types.ObjectId(req.userId)
        const type = req.query.type

        const [parties, avg_result, total_result, count_result , expensive_result] = await Promise.all([
            Party.find({ userId: req.userId }),
            Party.aggregate([
                {
                    $match: {
                        userId
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $avg: { $sum: ["$total", "$balance"] } }
                    }
                },
                {
                    $project: {
                        total: { $toDouble: "$total" }
                    }
                }
            ]),
            Party.aggregate([
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
            ]),
            Party.aggregate([
                {
                    $match: {
                        userId
                    }
                },
                {
                    $group: {
                        _id: null,
                        count: { $count: { } }
                    }
                }
            ]),
            Party.aggregate([
                {
                    $match: {
                        userId
                    }
                },
                { $unwind: "$expenses" },
                {
                    $group: {
                        _id: "$expenses.category",
                        total: { $sum : "$expenses.price"  }
                    }
                },
                {
                    $sort : {
                        total : -1
                    }
                },
                {
                    $limit : 1
                }

            ])
        ])

        const avg = parseFloat(avg_result[0].total).toFixed(2)
        const total = parseFloat(total_result[0].total).toFixed(2)
        const count = count_result[0].count
        const expensive = expensive_result[0]._id

        if (!parties || parties.length === 0) {
            return res.send({ error: 'Party not found' });
        }

        const partyIds = parties.map(party => party.Id);

        const partyGroups = await Partygroup.find({ Id: { $in: partyIds } });

        const results = parties.map(party => {
            return {
                ...party.toObject(),
                partyGroups: partyGroups.filter(group => group.Id === party.Id)
            };
        });

        if (type == 'total') {

            const category = await Party.aggregate([
                {
                    $match: {
                        userId
                    }
                },
                { $unwind: "$expenses" },
                {
                    $group: {
                        _id: "$expenses.category",
                        value: { $sum: "$expenses.price" }
                    }
                },
                {
                    $project: {
                        name: "$_id",
                        value: { $toDouble: "$value" },
                        _id: 0
                    }
                },
                {
                    $match: {
                        value: { $gt: 0 }
                    }
                }
            ]);

            return res.send({ results, category, avg, total , count , expensive });
        }
        else {
            const category = await Party.aggregate([
                {
                    $match: {
                        userId
                    }
                },
                { $unwind: "$expenses" },
                {
                    $group: {
                        _id: "$expenses.category",
                        value: { $avg: "$expenses.price" }
                    }
                },
                {
                    $project: {
                        name: "$_id",
                        value: { $toDouble: "$value" },
                        _id: 0
                    }
                },
                {
                    $match: {
                        value: { $gt: 0 }
                    }
                }
            ]);

            return res.send({ results, category, avg, total , count, expensive });

        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.post('/add', authMiddleware, async (req, res) => {
    const amount = req.body.price
    const category = req.body.type
    const Id = req.body.Id

    try {
        await Party.updateOne({
            Id,
            userId: req.userId
        }, {
            $inc: { total: amount },
        })

        await Partygroup.updateOne({
            Id
        }, {
            $inc: { total: amount }
        })

        await Party.updateOne(
            { Id, "expenses.category": category },
            {
                $inc: {
                    "expenses.$.price": amount
                }
            }
        );
        return res.send({
            message: "done"
        })
    } catch (error) {
        console.log(error)
    }

})


router.post('/split', authMiddleware, async (req, res) => {

    const amount = req.body.price
    const category = req.body.type
    const Id = req.body.Id

    try {
        const check = await Party.findOne({
            Id
        })

        if (!check) {
            return res.send({
                message: "Id does't exist"
            })
        }

        const count = await Party.countDocuments({
            Id
        })

        await Party.updateOne({
            Id,
            userId: req.userId
        }, {
            $inc: { balance: amount, total: (amount / count).toFixed(2) },

        })

        await Partygroup.updateOne({
            Id
        }, {
            $inc: { total: amount }
        })

        await Party.updateOne(
            { Id, "expenses.category": category },
            {
                $inc: {
                    "expenses.$.price": amount
                }
            }
        );


        const user = await Party.updateMany({
            Id
        }, {
            $inc: {
                balance: -(amount / count).toFixed(2)
            }
        })

        console.log({ count, user })

        return res.send({
            user
        })
    } catch (error) {
        console.log(error)
    }

})

router.post('/create', authMiddleware, async (req, res) => {

    try {

        const body = req.body;
        const date = new Date()
        const party = await Party.create({
            Id: Math.random().toString(36).substring(2, 8),
            userId: req.userId,
            balance: 0,
            total: 0,
            expenses: [
                {
                    category: "Food",
                    price: 0
                },
                {
                    category: "Travel",
                    price: 0
                },
                {
                    category: "Hotel",
                    price: 0
                },
                {
                    category: "Enternainment",
                    price: 0
                },
                {
                    category: "Daily care",
                    price: 0
                },
                {
                    category: "Clothing",
                    price: 0
                },
                {
                    category: "Miscellaneus",
                    price: 0
                },

            ]
        })

        const partygroup = await Partygroup.create({
            Id: party.Id,
            location: body.location,
            total: 0,
            date
        })

        return res.send({
            party,
            partygroup
        })

    } catch (error) {
        console.log(error)
    }

})

router.post('/join', authMiddleware, async (req, res) => {

    const body = req.body;

    try {
        const check = await Party.findOne({
            Id: body.Id
        })

        if (!check) {
            return res.send({
                message: "this Party does't exist"
            })
        }

        const check2 = await Party.findOne({
            Id: body.Id,
            userId: req.userId
        })

        console.log(check2)

        if (check2) {
            return res.send({
                message: "You are already part of this Party"
            })
        }

        const party = await Party.create({
            Id: body.Id,
            userId: req.userId,
            balance: 0,
            total: 0,
            expenses: [
                {
                    category: "Food",
                    price: 0
                },
                {
                    category: "Travel",
                    price: 0
                },
                {
                    category: "Hotel",
                    price: 0
                },
                {
                    category: "Enternainment",
                    price: 0
                },
                {
                    category: "Daily care",
                    price: 0
                },
                {
                    category: "Clothing",
                    price: 0
                },
                {
                    category: "Miscellaneus",
                    price: 0
                },

            ]
        })

        return res.send({
            party
        })

    } catch (error) {
        console.log(error)
    }

})


router.get('/settle', authMiddleware, async (req, res) => {

    const Id = req.query.Id;

    const users = await Party.find({
        Id
    })



    async function settleBalances(balances) {
        const payers = [];
        const receivers = [];

        // Separate payers and receivers
        for (const [user, balance] of Object.entries(balances)) {
            if (balance > 0) {
                receivers.push({ user, amount: balance });
            } else if (balance < 0) {
                payers.push({ user, amount: -balance });
            }
        }

        const transactions = [];

        // Match payers with receivers
        while (payers.length > 0 && receivers.length > 0) {
            const payer = payers[0];
            const receiver = receivers[0];

            const settledAmount = Math.min(payer.amount, receiver.amount);

            transactions.push({
                from: payer.user,
                to: receiver.user,
                amount: settledAmount.toFixed(2)
            });

            payer.amount -= settledAmount;
            receiver.amount -= settledAmount;

            if (payer.amount === 0) {
                payers.shift(); // Remove settled payer
            }
            if (receiver.amount === 0) {
                receivers.shift(); // Remove settled receiver
            }
        }

        return transactions;
    }
    const balances = {};

    async function populateBalances(users) {
        await Promise.all(users.map(async (user) => {
            const userInfo = await User.findById(user.userId);
            const username = `${userInfo.firstName} ${userInfo.lastName}`;
            balances[username] = user.balance;
        }));
    }

    await populateBalances(users)
    const transactions = await settleBalances(balances);

    return res.send(transactions)
})

module.exports = router