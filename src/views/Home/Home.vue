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
        @load="getPostList"
      >
        <!-- 相亲贴Item -->
        <section class="person-item van-hairline--bottom" v-for="item in postList" :key="item.id">
          <!-- 个人信息 -->
          <div class="info">
            <div>
              <span class="title">{{ item.name }}</span>
              <span>年龄:{{ item.age }}岁 | 哪里人:{{ item.province }}-{{ item.city }}</span>
            </div>
            <div>
              <span>
                职业:{{ item.occupation }} | 现居:{{ item.workProvince }}-{{ item.workCity }} | 学历:
                {{ item.educational }}
              </span>
            </div>
          </div>
          <!-- 择偶标准 -->
          <div class="standard">
            <div class="text">
              <span class="title">择偶标准:</span>
              {{ item.standard }}
              <span class="more" @click="onViewDetail(item.i)"> 详情>></span>
            </div>
          </div>
          <!-- 照片 -->
          <div class="photos">
            <div class="photo-box" v-for="(photoItem, photoIndex) in item.imgs.slice(0, 6)" :key="photoIndex">
              <img :src="photoItem" alt="" />
            </div>
          </div>
          <!-- bottom -->
          <div class="item-bottom flex-box flex-between-center">
            <div class="release-time">发布时间：{{ item.publishTime }}</div>
            <div class="contact-way" @click="onViewDetail(item.id)">查看联系方式>></div>
          </div>
        </section>
      </van-list>
    </section>
    <section class="bottom-options flex-box flex-between-center">
      <!-- 创建相亲贴 -->
      <div class="create-button flex-box flex-center" @click="toCreatePage">
        <van-icon name="add-o" size="20" />创建相亲贴
      </div>
      <!-- 我的 -->
      <div class="mine-button flex-box flex-center" @click="toMinPage">我的</div>
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
import { getPostListApi } from '../../api/api'
import toolkit from '../../utils/_toolkit'
export default {
  components: {
    Share
  },
  setup(props, context) {
    const router = context.root.$router
    const data = reactive({
      // 地域类型
      type: '家乡',
      locationName: '天津-天津',
      locationCode: '',
      isShowType: false,
      isShowAreaPanel: false,
      tabIndex: 0,
      // 列表相关
      loading: false,
      finished: false,
      nextPage: '',
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

    const getPostList = () => {
      // console.log('load')
      data.loading = true
      getPostListApi({
        pageSize: 5,
        pageRecord: data.nextPage
      })
        .then(({ data: resData }) => {
          data.postList = data.postList.concat(resData.list)
          data.nextPage = resData.nextPageRecord // 获取下一页的数据的参数
          data.loading = false
          // if (!resData.list || !resData.list.length) {
          //   data.finished = true
          // }
          if (data.postList.length > 20) {
            data.finished = true // 控制列表是否加载完毕
          }
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }

    onMounted(() => {
      getPostList()
      toolkit.getLocationFromBidu(position => {
        var address = position.addressComponents
        // streetNumber: "3号"
        // street: "中关村北一条"
        // district: "海淀区"
        // city: "北京市"
        // province: "北京市"
        data.locationName = `${address.province}-${address.city}`
      })
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
    const onViewDetail = postId => {
      router.push({ path: '/detail', query: { postId } })
    }
    const toCreatePage = () => {
      router.push({ path: '/create' })
    }
    const toMinPage = () => {
      router.push({ path: '/mine' })
    }
    return {
      areaList,
      ...toRefs(data),
      // 事件
      onSelectType,
      onChooseArea,
      onChooseTab,
      getPostList,
      onViewDetail,
      toCreatePage,
      toMinPage
    }
  }
}
</script>

<style lang="less" src="./home.less" scoped></style>
