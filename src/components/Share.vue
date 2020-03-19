<template>
  <!-- 分享 -->
  <div class="share-com">
    <div :class="['share-button', size]" @click="onShowShareTips">
      <div class="share-img">
        <img src="../assets/imgs/share.png" alt="" />
      </div>
      <span>分享</span>
    </div>
    <div class="share-wrap" v-show="isShowShareTips" @click="onHideShareTips">
      <!-- <van-button @click="onHideShareTips">关闭</van-button> -->
      <!-- <img class="share-tips" src="../assets/imgs/share-tips.png" alt="" /> -->
      <div class="arrow___3Kx7L"></div>
      <div class="hint___M89Cy">点击右上角更多<br />分享给好友或到朋友圈</div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
  props: {
    size: String
  },
  setup(props) {
    const size = props.size || ''
    const isShowShareTips = ref(false)
    const onShowShareTips = () => {
      isShowShareTips.value = true
    }

    const onHideShareTips = () => {
      isShowShareTips.value = false
    }

    return {
      size,
      isShowShareTips,
      onShowShareTips,
      onHideShareTips
    }
  }
}
</script>

<style lang="less" scoped>
.share-button {
  display: flex;
  width: 75.5px;
  height: 42px;
  justify-content: center;
  align-items: center;
  background-color: #edffff;
  box-shadow: 0px 1.5px 3px 0px rgba(37, 211, 207, 0.2);
  border-radius: 6px;
  color: #333;
  font-size: 15px;
  &.large {
    width: 146px;
  }
}
.share-img {
  display: flex;
  width: 21px;
  height: 21px;
  justify-content: center;
  align-items: center;
  background-color: #25d4d0;
  border-radius: 5px;
  margin-right: 3px;
  img {
    width: 14px;
    height: 14px;
  }
}
.share-wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
.arrow___3Kx7L {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 103px;
  height: 111px;
  background: url('../assets/imgs/icon-pilot.png') no-repeat center;
  background-size: cover;
}
.hint___M89Cy {
  position: absolute;
  top: 110px;
  right: 74px;
  color: #fff;
  font-weight: 500;
  font-size: 16px;
}
</style>
