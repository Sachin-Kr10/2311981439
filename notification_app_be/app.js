const express = require('express')
const app = express()

app.use(express.json())

const notificationRoutes = require('./modules/notification/notification.routes')
app.use('/api/v1/notifications', notificationRoutes)

module.exports = app