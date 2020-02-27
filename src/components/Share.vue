<template>
  <!-- 分享 -->
  <div class="share-button">
    <div class="share-img">
      <img src="../assets/imgs/share.png" alt="" />
    </div>
    <span>分享</span>
  </div>
</template>

<script>
export default {
  setup(props) {
    console.log(props)
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
</style>
