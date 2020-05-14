import axios from 'axios'
import ENV from './_ENV'
import { Toast } from 'vant'
const service = axios.create({
  baseURL: ENV.baseURL,
  timeout: 15000
})

const CancelToken = axios.CancelToken
const source = CancelToken.source()
// 请求配置
service.interceptors.request.use(config => {
  const token = localStorage.getItem('firstToken')
  config.method = 'POST'
  config.headers['Content-Type'] = 'application/json'
  config.cancelToken = source.token
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
      if (response.data.errCode === -1) {
        // 未登录
        localStorage.removeItem('firstToken')
        // 如果登录次数大于 1 次
        if (sessionStorage.getItem('firstLoginCount') >= 2) {
          Toast.fail('登录失败，请退出重新进入')
          sessionStorage.removeItem('firstLoginCount')
          return source.cancel()
        }
        window.location.reload()
      }
      return Promise.reject(response)
    }
  },
  err => {
    if (axios.isCancel(err)) {
      // 取消请求的情况下 中断Promise 调用链
      return new Promise(() => {})
    }
    return Promise.reject(err)
  }
)

export default service
