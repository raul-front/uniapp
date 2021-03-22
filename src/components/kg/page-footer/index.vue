<template>
  <view class="page-footer" v-if="showLoading || showNoMore">
    <view class="loading" v-if="showLoading">
      <image class="icon" src="@/static/images/components/loading.png"></image>
      <text class="text">正在加载</text>
    </view>
    <view class="kg-line-text" v-if="showNoMore">
      <text>没有更多啦</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'page-footer',
  props: {
    showLoading: Boolean,
    showNoMore: Boolean,
  },
}
</script>

<style lang="scss">
.page-footer{
  width: 100%;
  padding: 20rpx 0;
  color: $uni-text-color-grey;
  font-size: $uni-font-size-sm;
  .loading{
    @include flex-center();
    .icon{
      width: 28rpx;
      height: 28rpx;
    }
    .text{
      margin-left: 10rpx;
    }
  }
}
</style>
