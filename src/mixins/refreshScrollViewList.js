
export default {
  computed: {
    pages () {
      return Math.ceil(this.total / this.pageSize)
    },
  },
  data () {
    return {
      showRefreshLoading: false,
      loading: false,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      list: [],
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
      const params = {
        offset: this.currentPage * this.pageSize,
        limit: this.pageSize,
      }
      this.loading = true
      uni.showNavigationBarLoading()
      this.getDataHandle(params).then(res => {
        this.currentPage++
        this.total = res.count
        const list = res.items.map(x => {
          return this.getDataForList(x)
        })
        if (isRefresh) {
          this.list = list
        } else {
          this.list.push(...list)
        }
      }).finally(() => {
        uni.stopPullDownRefresh()
        uni.hideNavigationBarLoading()
        this.loading = false
        this.showRefreshLoading = false
      })
    },
  },
}
