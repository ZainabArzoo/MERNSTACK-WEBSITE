const express = require('express')
const app = express()
require('dotenv').config()
var cors = require('cors')
const path = require('path')


const clientpath = path.join(__dirname, './client/dist')
app.use('/', express.static(clientpath))

const port = process.env.SERVER_PORT


app.use(express.json())
app.use(cors())
app.use('/api', require('./api/users/router'))
app.use('/api', require('./api/products/router'))
app.use('/api', require('./api/brands/router'))
app.use('/api', require('./api/categories/router'))
app.use('/api', require('./api/orders/router'))


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
