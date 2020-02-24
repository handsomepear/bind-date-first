<template>
  <div class="home-page">
    <section class="head">
      <div class="area-type" @click="isShowType = true">{{ type }} <van-icon name="arrow-down" /></div>
      <div class="area-type" @click="isShowAreaPanel = true">{{ locationName }}<van-icon name="arrow-down" /></div>
    </section>
    <section class="main">
      <section class="tab-list">
        <div :class="['tab-item', tabIndex === 0 ? 'choosed' : '']" @click="onChooseTab(0)">女生</div>
        <div :class="['tab-item', tabIndex === 1 ? 'choosed' : '']" @click="onChooseTab(1)">男生</div>
      </section>
    </section>
    <van-action-sheet
      v-model="isShowType"
      :actions="typeOptions"
      @select="onSelectType"
      cancel-text="取消"
      @cancel="isShowType = false"
    />
    <section class="area-con" v-if="isShowAreaPanel">
      <van-area
        :area-list="areaList"
        :title="type + '选择'"
        :value="locationCode"
        columns-num="2"
        @confirm="onChooseArea"
        @cancel="isShowAreaPanel = false"
      />
    </section>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import areaList from '@/assets/data/area.js'
export default {
  setup() {
    // 地域类型
    const type = ref('家乡')
    const locationName = ref('')
    const locationCode = ref('')
    const isShowType = ref(false)
    const isShowAreaPanel = ref(false)
    const tabIndex = ref(0)
    // 地域类型配置
    const typeOptions = ref([
      {
        name: '家乡',
        value: 0
      },
      {
        name: '工作地点',
        value: 1
      }
    ])
    const onSelectType = item => {
      type.value = item.name
      isShowType.value = false
    }
    const onChooseArea = area => {
      locationName.value = area.reduce((prev, next) => {
        return next ? prev.name + '-' + next.name : prev.name + '-' + prev.name
      })
      locationCode.value = area[1] ? area[1].code : area[0].code
      isShowAreaPanel.value = false
    }
    const onChooseTab = index => {
      tabIndex.value = index
    }
    return {
      // 数据
      type,
      locationName,
      locationCode,
      typeOptions,
      isShowType,
      isShowAreaPanel,
      areaList,
      tabIndex,
      // 事件
      onSelectType,
      onChooseArea,
      onChooseTab
    }
  }
}
</script>

<style lang="less" src="./home.less" scoped></style>
