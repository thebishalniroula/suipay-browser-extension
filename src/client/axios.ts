import axios from 'axios'
import { baseApi } from '../const/api'

export const axiosInstance = axios.create({
  baseURL: `https://${baseApi}/api/`,
  timeout: 10000,
  withCredentials: true,
})
