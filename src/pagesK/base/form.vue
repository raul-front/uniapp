<template>
  <div class="base-form">
    <view class="kg-panel kg-bg-color-card">
      <view class="kg-panel-hd">表单</view>
      <view class="kg-panel-bd">
        <view class="kg-form kg-form_value-right1">

          <!-- 展示文本 -->
          <view class="kg-form-cell">
            <view class="kg-form-cell-label">文本</view>
            <view class="kg-form-cell-content">
              <view class="kg-form-text">展示文字</view>
            </view>
          </view>

          <!-- 普通文本字符串输入；带有icon -->
          <view class="kg-form-cell kg-form-cell_required">
            <view class="kg-form-cell-icon">
              <view class="iconfont icon-user"></view>
            </view>
            <view class="kg-form-cell-label">姓名</view>
            <view class="kg-form-cell-content">
              <input class="kg-form-input" v-model.trim="form.name" placeholder="请输入姓名" />
            </view>
            <view class="kg-form-cell-icon kg-margin-right-no" @click="showInputInfo">
              <view class="iconfont icon-info-circle kg-color-warning"></view>
            </view>
          </view>

          <!-- int类型 -->
          <view class="kg-form-cell kg-form-cell_required">
            <view class="kg-form-cell-label">年龄</view>
            <view class="kg-form-cell-content">
              <input class="kg-form-input" type="digit" v-model="form.age" @focus="focusClearNumberHandle('age')" placeholder="请填写一个年龄" @blur="blurFormatIntHandle('age')" />
            </view>
          </view>

          <!-- 底部带有注释信息 -->
          <view class="kg-form-cell kg-form-cell_required kg-border-bottom-no kg-padding-bottom-no">
            <view class="kg-form-cell-label">邮箱</view>
            <view class="kg-form-cell-content">
              <input class="kg-form-input" v-model.trim="form.email" placeholder="请输入邮箱" />
            </view>
          </view>
          <view class="kg-form-cell__label kg-padding-top-no kg-border-bottom">
            <view class="kg-form-cell__label-desc kg-text-danger">
              提示：我是邮箱描述信息
            </view>
          </view>

          <view class="kg-form-cell kg-form-cell_required">
            <view class="kg-form-cell-label">手机</view>
            <view class="kg-form-cell-content">
              <input class="kg-form-input" v-model.trim="form.phone" placeholder="请输入手机" />
            </view>
          </view>

          <!-- kg-form-cell-item ，展示自定义的内容 -->
          <view class="kg-form-cell">
            <view class="kg-form-cell-label">验证码</view>
            <view class="kg-form-cell-content">
              <input class="kg-form-input" type="number" v-model.trim="form.code" placeholder="请输入验证码" />
            </view>
            <button class="kg-form-cell-item base-form-code" v-if="interval === 0" size="small" type="primary" plain @click="getCode">获取验证码</button>
            <view class="kg-form-cell-item kg-text-description base-form-code" v-else> {{ interval }}s后重新发送</view>
          </view>

          <!-- picker选择 -->
          <view class="kg-form-cell kg-form-cell_required">
            <view class="kg-form-cell-label">研究方向</view>
            <view class="kg-form-cell-content">
              <kg-form-picker class="kg-form-picker" v-model="form.direction" :list="directionList" :has-label="false"></kg-form-picker>
            </view>
          </view>
          <view class="kg-form-cell kg-form-cell_required">
            <view class="kg-form-cell-label">专业</view>
            <view class="kg-form-cell-content">
              <kg-form-picker class="kg-form-picker" v-model="form.specialty" :list="specialtyList"></kg-form-picker>
            </view>
          </view>

          <!-- money -->
          <view class="kg-form-cell">
            <view class="kg-form-cell-label">收入</view>
            <view class="kg-form-cell-content">
              <input class="kg-form-input" type="digit" v-model="form.money" placeholder="请填写收入" @focus="focusClearNumberHandle('money')" @blur="blurFormatFloatHandle('money')" />
            </view>
            <view class="kg-form-cell-unit">元</view>
          </view>

          <view class="kg-form-cell">
            <view class="kg-form-cell-label">证件类型</view>
            <view class="kg-form-cell-content">
              <kg-form-picker class="kg-form-picker" v-model="form.cardType" :list="cardTypeList"></kg-form-picker>
            </view>
          </view>

          <!-- 地区选择 -->
          <view class="kg-form-cell">
            <view class="kg-form-cell-label">户籍</view>
            <view class="kg-form-cell-content">
              <kg-form-picker-region class="kg-form-picker" v-model="form.region"></kg-form-picker-region>
            </view>
          </view>

          <!-- 日期选择器 -->
          <view class="kg-form-cell kg-form-cell_required">
            <view class="kg-form-cell-label">生日</view>
            <view class="kg-form-cell-content">
              <kg-form-picker-date class="kg-form-picker" v-model="form.time"></kg-form-picker-date>
            </view>
          </view>

          <!-- 失焦后将空值转成字符串 '无' -->
          <view class="kg-form-cell kg-form-cell_required">
            <view class="kg-form-cell-label">备注</view>
            <view class="kg-form-cell-content">
              <input class="kg-form-input" v-model="form.remark" @focus.stop="focusClearTextHandle('remark')" @blur="blurFormatTextHandle('remark')" placeholder="请输入备注" />
            </view>
          </view>

          <!-- 有多行内容的请加上 kg-form-cell_label-top -->
          <view class="kg-form-cell kg-form-cell_label-top kg-form-cell_required">
            <view class="kg-form-cell-label">个人爱好</view>
            <view class="kg-form-cell-content">
              <kg-form-checkbox-group v-model="form.checkbox" :list="checkboxList"></kg-form-checkbox-group>
            </view>
          </view>

          <view class="kg-form-cell kg-form-cell_label-top kg-form-cell_required">
            <view class="kg-form-cell-label">学历</view>
            <view class="kg-form-cell-content">
              <kg-form-radio-group  v-model="form.radio" :list="redioList"></kg-form-radio-group>
            </view>
          </view>

          <!-- textarea -->
          <view class="kg-form-cell kg-form-cell_label-top">
            <view class="kg-form-cell-label">人个简介</view>
            <view class="kg-form-cell-content">
              <textarea class="kg-form-textarea" v-model.trim="form.desc" auto-height placeholder="个人简介..."></textarea>
            </view>
          </view>

          <!-- switch -->
          <view class="kg-form-cell">
            <view class="kg-form-cell-label">开启</view>
            <view class="kg-form-cell-content">
              <switch class="kg-form-switch" :color="primaryColor" @change="changeSwitch"></switch>
            </view>
          </view>

          <!-- 多图上传 -->
          <view class="kg-form-cell__label kg-form-cell_required">
            <text class="kg-form-cell__label-title">生活照</text>
            <text class="kg-form-cell__label-desc">最多5张图片</text>
          </view>
          <view class="kg-form-cell__image">
            <kg-upload-many-image :count="8" v-model="form.images"></kg-upload-many-image>
          </view>

          <!-- 单张图片上传 -->
          <view class="kg-form-cell__label kg-form-cell_required">身份证照片</view>
          <view class="kg-form-cell__image kg-uploader-image">
            <kg-upload-one-image v-for="(item, index) in form.oneImages" :key="index"
              v-model="item.image" :title="item.title" :width="320" :hieght="200"></kg-upload-one-image>
          </view>

          <!-- 特别条款 -->
          <view class="kg-form-cell__obey kg-border-bottom-no">
            <label>
              <switch :checked="form.obey" type="checkbox" :color="primaryColor" @change="changeObey" />
              <view class="kg-form-cell__obey-title">特别条款</view>
              <view class="kg-form-cell__obey-desc kg-text-danger" v-if="form.obey">已选择条款</view>
            </label>
          </view>
        </view>
      </view>
    </view>

    <!-- 页面底部按钮组 -->
    <view class="kg-footer-btn-wrapper">
      <button class="kg-footer-btn" form-type="submit" type="primary" plain @click="cancelHandle">取消</button>
      <button class="kg-footer-btn" form-type="submit" type="primary" :loading="submitBtnLoading" :disabled="submitBtnLoading" @click="submitHandle">提交</button>
    </view>
  </div>
