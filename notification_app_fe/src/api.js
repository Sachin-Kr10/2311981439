import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
})

export const getNotifications = () => API.get('/notifications')
export const getPriority = () => API.get('/notifications/priority')