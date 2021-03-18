<template>
  <view class="example-refresh-scroll-view">
    <view class="example-refresh-scroll-view-header">
      <view class="input-wrapper">
        <view class="iconfont icon-sousuosvg"></view>
        <view class="search-text">搜索任务、文件或其他</view>
        <view class="iconfont icon-shaixuan"></view>
        <view class="filter-text">筛选</view>
      </view>
    </view>
    <scroll-view class="example-refresh-scroll-view-body" enable-back-to-top="true" scroll-y
        refresher-enabled="true" :refresher-triggered="showRefreshLoading"
        @refresherrefresh="onPullDownRefresh" @scrolltolower="onReachBottom">
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
    </scroll-view>
  </view>
</template>

<script>
import { listMockNews } from 'api/mock1'
import refreshScrollViewList from '@/mixins/refreshScrollViewList'


export default {
  mixins: [refreshScrollViewList],
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  onLoad (options) {
    // 这里用getData, 不用refresh方法，为了不展示顶部的loading样式
    this.getData()
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
    },

    doneHandle () {
    }
  }
}
</script>

<style lang="scss">
@include page-flex();
.example-refresh-scroll-view{
  .example-refresh-scroll-view-header{
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
  .example-refresh-scroll-view-body{
    flex: 1;
    overflow: hidden;
    .task-item{
      padding: 20rpx 30rpx;
      border-bottom: 1rpx solid $uni-border-color;
      .task-item-top{
        width: 100%;
        display: flex;
        align-items: flex-start;
        .iconfont{
          height: 40rpx;
          width: 40rpx;
          font-size: 40rpx;
        }
        .icon-xuanze{
          color: #CFCFCF;
        }
        .icon-xuanze-ertai{
          color: $uni-color-primary;
        }
        .task-item-title{
          flex: 1;
          line-height: 40rpx;
          padding: 0 20rpx;
          color: $uni-color-title;
          @include multi-line-ellipsis();
        }
        .task-item-time{
          height: 40rpx;
          line-height: 40rpx;
          font-size: $uni-font-size-sm;
          color: $uni-text-color-grey;
        }
      }
      .task-item-bottom{
        width: 100%;
        display: flex;
        padding-left: 60rpx;
        margin-top: 20rpx;
        color: $uni-text-color-grey;
        .project{
          font-size: $uni-font-size-sm;
          flex: 1;
        }
        .item{
          display: flex;
          align-items: center;
          padding-left: 30rpx;
          .iconfont{
            font-size: $uni-font-size-sm;
          }
          .text{
            margin-left: 10rpx;
            font-size: $uni-font-size-sm;
          }
        }

      }
    }
    .task-item:active{
      background-color: $uni-bg-color-hover;
    }
    .task-item_finished{
      .task-item-title{
        text-decoration: line-through;
        opacity: .6;
      }
    }
  }
}
</style>
