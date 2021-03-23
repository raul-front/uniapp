<template>
  <picker :value="currentIndex" :range="list" :range-key="hasLabel ? 'label' : ''" @change="handleChange">
    <view class="kg-form-picker-text"> {{label}} </view>
  </picker>
</template>

<script>

export default {
  props: {
    list: Array,
    value: [String, Number],
    hasLabel: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      currentIndex: null,
    }
  },
  computed: {
    label () {
      if (this.hasLabel) {
        return (this.list.length && this.list[this.currentIndex]) ? this.list[this.currentIndex].label : ''
      } else {
        return this.list.length ? this.list[this.currentIndex] : ''
      }
    },
  },
  watch: {
    list () {
      this.init()
    },
    value: {
      immediate: true,
      handler () {
        this.init()
      },
    },
  },
  methods: {
    init () {
      let index
      if (this.hasLabel) {
        index = this.list.findIndex(x => x.value === this.value)
      } else {
        index = this.list.findIndex(x => x === this.value)
      }
      if (this.list.length && (index !== this.currentIndex)) {
        index = index > -1 ? index : 0
        this.handleChange({ target: { value: index } })
      }
    },
    handleChange (e) {
      this.currentIndex = Number(e.target.value)
      this.$emit('input', this.hasLabel ? this.list[this.currentIndex].value : this.list[this.currentIndex])
    },
  },
}
</script>
