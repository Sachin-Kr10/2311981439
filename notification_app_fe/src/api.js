import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1'
})

export const getNotifications = (params) =>
  API.get('/notifications', { params })

export const getPriority = () =>
  API.get('/notifications/priority')

export const markRead = (id) =>
  API.patch(`/notifications/${id}/read`)

export const deleteNotification = (id) =>
  API.delete(`/notifications/${id}`)

export const createNotification = (data) =>
  API.post('/notifications', data)