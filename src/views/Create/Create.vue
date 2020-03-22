<template>
  <div class="create-page">
    <Title name="创建相亲贴" color="#333" />
    <van-form @submit="onSubmit">
      <van-field v-model="name" name="name" label="姓名:" placeholder="请输入" input-align="right" />
      <van-field
        v-model="birthday"
        name="birthday"
        label="年龄:"
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
      <van-field v-model="job" maxlength="8" name="job" label="职业:" placeholder="请输入" input-align="right" />
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
      <van-field
        v-model="mineWx"
        maxlength="20"
        name="mineWx"
        label="本人微信:"
        placeholder="请输入"
        input-align="right"
      />
      <section class="upload-con">
        <div class="label">图片：</div>
        <WxUploader :photos="photos" @getPhotos="getPhotos" />
        <div class="tips">最多9张</div>
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
        <button v-if="isEdite" class="publish-btn flex-center" type="submit">完成</button>
        <button v-else class="publish-btn flex-center" type="submit">发布</button>
      </div>
    </van-form>

    <!-- 性别选择 -->
    <van-action-sheet v-model="isShowSexSheet" :actions="sexOptions" @select="onSelectSex" />
    <!-- 生日选择 -->
    <van-popup v-model="isShowBirthDayPicker" position="bottom">
      <van-picker
        show-toolbar
        title="生日选择"
        :columns="birthColumns"
        :default-index="40"
        @confirm="onSelectBirthDay"
        @cancel="isShowBirthDayPicker = false"
      />
    </van-popup>
    <!-- 家乡选择 -->
    <van-popup v-model="isShowHomePicker" position="bottom">
      <van-area
        :area-list="areaList"
        title="家乡选择"
        columns-num="2"
        @confirm="onSelectHome"
        @cancel="isShowHomePicker = false"
      />
    </van-popup>
    <!-- 工作地点选择 -->
    <van-popup v-model="isShowWorkplacePicker" position="bottom">
      <van-area
        :area-list="areaList"
        title="工作地点选择"
        columns-num="2"
        @confirm="onSelectWorkplace"
        @cancel="isShowWorkplacePicker = false"
      />
    </van-popup>
    <!-- 学历选择 -->
    <van-popup v-model="isShowEducationPicker" position="bottom">
      <van-picker
        show-toolbar
        title="学历选择"
        :columns="educationList"
        @cancel="isShowEducationPicker = false"
        @confirm="onSelectEducation"
      />
    </van-popup>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from '@vue/composition-api'
