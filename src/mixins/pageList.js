
export default {
  computed: {
    pages () {
      return Math.ceil(this.total / this.pageSize)
    },
  },
  data () {
    return {
      searchValue: '',
      searchList: [],
      searchLoading: false,
      searchStatus: false,

      loading: false,
      pageSize: 15,
      currentPage: 0,
      total: 0,
      list: [],
    }
  },
  watch: {
    searchStatus (val) {
      if (!val) {
        this.searchList = []
      }
    },
  },
  onShow () {
    this.refresh()
  },
  onPullDownRefresh () {
    this.refresh()
  },
  // 上拉加载更多
  onReachBottom () {
    this.getDataPre()
  },
  methods: {
    refresh () {
      this.searchValue = ''
      this.searchList = []
      this.searchLoading = false
      this.searchStatus = false

      this.currentPage = 0
      this.total = 0
      this.list = []
      this.getDataPre()
    },
    getDataPre () {
      if (this.loading || (this.currentPage > 0 && this.currentPage >= this.pages)) {
        return
      }
      this.getData()
    },
    // search
    changeSearchValue (val) {
      if (this.searchStatus) {
        if (val.length > 1) {
          this.searchData(val)
        } else {
          this.searchList = []
        }
      }
    },
  },
}
