import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://13.50.248.153/api/',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
})
