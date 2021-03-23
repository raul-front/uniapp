<template>
  <radio-group class="kg-form-check-group" @change="handleChange">
    <label class="kg-form-check-group-item" v-for="(item, index) in list" :key="item.value">
      <radio class="kg-form-check-group-item-check" :color="primaryColor" :checked="currentIndex === index" :value="item.value" />
      <view class="kg-form-check-group-item-label">{{item.label}}</view>
    </label>
  </radio-group>
</template>

<script>
export default {
  name: 'radio',
  props: {
    list: Array,
    value: [String, Number],
  },
  data () {
    return {
      currentIndex: null,
      data: '',
      primaryColor: this.config.primaryColor,
    }
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
      if (this.list.length && (this.data !== this.value)) {
        this.handleChange({ target: { value: this.value } })
      }
    },
    handleChange (e) {
      const value = e.target.value
      this.data = value
      this.currentIndex = this.list.findIndex(x => x.value === value)
      this.$emit('input', value)
    },
  },
}
</script>
