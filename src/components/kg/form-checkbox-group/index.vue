<template>
  <checkbox-group class="kg-form-check-group" @change="changeHandle">
    <label class="kg-form-check-group-item" v-for="item in kgList" :key="item.value">
      <checkbox class="kg-form-check-group-item-check" :color="primaryColor" :checked="item.checked" :value="item.value" />
      <view class="kg-form-check-group-item-label">{{item.label}}</view>
    </label>
  </checkbox-group>
</template>

<script>
import { copy } from '@/utils/func'

export default {
  name: 'checkbox',
  props: {
    list: Array,
    value: Array,
  },
  data () {
    return {
      data: [],
      kgList: [],
      primaryColor: this.config.primaryColor,
    }
  },
  watch: {
    list: {
      immediate: true,
      handler () {
        this.kgList = copy(this.list)
        this.init()
      },
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
      if (JSON.stringify(this.value) !== JSON.stringify(this.data)) {
        this.kgList.forEach(x => {
          if (this.value.includes(x.value)) {
            this.$set(x, 'checked', true)
          } else {
            this.$set(x, 'checked', false)
          }
        })
      }
    },
    changeHandle (e) {
      this.data = e.target.value
      this.$emit('input', this.data)
    },
  },
}
</script>
