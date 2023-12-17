<template>  
    <view class="container">  
		
		<view class="user-section">
			<view class="top_text">
				回家的路：fb.ddjm7.com &nbsp;&nbsp;
			</view>
			<image class="bg" src="/static/ucenter/mkz_ic_bg_mine_top_common.png"></image>
			<view class="user-info-box" v-if="!userInfo">
				<view class="portrait-box">
					<image class="portrait" src="/static/ucenter/missing-face.png"></image>
				</view>
				<view class="info-box">
					<text class="username">注册/登录</text>
				</view>
				
			</view>
			<view v-else class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.avatar || '/static/ucenter/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<view class="username">{{userInfo.userName }}</view>
					<view class="pass size28" v-show="userInfo.visitorId">默认密码：123456</view>
					<view class="header_num size28">剩余书币：{{ userInfo.coin }} </view>
				</view>
			</view>
			
			<view @click="navTo('/pages/vip/vip')" class="vip-card-box">
				<image class="card-bg" src="/static/ucenter/vip-card-bg.png" mode="bottom right"></image>
				<view v-if="!userInfo ||(userInfo && userInfo.vip==0 ) " class="b-btn" >
					立即开通
				</view>
				<view class="tit">
					<view class="yticon">
					    <u-icon size="16" name="integral" color="#f6e5a3"></u-icon>
					</view>
					VIP无限阅读
				</view>
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/ucenter/arc.png"></image>
			<view class="tj-sction">
				<view class="tj-item" @click="navTo('/pages/vip/vip')">
					<text v-if="userInfo && userInfo.vip==1" class="num">{{dateFormat('yyyy-MM-dd',userInfo.vipExpDate)}}</text>
					<text v-else class="num">未开通</text>
					<text>会员时间</text>
				</view>
			</view>
			<!-- 明细列表 -->
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/coin/coin')" hover-class="common-hover"  :hover-stay-time="50">
					<view class="yticon">
					    <u-icon size="26" name="rmb-circle" color="#000"></u-icon>
					</view>
					<text>我要充值</text>
				</view>
				<view class="order-item" @click="navTo('/pages/orderHistory/orderHistory')"  hover-class="common-hover" :hover-stay-time="50">
					<view class="yticon">
					    <u-icon size="26" name="coupon" color="#000"></u-icon>
					</view>
					<text>充值记录</text>
				</view>
				<view class="order-item" @click="navTo('/pages/coinHistory/coinHistory')" hover-class="common-hover"  :hover-stay-time="50">
					<view class="yticon">
					    <u-icon size="26" name="order" color="#000"></u-icon>
					</view>
					<text>书币记录</text>
				</view>
			</view>
			<!-- 列表 -->
			<view class="history-section icon">
				<list-cell icon="phone" iconSize="20px" title="绑定手机" :tips='userInfo.phone ? userInfo.phone : "强烈建议"'  @eventClick="navTo('/pages/bindPhone/bindPhone')"></list-cell>
				<list-cell icon="account" iconSize="20px"  title="修改密码" tips="" @eventClick="navGo('/pages/login/forget')"></list-cell>
				<list-cell icon="order" iconSize="20px"  title="投诉建议" tips="" @eventClick="navGo('/pages/memberComplain/memberComplain')"></list-cell>
				<list-cell icon="plus-circle" iconSize="20px"  title="添加桌面快捷方式" tips="" @eventClick="$refs.showDisOvComponent.showDisOv = true"></list-cell>
				<list-cell icon="setting" iconSize="20px" title="切换帐号" tips="" @eventClick="logout"></list-cell>
				
			</view>
			<!-- <view class="history-section icon" v-if="utoken!==''">
				<list-cell :icon="'/static/7.png'" iconSize="20px" iconColor="#5fcda2" title="退出登录" tips="" @eventClick="logout()"></list-cell>
			</view> -->
		</view>
		<showDisOvComponent ref="showDisOvComponent"></showDisOvComponent>
		<u-modal :show="modal_show" :title="modal_title" :content='modal_content' confirmColor="#FFD74B" @cancel="cancel" @confirm="confirm" asyncClose showCancelButton></u-modal>
    
		<u-modal title="请截屏记住一下信息"  mode="center" @confirm="pop_showConfirm" confirmText='我已截图保存'
			:show="pop_show" @cancel="pop_show = false" :round="16" :closeOnClickOverlay="false">
			<view style="display: flex;flex-direction: column;width: 100%;">
				<view class="pop-header size28">
					<div style="color: #fd600f">为了防止账号丢失，请截屏保存</div>
					<view class="name">充值用户名：{{ userInfo.userName }}</view>
					<view class="pass">初始密码：123456</view>
					<view class="warr">请务必截图保存账户密码</view>
				</view>
				
			</view>
		</u-modal>
	</view>  
