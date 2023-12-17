<template>
	<view style="overflow-x: hidden;">
		<view class="bg">
			<image class="bg-img" src="/static/vip/bg.png" mode=""></image>
		</view>
		
		<view class="nav" :style="{ paddingTop: statusBarHeight + 'px' }">
			<image class="nav-back" src="/static/vip/back.png" mode="" @click="back"></image>
			<text class="nav-title">会员中心</text>
			<view class="nav-space"></view>
		</view>
		
		<view class="info" :style="{marginTop: statusBarHeight + 44 + 'px'}">
			<image class="info-bg" src="/static/vip/info-bg.png" mode=""></image>
			
			<view class="info-content">
				<view class="info-avatar">
					<!-- <image class="info-avatar-pic" src="/static/vip/avatar.png" mode=""></image> -->
					<image class="info-avatar-pic" :src="userInfo.avatar || '/static/ucenter/missing-face.png'" mode=""></image>
				</view>
				<view class="info-name">
					<text class="info-name">{{userInfo.userName || userInfo.nickName}}</text>
					<text v-if="userInfo.vip==0" class="info-level">开通会员畅享尊贵特权</text>
					<text v-else class="info-level">{{dateFormat('yyyy-MM-dd',userInfo.vipExpDate)}}</text>
				</view>
			</view>
			
			<view class="info-asset">
				<view class="info-asset-item">
					<text class="iai-title">会员</text>
					<template v-if="userInfo.vip==1">
						<text v-if="calculateDaysBetweenDates(userInfo.vipExpDate,'') > 0"  class="iai-value">{{calculateDaysBetweenDates(userInfo.vipExpDate,'')}}天</text>
						<text v-else class="iai-value">已过期</text>
					</template>
					
					<text v-else class="iai-value">未开通</text>
				</view>
				<view class="info-asset-item">
					<text class="iai-title">书币</text>
					<text class="iai-value">{{memberInfo.coin}}</text>
				</view>
			</view>
		</view>
		
		<view class="main-title">
			<text>会员充值</text>
		</view>
		
		<scroll-view scroll-x>
			<view class="recharge">
				<view class="recharge-item" :class="current == index ? 'recharge-item-active': ''" v-for="(item, index) in list" :key="index" :style="{marginLeft: !index ? '30rpx': ''}" @click="rechargeChange(index)">
					<text class="recharge-item-duration">{{ item.name }}</text>
					<view class="recharge-item-price">
						<text class="rmb">￥</text>
						<text class="recharge-item-price-text">{{ item.displayPrice }}</text>
					</view>
					<text v-if=" item.node" class="recharge-item-des">
						{{ item.node }}
					</text>
				
				</view>
			</view>
		</scroll-view>
		
		<view class="button update" hover-class="hover" @click="updateNow">
			<text v-if="userInfo.vip==0" class="button-text">立即开通</text>
			<text v-else class="button-text">立即续费</text>
		</view>
		
		 		 
		
		<view class="main-title">
			<text>会员特权</text>
		</view>
		
		<view class="privilege">
			<view class="privilege-item" v-for="(item, index) in privilegeList" :key="index" hover-class="hover" @click="privilegeClick(index)">
				<image class="privilege-item-pic" :src="item.pic" mode=""></image>
				<text class="privilege-item-text">{{ item.text }}</text>
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import {dateFormat} from '@/utils/utils.js'
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	import {getMemberInfoNoLogin, getMemberLoginInfo,createOrder, listProductByStatus} from "@/api/member";
	export default {
		components: {
		    w_md5
		},
		data() {
			return {
				dateFormat,
				content:"",
				pay_show:false,
				payFun: 'ALIPAY1',
				memberInfo: {},
				pop_show: false,
				userInfo: uni.getStorageSync('userInfo'),
				statusBarHeight,
				current: 0,
				list: [],
				privilegeList: [
					{
						pic: '/static/vip/coin.png',
						text: '每日金币'
					},
					{
						pic: '/static/vip/quan.png',
						text: '大额神券'
					},
					{
						pic: '/static/vip/red-bag.png',
						text: '会员红包'
					},
					{
						pic: '/static/vip/goods.png',
						text: '精选漫画'
					},
					{
						pic: '/static/vip/speed.png',
						text: '极速到账'
					},
					{
						pic: '/static/vip/share.png',
						text: '邀请返利'
					},
					{
						pic: '/static/vip/active.png',
						text: '专享活动'
					},
					{
						pic: '/static/vip/birthday.png',
						text: '会员福利'
					},
					{
						pic: '/static/vip/notic.png',
						text: '上架提醒'
					},
					{
						pic: '/static/vip/kefu.png',
						text: '专属客服'
					}
				]
			}
		},
		onShow() {
			this.getProduct()
			this.getMemberInfo()
		},
		methods: {
			calculateDaysBetweenDates(date1) {
			  // 获取两个日期对象的时间戳
			  let time1 = new Date(date1).getTime();
			  let time2 = new Date().getTime();
			  
			  // 计算相差的毫秒数
			  let diff = Math.abs(time1 - time2);
			  // 将毫秒数转换为天数
			  let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
			  return days;
			},
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
					status: 1
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
			
			rechargeChange(index) {
				this.current = index
			},
			updateNow() {
				uni.setStorageSync('SUBMIT_RECHARGE',"1")
				uni.navigateTo({
					url: '/pages/vip/pay/pay?item=' + JSON.stringify(this.list[this.current]) 
				})
			
			},
			privilegeClick(index) {
				// uni.showToast({
				// 	icon: "none",
				// 	title: `点击了「${this.privilegeList[index].text}」`
				// })
			},
			back() {
				uni.navigateBack({
					
				})
			},
			req_data(){
				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey
				var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility + "&timestamp=" + time + "&user_id=" + uni.getStorageSync('user').uid + "&user_token=" + uni.getStorageSync('user').utoken
				var sign = w_md5.hex_md5_32Upper(param + this.app_key)
				uni.request({
				    url: getApp().globalData.websiteUrl + '/index.php/appv1/pay/init?' + param + "&sign=" + sign,
					// header: {
					//     'content-type': 'application/json' //自定义请求头信息
					// },
				    success: (res) => {
						console.log("数据: ",res.data);
						if(res.data.code==1){
							// this.userInfo = res.data.user
							this.list = res.data.viplist
							// this.data = res.data
						}else{
							uni.showToast({
							    icon: 'none',
								position: 'bottom',
							    title: '请求失败'
							});
							// uni.navigateBack({
								
							// })
						}
						// this.get_comment_list()
				    }
				});
			},
			req_userInfo(){
				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey
				
				var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility + "&timestamp=" + time + "&user_id=" + uni.getStorageSync('user').uid + "&user_token=" + uni.getStorageSync('user').utoken
				
				var sign = w_md5.hex_md5_32Upper(param + this.app_key)
				uni.request({
				    url: getApp().globalData.websiteUrl + '/index.php/appv1/user/index?' + param + "&sign=" + sign,
					// header: {
					//     'content-type': 'application/json' //自定义请求头信息
					// },
				    success: (res) => {
						console.log("用户信息：",res.data)
						this.userInfo = res.data.user
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.main-title {
		padding: 30rpx 30rpx;
		font-size: 34rpx;
		color: #1C1C1C;
	}
	
	.tip {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #A5A3A2;
	}
	
	.rmb {
		font-size: 26rpx;
		color: #E3BE83;
	}
	
	.bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 400rpx;
		z-index: -2;
		
		&-img {
			width: 100%;
			height: 100%;
		}
	}
	
	.hover {
		opacity: 0.7;
	}
	
	.nav {
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 44px;
		padding: 0 30rpx;
		background-image: url('~@/static/vip/nav-bg.png');
		background-size: 100%;
		z-index: 99;
		
		&-back {
			width: 20rpx;
			height: 40rpx;
		}
		
		&-title {
			color: #FFFFFF;
			font-size: 42rpx;
		}
		
		&-space {
			width: 70rpx;
			height: 40rpx;
		}
	}
	
	.info {
		position: relative;
		padding: 0 15rpx;
		width: 730rpx;
		height: 360rpx;
		
		&-bg {
			position: absolute;
			width: 730rpx;
			height: 360rpx;
			z-index: -1;
		}
		
		&-content {
			padding: 70rpx 50rpx 0 50rpx;
			margin-bottom: 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		
		&-avatar {
			margin-right: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 85rpx;
			height: 85rpx;
			background-color: #fff;
			padding: 1rpx;
			border-radius: 50%;
			
			&-pic {
				width: 83rpx;
				height: 83rpx;
				border-radius: 50%;
			}
		}
		
		&-name {
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			font-size: 35rpx;
		}
		
		&-level {
			margin-top: 15rpx;
			font-size: 24rpx;
		}
		
		&-asset {
			padding: 0 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			
			&-item {
				display: flex;
				flex-direction: column;
			}
		}
	}
	
	.iai {
		&-title {
			margin-bottom: 20rpx;
			margin-right: 100rpx;
			font-size: 24rpx;
			color: #CFB386;
		}
		
		&-value {
			font-size: 35rpx;
			color: #FFFFFF;
		}
	}
	
	.recharge {
		position: relative;
		margin-bottom: 35rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		
		&-tag {
			position: absolute;
			top: -2rpx;
			left: -2rpx;
			width: 170rpx;
			height: 36rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background-image: url('~@/static/vip/tag.png');
			background-size: 100%;
			
			&-text {
				font-size: 20rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
		
		&-item {
			position: relative;
			padding: 40rpx 0;
			margin-left: 15rpx;
			width: 210rpx;
			height: 200rpx;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			border: solid 2rpx #F2F2F3;
			border-radius: 12rpx;
			
			&-active {
				border-color: #EDD2A9;
				background-color: #FBF1E5;
			}
			
			&-duration {
				margin-bottom: 30rpx;
				font-size: 26rpx;
				color: #1C1C1C;
			}
			
			&-price {
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: baseline;
				
				&-text {
					font-size: 48rpx;
					color: #E3BE83;
				}
			}
			
			&-des {
				text-align: center;
				font-size: 24rpx;
				color: #f56c6c;
				padding: 0 20rpx;
			}
		}
	}
	
	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 85rpx;
		border-radius: 50rpx;
		background-image: linear-gradient(#EFCF9E, #E4BF85);
		
		&-text {
			font-size: 30rpx;
			color: #1C1C1C;
		}
	}
	
	.update {
		margin: 35rpx 30rpx 20rpx 30rpx;
	}
	
	.privilege {
		padding: 0 30rpx;
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
		
		&-item {
			margin: 0 23rpx;
			margin-bottom: 25rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			&-pic {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 20rpx;
			}
			
			&-text {
				font-size: 24rpx;
				color: #383738;
			}
		}
	}
	
	.level {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 466rpx;
		background-image: url('~@/static/vip/vip-bg.png');
		background-size: 100%;
		
		&-rate {
			position: absolute;
			top: 43rpx;
			left: 33rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			
			&-text1 {
				margin-right: 20rpx;
				color: #1C1C1C;
				font-size: 34rpx;
			}
			
			&-text2 {
				font-size: 34rpx;
				color: #C07C07;
			}
		}
		
		&-info {
			// position: absolute;
			// top: 188rpx;
			// left: 350rpx;
			margin-top: 70rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			&-icon {
				margin-bottom: 20rpx;
				width: 48rpx;
				height: 38rpx;
			}
			
			&-text {
				margin-bottom: 20rpx;
				font-size: 26rpx;
				color: #292929;
			}
			
			&-integral {
				font-size: 40rpx;
				color: #C07C07;
			}
		}
		
		&-distance {
			position: absolute;
			left: 30rpx;
			right: 30rpx;
			bottom: 35rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			
			&-text {
				font-size: 26rpx;
				color: #292929;
			}
			
			&-button {
				padding: 0 30rpx;
				height: 60rpx;
			}
		}
	}
</style>
