import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios'


const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000
})

service.interceptors.request.use((config: AxiosRequestConfig): AxiosRequestConfig => {

  const token = localStorage.getItem('token')
  config.headers['Auth'] = token
  return config
}, (err: AxiosError) => {

  console.log(err)
  return Promise.reject(err)
})


service.interceptors.response.use((res: AxiosResponse): AxiosResponse => {

  return res.data
}, (err: AxiosError) => {

  if (err.response && err.response.status) {
    const status = err.response.status

  }
})

export default service