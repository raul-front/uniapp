<template>
  <view class="kg-uploader-image_one-file-item">
    <view class="kg-uploader-image-item" v-if="url" :style="itemStyle">
      <image class="kg-uploader-image-item-img" mode="aspectFill" :src="url" @tap="showImage"></image>
      <!-- <view class="iconfont icon-close-circle-fill kg-uploader-image-item-delete" @click.stop="deleteImage"></view> -->
      <uni-icons type="clear" size="18" class="kg-uploader-image-item-delete" @click.stop="deleteImage"></uni-icons>
    </view>
    <view class="kg-uploader-image-item kg-uploader-image-item_input" :style="itemStyle" v-else @tap="chooseImage">
      <!-- <view class="iconfont icon-camera"></view> -->
      <uni-icons type="camera" size="30"></uni-icons>
    </view>
    <view class="kg-uploader-image_one-file-item-title" v-if="title" :style="titleStyle">{{title}}</view>
  </view>
</template>

<script>
import { uploadImage } from 'api/common'

export default {
  name: 'upload-one-image',
  props: {
    value: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    type: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      url: '',
    }
  },
  computed: {
    itemStyle () {
      let style = ''
      if (this.width) {
        style += `width: ${this.width}rpx;`
      }
      if (this.height) {
        style += `height: ${this.height}rpx;`
      }
      return style
    },
    titleStyle () {
      if (this.width) {
        return `width: ${this.width}rpx;`
      }
      return ''
    },
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.url = this.value
      },
    },
  },
  methods: {
    chooseImage () {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          this.upload(res.tempFilePaths)
        },
      })
    },
    upload (images) {
      uploadImage(images[0], true, this.type).then(res => {
        this.set(res)
      }).catch(_ => {})
    },
    deleteImage () {
      this.set('')
    },
    set (url) {
      this.$emit('input', url)
    },
    showImage () {
      uni.previewImage({
        current: this.url,
        urls: [this.url],
      })
    },
  },
}
</script>
