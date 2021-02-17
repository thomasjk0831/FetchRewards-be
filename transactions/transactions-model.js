const db = require('../data/connection')

module.exports = {
    findByUserId,
    add,
}

//get all transactions by user id
//select * from transactions
//where user_id = 1
function findByUserId(userId) {
    return db('transactions').where({ user_id: userId })
}

//get a transaction by transaction ID
function findById(id) {
    return db('transactions').where({ id }).first()
}

function add(transaction) {

    return db("transactions").insert(transaction, "id")
        .then(ids => {
            return findById(ids[0])
        })
        .catch(err => {
            return { err: err.message }
        })
}

