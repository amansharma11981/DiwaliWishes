import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  res => res.data,
  err => {
    const message = err.response?.data?.message || err.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export const aiService = {
  generateWishes: (params) => api.post('/ai/generate-wishes', params),
  checkHealth: () => api.get('/ai/health'),
}

export const wishService = {
  getAll: () => api.get('/wishes'),
  getCategories: () => api.get('/wishes/categories'),
  getFavorites: (sessionId) => api.get(`/wishes/favorites/${sessionId}`),
  addFavorite: (data) => api.post('/wishes/favorite', data),
}

export const cardService = {
  getTemplates: () => api.get('/cards/templates'),
  saveCard: (data) => api.post('/cards/save', data),
  getCard: (id) => api.get(`/cards/${id}`),
}

export default api
