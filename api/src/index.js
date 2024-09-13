require('dotenv').config()

const express = require('express')
const cors = require('cors')

const port = process.env.PORT

const app = express()

app.use(
  cors({
    credentials: true,
    origin: '*',
    // origin: ['http://localhost:3000', 'https://seu-site.com'],
  }),
)

app.use(express.json())

function aplicacao () {
  console.log(`🎉 App rodando na porta ${port}`)
}

app.listen(port, aplicacao())

const router = require('./Router.js')

app.use(router)

require('./config/db.js')
