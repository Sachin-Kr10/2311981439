const http = require('http')
const app = require('./app')
const { init } = require('./sockets/socket')

const server = http.createServer(app)

init(server)

server.listen(3000)