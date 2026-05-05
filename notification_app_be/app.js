const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const notificationRoutes = require('./notification/routes')
app.use('/api/v1/notifications', notificationRoutes)

app.get('/', (req, res) => {
  res.send('Notification API running')
})

module.exports = app