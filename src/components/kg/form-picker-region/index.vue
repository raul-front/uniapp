<template>
  <picker mode="region" :value="region" @change="handleChange">
    <view class="fx-form-picker-text"> {{showText}} </view>
  </picker>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
    },
  },
  data () {
    return {
      region: [],
    }
  },
  computed: {
    showText () {
      return this.region.join('-')
    },
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.initData()
      },
    },
  },
  methods: {
    initData () {
      let value = []
      if (this.value && this.value.length) {
        value = this.value
      } else {
        value = ['北京市', '北京市', '东城区']
      }
      if (JSON.stringify(this.region) !== JSON.stringify(value)) {
        this.handleChange({ target: { value: value } })
      }
    },
    handleChange (e) {
      this.region = e.target.value
      this.$emit('input', this.region)
    },
  },
}
</script>
