<template>
	<view
		style="background-color: #fff;border-top: 1px solid #eee;color: #777;font-size: 28rpx;height: calc(100vh - 1px);">
		<view
			style="display: flex;height: 44rpx;justify-content: space-between;line-height: 44rpx;padding: 40rpx 30rpx 30rpx;">
			<view style="color: #111;font-size: 32rpx;font-weight: 600;">
				账户余额：{{memberInfo.coin}} 书币
			</view>

		</view>
		<view
			style="background-color: #fff;display: flex;flex-wrap: wrap;justify-content: flex-start;padding: 20rpx 0rpx 0 27rpx;">
			<view class="boxItem" v-for="(item,index) in list" :key="index" @click="listIndex=index"
				:style="listIndex==index?'background: #fff8eb;border: 1px solid #ffcb8c;':''">

				<view style="color: #8b4900;font-size: 28rpx;font-weight: 400;height: 50rpx;line-height: 50rpx;">
					<text>￥</text>
					<text style="font-weight: 600;font-size: 40rpx;">{{item.displayPrice}}</text>
				</view>
				<view>
					<text>{{item.depict}}</text>
				</view>
				<view>
					<text>{{item.node}}</text>
				</view>
			</view>
		</view>

		<view style="height:16rpx;background-color:rgba(246,247,248,1);"></view>
		<view class="payCard">
			<view class="">选择支付方式</view>
			<view style="margin-top: 24rpx;margin-right: 40rpx; padding-bottom: 1rpx;">
				<view @click="memberRecharge('ALIPAY1')"
					style="display: flex;height: 108rpx;justify-content: space-between;line-height: 108rpx;border-bottom: 1px solid #f4f4f4;">
					<view style="display: flex;align-items: center;">
						<!-- <image src="/static/ucenter/alipay.png" style="height: 48rpx;width: 48rpx;vertical-align: middle;"></image> -->
						<u-icon name="zhifubao-circle-fill" color="#1296db" size="24"></u-icon>
						<text
							style="font-size: 32rpx;vertical-align: middle;color:rgba(51, 51, 51, 1);margin-left:20rpx;">
							支付宝（推荐使用）
						</text>
					</view>
					<view style="display: flex;margin: auto 0 auto auto;">
						<image
							:src="payFun=='ALIPAY1'?'/static/image/mkz_ic_pay_choose_on.png':'/static/image/mkz_ic_pay_choose_off.png'"
							style="width: 40rpx;height: 40rpx;"></image>
					</view>
				</view>
				<view @click="memberRecharge('ALIPAY')"
					style="display: flex;height: 108rpx;justify-content: space-between;line-height: 108rpx;border-bottom: 1px solid #f4f4f4;">
					<view style="display: flex;align-items: center;">
						<!-- <image src="/static/ucenter/wechat.png" style="height: 48rpx;width: 48rpx;vertical-align: middle;"></image> -->
						<u-icon name="zhifubao-circle-fill" color="#1296db" size="24"></u-icon>
						<text
							style="font-size: 32rpx;vertical-align: middle;color:rgba(51, 51, 51, 1);margin-left:20rpx;">
							支付宝（推荐使用）
						</text>
					</view>
					<view style="display: flex;margin: auto 0 auto auto;">
						<image
							:src="payFun=='ALIPAY'?'/static/image/mkz_ic_pay_choose_on.png':'/static/image/mkz_ic_pay_choose_off.png'"
							style="width: 40rpx;height: 40rpx;"></image>
					</view>
				</view>
				<view @click="memberRecharge('WECHAT')"
					style="display: flex;height: 108rpx;justify-content: space-between;line-height: 108rpx;border-bottom: 1px solid #f4f4f4;">
					<view style="display: flex;align-items: center;">
						<!-- <image src="/static/ucenter/wechat.png" style="height: 48rpx;width: 48rpx;vertical-align: middle;"></image> -->
						<u-icon name="weixin-circle-fill" color="#28c445" size="22"></u-icon>
						<text
							style="font-size: 32rpx;vertical-align: middle;color:rgba(51, 51, 51, 1);margin-left:20rpx;">
							微信支付
						</text>
					</view>
					<view style="display: flex;margin: auto 0 auto auto;">
						<image
							:src="payFun=='WECHAT'?'/static/image/mkz_ic_pay_choose_on.png':'/static/image/mkz_ic_pay_choose_off.png'"
							style="width: 40rpx;height: 40rpx;"></image>
					</view>
				</view>
				<view class="bottoma1 size24 ">
					<view>—————————温馨提示—————————</view>
					<view>如提示支付失败</view>
					<view>请联系官方客服进行充值</view>
					<view>书币属于虚拟商品，已经购买不得退换书币属于虚拟商品，已经购买不得退换</view>
				</view>
			</view>

		</view>

		<view style="position: fixed;bottom: 0rpx;width: 100%;">
			<view style="height:16rpx;background:#F6F7F8;"></view>
			<view class="footer">
				<view style="color: #ffa036;font-size: 28rpx;height: 88rpx;line-height: 88rpx;text-align: left;">
					￥
					<text
						style="font-size: 48rpx;font-weight: 600;">{{list[listIndex]?list[listIndex].displayPrice:0}}</text>
				</view>
				<view style="width: 360rpx;color: #fff;" class="buyBtn" @click="pop_show = true">
					立即支付
				</view>
			</view>
		</view>

		<u-modal :title="pop_title" :showCancelButton='true' mode="center" @confirm="buy" confirmText='继续支付'
			:show="pop_show" :round="16" :closeOnClickOverlay="false"  @cancel="pop_show = false" >
			<view style="display: flex;flex-direction: column;width: 100%;">
				<view class="pop-header">
					<view class="name">充值用户名：{{ userInfo.userName }}</view>
					<view class="pass">初始密码：123456</view>
					<view class="warr">请务必截图保存账户密码</view>
				</view>

				<view style="height: 10px;"></view>
			</view>
		</u-modal>
		
		<u-modal title="提示" :showCancelButton='true' mode="center" @confirm="buySubmit" confirmText='确认支付'
			:show="pay_show" @cancel="pay_show = false" :round="16" :closeOnClickOverlay="false">
				<rich-text :nodes="content"></rich-text>
		</u-modal>
	</view>
