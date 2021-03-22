
export default {
  computed: {
    pages () {
      return Math.ceil(this.total / this.pageSize)
    },
  },
  data () {
    return {
      query: {},
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
  onPullDownRefresh () {
    this.refresh()
  },
  onReachBottom () {
    this.getData()
  },
  methods: {
    refresh () {
      this.currentPage = 0
      this.getData(true)
    },
    getData (isRefresh = false) {
      if (this.loading || (this.currentPage > 0 && this.currentPage >= this.pages)) {
        return
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
