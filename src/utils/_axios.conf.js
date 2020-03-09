import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 15000
})

// 请求配置
service.interceptors.request.use(config => {
  config.method = 'POST'
  const token = localStorage.getItem('token')
  if (token) {
    config.data = {
      token,
      ...config.data
    }
  }
  return config
})

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      if (response.data.errCode === 0) {
        return Promise.resolve(response)
      }
      return Promise.reject(response)
    }
  },
  err => {
    return Promise.reject(err)
  }
)

export default service
