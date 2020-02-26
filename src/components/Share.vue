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
  width: 151px;
  height: 84px;
  justify-content: center;
  align-items: center;
  background-color: #edffff;
  box-shadow: 0px 3px 6px 0px rgba(37, 211, 207, 0.2);
  border-radius: 12px;
  color: #333;
  font-size: 30px;
  &.large {
    width: 292px;
  }
}
.share-img {
  display: flex;
  width: 42px;
  height: 42px;
  justify-content: center;
  align-items: center;
  background-color: #25d4d0;
  border-radius: 10px;
  margin-right: 6px;
  img {
    width: 28px;
    height: 28px;
  }
}
</style>
