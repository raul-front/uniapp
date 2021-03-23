<script>
export default {
  onLaunch: function () {
    uni.getSystemInfo({
      success: res => {
        const modelmes = res.model
        if (modelmes.search('iPhone X') !== -1) {
          this.$store.commit('common/setIPhoneX')
        }
      },
    })
  },
  onShow: function () {
  },
  onHide: function () {
  },
}
</script>

<style lang="scss">
@import 'styles/index.scss';
</style>
