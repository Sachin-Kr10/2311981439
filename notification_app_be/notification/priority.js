function getWeight(type) {
  if (type === 'Placement') return 3
  if (type === 'Result') return 2
  return 1
}

function getTopNotifications(notifications, n = 10) {
  return notifications
    .filter(noti => !noti.is_read)
    .map(noti => ({
      ...noti,
      score: getWeight(noti.type) * 1000000000000 + new Date(noti.created_at).getTime()
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
}

module.exports = { getTopNotifications }