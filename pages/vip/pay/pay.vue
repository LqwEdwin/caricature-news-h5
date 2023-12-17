<template>
	<view style="background-color: #fff;color: #777;font-size: 28rpx;height: calc(100vh - 1px);">
		<view style="background: rgba(255,160,54,.1);color: #ffa036;font-size: 26rpx;font-weight: 400;height: 32rpx;line-height: 32rpx;padding: 24rpx 40rpx;text-align: center;">
			主人，充值出现问题请及时联系客服解决哦 
		</view>
		<view style="margin-bottom: 24rpx;margin-top: 80rpx;">
			<view style="color: #f70;font-size: 36rpx;font-weight: 300;height: 66rpx;line-height: 40rpx;margin-bottom: 10rpx;text-align: center;">
				<text>￥</text>
				<text style="font-size: 64rpx;font-weight: 500;">
					{{item.displayPrice}}
				</text>
			</view>
		</view>
		<view style="color: #111;font-size: 28rpx;font-weight: 400;height: 34rpx;line-height: 34rpx;margin-bottom: 96rpx;text-align: center;">
			购买会员：{{item.name}}
		</view>
		<view style="height:16rpx;background-color:rgba(246,247,248,1);"></view>
		<view class="payCard">
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
				
			</view>
		
		</view>
		</view>
		<view class="flex-justify" style=" margin-top: 360rpx;padding: 40rpx;" @click="pop_show = true">
			<button class="payBtn">支付</button>
		</view>
		<view style="color: #191919;font-size: 28rpx;font-weight: 400;height: 40rpx;line-height: 40rpx;text-align: center;" @click="buy(2)">
			<text>会员解锁全站内容</text>
		</view>
		
		
		<u-modal :title="pop_title" :showCancelButton='true' mode="center" @confirm="buy" confirmText='继续支付'
			:show="pop_show" @cancel="pop_show = false" :round="16" :closeOnClickOverlay="false">
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
			:show="pay_show"  @cancel="pay_show = false" :round="16" :closeOnClickOverlay="false">
				<rich-text :nodes="content"></rich-text>
		</u-modal>
	</view>
</template>

<script>
	import w_md5 from "../../../js_sdk/zww-md5/w_md5.js"
	import {getMemberInfoNoLogin, getMemberLoginInfo,createOrder, listProductByStatus} from "@/api/member";
	
	export default {
		components: {
		    w_md5
		},
		onLoad(option) {
			this.item = JSON.parse(option.item) 
			console.log(option.item)
			// this.req_data()
		},
		data() {
			return {
				memberInfo:{},
				item:{},
				day: 0,
				rmb: 0,
				payFun: 'ALIPAY1', //1=支付宝，2=微信，3=qq
				data: {},
				pay_show:false,
				content:'',
				pop_show: false,
				pop_title: "提示",
				pop_content: "",
				userInfo: uni.getStorageSync('userInfo'),
			}
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
			memberRecharge(payFun) {
				this.payFun = payFun
			},
			// 立即支付
			buy() {
				let uid = this.memberInfo.uid
				let userName = this.memberInfo.nickName
			
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
						pdtId: this.item.id,
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
				
				uni.setStorageSync('SUBMIT_RECHARGE',"1")
				
				// matomo.trackEvent('充值金币', '提交', selectPdtId.value + '')
			},	
			
		
		}
	}
</script>

<style>
	button::after{border: initial;}
	.payCard{
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
	.payBtn{
		background-color: #fae53f;
		border-radius: 44rpx;
		color: #191919;
		font-size: 32rpx;
		font-weight: 500;
		height: 88rpx;
		width: 500rpx;
		line-height: 88rpx;
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
