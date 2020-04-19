import request from './_axios.conf'
import toolkit from './_toolkit'

function fetch(params) {
  const token = sessionStorage.getItem('token') || window._TOKEN
  if (!token) {
    return new Promise((resolve, reject) => {
      toolkit.login(data => {
        window._TOKEN = data.token
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('userInfo', JSON.stringify(data.user))
        request({
          url: params.url || '',
          data: { ...params.data }
        })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      request({
        url: params.url || '',
        data: { ...params.data }
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default fetch