</template>

<script>
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	import {
		getMemberLoginInfo,
		getMemberInfoNoLogin,
		createOrder,
		listProductByStatus
	} from "@/api/member";


	export default {
		components: {
			w_md5
		},
		data() {
			return {
				content:"",
				pay_show:false,
				payFun: 'ALIPAY1',
				memberInfo: {},
				pop_show: false,
				list: [],
				listIndex: 0,
				pay_type: 1, //1=支付宝，2=微信，3=QQ
				agree: false,
				pop_title: "提示",
				pop_content: "",
				userInfo: uni.getStorageSync('userInfo'),
				data: {}
			}
		},
		onBackPress(e) {
			console.log(e)
			if (e.from == 'backbutton') {
				if (this.pop_show || this.pay_show) {
					this.pop_show = false
					this.pay_show = false
				} else {
					uni.navigateBack({})
				}
				return true
			}
		},
		onLoad() {
			this.getProduct()
			this.getMemberInfo()
		},
		methods: {
			getMemberInfo() {
				let token = uni.getStorageSync('token')
				if (token) {
					getMemberLoginInfo({}).then((res) => {
						if (res.code == 200) {
							this.memberInfo = res.data

						} else {
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '用户信息错误'
							});

						}
					});
				} else {
					getMemberInfoNoLogin({}).then((res) => {
						if (res.code == 200) {
							this.memberInfo = res.data
						} else {
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: '用户信息错误'
							});
						}
					});
				}
			},
			getProduct() {
				listProductByStatus({
					status: 0
				}).then((res) => {
					if (res.code == 200) {
						this.list = res.data
						this.listIndex = 0
					} else {
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '产品获取失败'
						});
					}
				});
			},


			memberRecharge(payFun) {
				this.payFun = payFun
			},

			// 立即支付
			buy() {
				let uid = this.memberInfo.uid
				let userName = this.memberInfo.nickName
				uni.setStorageSync('SUBMIT_RECHARGE',"1")
				if (uid == '0' || uid == 0) {
					uni.showModal({
						title: '未登录',
						content: '您未登录，需要登录后才能继续',
						showCancel: true,
						success: (res) => {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							
							uni.navigateTo({
								url: '/pages/login/login'
							})
							// store.dispatch('user/removeToken')
						}
					
					})
					return
				}
				let aliStr =
					'<div style="width:100%;display: flex;justify-content: center; align-items: center;margin-top: 10px;">' +
					'<img src="//img.ddjm.cc/alipay.png" width="50px"/></div><p style="font-size: 13pt;margin-top: 5px">支付宝</p>' +
					'<p style="font-size: 11pt;color: #9f9e9e;margin-top: 5px;">温馨提示：请务必在<b style="color: #e63c3c">两分钟以内</b>支付完成支付，' +
					'如果实际支付时间超过2分钟，则充值后可能无法到帐,如果支付时不确定是否超时，请返回我的-充值记录-查询或重新支付。  </p>';

				let weStr =
					'<div style="width:100%;display: flex;justify-content: center; align-items: center;margin-top: 10px;">' +
					'<img src="//img.ddjm.cc/wechat.png" width="50px"/></div><p style="font-size: 13pt;margin-top: 5px">微信支付</p>' +
					'<p style="font-size: 11pt;color: #9f9e9e;margin-top: 5px;">温馨提示：请务必在<b style="color: #e63c3c">两分钟以内</b>支付完成支付，' +
					'如果实际支付时间超过2分钟，则充值后可能无法到帐,如果支付时不确定是否超时，请返回我的-充值记录-查询或重新支付。  </p>';

				this.content = this.payFun == 'WECHAT'  ? weStr : aliStr
				this.pay_show = true
			},
			buySubmit(){
				createOrder({
						pdtId: this.list[this.listIndex].id,
						paymentFun: this.payFun
					}).then((res) => {
						if (res.code == 200) {
							let jumpUrl = res.data.payJumpUrl
							window.location.href = jumpUrl
				
						} else if (res.code == 401) {
							uni.showModal({
								title: '提示',
								content: '请先登录后再进行充值',
								showCancel: true,
								success: (res) => {
									/**
									 * 如果需要强制登录，使用reLaunch方式
									 */
									
									uni.navigateTo({
										url: '/pages/login/login'
									})
									// store.dispatch('user/removeToken')
								}
							
							})
						} else {
							showFailToast('开通失败，请稍后再试')
						}
					});
				
				
				
				// matomo.trackEvent('充值金币', '提交', selectPdtId.value + '')
			},	

		}
	}
