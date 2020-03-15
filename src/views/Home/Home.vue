<template>
  <div class="home-page">
    <section class="main">
      <!-- 列表 -->
      <van-list
        v-show="tabSex === 2"
        v-model="female.loading"
        :finished="female.finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="getPostList"
      >
        <!-- 相亲贴Item -->
        <section class="person-item van-hairline--bottom" v-for="item in female.postList" :key="item.id">
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
              <span class="more" @click="onViewDetail(item.id)"> 详情>></span>
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
      <van-list
        v-show="tabSex === 1"
        v-model="male.loading"
        :finished="male.finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="getPostList"
      >
        <!-- 相亲贴Item -->
        <section class="person-item van-hairline--bottom" v-for="item in male.postList" :key="item.id">
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
              <span class="more" @click="onViewDetail(item.id)"> 详情>></span>
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
    <!-- head 放到这里解决 share 组件内部 z-index 设置之后无法覆盖掉头部的问题 -->
    <!-- 这是由于head 设置了 z-index 为 1 高于了 Share 组件, 那么在 Share 组件内部的 wrap 也就无法盖住 head 了 -->
    <section class="head">
      <div class="top">
        <div class="area-type" @click="isShowType = true">{{ type }} <van-icon name="arrow-down" /></div>
        <div class="area-type" @click="isShowAreaPanel = true">
          {{ filterLocation(location.name) }}<van-icon name="arrow-down" />
        </div>
      </div>
      <section class="tab-list">
        <div :class="['tab-item flex-box flex-center', tabSex === 2 ? 'choosed' : '']" @click="onChooseTab(2)">
          女生
        </div>
        <div :class="['tab-item flex-box flex-center', tabSex === 1 ? 'choosed' : '']" @click="onChooseTab(1)">
          男生
        </div>
      </section>
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
      location: {
        name: '',
        province: '',
        city: ''
      },
      isShowType: false,
      isShowAreaPanel: false,
      tabSex: 2, // 1：男 2：女
      male: {
        loading: false,
        finished: false,
        nextPage: '',
        postList: []
      },
      female: {
        loading: false,
        finished: false,
        nextPage: '',
        postList: []
      },
      // 列表相关

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
        pageRecord: data.tabSex === 2 ? data.female.nextPage : data.male.nextPage,
        province: data.location.province,
        city: data.location.city,
        sex: data.tabSex
      })
        .then(({ data: resData }) => {
          const sex = data.tabSex === 2 ? 'female' : 'male'
          data[sex].postList = data[sex].postList.concat(resData.list)
          data[sex].nextPage = resData.nextPageRecord // 获取下一页的数据的参数
          data[sex].loading = false
          if (!resData.list || resData.list.length < 5) {
            data[sex].finished = true // 控制列表是否加载完毕
          }
          const shareItem = data[sex].postList[0]
          toolkit.wxShare('onMenuShareTimeline', {
            title: '找一个风俗习惯相同的人终老-本地人相亲', // 分享标题
            link: '//bbs.j.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareItem.imgs[0] // 分享图标
          })
          toolkit.wxShare('onMenuShareAppMessage', {
            title: '找一个风俗习惯相同的人终老-本地人相亲', // 分享标题
            desc: `年龄:${shareItem.age}, 家乡:${shareItem.province}, 职业:${shareItem.occupation}, 工作地点:${shareItem.workProvince}, 择偶标准:${shareItem.standard}`, // 分享描述
            link: '//bbs.j.cn/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareItem.imgs[0]
          })
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err)
        })
    }

    onMounted(() => {
      toolkit.wxConfig()
      toolkit.getLocationFromBidu(position => {
        var address = position.addressComponents
        // streetNumber: "3号"
        // street: "中关村北一条"
        // district: "海淀区"
        // city: "北京市"
        // province: "北京市"
        data.location = {
          name: `${address.province}-${address.city}`,
          province: address.province || '北京',
          city: address.city || '北京'
        }
        getPostList()
      })
    })

    const filterLocation = location => {
      const locationList = ['北京市-北京市', '天津市-天津市', '上海市-上海市', '重庆市-重庆市']
      const index = locationList.indexOf(location)
      return index > -1 ? locationList[index].slice(0, 2) : location
    }

    // 类型选择
    const onSelectType = item => {
      data.type = item.name
      data.isShowType = false
    }
    // 地区选择
    const onChooseArea = area => {
      data.location.name = area.reduce((prev, next) => {
        return next ? prev.name + '-' + next.name : prev.name + '-' + prev.name
      })
      data.locationCode = area[1] ? area[1].code : area[0].code
      data.isShowAreaPanel = false
    }
    // Tab选择
    const onChooseTab = sex => {
      data.tabSex = sex
      if ((sex === 2 && !data.female.postList.length) || (sex === 1 && !data.male.postList.length)) {
        getPostList()
      }
    }
    const onViewDetail = postId => {
      router.push({ path: '/detail/' + postId })
    }
    const toCreatePage = () => {
      router.push({ path: '/create' })
    }
    const toMinPage = () => {
      router.push({ path: '/mine' })
    }
    const onShare = () => {
      data.isShowShareTips = true
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
      toMinPage,
      onShare,
      filterLocation
    }
  }
}
</script>

<style lang="less" src="./home.less" scoped></style>
