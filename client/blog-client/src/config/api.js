import axios from 'axios'

// Create an axios instance
export default axios.create({
  baseURL: 'http://localhost:3009',
  timeout: 2000,
  withCredentials: true
})