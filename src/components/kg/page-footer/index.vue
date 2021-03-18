<template>
  <view class="page-footer" v-if="isShowLoading || isShowNoMore">
    <view class="loading" v-if="isShowLoading">
      <image class="icon" src="@/static/images/components/loading.png"></image>
      <text class="text">正在加载</text>
    </view>
    <view class="no-more" v-if="isShowNoMore">
      <view class="line"></view>
      <text class="text">没有更多啦</text>
      <view class="line"></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'page-footer',
  props: {
    loading: Boolean,
    currentPage: Number,
    pages: Number
  },
  data () {
    return {
    }
  },
  computed: {
    isShowNoMore () {
      if (!this.loading && this.currentPage > 1 && this.currentPage === this.pages) {
        return true
      }
      return false
    },
    isShowLoading () {
      if (this.loading && this.currentPage > 0 && this.currentPage !== this.pages) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss">
.page-footer{
  width: 100%;
  padding: 10upx 0;
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
  .no-more{
    text-align: center;
    display: flex;
    align-items: center;
    padding: 10upx;
    .line{
      flex: 1;
      height: 1rpx;
      background-color: $uni-border-color;
    }
    .text{
      padding: 0 10px;
    }
  }
}
</style>