</script>

<style>
	.boxItem {
		background: #fff;
		border: 1px solid #eee;
		border-radius: 12rpx;
		box-shadow: 0 4rpx 16rpx 0 rgba(0, 0, 0, .08);
		display: flex;
		flex-direction: column;
		height: 88rpx;
		justify-content: space-around;
		margin-bottom: 48rpx;
		margin-right: 20rpx;
		padding: 32rpx 0;
		position: relative;
		text-align: center;
		width: 334rpx;
	}

	.tip {
		background: #fff9f2;
		border-radius: 8rpx;
		color: #111;
		font-size: 28rpx;
		font-weight: 400;
		line-height: 44rpx;
		margin: 0 30rpx 40rpx;
		padding: 20rpx;
		text-align: center;
	}

	.payCard {
		border-bottom: 1px solid #f4f4f4;
		color: #000;
		font-size: 32rpx;
		font-weight: 500;
		height: 44rpx;
		line-height: 44rpx;
		margin: 42rpx 0 0;
		padding-bottom: 24rpx;
		padding-left: 40rpx;
	}

	.footer {
		background-color: #fff;
		border-top: 1px solid #f4f4f4;
		display: flex;
		justify-content: space-between;
		overflow: hidden;
		padding: 16rpx 40rpx 20rpx;
		text-align: center;
		width: calc(100% - 80rpx);
	}

	.buyBtn {
		background-color: #ffd93c;
		border-radius: 8rpx;
		color: #191919;
		font-size: 28rpx;
		font-weight: 500;
		height: 88rpx;
		line-height: 88rpx;
	}

	.bottoma1 {
		margin-bottom: 80px;
		color: #999;
		text-align: center;
	}

	.pop-header {
		align-content: center;
		margin-bottom: 20px;
		text-align: center;

		.name {
			color: #ea4c89
		}

		.pass {
			color: #ea4c89
		}

		.warr {
			color: #fd600f
		}
	}
</style>