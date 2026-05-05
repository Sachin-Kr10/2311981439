const repo = require('./repository')
const { sendNotification } = require('../socket/socket')
const {addJob} = require("../utils/queue")

exports.create = async (data) => {
  const notification = await repo.create(data)
  sendNotification(data.userId, notification)
  return notification
}

exports.getAll = (userId, query) => {
  return repo.getAll(userId, query)
}
exports.getUnread = (userId, query) => {
  return repo.getUnread(userId, query)
}

exports.markRead = (id) => repo.markRead(id)

exports.markAllRead = (userId) =>
  db.execute('UPDATE users SET last_read_at = NOW() WHERE id = ?', [userId])

exports.remove = (id) => repo.remove(id)

exports.notifyAll = async (users, data) => {
  users.forEach(user => {
    addJob(async () => {
      const notification = await repo.create({
        userId: user.id,
        title: data.title,
        message: data.message
      })

      sendNotification(user.id, notification)
    })
  })
}