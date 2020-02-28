<template>
  <div class="mine-page">
    <section class="mine-info flex-start-center">
      <div class="avatar"></div>
      <div class="nickname">Zps</div>
    </section>
    <section class="created">
      <h2>我创建的</h2>
      <div class="item-con " v-for="(item, index) in list" :key="item">
        <div :class="['person-item', 'flex-between-center', index == 0 ? 'van-hairline--bottom' : 0]">
          <div class="info">
            <div>
              <span class="title">木子心</span>
              <span>年龄:28岁 | 哪里人:北京</span>
            </div>
            <div><span>职业:产品经理 | 现居:北京 | 学历:本科</span></div>
          </div>
          <van-icon name="arrow" size="17" />
        </div>
      </div>
    </section>
    <section class="buyed">
      <h2>我购买的</h2>

      <div class="item-con " v-for="(item, index) in list" :key="item">
        <div :class="['person-item', 'flex-between-center', index == 0 ? 'van-hairline--bottom' : 0]">
          <div class="info">
            <div>
              <span class="title">木子心</span>
              <span>年龄:28岁 | 哪里人:北京</span>
            </div>
            <div><span>职业:产品经理 | 现居:北京 | 学历:本科</span></div>
          </div>
          <van-icon name="arrow" size="17" />
        </div>
      </div>
    </section>
    <div class="contact flex-center">
      <div class="contact-btn flex-center">
        <img src="../../assets/imgs/wechat.png" alt="" />
        <span>客服微信：jd98998</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
export default {
  setup() {
    const data = reactive({
      list: [0, 1]
    })

    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" src="./mine.less" scoped></style>
