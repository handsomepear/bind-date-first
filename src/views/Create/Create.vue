<template>
  <div class="create-page">
    <h2 class="title">创建相亲贴</h2>
    <van-form @submit="onSubmit">
      <van-field v-model="name" name="name" label="姓名:" placeholder="请输入" input-align="right" />
      <van-field
        v-model="birthday"
        name="birthday"
        label="生日:"
        placeholder="请选择"
        input-align="right"
        right-icon="arrow"
        clickable
        readonly
        @click="isShowBirthDayPicker = true"
      />
      <van-field
        v-model="sex.name"
        name="sex"
        label="性别:"
        placeholder="请选择"
        input-align="right"
        right-icon="arrow"
        clickable
        readonly
        @click="isShowSexSheet = true"
      />
      <van-field
        v-model="homeTown.name"
        name="homeTown"
        label="家乡:"
        placeholder="请选择"
        input-align="right"
        right-icon="arrow"
        clickable
        readonly
        @click="isShowHomePicker = true"
      />
      <van-field v-model="job" name="job" label="职业:" placeholder="请输入" input-align="right" />
      <van-field
        v-model="education"
        name="education"
        label="学历:"
        placeholder="请选择"
        input-align="right"
        right-icon="arrow"
        clickable
        readonly
        @click="isShowEducationPicker = true"
      />
      <van-field
        v-model="workplace.name"
        name="workplace"
        label="工作地点:"
        placeholder="请选择"
        input-align="right"
        right-icon="arrow"
        clickable
        readonly
        @click="isShowWorkplacePicker = true"
      />
      <van-field v-model="mineWx" name="mineWx" label="本人微信号:" placeholder="请输入" input-align="right" />
      <van-field v-model="parentWx" name="parentWx" label="家长微信号:" placeholder="请输入" input-align="right" />
      <section class="upload-con">
        <div class="label">图片：</div>
        <van-field name="uploader">
          <template #input>
            <van-uploader multiple :max-count="9" v-model="photos" :before-read="onBeforerUpload" />
          </template>
        </van-field>
        <div class="tips">最多9张，只支持jpg格式</div>
      </section>
      <section class="standard">
        <div class="label">择偶标准：</div>
        <van-field
          v-model="standard"
          name="standard"
          type="textarea"
          rows="3"
          maxlength="2000"
          placeholder="说说你的要求吧~"
          autosize
          show-word-limit
        />
      </section>
      <div class="publish-con flex-center">
        <button class="publish-btn flex-center" type="submit">发布</button>
      </div>
    </van-form>

    <!-- 性别选择 -->
    <van-action-sheet v-model="isShowSexSheet" :actions="sexOptions" @select="onSelectSex" />
    <!-- 生日选择 -->
    <van-popup v-model="isShowBirthDayPicker" position="bottom">
      <van-datetime-picker
        type="year-month"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onSelectBirthDay"
        @cancel="isShowBirthDayPicker = false"
      />
    </van-popup>
    <!-- 家乡选择 -->
    <van-popup v-model="isShowHomePicker" position="bottom">
      <van-area :area-list="areaList" columns-num="2" @confirm="onSelectHome" @cancel="showArea = false" />
    </van-popup>
    <!-- 工作地点选择 -->
    <van-popup v-model="isShowWorkplacePicker" position="bottom">
      <van-area :area-list="areaList" columns-num="2" @confirm="onSelectWorkplace" @cancel="showArea = false" />
    </van-popup>
    <!-- 学历选择 -->
    <van-popup v-model="isShowEducationPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="educationList"
        @cancel="isShowEducationPicker = false"
        @confirm="onSelectEducation"
      />
    </van-popup>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeUnmount } from '@vue/composition-api'
import areaList from '../../assets/data/area'
export default {
  setup(props, context) {
    const router = context.root.$router
    const route = context.root.$route
    const Toast = context.root.$toast
    console.log(router)
    console.log(route.params)
    const data = reactive({
      standard: '', // 择偶标准
      sexOptions: [
        {
          name: '男',
          value: 0
        },
        {
          name: '女',
          value: 1
        }
      ],
      educationList: ['高中', '专科', '本科', '研究生', '博士'],
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(2020, 11, 1),
      name: '',
      sex: {},
      birthday: '',
      homeTown: {}, // 家乡
      job: '', // 工作
      education: '', // 学历
      workplace: {}, // 工作地点
      mineWx: '',
      parentWx: '',
      photos: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
      isShowSexSheet: false,
      isShowBirthDayPicker: false,
      isShowHomePicker: false,
      isShowWorkplacePicker: false,
      isShowEducationPicker: false
    })

    // 生命周期
    onMounted(() => {
      const formData = route.params.formData ? JSON.parse(route.params.formData) : null
      console.log(formData)
    })

    onBeforeUnmount(() => {})

    const onSelectSex = sex => {
      console.log(sex)
      data.sex = sex
      data.isShowSexSheet = false
    }

    const onSelectBirthDay = date => {
      data.birthday = date.getFullYear() + '/' + (date.getMonth() + 1)
      data.isShowBirthDayPicker = false
    }

    const onSelectHome = home => {
      data.homeTown = {
        name: home.map(item => item.name).join('-'),
        code: home[home.length - 1].code
      }
      data.isShowHomePicker = false
    }

    const onSelectWorkplace = workplace => {
      data.workplace = {
        name: workplace.map(item => item.name).join('-'),
        code: workplace[workplace.length - 1].code
      }
      data.isShowWorkplacePicker = false
    }
    const onSelectEducation = (education, index) => {
      console.log(index)
      data.education = education
      data.isShowEducationPicker = false
    }

    const onBeforerUpload = file => {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片')
        return false
      }
      // 上传图片
      return true
    }

    // 提交表单的时候上传图片到服务器
    const onSubmit = values => {
      console.log(values)
      if (!values.name) {
        return Toast('请填写姓名信息')
      }
      if (!values.birthday) {
        return Toast('请填写生日信息')
      }
      if (!values.sex) {
        return Toast('请填写性别信息')
      }
      if (!values.homeTown) {
        return Toast('请填写家乡信息')
      }
      if (!values.job) {
        return Toast('请填写职业信息')
      }
      if (!values.education) {
        return Toast('请填写学历信息')
      }
      if (!values.mineWx) {
        return Toast('请填写本人微信')
      }
      if (!values.standard) {
        return Toast('请填写择偶标准')
      }
      // 提交表单上传图片
    }

    return {
      areaList,
      ...toRefs(data),
      onSelectSex,
      onSubmit,
      onSelectBirthDay,
      onSelectHome,
      onSelectWorkplace,
      onSelectEducation,
      onBeforerUpload
    }
  }
}
</script>

<style lang="less" src="./create.less" scoped></style>
