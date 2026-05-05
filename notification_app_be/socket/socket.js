let io
const users = {}

function init(server) {
  io = require('socket.io')(server, {
    cors: { origin: '*' }
  })

  io.on('connection', (socket) => {
    socket.on('register', (userId) => {
      users[userId] = socket.id
    })
  })
}

function sendNotification(userId, data) {
  const socketId = users[userId]
  if (socketId) {
    io.to(socketId).emit('notification', data)
  }
}

module.exports = { init, sendNotification }