const express = require('express');
const { authMiddleware } = require('../middleware');
const { Party, User } = require('../db');

const router = express.Router();


router.get('/', authMiddleware, async (req, res) => {

    try {

        const party = await Party.findOne({
            userId: req.userId
        })

        return res.send({
            party
        })


    } catch (error) {
        console.log(error)
    }

})

router.put('/add', authMiddleware, async (req, res) => {
    const amount = req.body.amount
    const Id = req.body.Id

    try {
        await Party.updateOne({
            Id,
            userId: req.userId
        }, {
            $inc: { balance: amount },
            $inc: { total: amount }
        })

        return res.send({
            message: "done"
        })
    } catch (error) {
        console.log("error")
    }

})


router.put('/split', authMiddleware, async (req, res) => {

    const amount = req.body.amount
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
    
        await Party.updateOne({
            Id,
            userId: req.userId
        }, {
            $inc: { balance: amount , total : amount }
        })
    
        const count = await Party.countDocuments({
            Id
        })

        const user = await Party.updateMany({
            Id
        }, {
            $inc: {
                balance: -(amount/count).toFixed(2)
            }
        })
    
        return res.send({
            user
        })
    } catch (error) {
        console.log(error)
    }

})

router.post('/create', authMiddleware, async (req, res) => {

    try {
        const party = await Party.create({
            Id: Math.random().toString(36).substring(2, 8),
            userId: req.userId,
            balance: 0,
            total: 0
        })

        return res.send({
            party
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
        
        if (!check2) {
            return res.send({
                message: "You are already part of this Party"
            })
        }

        const party = await Party.create({
            Id: body.Id,
            userId: req.userId,
            balance: 0,
            total:0
        })

        return res.send({
            party
        })

    } catch (error) {
        console.log(error)
    }

})


router.get('/settle' , authMiddleware ,async (req , res )=>{

    const Id = req.query.Id ;

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
                payers.push({ user, amount: -balance }); // Store as positive value
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
    console.log(transactions);
    
    return res.send({transactions})
})

module.exports = router