<template>
  <view class="components-index">
    <!-- <view class="kg-panel">
      <view class="kg-panel-hd">
        <view class="kg-panel-hd-flag"></view>
        <view class="kg-panel-hd-title">基础组件</view>
      </view>
      <view class="kg-panel-bd kg-bg-color">
        <view class="kg-cell-box">
          <view class="kg-cells">
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/base/button">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">Button</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/base/panel">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">Panel</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/base/list">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">List列表</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/base/form">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">Form表单</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/base/line-info-box">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">lineInfoBox</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/base/info-box">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">InfoBox</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/base/tabbar-page">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">页面选项卡</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/base/tabbar-box">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">局部选项卡</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/base/tag">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">标签</view>
              </view>
            </navigator>
          </view>
        </view>
      </view>
    </view>

    <view class="kg-panel">
      <view class="kg-panel-hd">
        <view class="kg-panel-hd-flag"></view>
        <view class="kg-panel-hd-title">交互组件</view>
      </view>
      <view class="kg-panel-bd">
        <view class="kg-cell-box">
          <view class="kg-cells">
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/interaction/toast">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">toast轻提示</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/interaction/message">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">message全局提醒</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/interaction/dialog">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">dialog弹框</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/interaction/action-sheet">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">ActionSheet</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesC/interaction/popup">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">Popup弹出层</view>
              </view>
            </navigator>
          </view>
        </view>
      </view>
    </view> -->

    <view class="kg-panel">
      <view class="kg-panel-hd">
        <view class="kg-panel-hd-flag"></view>
        <view class="kg-panel-hd-title">基础组件</view>
      </view>
      <view class="kg-panel-bd kg-bg-color">
        <view class="kg-cell-box">
          <view class="kg-cells">
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesK/base/form">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">表单</view>
              </view>
            </navigator>
          </view>
        </view>
      </view>
    </view>
    <view class="kg-panel">
      <view class="kg-panel-hd">
        <view class="kg-panel-hd-flag"></view>
        <view class="kg-panel-hd-title">示例页面</view>
      </view>
      <view class="kg-panel-bd kg-bg-color">
        <view class="kg-cell-box">
          <view class="kg-cells">
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesK/page/refreshPageList">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">页面列表刷新</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesK/page/refreshScrollViewList">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">ScrollView列表刷新</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesK/page/pageFooterHandle">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">底部有操作按钮的页面</view>
              </view>
            </navigator>
            <navigator class="kg-cell kg-cell_access" hover-class="kg-cell_active" url="/pagesK/page/index">
              <view class="kg-cell-content">
                <view class="kg-cell-content-bd">Index索引列表</view>
              </view>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data () {
    return {
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
  },
}
</script>

<style lang="scss">
.components-index{
}
</style>
