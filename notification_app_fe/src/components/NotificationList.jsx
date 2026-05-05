function NotificationList({ data }) {
  return (
    <div>
      <h2>All Notifications</h2>
      {data.map(n => (
        <div key={n.id} className="card">
          <h4>{n.title}</h4>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  )
}

export default NotificationList