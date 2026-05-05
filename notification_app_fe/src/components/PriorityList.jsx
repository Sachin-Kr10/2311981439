function PriorityList({ data }) {
  return (
    <div>
      <h2>Priority Inbox</h2>

      {data.map(n => (
        <div key={n.id} className="card priority">
          <h4>{n.title}</h4>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  )
}

export default PriorityList