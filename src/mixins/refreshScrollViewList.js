
export default {
  computed: {
    pages () {
      return Math.ceil(this.total / this.pageSize)
    },
  },
  data () {
    return {
      query: {},
      showRefreshLoading: false,
      initLoading: true, // 初始化加载的标识
      loading: false,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      list: [],
      showNoMoreMinLength: 10, // 超过n条数据展示没有更多的提示
      isShowFooterLoading: false,
      isShowFooterNoMore: false,
    }
  },
  methods: {
    onPullDownRefresh () {
      this.refresh()
    },
    onReachBottom () {
      this.getData()
    },
    refresh () {
      this.currentPage = 0
      this.getData(true)
    },
    // 第一次onLoad时请求用getData()方法，refresh()会将showRefreshLoading设置为true,顶部出现加载样式
    getData (isRefresh = false) {
      if (this.loading || (this.currentPage > 0 && this.currentPage >= this.pages)) {
        return
      }
      // 只有下拉刷新时，设置showRefreshLoading, showRefreshLoading会控制顶部加载框是否显示
      if (isRefresh) {
        this.showRefreshLoading = true
      }
      const query = Object.assign({
        offset: this.currentPage * this.pageSize,
        limit: this.pageSize,
      }, this.query)

      this.loading = true
      this.setFooter()
      uni.showNavigationBarLoading()
      const isShowRequestLoading = !this.initLoading && isRefresh
      this.getDataHandle(query, isShowRequestLoading).then(({ items, count }) => {
        this.currentPage++
        this.total = count
        const list = items
        if (!isRefresh) {
          this.list.push(...list)
        } else {
          this.list = list
        }
      }).finally(() => {
        if (this.initLoading) {
          this.initLoading = false
        }
        this.showRefreshLoading = false
        this.loading = false
        this.setFooter()
        uni.stopPullDownRefresh()
        uni.hideNavigationBarLoading()
      })
    },
    setFooter () {
      let isShowFooterLoading = false
      let isShowFooterNoMore = false
      if (this.initLoading || (this.loading && this.currentPage > 0 && this.currentPage !== this.pages)) {
        isShowFooterLoading = true
      }
      if (!this.loading && this.list.length > this.showNoMoreMinLength && this.currentPage === this.pages) {
        isShowFooterNoMore = true
      }
      this.isShowFooterLoading = isShowFooterLoading
      this.isShowFooterNoMore = isShowFooterNoMore
    },
  },
}
