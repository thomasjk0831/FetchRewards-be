const express = require('express')
const server = express()
const cors = require('cors')

//need this to parse json
server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.json({ msg: "api is up" })
})

module.exports = server