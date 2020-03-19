// import * as qiniu from 'qiniu-js'
import axios from 'axios'
import ENV from './_ENV'
export default function fileUpload(file, cb) {
  axios({
    method: 'post',
    url: ENV.baseURL + '/getUploadInfo',
    data: {
      keys: '',
      mimeType: 'image',
      suffixes: 'jpg'
    }
  })
    .then(res => {
      let token = res.data.uploadInfoList[0].token
      let host = res.data.uploadInfoList[0].host
      var pic = file
      var url = 'http://up-z1.qiniup.com/putb64/-1' //非华东空间需要根据注意事项 1 修改上传域名
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          // document.getElementById('myDiv').innerHTML = xhr.responseText
          const res = JSON.parse(xhr.responseText)
          cb(host + res.key)
        }
      }
      xhr.open('POST', url, true)
      xhr.setRequestHeader('Content-Type', 'application/octet-stream')
      xhr.setRequestHeader('Authorization', 'UpToken ' + token)
      xhr.send(pic)
    })
    .catch(() => {})
}
