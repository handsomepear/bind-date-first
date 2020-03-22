<template>
  <div class="mine-page">
    <Title name="地区筛选" color="#333" />
    <section class="mine-info flex-start-center">
      <div class="avatar">
        <img :src="userInfo.headUrl" alt="" />
      </div>
      <div class="nickname">{{ userInfo.nickName }}</div>
    </section>
    <section class="created">
      <h2>我创建的</h2>
      <div class="item-con " v-for="(item, index) in mineList" :key="item.id" @click="toDetailPage(item.id)">
        <div :class="['person-item', 'flex-between-center', index == 0 ? 'van-hairline--bottom' : 0]">
          <div class="info">
            <div>
              <span class="title">{{ item.name }}</span>
              <span>年龄:{{ item.age }}岁 | 哪里人:{{ item.province }}</span>
            </div>
            <div>
              <span>职业:{{ item.occupation }} | 现居:{{ item.workProvince }} | 学历:{{ item.educational }}</span>
            </div>
          </div>
          <van-icon name="arrow" size="17" />
        </div>
      </div>
    </section>
    <section class="buyed">
      <h2>我购买的</h2>
      <div class="item-con " v-for="(item, index) in buyList" :key="item.id" @click="toDetailPage(item.id)">
        <div :class="['person-item', 'flex-between-center', index == 0 ? 'van-hairline--bottom' : 0]">
          <div class="info">
            <div>
              <span class="title">{{ item.name }}</span>
              <span>年龄:{{ item.age }}岁 | 哪里人:{{ item.province }}</span>
            </div>
            <div>
              <span>职业:{{ item.occupation }} | 现居:{{ item.workProvince }} | 学历:{{ item.educational }}</span>
            </div>
          </div>
          <van-icon name="arrow" size="17" />
        </div>
      </div>
    </section>
    <div class="contact flex-center">
      <div class="contact-btn flex-center" v-clipboard:copy="contactWx" v-clipboard:success="mineCopySuccess">
        <img src="../../assets/imgs/wechat.png" alt="" />
        <span>客服微信：{{ contactWx }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from '@vue/composition-api'
import Title from '@/components/Title'
import { getHomepageInfoApi } from '../../api/api'
export default {
  components: {
    Title
  },
  setup(props, context) {
    const router = context.root.$router
    const Toast = context.root.$toast
    const data = reactive({
      mineList: [],
      buyList: [],
      userInfo: {},
      contactWx: 'jd98998'
    })

    onMounted(() => {
      getHomepageInfoApi().then(({ data: resData }) => {
        data.mineList = resData.mineList
        data.buyList = resData.buyList
        data.userInfo = resData.info
      })
    })

    const toDetailPage = postId => {
      router.push({ path: '/detail/' + postId })
    }

    const mineCopySuccess = () => {
      Toast('客服微信复制成功')
    }

    return {
      ...toRefs(data),
      toDetailPage,
      mineCopySuccess
    }
  }
}
</script>

<style lang="less" src="./mine.less" scoped></style>
