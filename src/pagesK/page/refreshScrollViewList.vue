<template>
  <view class="example-refresh-scroll-view">
    <uni-search-bar class="kg-bg-color-grey" bg-color="#ffffff" :radius="100" @confirm="handleSearch"></uni-search-bar>

    <scroll-view class="kg-flex-item kg-overflow-hidden" enable-back-to-top="true" scroll-y
        refresher-enabled="true" :refresher-triggered="showRefreshLoading"
        @refresherrefresh="onPullDownRefresh" @scrolltolower="onReachBottom">
      <view class="kg-cell-box">
        <view class="kg-cells">
          <view class="kg-cell kg-cell_access" v-for="(item, i) in list" :key="i">
            <view class="kg-cell-content">
              <view class="kg-cell-content-bd">{{item.id}}, {{item.title}}</view>
              <view class="kg-cell-content-ft">{{item.datetime}}</view>
            </view>
          </view>
        </view>
      </view>

      <kg-page-footer :show-loading="isShowFooterLoading" :show-no-more="isShowFooterNoMore"></kg-page-footer>
      <kg-empty-box class="kg-full kg-flex-center" v-if="!initLoading && list.length === 0"></kg-empty-box>
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
      searchValue: ''
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
    // 固定方法：获取列表数据
    getDataHandle (query, loading) {
      return listMockNews(query, loading).then(res => {
        let list = res.items || []
        list = list.map(x => {
          return {
            id: x.id,
            title: x.title,
            datetime: x.datetime
          }
        })
        return { items: list, count: res.count }
      })
    },
    getDataForList (x) {
      return {
        id: x.id,
        title: x.title,
        datetime: x.datetime
      }
    },

    handleSearch () {
      if (this.searchValue !== '') {
        this.query = {
          search: this.searchValue
        }
        this.refresh(true)
      }
    }
  }
}
</script>

<style lang="scss">
@include page-flex();
.example-refresh-scroll-view{
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
