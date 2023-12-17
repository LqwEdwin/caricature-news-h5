<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput class="mb50" v-model="username" type="text" maxlength="35" placeholder="请输入用户名或手机号"
					:focus="isFocus"></wInput>
				<wInput class="mb100" v-model="password" type="password" maxlength="20" placeholder="请输入密码" isShowPass>
				</wInput>

				<wButton class="mb30" :text="an_text" :rotate="isRotate" @click="startLogin"></wButton>
				<wButton class="mb50" text="返回首页" bgColor="#fff" fontColor="#333" @click="toHome"></wButton>
			</view>




			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="register" open-type="navigate">还没有帐号？</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	let _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	import {

		login,

	} from '@/api/user';
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '/static/logo.png',
				username: '',
				password: '',
				isRotate: false, //是否加载旋转
				isFocus: true, // 是否聚焦
				time: '',
				token: '',
				app_key: '',
				websiteUrl: '',
				an_text: '登 录' //登录按钮标题
			};
		},
		components: {
			wInput,
			wButton,
			w_md5
		},
		onLoad() {

		},
		mounted() {
			_this = this;
			//this.isLogin();
		},
		methods: {
			isLogin() {
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		_this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
			startLogin(e) {
				console.log(e)
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (!this.username) {
					uni.showToast({
						icon: 'none',

						title: '请输入用户名或手机号'
					});
					return false;
				}
				if (!this.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}

				this.isRotate = true

				login({
					username: this.username,
					password: this.password,
				}).then(res => {
					if(res.code == 200){
						this.$store.commit('setToken', res.data);
						this.$store.dispatch('GetUserInfoNow');
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						});
						setTimeout(() => {
							this.toHome()
							this.isRotate = false
						}, 800)
					}else{
						uni.showToast({
							icon: 'none',
							title: '登录失败'
						});
					}
					
				}).catch(cat => {
					this.isRotate = false
				})

			},
			toHome() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>