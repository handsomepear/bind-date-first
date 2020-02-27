<template>
  <div class="home-page">
    <section class="head">
      <div class="top">
        <div class="area-type" @click="isShowType = true">{{ type }} <van-icon name="arrow-down" /></div>
        <div class="area-type" @click="isShowAreaPanel = true">{{ locationName }}<van-icon name="arrow-down" /></div>
      </div>
      <section class="tab-list">
        <div :class="['tab-item flex-box flex-center', tabIndex === 0 ? 'choosed' : '']" @click="onChooseTab(0)">
          女生
        </div>
        <div :class="['tab-item flex-box flex-center', tabIndex === 1 ? 'choosed' : '']" @click="onChooseTab(1)">
          男生
        </div>
      </section>
    </section>

    <section class="main">
      <!-- 列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <!-- 相亲贴Item -->
        <section class="person-item van-hairline--bottom">
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
              <span class="more" @click="onViewDetail"> 详情>></span>
            </div>
          </div>
          <!-- 照片 -->
          <div class="photos">
            <div class="photo-box">
              <img src="" alt="" />
            </div>
            <div class="photo-box">
              <img src="" alt="" />
            </div>
            <div class="photo-box">
              <img src="" alt="" />
            </div>
            <div class="photo-box">
              <img src="" alt="" />
            </div>
            <div class="photo-box">
              <img src="" alt="" />
            </div>
            <div class="photo-box">
              <img src="" alt="" />
            </div>
          </div>
          <!-- bottom -->
          <div class="item-bottom flex-box flex-between-center">
            <div class="release-time">发布时间：5分钟前</div>
            <div class="contact-way" @click="onViewDetail">查看联系方式>></div>
          </div>
        </section>
        <!-- 相亲贴Item -->
        <section class="person-item van-hairline--bottom">
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
              <span class="more"> 详情>></span>
            </div>
          </div>
          <!-- 照片 -->
          <div class="photos">
            <div class="photo-box">
              <img src="" alt="" />
            </div>
            <div class="photo-box">
              <img src="" alt="" />
            </div>
            <div class="photo-box">
              <img src="" alt="" />
            </div>
            <div class="photo-box">
              <img src="" alt="" />
            </div>
            <div class="photo-box">
              <img src="" alt="" />
            </div>
            <div class="photo-box">
              <img src="" alt="" />
            </div>
          </div>
          <!-- bottom -->
          <div class="item-bottom">
            <div class="release-time">发布时间：5分钟前</div>
            <div class="contact-way">查看联系方式>></div>
          </div>
        </section>
      </van-list>
    </section>
    <section class="bottom-options flex-box flex-between-center">
      <!-- 创建相亲贴 -->
      <div class="create-button flex-box flex-center"><van-icon name="add-o" size="20" />创建相亲贴</div>
      <!-- 我的 -->
      <div class="mine-button flex-box flex-center">我的</div>
      <!-- 分享 -->
      <Share />
    </section>
    <van-action-sheet
      v-model="isShowType"
      :actions="typeOptions"
      @select="onSelectType"
      cancel-text="取消"
      @cancel="isShowType = false"
    />
    <van-popup v-model="isShowAreaPanel" position="bottom">
      <van-area
        :area-list="areaList"
        :title="type + '选择'"
        :value="locationCode"
        columns-num="2"
        @confirm="onChooseArea"
        @cancel="isShowAreaPanel = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from '@vue/composition-api'
import areaList from '@/assets/data/area.js'
import Share from '@/components/Share.vue'
export default {
  components: {
    Share
  },
  setup(props, context) {
    const router = context.root.$router
    const data = reactive({
      // 地域类型
      type: '家乡',
      locationName: '',
      locationCode: '',
      isShowType: false,
      isShowAreaPanel: false,
      tabIndex: 0,
      // 列表相关
      loading: false,
      finished: false,
      postList: [],
      // 地域类型配置
      typeOptions: [
        {
          name: '家乡',
          value: 0
        },
        {
          name: '工作地点',
          value: 1
        }
      ]
    })

    // 类型选择
    const onSelectType = item => {
      data.type = item.name
      data.isShowType = false
    }
    // 地区选择
    const onChooseArea = area => {
      data.locationName = area.reduce((prev, next) => {
        return next ? prev.name + '-' + next.name : prev.name + '-' + prev.name
      })
      data.locationCode = area[1] ? area[1].code : area[0].code
      data.isShowAreaPanel = false
    }
    // Tab选择
    const onChooseTab = index => {
      data.tabIndex = index
    }
    // 列表加载
    const onLoad = () => {
      setTimeout(() => {
        for (let index = 0; index < 30; index++) {
          data.postList.push(index)
        }
        data.loading = false
        if (data.postList.length > 100) {
          data.finished = true
        }
      }, 1000)
    }
    const onViewDetail = () => {
      router.push({ path: '/detail', query: { postId: 1 } })
    }
    // 生命周期
    onMounted(() => {
      onLoad()
    })
    return {
      areaList,
      ...toRefs(data),
      // 事件
      onSelectType,
      onChooseArea,
      onChooseTab,
      onLoad,
      onViewDetail
    }
  }
}
</script>

<style lang="less" src="./home.less" scoped></style>
