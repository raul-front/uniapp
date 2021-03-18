<template>
  <view class="kg-empty-box">
    <image class="image" src="@/static/images/components/nodata.png"></image>
    <text class="text">{{text}}</text>
  </view>
</template>
<script>
export default {
  name: 'kg-empty-box',
  props: {
    text: {
      type: String,
      default: '暂无数据'
    }
  }
}
</script>
