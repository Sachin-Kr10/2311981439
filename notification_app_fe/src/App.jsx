import { useEffect, useState } from 'react'
import { getNotifications, getPriority } from './api'
import { socket } from './socket'
import NotificationList from './components/NotificationList'
import PriorityList from './components/PriorityList'
import './App.css'

function App() {
  const [notifications, setNotifications] = useState([])
  const [priority, setPriority] = useState([])

  useEffect(() => {
    loadData()

    socket.emit('register', 1)

    socket.on('notification', (data) => {
      setNotifications(prev => [data, ...prev])
    })
  }, [])

  const loadData = async () => {
    const res = await getNotifications()
    const pri = await getPriority()

    setNotifications(res.data)
    setPriority(pri.data)
  }

  return (
    <div className="container">
      <h1>Notifications</h1>

      <PriorityList data={priority} />

      <NotificationList data={notifications} />
    </div>
  )
}

export default App