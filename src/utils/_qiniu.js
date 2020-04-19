import * as qiniu from 'qiniu-js'
import axios from 'axios'
import ENV from './_ENV'

export default function fileUpload(file, success, fail) {
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
      let key = res.data.uploadInfoList[0].key
      let finalUrl = res.data.uploadInfoList[0].finalUrl
      let config = {
        useCdnDomain: true
      }
      let putExtra = {
        fname: '',
        params: {},
        mimeType: null
      }
      let observer = {
        next() {},
        error() {},
        complete() {
          success(finalUrl)
        }
      }
      let observable = qiniu.upload(file, key, token, putExtra, config)
      observable.subscribe(observer)
    })
    .catch(fail)
}
