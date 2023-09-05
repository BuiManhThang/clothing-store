import axios from 'axios'

const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export default baseApi