</template>  
<script>  
	import listCell from '@/components/mix-list-cell';
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	import showDisOvComponent from '@/components/showDisOvComponent.vue'
	import{
	getUserNow,
	} from '@/api/user';
    import {  
        mapState 
    } from 'vuex'; 
	 import {dateFormat} from '@/utils/utils.js'
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell,
			w_md5,
			showDisOvComponent
		},
		data(){
			return {
				pop_show:false,
				showDisOv:false,
				dateFormat,
				showAutoRg:true,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				//图标文件	
				userInfo: uni.getStorageSync('userInfo'),
				utoken: uni.getStorageSync('token'),
				modal_show: false,
				modal_title:'温馨提示',
				modal_content:'是否确认退出？',
				version: 0
			}
		},
		onLoad(){
			if(!this.utoken && !this.userInfo){
				this.$store.dispatch('GetUserInfoNow').then(res => {
					
					this.userInfo = {
						picx:'/static/logo.png',
						...uni.getStorageSync('userInfo')
					}
				
					this.utoken =  uni.getStorageSync('token')
				});
			}else{
				this.userInfo = uni.getStorageSync('userInfo')
				this.utoken =  uni.getStorageSync('token')
			}
			
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		onShow() {
			let RECHARGE = uni.getStorageSync('SUBMIT_RECHARGE')
			if(RECHARGE && RECHARGE == 1){
				uni.showModal({
					title: '提示',
					content: '是否支付成功？',
					showCancel: true,
					success: (res) => {
						this.pop_show = true
					}
				
				})
			}
			if(this.utoken){
				getUserNow().then(res => {
					this.$store.commit('setUserInfo',res.data);
					this.userInfo = uni.getStorageSync('userInfo')
					this.utoken =  uni.getStorageSync('token')
				})
				
			}
			// this.utoken = uni.getStorageSync('user')
			// #ifdef APP-PLUS
			// 获取手机系统信息
			var _this = this;
			uni.getSystemInfo({
				success: function(res) {
					_this.platform = res.platform //ios  or android
					console.log('手机系统信息', _this.platform);
				}
			});
			// 获取版本号
			plus.runtime.getProperty(plus.runtime.appid, function(inf) {
				_this.version = inf.version
			});
			console.log('当前版本', this.version);
			// #endif
			
			// this.get_update()
		},
		// #endif
        methods: {
			logout(){
				this.modal_show = true
			},
			confirm(){
				this.logout_ok()
			},
			cancel(){
				this.modal_show = false
			},
			pop_showConfirm(){
				uni.setStorageSync('SUBMIT_RECHARGE','0')
				this.pop_show = false
			},
			logout_ok(){
				this.modal_show = false
				this.$store.dispatch('Logout');
				this.isRotate = false
				uni.reLaunch({
					url:'/pages/login/login'
				})
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				if(this.utoken==''){
					url = '/pages/login/login';
				}
				uni.navigateTo({  
					url
				})
			}, 
			/**
			 * 统一跳转接口,不拦截登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navGo(url){
				uni.navigateTo({  
					url
				})
			}, 
	
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
        }  
    }  
</script>  
<style lang='scss'>
	page{
		background: #f9f9f9;
	}
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 520upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
		.top_text{
			position: absolute;
			top: 0;
			right: 0;
			font-weight: bold;
			font-size: 28rpx;
			text-align: right;
			background: linear-gradient(to left top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
			opacity: 1;
			color: #f7d680;
			border-radius:0 0px 0px 20rpx;
			padding: 5rpx 30rpx;
			z-index: 999;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.info-box{
			margin-left: 20upx;
		}
		.username{
			font-size: 32upx + 6upx;
			color: #303133;
			font-weight: bold;
			
		}
		.vip{
			height: 32rpx;
			width: 32rpx;
			margin-left: 2px;
			margin-right: auto;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(to left top, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(to left top, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: 28upx+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			display: flex;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
				margin-top: auto;
				margin-bottom: auto;
			}
		}
		.e-b{
			font-size: 24upx;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: #f8f8f8;
		margin-top: -250upx;
		padding: 0 30upx;
		position:relative;
		background: #f9f9f9;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: 24upx;
			color: #75787d;
		}
		.num{
			font-size: 32upx;
			color: #303133;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: 24upx;
			color: #303133;
		}
		.yticon{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		padding: 0upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: 28upx;
			color: #303133;
			line-height: 40upx;
			margin-left: 30upx;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
	}

</style>