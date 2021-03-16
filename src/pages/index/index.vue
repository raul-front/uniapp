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
		</view>
	</view>

</template>

<script>
	// import {uniBadge} from '@dcloudio/uni-ui'
	export default {
		// components: {uniBadge},
		data() {
			return {
				title: 'Hello'
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
		color: $color-primary;
		text-align: center;
		display: block;
	}
</style>
