import request from './_axios.conf'
import wxToolkit from './_wxToolkit'

function fetch(params) {
  const openId = sessionStorage.getItem('openId') || window.OPENID
  if (!openId) {
    return new Promise((resolve, reject) => {
      wxToolkit.getOpenId(data => {
        window.OPENID = data.openId
        sessionStorage.setItem('openId', 'data.openId')
        window.userInfo = { avatar: data.headUrl, nickName: data.nickName }
        request({
          url: params.url || '',
          data: { openId: data.openId, ...params.data }
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
        data: { openId, ...params.data }
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
