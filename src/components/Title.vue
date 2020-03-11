<template>
  <div class="title-nav flex-center" @click="back" :style="{ color: color || '#fff' }">
    <van-icon name="arrow-left" size="18" style="margin-right:5px" />{{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    color: String
  },
  methods: {
    back() {
      if (window.history.length > 1) {
        this.$router.go(-1)
      } else if (this.$route.name !== 'Home') {
        this.$router.replace({ path: '/' })
      }
    }
  }
}
</script>

<style scoped>
.title-nav {
  position: fixed;
  top: 17px;
  left: 15px;
  line-height: 1;
  z-index: 10;
  font-size: 15px;
}
</style>