import areaList from '../../static/data/area'
import Title from '@/components/Title'
import WxUploader from '@/components/WxUploader'
import { cretePostApi, updatePostApi } from '../../api/api'
import toolkit from '../../utils/_toolkit'
export default {
  components: {
    Title,
    WxUploader
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'Detail') {
        // 编辑
        vm.isEdite = true
      }
    })
  },
  setup(props, context) {
    const router = context.root.$router
    const route = context.root.$route
    const Toast = context.root.$toast
    const $loading = context.root.$loading
    const curYear = new Date().getFullYear()
    const startYear = 1950
    const data = reactive({
      updatePostId: '', // 当前编辑的帖子 ID
      standard: '', // 择偶标准
      sexOptions: [
        { name: '男', value: 1 },
        { name: '女', value: 2 }
      ],
      educationList: ['高中', '专科', '本科', '研究生', '博士'],
      birthColumns: [...new Array(curYear - startYear + 1).keys()].map(item => item + 1950),
      name: '',
      sex: '',
      birthday: '',
      homeTown: {
        name: '',
        code: '',
        province: '',
        city: ''
      }, // 家乡
      job: '', // 工作
      education: '', // 学历
      workplace: {
        name: '',
        code: '',
        province: '',
        city: ''
      }, // 工作地点
      areaList: null,
      mineWx: '',
      parentWx: '',
      photos: [],
      isEdite: false, // 是否在编辑
      isShowSexSheet: false,
      isShowBirthDayPicker: false,
      isShowHomePicker: false,
      isShowWorkplacePicker: false,
      isShowEducationPicker: false
    })

    const initData = postDetail => {
      data.updatePostId = postDetail.id
      data.name = postDetail.name
      data.birthday = postDetail.birth
      data.homeTown = {
        name: postDetail.province + '-' + postDetail.city,
        province: postDetail.province,
        city: postDetail.city
      }
      data.sex = { name: ['', '男', '女'][postDetail.sex], code: postDetail.sex }
      data.job = postDetail.occupation
      data.workplace = {
        name: postDetail.workProvince + '-' + postDetail.workCity,
        province: postDetail.workProvince,
        city: postDetail.workProvince
      }
      data.education = postDetail.educational
      data.mineWx = postDetail.vx
      data.photos = postDetail.imgs
      data.standard = postDetail.standard
    }

    // 生命周期
    onMounted(() => {
      toolkit.wxConfig()
      data.areaList = areaList
      const formData = route.params.formData ? JSON.parse(route.params.formData) : null

      if (formData) {
        initData(formData.postDetail)
      }
    })

    const onSelectSex = sex => {
      data.sex = sex
      data.isShowSexSheet = false
    }

    const onSelectBirthDay = birthday => {
      data.birthday = birthday
      data.isShowBirthDayPicker = false
    }

    const onSelectHome = home => {
      const province = home[0].name
      const city = home[1].name
      data.homeTown = {
        name: city,
        code: home[home.length - 1].code,
        province,
        city
      }
      data.isShowHomePicker = false
    }

    const onSelectWorkplace = workplace => {
      const province = workplace[0].name
      const city = workplace[1].name
      data.workplace = {
        name: city,
        code: workplace[workplace.length - 1].code,
        province,
        city
      }
      data.isShowWorkplacePicker = false
    }
    const onSelectEducation = education => {
      data.education = education
      data.isShowEducationPicker = false
    }

    const getPhotos = photos => {
      data.photos = photos
    }

    // 提交表单的时候上传图片到服务器
    const onSubmit = values => {
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
      if (!values.mineWx) {
        return Toast('请填写本人微信')
      }
      if (!data.photos.length) {
        return Toast('请上传照片')
      }
      if (data.photos.length > 9) {
        return Toast('最多上传9张照片')
      }
      if (!values.standard) {
        return Toast('请填写择偶标准')
      }
      $loading.show()
      data.isEdite = false
      if (data.isEdite) {
        updatePostApi({
          post: {
            id: data.updatePostId,
            sex: data.sex.value,
            name: data.name,
            birth: data.birthday,
            province: data.homeTown.province,
            city: data.homeTown.city,
            workProvince: data.workplace.province,
            workCity: data.workplace.city,
            occupation: data.job,
            educational: data.education,
            standard: data.standard,
            vx: data.mineWx, //本人微信
            parentVx: data.parentWx, //家长微信
            imgs: data.photos
          }
        })
          .then(() => {
            $loading.hide()
            router.replace({ path: '/detail/' + data.updatePostId })
          })
          .catch(err => {
            $loading.hide()
            Toast(err.data.errMessage)
          })
      } else {
        cretePostApi({
          post: {
            sex: data.sex.value,
            name: data.name,
            birth: data.birthday,
            province: data.homeTown.province,
            city: data.homeTown.city,
            workProvince: data.workplace.province,
            workCity: data.workplace.city,
            occupation: data.job,
            educational: data.education,
            standard: data.standard,
            vx: data.mineWx, //本人微信
            parentVx: data.parentWx, //家长微信
            imgs: data.photos
          }
        })
          .then(({ data: resData }) => {
            $loading.hide()
            router.replace({ path: '/detail/' + resData.id })
          })
          .catch(err => {
            $loading.hide()
            Toast(err.data.errMessage)
          })
      }
    }

    return {
      ...toRefs(data),
      onSelectSex,
      onSubmit,
      onSelectBirthDay,
      onSelectHome,
      onSelectWorkplace,
      onSelectEducation,
      getPhotos
    }
  }
}
</script>

<style lang="less" src="./create.less" scoped></style>
