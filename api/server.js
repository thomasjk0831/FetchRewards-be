const express = require('express')
const server = express()
const cors = require('cors')

const transactionsRouter = require('../transactions/transactions-router')

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.json({ msg: "api is up" })
})

//routers
server.use('/api/transactions', transactionsRouter)

module.exports = server