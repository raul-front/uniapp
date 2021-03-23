<template>
  <view class="example-index">
    <scroll-view id="scrollView" class="scroll-view" :scroll-y="isScroll"
        :scroll-into-view="scrollInto" @scroll="scrollHandle">
      <view class="kg-header-search-frame group-list" id="search">
        <view class="input-wrapper">
          <view class="iconfont icon-sousuosvg"></view>
          <view class="search-text">搜索部门、职位或员工</view>
        </view>
      </view>
      <view class="kg-panel group-list" v-for="(group, i) in groupList" :key="group.letter" :id="group.letter">
        <!-- groupList 比 letterList中少一个元素, 所以下标需要减1 -->
        <view class="kg-panel-hd header-sticky" :class="{'header-sticky_active': i === currentGroupIndex - 1}">
          <view class="kg-panel-hd-flag"></view>
          <view class="kg-panel-hd-title">{{group.letter}}</view>
        </view>
        <view class="kg-panel-bd">
          <view class="content">
            <view class="kg-cell-box">
              <view class="kg-cells">
                <view class="kg-cell" v-for="item in group.list" :key="item.id">
                  <view class="kg-cell-content">
                    <view class="kg-cell-content-bd">{{item.name}}</view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="alphabet-wrapper"
        @touchstart.prevent="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd">
      <view class="item iconfont icon-sousuosvg" id="startLetter"></view>
      <template v-for="(item, index) in letterList">
        <view class="item" :key="item"  v-if="index > 0"
            :class="[{'item_current': index === currentLetterIndex}]">{{item}}
        </view>
      </template>
    </view>
    <view class="alphabet-tooltip" v-if="touchStatus && currentLetter !== 'search'">{{currentLetter}}</view>

  </view>
</template>

<script>
/**
 * 1. 吸顶字母需要判断，高度过小时，需要重新选择
 * 2. 滚动的位置是右侧字母表选择的位置，与getGroupIndex无关，getGroupIndex只是吸顶字母的下标，高度过小时
 * 3. groupList 比 letterList中少一个元素, 所以当前吸顶实际下标为 getGroupIndex - 1
 */

import _ from 'lodash'
import city from './city.js'
export default {
  data () {
    return {
      touchStatus: false,
      currentGroupIndex: 0, // 分组吸顶字母的索引
      currentLetterIndex: 0, // 字母表索引
      letterList: [],

      groupList: [],
      isScroll: true,
      scrollInto: '',
    }
  },
  computed: {
    currentLetter () {
      return this.letterList[this.currentLetterIndex] || ''
    },
  },
  onLoad (options) {
    this.startLetterTop = 0
    this.scrollViewHeight = 0
    this.groupListHeight = []
    this.getData()
  },
  methods: {
    getData () {
      const obj = city
      const letterList = Object.keys(obj)
      letterList.unshift('search')
      this.letterList = letterList

      const list = []
      for (const k in obj) {
        list.push({
          letter: k,
          list: obj[k],
        })
      }
      this.groupList = list
      this.$nextTick(() => {
        this.initData()
      })
    },
    initData () {
      const query = uni.createSelectorQuery().in(this)
      // 获取第一个字母top
      query.select('#startLetter').boundingClientRect((res) => {
        this.startLetterTop = res.top
      }).exec()
      // 获取窗口总高度
      query.select('#scrollView').boundingClientRect((res) => {
        this.scrollViewHeight = res.height
      }).exec()
      // 获取每个分组的 top/height
      query.selectAll('.group-list').boundingClientRect((res) => {
        this.groupListHeight = res.map(x => {
          return { top: x.top, height: x.height }
        })
      }).exec()
    },

    scrollHandle (e) {
      if (this.touchStatus) {
        return
      }
      const scrollTop = e.detail.scrollTop
      const groupListHeight = this.groupListHeight
      // 滚动到顶部
      if (scrollTop <= 0) {
        this.currentLetterIndex = 0
        this.currentGroupIndex = 0
        return
      }
      // 中间部分滚动
      for (let i = 0; i < groupListHeight.length - 1; i++) {
        const height1 = groupListHeight[i].top
        const height2 = groupListHeight[i + 1].top || 0
        if (!height2 || (scrollTop >= height1 && scrollTop < height2)) {
          this.currentLetterIndex = i
          this.currentGroupIndex = i
          return
        }
      }
      // 滚动到底部且scrollTop大于最后一个元素的上限
      this.currentLetterIndex = groupListHeight.length - 1
      this.currentGroupIndex = groupListHeight.length - 1
    },

    onTouchStart (e) {
      // 阻止惯性滚动
      this.isScroll = false
      this.touchStatus = true
      this.getCurrent(e)
    },
    onTouchMove: _.throttle(function (e) {
      this.getCurrent(e)
    }, 16),
    getCurrent (e) {
      const touchY = e.touches[0].clientY
      const index = Math.floor((touchY - this.startLetterTop) / 14) // 每个字母高度为14，获取字母的index
      if (index >= 0 && index < this.letterList.length) {
        this.changeLetter(index)
      }
    },
    changeLetter (index) {
      if (index !== this.currentLetterIndex) {
        this.currentLetterIndex = index
        this.currentGroupIndex = this.getGroupIndex(index)
        setTimeout(() => {
          this.isScroll = true
        }, 0)
        // 滚动的位置是右侧字母表选择的位置，与getGroupIndex无关，getGroupIndex只是吸顶字母的下标，高度过小时
        this.scrollInto = this.currentLetter
        uni.vibrateShort()
      }
    },
    onTouchEnd () {
      if (this.currentLetterIndex !== this.currentGroupIndex) {
        this.currentLetterIndex = this.currentGroupIndex
      }
      this.isScroll = true
      this.touchStatus = false
    },

    getGroupIndex1 (index) {
      // 吸顶字母需要判断，高度过小时，需要重新选择
      const endIndex = this.letterList.length - 1
      let h = 0
      for (let i = index; i <= endIndex; i++) {
        h += this.groupListHeight[i].height
        if (h >= this.scrollViewHeight) {
          return index
        }
      }
      // 高度过小，吸顶字母需要选取上面的元素
      let h2 = 0
      for (let i = endIndex; i >= 0; i--) {
        h2 += this.groupListHeight[i].height
        if (h2 >= this.scrollViewHeight) {
          return i
        }
      }
      return 0
    },
    getGroupIndex (index) {
      // 吸顶字母需要判断，高度过小时，需要重新选择
      const endIndex = this.letterList.length - 1
      let h = 0
      for (let i = endIndex; i >= 0; i--) {
        h += this.groupListHeight[i].height
        if (h >= this.scrollViewHeight) {
          if (i > index) {
            return index
          }
          return i
        }
      }
      return 0
    },
  },
}
</script>

<style lang="scss">
@include page-flex();

.example-index{
  .scroll-view{
    flex: 1;
    overflow: hidden;
    position: relative;
    .header-sticky{
    }
    .header-sticky_active{
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      background: $uni-bg-color;
      border-bottom: 1upx solid $uni-border-color;
      z-index: 1;
    }
  }
  .alphabet-wrapper{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 28px;
    padding-right: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 10;
    .item{
      width: 12px;
      height: 12px;
      line-height: 12px;
      margin-bottom: 2px;
      text-align: center;
      border-radius: 2px;
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
    }
    .item_current{
      background: $uni-color-primary;
      color: #fff;
    }

  }
  .alphabet-tooltip{
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    background: $uni-bg-color-mask;
    color: #fff;
    font-size: 24px;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    z-index: 20;
  }
}
</style>
