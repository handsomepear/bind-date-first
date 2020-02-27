<template>
  <div class="detail-page">
    <!-- 照片 -->
    <van-swipe class="photos" @change="onPhotoChange">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
      <div class="custom-indicator" slot="indicator">{{ current + 1 }}/4</div>
    </van-swipe>
    <!-- 相亲贴Item -->
    <section class="person-item">
      <!-- 个人信息 -->
      <div class="info">
        <div>
          <span class="title">木子心</span>
          <span>年龄:28岁 | 哪里人:北京</span>
        </div>
        <div><span>职业:产品经理 | 现居:北京 | 学历:本科</span></div>
      </div>
      <!-- 择偶标准 -->
      <div class="standard">
        <div class="text">
          <span class="title">择偶标准:</span>
          每逢节日总喜欢做一些简单的布置，喜欢复刻一些有趣的菜式，也喜欢在房间里
          每逢节日总喜欢做一些简单的布置，喜欢复刻一些有趣的菜式，也喜欢在房间里
        </div>
      </div>
    </section>
    <section class="page-bottom can-edite" v-if="canEdite">
      <!-- 可编辑 -->
      <div class="option flex-between-center">
        <div class="edite-btn flex-center" @click="onEdite">编辑</div>
        <div class="delete-btn flex-center" @click="onDelete">删除</div>
        <Share class="large" />
      </div>
    </section>
    <!-- 底部 -->
    <section class="page-bottom" v-else>
      <!-- 不可编辑 -->
      <div class="contact-way flex-between-center" v-if="!hasWx">
        <div class="contact-button flex-center" v-clipboard:copy="parentWx" v-clipboard:success="parentCopySuccess">
          <span>家长微信：</span>
          <span>{{ parentWx }}</span>
        </div>
        <div class="contact-button flex-center" v-clipboard:copy="mineWx" v-clipboard:success="mineCopySuccess">
          <span>本人微信：</span>
          <span>{{ mineWx }}</span>
        </div>
      </div>
      <div class="contact-way flex-between-center" v-else>
        <div class="contact-button flex-center" @click="onShowPayModal">家长联系方式</div>
        <div class="contact-button flex-center" @click="onShowPayModal">本人联系方式</div>
      </div>
      <div class="option flex-between-center">
        <!-- 公众号 -->
        <div class="public-code flex-center">
          <img src="../../assets/imgs/hongbao.png" alt="" />
          <span>关注公众号，领10元现金红包</span>
        </div>
        <Share />
      </div>
    </section>
    <div v-if="isShowComplainBtn" class="complain-btn flex-column flex-center" @click="isShowComplainModal = true">
      <img src="../../assets/imgs/tousu.png" alt="" />
      <span>投诉</span>
    </div>
    <div class="home-btn flex-column flex-center" @click="onGoHome">
      <img src="../../assets/imgs/home.png" alt="" />
      <span>首页</span>
    </div>
    <!-- 支付弹窗 -->
    <van-overlay :show="isShowPayModal">
      <div class="pay-wrap flex-start-center flex-column" @click="isShowPayModal = false">
        <div class="pay-modal" @click.stop>
          <div class="content">联系方式需10元购买</div>
          <div class="price">¥10</div>
          <div class="pay-btn flex-center" @click="onPay">立即支付</div>
          <div class="tips">注：比起给媒婆发的红包，划算多了。</div>
          <div class="close-btn" @click="isShowPayModal = false">
            <van-icon name="cross" color="#C0C0C0" />
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- 投诉弹窗 -->
    <van-overlay :show="isShowComplainModal">
      <div class="complain-wrap flex-center" @click="isShowComplainModal = false">
        <div class="complain-modal" @click.stop>
          <div class="title">投诉</div>
          <div class="complain-form">
            <h2>投诉原因</h2>
            <!-- <van-field type="textarea" placeholder="请输入..." class="reason" /> -->
            <div class="text-con">
              <textarea placeholder="请输入..."></textarea>
            </div>
            <h2>电话号码</h2>
            <div class="tel-con">
              <input type="text" />
            </div>
            <div class="tips">注：请保持电话畅通，工作人员会尽快联系您。</div>
            <div class="submit-btn flex-center">提交</div>
          </div>
          <div class="close-btn" @click="isShowComplainModal = false">
            <van-icon name="cross" color="#C0C0C0" />
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Share from '@/components/Share.vue'
export default {
  components: {
    Share
  },
  setup(props, context) {
    const router = context.root.$router // 路由实例
    const route = context.root.$route // 拿参数信息
    const Toast = context.root.$toast
    const Dialog = context.root.$dialog
    console.log(route.query)
    const data = reactive({
      current: 0,
      isShowPayModal: false, // 是否展示支付弹窗
      isShowComplainModal: false, // 是否展示投诉弹窗
      isShowComplainBtn: false, // 是否展示投诉按钮
      hasWx: false,
      parentWx: 'ZPS0326',
      mineWx: 'ZPS0000',
      canEdite: true
    })
    const onPhotoChange = index => {
      data.current = index
    }
    const onGoHome = () => {
      router.replace({ path: '/' })
    }

    const onShowPayModal = () => {
      if (!data.hasWx) {
        data.isShowPayModal = true
      }
    }
    const onPay = () => {
      // 支付
    }

    const parentCopySuccess = () => {
      // console.log('复制成国内:' + e.text)
      Toast('家长微信复制成功')
    }
    const mineCopySuccess = () => {
      Toast('本人微信复制成功')
    }

    // 编辑帖子
    const onEdite = () => {
      console.log(data)
      const formData = JSON.stringify(data)
      // if(formData.postId !== postId) {

      // }
      router.push({ name: 'Create', params: { formData } })
    }

    // 删除帖子
    const onDelete = () => {
      Dialog.confirm({
        message: '确定要删除该相亲帖吗？',
        cancel: () => {}
      })
        .then(() => {
          console.log('确认删除')
        })
        .catch(() => {
          console.log('取消')
        })
    }
    return {
      ...toRefs(data),
      onPhotoChange,
      onGoHome,
      onShowPayModal,
      onPay,
      parentCopySuccess,
      mineCopySuccess,
      onDelete,
      onEdite
    }
  }
}
</script>

<style lang="less" src="./Detail.less" scoped></style>
