import { useEffect, useState } from 'react'
import { socket } from './socket'
import {
  getNotifications,
  getPriority,
  createNotification
} from './api'
import NotificationList from './components/NotificationList'
import PriorityList from './components/PriorityList'
import Controls from './components/Control'
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
    const res = await getNotifications({ limit: 20, page: 1 })
    const pri = await getPriority()

    setNotifications(res.data)
    setPriority(pri.data)
  }

  const handleCreate = async () => {
    await createNotification({
      userId: 1,
      title: 'New Notification',
      message: 'Frontend created',
      type: 'Event'
    })
    loadData()
  }

  return (
    <div className="container">
      <h1>Notification System</h1>

      <Controls onCreate={handleCreate} />

      <PriorityList data={priority} />

      <NotificationList
        data={notifications}
        refresh={loadData}
      />
    </div>
  )
}

export default App