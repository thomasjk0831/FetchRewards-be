const router = require("express").Router()

const Transactions = require('./transactions-model')

//get transactions for a user by user_id
router.get('/:id', (req, res) => {
    const userId = req.params.id

    Transactions.findByUserId(userId)
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(err => {
            res.status(400).json({ msg: err })
        })
})

//post transactions for a user by ID by user_id
router.post('/', (req, res) => {
    if (!req.body.payer || !req.body.points || !req.body.user_id) {
        res.json({ msg: "payer, points, and user_id are required fields!" })
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