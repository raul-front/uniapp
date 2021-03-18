<template>
  <view class="example-page-footer">
    <view class="fx-page-flex-auto">
      <view class="task-member-list">
        <view class="member-item" v-for="item in list" :key="item.id">
          <image class="avatar" :src="item.avatar">
          <view class="name">{{item.name}}</view>
        </view>
      </view>
    </view>
    <view class="fx-page-flex-footer-handle">
      <button @click="cancleHandle">取消</button>
      <button type="primary" @click="submitHandle" :loading="submitBtnLoading" :disabled="submitBtnLoading">完成</button>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      submitBtnLoading: false,
      list: [
        { id: 1, name: 'name1', 'avatar': this.config.defaultAvatar },
        { id: 2, name: 'name2', 'avatar': this.config.defaultAvatar },
        { id: 3, name: 'name3', 'avatar': this.config.defaultAvatar },
        { id: 4, name: 'name4', 'avatar': this.config.defaultAvatar },
        { id: 5, name: 'name5', 'avatar': this.config.defaultAvatar },
        { id: 6, name: 'name6', 'avatar': this.config.defaultAvatar },
        { id: 7, name: 'name7', 'avatar': this.config.defaultAvatar },
        { id: 8, name: 'name8', 'avatar': this.config.defaultAvatar },
        { id: 9, name: 'name9', 'avatar': this.config.defaultAvatar },
        { id: 10, name: 'name10', 'avatar': this.config.defaultAvatar },
        { id: 11, name: 'name11', 'avatar': this.config.defaultAvatar },
        { id: 12, name: 'name12', 'avatar': this.config.defaultAvatar },
        { id: 13, name: 'name13', 'avatar': this.config.defaultAvatar },
        { id: 14, name: 'name14', 'avatar': this.config.defaultAvatar },
        { id: 15, name: 'name15', 'avatar': this.config.defaultAvatar },
        { id: 16, name: 'name16', 'avatar': this.config.defaultAvatar },
        { id: 17, name: 'name17', 'avatar': this.config.defaultAvatar },
        { id: 18, name: 'name18', 'avatar': this.config.defaultAvatar },
        { id: 19, name: 'name19', 'avatar': this.config.defaultAvatar },
        { id: 20, name: 'name20', 'avatar': this.config.defaultAvatar },
        { id: 21, name: 'name21', 'avatar': this.config.defaultAvatar },
        { id: 22, name: 'name22', 'avatar': this.config.defaultAvatar },
        { id: 23, name: 'name23', 'avatar': this.config.defaultAvatar },
        { id: 24, name: 'name24', 'avatar': this.config.defaultAvatar },
        { id: 25, name: 'name25', 'avatar': this.config.defaultAvatar },
        { id: 26, name: 'name26', 'avatar': this.config.defaultAvatar },
        { id: 27, name: 'name27', 'avatar': this.config.defaultAvatar },
        { id: 28, name: 'name28', 'avatar': this.config.defaultAvatar },
        { id: 29, name: 'name29', 'avatar': this.config.defaultAvatar },
        { id: 30, name: 'name30', 'avatar': this.config.defaultAvatar }
      ]
    }
  },
  computed: {
  },
  watch: {
  },
  onLoad (options) {
  },
  onShow () {
  },
  methods: {
    cancleHandle () {
      wx.navigateBack()
    },
    submitHandle () {
      this.submitBtnLoading = true
      console.log('submit')
    }
  }
}
</script>

<style lang="scss">
@include page-flex();
.example-page-footer{
  .task-member-list{
    display: flex;
    flex-wrap: wrap;
    padding: 40rpx 30rpx;
    .member-item{
      margin-right: 52rpx;
      margin-bottom: 30rpx;
      .avatar{
        width: 96rpx;
        height: 96rpx;
        border-radius: 16rpx;
      }
      .name{
        height: 28rpx;
        width: 96rpx;
        line-height: 28rpx;
        margin-top: 10rpx;
        text-align: center;
        font-size: $uni-font-size-sm;
        @include ellipsis();
      }
    }
    .member-item:nth-child(5n+5){
      margin-right: 0;
    }
  }
}
</style>
