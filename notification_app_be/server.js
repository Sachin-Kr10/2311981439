const express = require('express')
const http = require('http')
const app = express()
const { init } = require('./socket/socket')

app.use(express.json())

const notificationRoutes = require('./notification/routes')
app.use('/api/v1/notifications', notificationRoutes)

const server = http.createServer(app)

init(server)

server.listen(3000, () => {
  console.log('Server running on port 3000')
})