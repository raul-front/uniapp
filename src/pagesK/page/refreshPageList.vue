<template>
  <view class="fx-display-flex_column example-refresh-page">
    <view class="example-refresh-page-header">
      <view class="input-wrapper">
        <view class="iconfont icon-sousuosvg"></view>
        <view class="search-text">搜索任务、文件或其他</view>
        <view class="iconfont icon-shaixuan"></view>
        <view class="filter-text">筛选</view>
      </view>
    </view>
    <view class="fx-flex-item example-refresh-page-body">
      <view class="fx-cell-box">
        <view class="fx-cells">
          <view class="fx-cell fx-cell_access" v-for="(item, i) in list" :key="i">
            <view class="fx-cell-content">
              <view class="fx-cell-content-bd">{{item.id}}, {{item.title}}</view>
              <view class="fx-cell-content-ft">{{item.datetime}}</view>
            </view>
          </view>
        </view>
      </view>
      <kg-page-footer :loading="loading" :currentPage="currentPage" :pages="pages"></kg-page-footer>
      <kg-empty-box v-if="list.length === 0"></kg-empty-box>
    </view>
  </view>
</template>

<script>
import { listMockNews } from 'api/mock1'
import refreshPageList from '@/mixins/refreshPageList'

export default {
  mixins: [refreshPageList],
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  onLoad (options) {
    this.refresh()
  },
  onHide () {
  },
  onShow () {
  },
  methods: {
    getDataHandle (params) {
      return listMockNews(params, false)
    },
    getDataForList (x) {
      return {
        id: x.id,
        title: x.title,
        datetime: x.datetime
      }
    }
  }
}
</script>

<style lang="scss">
.example-refresh-page{
  .example-refresh-page-header{
    width: 100%;
    height: 88rpx;
    background-color: $uni-bg-color-grey;
    padding: 12rpx 30rpx;
    font-size: $uni-font-size-sm;
    .input-wrapper{
      border-radius: 16rpx;
      height: 64rpx;
      line-height: 40rpx;
      padding: 12rpx 30rpx;
      background-color: $uni-bg-color;
      color: $uni-text-color-grey;
      display: flex;
      .iconfont{
        width: 40rpx;
        height: 40rpx;
        font-size: 28rpx;
      }
      .search-text{
        flex: 1;
        border-right: 1px solid $uni-text-color-grey;
        padding: 0 10rpx;
        margin-right: 20rpx;
      }
      .filter-text{
        padding: 0 10rpx;
      }
    }
  }
  .example-refresh-page-body{
    .fx-cell-content{
      .fx-cell-content-ft{
      }
    }
  }
}
</style>
