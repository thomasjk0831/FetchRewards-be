const router = require("express").Router()

const Transactions = require('./transactions-model')

//get all transactions
router.get('/', (req, res) => {

    Transactions.findAll()
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})

//get all payer points-balance
router.get('/points-balance', (req, res) => {
    Transactions.findPointsBalance()
        .then(balance => {
            res.status(200).json(balance)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})

//spend user's points starting with the oldest date
router.put('/spend', (req, res) => {
    if (!req.body.points) {
        res.json({ msg: "points is a required filed" })
    }
    Transactions.spend(req.body.points)
        .then(s => {
            res.status(200).json(s)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})

//post transactions
//payer, points and user_id are required
router.post('/', (req, res) => {
    if (!req.body.payer || !req.body.points) {
        res.json({ msg: "payer, and points are required fields!" })
    }
    else {
        req.body.timestamp = new Date().toJSON()
        Transactions.add(req.body)
            .then(transaction => {
                res.status(200).json(transaction)
            })
            .catch(err => {
                res.status(400).json({ msg: "error adding transaction to server" })
            })
    }
})



module.exports = router