import axios from 'axios'

const API = axios.create({
  baseURL: '/api/auth'
})

export const login = (email, password) => API.post('/login', { email, password })

export const register = (name, email, password) =>
  API.post('/register', { name, email, password })

export const forgotPassword = (email) => API.post('/forgot-password', { email })
