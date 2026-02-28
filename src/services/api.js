// Add this file to: travel-with-antima/src/services/api.js
// Then update your pages to fetch from the API instead of static data files

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

export const fetchPackages = (params = {}) =>
  api.get('/packages', { params }).then(r => r.data.data)

export const fetchPackageBySlug = (slug) =>
  api.get(`/packages/${slug}`).then(r => r.data.data)

export const fetchGallery = (params = {}) =>
  api.get('/gallery', { params }).then(r => r.data.data)

export const fetchTestimonials = (params = {}) =>
  api.get('/testimonials', { params }).then(r => r.data.data)

export const submitEnquiry = (data) =>
  api.post('/enquiries', data).then(r => r.data)

export default api
