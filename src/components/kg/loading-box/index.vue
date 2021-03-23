<template>
  <view class="kg-loading-box">
    <uni-icons class="icon" type="spinner-cycle" size="30"></uni-icons>
    <text class="text">{{text}}</text>
  </view>
</template>

<script>
export default {
  name: 'kg-loading-box',
  props: {
    text: {
      type: String,
      default: '正在加载...',
    },
  },
}
</script>
