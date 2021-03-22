<template>
  <view class="kg-display-flex-column">

    <uni-search-bar class="kg-bg-color-grey" bg-color="#ffffff" :radius="100" @confirm="handleSearch"></uni-search-bar>

    <view>
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
    </view>
    <kg-empty-box class="kg-flex-item kg-flex-center" v-if="!initLoading && list.length === 0"></kg-empty-box>
  </view>
</template>

<script>
import { listMockNews } from 'api/mock1'
import refreshPageList from '@/mixins/refreshPageList'

export default {
  mixins: [refreshPageList],
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
    this.refresh()
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
