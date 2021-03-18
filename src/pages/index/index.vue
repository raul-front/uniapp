<template>
	<view :class="{'kg-iphonex-margin-bottom': isiPhoneX}">
		<view class="content">
			<image class="logo" src="/static/logo.png"></image>
			<view>
				<text class="title">{{title}}</text>
				<text>{{isiPhoneX}}</text>

				<uni-badge text="1"></uni-badge>
				<uni-badge text="3333333" type="primary" @click="bindClick" :inverted="false"></uni-badge>
				<uni-icons type="contact" size="30"></uni-icons>

			</view>
			<view class="kg-line-text">
				<text>底部{{primaryColor}}</text>
				<image :src="defaultAvatar" mode="" />

			</view>

			<view style="width: 100%; height: 300px;" class="kg-flex-center">
				<kg-empty-box></kg-empty-box>
			</view>
			<view style="width: 100%; height: 300px;" class="kg-position-relative">
				<kg-loading-box></kg-loading-box>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				primaryColor: this.config.primaryColor,
				defaultAvatar: this.config.defaultAvatar
			}
		},
		computed: {
			isiPhoneX () {
				return this.$store.state.common.isiPhoneX
			},
		},
		onLoad() {

		},
		methods: {
			bindClick(){
				console.log(123)
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin: 200rpx auto 50rpx auto;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: $uni-color-primary;
		text-align: center;
		display: block;
	}
</style>
