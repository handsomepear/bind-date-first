<template>
  <div class="uploader-com">
    <div class="img-preview" v-for="(item, index) in photos" :key="item">
      <div class="img-con">
        <img :src="item + '?imageslim'" alt="" />
      </div>
      <van-icon name="clear" @click.native="deletePhoto(index)" />
    </div>
    <div v-if="photos.length < max" class="upload-btn" @click.stop="upload">
      <van-icon name="photograph" />
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import fileUpload from '../utils/_qiniu'
export default {
  props: {
    getPhotos: Function,
    photos: {
      type: Array,
      default: () => []
    },
    max: {
      type: Number,
      default: 9
    }
  },
  methods: {
    upload() {
      const _this = this
      wx.chooseImage({
        count: this.max - this.photos.length, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          _this.$loading.show()
          var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          localIds.forEach(localId => {
            wx.getLocalImgData({
              localId,
              success(res) {
                var localData = res.localData
                if (localData.indexOf('data:image') != 0) {
                  //判断是否有这样的头部
                  localData = 'data:image/jpeg;base64,' + localData
                }
                localData = localData.replace(/\r|\n/g, '').replace('data:image/jgp', 'data:image/jpeg')
                //第一个替换的是换行符，第二个替换的是图片类型，因为在IOS机上测试时看到它的图片类型时jgp，
                //这不知道时什么格式的图片，为了兼容其他设备就把它转为jpeg
                const fileBlob = _this.dataURLtoBlob(localData)
                fileUpload(
                  fileBlob,
                  function(img) {
                    let photos = _this.photos.slice(0)
                    photos.push(img)
                    _this.$emit('getPhotos', photos)
                    _this.$loading.hide()
                  },
                  function() {
                    _this.$loading.hide()
                    _this.$tast('上传失败,请稍后重试')
                  }
                )
              },
              fail() {
                _this.$loading.hide()
              }
            })
          })
        }
      })
    },
    deletePhoto(index) {
      let photos = this.photos.slice(0)
      photos.splice(index, 1)
      this.$emit('getPhotos', photos)
    },
    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: mime })
    }
  }
}
</script>

<style lang="less" scoped>
.uploader-com {
  display: flex;
  flex-wrap: wrap;
}
.img-preview {
  position: relative;
  margin: 0 8px 8px 0;
  .img-con {
    display: flex;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
  }
  img {
    width: 100%;
  }
  .van-icon {
    position: absolute;
    top: -8px;
    right: -8px;
  }
}
.upload-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin: 0 8px 8px 0;
  border-radius: 8px;
  background-color: #f7f8fa;
  .van-icon {
    color: #dcdee0;
    font-size: 24px;
  }
}
</style>
