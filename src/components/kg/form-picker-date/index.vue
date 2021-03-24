<template>
  <picker mode="date" :value="date" :start="start" :end="end" @change="handleChange">
    <view class="fx-form-picker-text"> {{showText}} </view>
  </picker>
</template>

<script>
/**
 * picker中的value 是'yyyy-mm-dd'格式，包括start, end
 * 提交的格式是 2019-11-06T08:00:00+08:00
 */
import { filter } from '@/utils/func'

export default {
  props: {
    value: {
      type: String,
      default: '',
    },
    start: {
      type: String,
      default: '',
    },
    end: {
      type: String,
      default: '',
    },
  },
  data () {
    return {
      date: '',
    }
  },
  computed: {
    showText () {
      return filter('date', this.date)
    },
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.init()
      },
    },
  },
  methods: {
    init () {
      let date
      if (!this.value) {
        date = filter('date', new Date())
      } else {
        date = filter('date', this.value)
      }
      if (date !== this.date) {
        this.handleChange({ target: { value: date } })
      }
    },
    handleChange (e) {
      this.date = e.target.value
      // const time = this.func.getSubmitTime(this.date)
      // this.$emit('input', time)
      this.$emit('input', this.date)
    },
  },
}
</script>
