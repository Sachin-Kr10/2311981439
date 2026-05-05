import { markRead, deleteNotification } from '../api'

function NotificationList({ data, refresh }) {
  return (
    <div>
      <h2>All Notifications</h2>

      {data.map(n => (
        <div key={n.id} className="card">
          <h4>{n.title}</h4>
          <p>{n.message}</p>

          <button onClick={async () => {
            await markRead(n.id)
            refresh()
          }}>
            Mark Read
          </button>

          <button onClick={async () => {
            await deleteNotification(n.id)
            refresh()
          }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotificationList