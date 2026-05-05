const http = require('http')
const app = require('./app')
const { init } = require('./socket/socket')

const server = http.createServer(app)

init(server)

const PORT = 3000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})