const db = require('../config/db')

exports.create = async (data) => {
  const [result] = await db.execute(
    'INSERT INTO notifications (user_id, title, message, metadata) VALUES (?, ?, ?, ?)',
    [data.userId, data.title, data.message, JSON.stringify(data.metadata || {})]
  )
  return { id: result.insertId, ...data }
}

exports.getAll = async (userId, query = {}) => {
  const limit = parseInt(query.limit) || 20
  const page = parseInt(query.page) || 1
  const offset = (page - 1) * limit

  const [rows] = await db.execute(
    `SELECT id, title, message, created_at
     FROM notifications
     WHERE user_id = ?
     ORDER BY created_at DESC
     LIMIT ${limit} OFFSET ${offset}`,   // ✅ FIXED
    [Number(userId)]
  )

  return rows
}

exports.getUnread = async (userId, query = {}) => {
  const limit = parseInt(query.limit) || 20
  const page = parseInt(query.page) || 1
  const offset = (page - 1) * limit

  const [rows] = await db.execute(
    `SELECT id, title, message, created_at
     FROM notifications
     WHERE user_id = ? AND is_read = FALSE
     ORDER BY created_at DESC
     LIMIT ${limit} OFFSET ${offset}`,  
    [Number(userId)]
  )

  return rows
}

exports.markRead = (id) =>
  db.execute('UPDATE notifications SET is_read = TRUE WHERE id = ?', [id])

exports.markAllRead = (userId) =>
  db.execute('UPDATE notifications SET is_read = TRUE WHERE user_id = ?', [userId])

exports.remove = (id) =>
  db.execute('DELETE FROM notifications WHERE id = ?', [id])