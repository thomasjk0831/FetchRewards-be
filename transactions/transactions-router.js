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