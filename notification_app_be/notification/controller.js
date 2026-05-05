const service = require('./notification.service')

exports.create = async (req, res) => {
  const data = await service.create(req.body)
  res.json(data)
}

exports.getAll = async (req, res) => {
  const data = await service.getAll(req.user.id, req.query)
  res.json(data)
}

exports.markRead = async (req, res) => {
  await service.markRead(req.params.id)
  res.json({ message: 'read' })
}

exports.markAllRead = async (req, res) => {
  await service.markAllRead(req.user.id)
  res.json({ message: 'all read' })
}

exports.remove = async (req, res) => {
  await service.remove(req.params.id)
  res.json({ message: 'deleted' })
}

exports.getUnread = async (req, res) => {
  const data = await service.getUnread(req.user.id, req.query)
  res.json(data)
}

exports.notifyAll = async (req, res) => {
  const users = req.body.users

  await service.notifyAll(users, req.body)

  res.json({ message: 'Notifications queued' })
}