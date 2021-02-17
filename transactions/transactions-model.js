const db = require('../data/connection')

module.exports = {
    add,
    findAll,
    spend,
    findPointsBalance
}

//get all transactions 
function findAll() {
    return db('transactions')
}

//update points in the database
//helper function
async function updatePoints(id, updatedPoints) {
    await db('transactions').update({ points: updatedPoints }).where({ id })
}

//pass points as argument. updates the transactions database table with new points.
//returns array with points spent per payer
async function spend(points) {
    try {

        let i = 0
        //using an object to store points spent. This allows for O(n) complexity
        let response = {}
        //create a temp array from transactions table
        let temp = await db('transactions')

        //deal with some edge cases
        //if there are no transactions yet posted
        if (temp.length === 0)
            return "No transactions for user"

        //check if user has enough points to spend. if not send message    
        const pointsTotal = temp.reduce((accumulator, current) => {
            return accumulator + current.points
        }, 0)

        if (pointsTotal < points)
            return `You only have ${pointsTotal} points left to spend`

        //sorting array by oldest date as we need to spend those points first
        temp.sort(function (a, b) {
            return a.timestamp.localeCompare(b.timestamp);
        });

        //keep iterating while points are left to spend
        while (points > 0) {
            //if all the payer's points in the transaction will be spent
            if (points - temp[i].points >= 0) {
                points -= temp[i].points
                if (temp[i].payer in response) {
                    response[temp[i].payer] += temp[i].points
                }
                else {
                    response[temp[i].payer] = temp[i].points
                }
                temp[i].points = 0
            }
            //if there are surplus payer's points in the transaction

            else {
                temp[i].points -= points
                if (temp[i].payer in response) {
                    response[temp[i].payer] += points
                }
                else {
                    response[temp[i].payer] = points
                }
                points = 0
            }
            i++
        }

        //to convert the reponse object into a response array as per requirements
        let arrResponse = []
        for (x in response) {
            if (response[x] !== 0)
                arrResponse.push({ "payer": x, "points": -response[x] })
        }

        //update database with updated points from the sorted temp array
        for (let i = 0; i < temp.length; i++) {
            updatePoints(temp[i].id, temp[i].points)
        }
        return arrResponse
    }
    catch (err) {
        console.log(err)
    }
}

//get all payer point balances
async function findPointsBalance() {
    let response = {}
    let temp = await db('transactions')
    temp.sort(function (a, b) {
        return a.timestamp.localeCompare(b.timestamp);
    });
    for (let i = 0; i < temp.length; i++) {
        if (temp[i].payer in response) {
            response[temp[i].payer] += temp[i].points
        }
        else {
            response[temp[i].payer] = temp[i].points
        }
    }
    return response
}

//get a transaction by transaction ID
//helper function
function findById(id) {
    return db('transactions').where({ id }).first()
}

//add new transaction
function add(transaction) {
    return db("transactions").insert(transaction, "id")
        .then(ids => {
            return findById(ids[0])
        })
        .catch(err => {
            return { err: err.message }
        })
}

