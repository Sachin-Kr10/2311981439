const repo = require('./repository')
const { sendNotification } = require('../socket/socket')

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

exports.markAllRead = (userId) => repo.markAllRead(userId)

exports.remove = (id) => repo.remove(id)