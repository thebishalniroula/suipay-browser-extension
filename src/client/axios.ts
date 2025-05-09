import axios from 'axios'
import { baseApi } from '../const/api'

export const axiosInstance = axios.create({
  baseURL: `http://${baseApi}/api/`,
  timeout: 10000,
})