</template>

<script>
/*
 * ***************  kg-form ***************
 * 默认 cell 有border-bottom, 可添加class（kg-form_cell-no-border）删除
 * 数据向右对齐，添加class(kg-form_value-right)
 *
 * 所有功能都在示例中用到，还有其他一些内容：
1. label中有上下两部分 可以在label上添加class (.kg-flex-column-left)
目前还没有用到过

*/

import { copy, filter, constDataToArray, showToast, showToastSuccess, showToastError, showConfirmBack } from '@/utils/func'
import validate from '@/utils/validate'
import { cardTypeData } from '@/filter/const'

export default {
  name: 'register-index-index',
  data () {
    return {
      interval: 0,
      primaryColor: this.config.primaryColor,
      submitBtnLoading: false,
      cardTypeList: constDataToArray(cardTypeData),
      redioList: [
        { label: '专科', value: 3 },
        { label: '本科', value: 4 },
        { label: '研究生', value: 5 },
      ],
      checkboxList: [
        { label: '读书', value: 11 },
        { label: '足球', value: 12 },
        { label: '篮球', value: 13 },
      ],
      directionList: ['前端', '后端', '运维', '数据分析'],
      specialtyList: [
        { label: 'html', value: 'a' },
        { label: 'css', value: 'b' },
        { label: 'javascript', value: 'c' },
      ],
      form: {
        name: 'jianguo',
        age: 24,
        email: '111@qq.com',
        phone: '18919015125',
        code: '',
        direction: '运维',
        specialty: '',
        money: '',
        cardType: '0',
        region: [],
        time: '',
        remark: '',
        checkbox: [2],
        radio: '',
        desc: '',
        obey: true,
        switchValue: false,
        images: [
          'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
          'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
          'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
          'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
          'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg',
        ],
        oneImages: [
          { title: '身份证正面照', image: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg' },
          { title: '身份证反面照', image: '' },
        ],
      },
    }
  },
  onLoad () {
    setTimeout(() => {
    }, 1000)
    setTimeout(() => {
    }, 2000)
  },
  methods: {
    changeObey () {
      this.form.obey = !this.form.obey
    },
    changeSwitch () {
      this.form.switchValue = !this.form.switchValue
    },

    submitHandle () {
      const data = copy(this.form)
      data.card1 = data.oneImages[0].image
      data.card2 = data.oneImages[1].image
      const rules = [
        { key: 'name', label: '姓名', type: 'string', required: true, min: 5, max: 10, regexp: /^[0-9a-zA-Z]*$/, regMsg: '只能包含大小写字母，数字和下划线' },
        { key: 'age', label: '年龄', type: 'number', required: true, min: 1, max: 100 },
        { key: 'email', label: '邮箱', type: 'email', required: true },
        { key: 'phone', label: '手机号码', type: 'phone', required: true },
        { key: 'code', label: '验证码', type: 'string', regexp: /^\d{4}$/, regMsg: '4位数字' },
        { key: 'specialty', label: '专业', type: 'select' },
        { key: 'money', label: '收入', type: 'number', required: true },
        { key: 'cardType', label: '证件类型', type: 'select' },
        { key: 'checkbox', label: '爱好', type: 'array', required: true, min: 1, max: 2 },
        { key: 'radio', label: '学历', type: 'select' },
        { key: 'images', label: '生活照', type: 'images' },
        { key: 'card1', label: '身份证正面照 ', type: 'image' },
        { key: 'card2', label: '身份证反面照 ', type: 'image' },
      ]
      // console.log(this.func.console(data))
      console.log(data)

      const res = validate(data, rules)
      if (res) {
        showToastError(res)
        return
      }
      this.submitBtnLoading = true
      setTimeout(() => {
        showToastSuccess('提交成功')
        this.submitBtnLoading = false
      }, 2000)
    },

    cancelHandle () {
      showConfirmBack('确定取消吗？', () => {
        uni.navigateBack()
      })
    },

    getCode () {
      const rules = [
        { key: 'phone', label: '手机号码', type: 'phone', required: true },
      ]
      const res = validate({ phone: this.form.phone }, rules)
      if (res) {
        showToastError(res)
        return
      }

      showToastSuccess('验证码已发送')
      this.interval = 60
      const timer = setInterval(() => {
        if (this.interval === 0) {
          clearInterval(timer)
          return
        }
        this.interval--
      }, 1000)
      console.log('s', this.form.phone)
    },

    showInputInfo () {
      showToast('请输入文字')
    },

    focusClearNumberHandle (key) {
      this.form[key] === 0 && (this.form[key] = '')
    },
    focusClearTextHandle (key) {
      this.form[key] === '无' && (this.form[key] = '')
    },
    blurFormatTextHandle (key) {
      this.form[key] === '' && (this.form[key] = '无')
    },
    blurFormatFloatHandle (key) {
      this.form[key] = filter('decimalFloat', this.form[key])
    },
    blurFormatIntHandle (key) {
      this.form[key] = filter('int', this.form[key])
    },

  },
}
</script>
<style lang="scss" scoped>
.base-form{
  .base-form-code{
    width: 200rpx;
    margin-right: 24rpx;
  }
}
</style>
