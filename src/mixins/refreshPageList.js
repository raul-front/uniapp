
export default {
  computed: {
    pages () {
      return Math.ceil(this.total / this.pageSize)
    },
  },
  data () {
    return {
      loading: false,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      list: [],
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
      })
    },
  },
}
