<template>
  <view class="kg-uploader-image">
    <view class="kg-uploader-image-item" v-for="(image, i) in imageList" :key="i">
      <image class="kg-uploader-image-item-img" mode="aspectFill" :src="image" @tap="showImage(image)"></image>
      <!-- <i class="iconfont icon-close-circle-fill kg-uploader-image-item-delete" @click.stop="deleteImage(i)"></i> -->
      <uni-icons type="clear" size="18" class="kg-uploader-image-item-delete" @click.stop="deleteImage(i)"></uni-icons>
    </view>
    <view class="kg-uploader-image-item kg-uploader-image-item_input" v-if="imageList.length < count" @tap="chooseImage">
      <!-- <view class="iconfont icon-camera"></view> -->
      <uni-icons type="camera" size="30"></uni-icons>
    </view>
  </view>
</template>

<script>
import { uploadImage } from 'api/common'
import { copy, showRequestLoading, hideRequestLoading, showToastSuccess, showToastError } from '@/utils/func'

export default {
  name: 'upload-many-image',
  props: {
    count: {
      type: Number,
      default: 9,
    },
    type: {
      type: String,
      default: '',
    },
    value: Array,
  },
  data () {
    return {
      imageList: [],
    }
  },
  computed: {
    canSelectCount () {
      return this.count - this.imageList.length
    },
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.imageList = copy(this.value)
      },
    },
  },
  methods: {
    chooseImage () {
      uni.chooseImage({
        count: this.canSelectCount,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          this.upload(res.tempFilePaths)
        },
      })
    },
    upload (images) {
      const apis = images.map(x => uploadImage(x, false))
      showRequestLoading('上传中')
      Promise.all(apis).then(res => {
        showToastSuccess('上传成功')
        this.imageList.push(...res)
        this.set()
      }).catch(err => {
        showToastError('上传失败:' + err)
      }).finally(_ => {
        hideRequestLoading()
      })
    },
    showImage (url) {
      uni.previewImage({
        current: url,
        urls: this.imageList,
      })
    },
    deleteImage (i) {
      this.imageList.splice(i, 1)
      this.set()
    },
    set () {
      this.$emit('input', copy(this.imageList))
    },
  },
}
</script>
