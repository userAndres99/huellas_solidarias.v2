import apiClient from './client'

export const csrf = () => apiClient.get('/sanctum/csrf-cookie')

export const register = async (payload) => {
  await csrf()
  return apiClient.post('/api/register', payload)
}

export const login = async (payload) => {
  await csrf()
  return apiClient.post('/api/login', payload)
}

export const me = () => apiClient.get('/api/user')

export const logout = () => apiClient.post('/api/logout')