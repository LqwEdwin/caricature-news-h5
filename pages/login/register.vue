<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput class="mb50" v-model="username" type="text" maxlength="35" placeholder="请输入用户名(任意字母或者数字)">
				</wInput>
				<wInput class="mb50" v-model="password" type="password" maxlength="20" placeholder="请输入登录密码" isShowPass>
				</wInput>
				<wInput class="mb100" v-model="password1" type="password" maxlength="20" placeholder="请确认登录密码"
					isShowPass></wInput>
				<wButton class="mb30" text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>
				<wButton class="mb50" text="返 回" bgColor="#fff" fontColor="#333" @click="black"></wButton>
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
		reg
	} from '@/api/user';
	export default {
		data() {
			return {

				logoImage: '/static/logo.png',
				username: '',
				password: '',
				password1: '',
				showAgree: true, //协议是否选择
				isRotate: false, //是否加载旋转
			}
		},
		components: {
			wInput,
			wButton,
			w_md5
		},
		mounted() {
			_this = this;
		},
		onLoad() {

		},
		methods: {
			black(){
				uni.navigateBack()
			},
			startReg() {
				//注册
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (!this.username) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户名'
					});
					return false;
				}
				if (!this.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入登录密码'
					});
					return;
				}

				if (!this.password1) {
					uni.showToast({
						icon: 'none',
						title: '请确认登录密码'
					});
					return;
				}


				if (this.password !== this.password1) {
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致'
					});
					return false;
				}

				_this.isRotate = true
				reg({
					username: this.username,
					password: this.password,
				}).then(res => {
					if (res.code == 200) {
						this.$store.commit('setToken', res.data);
						this.$store.dispatch('GetUserInfoNow');
						uni.showToast({
							icon: 'none',
							title: '注册成功，即将自动登录'
						});
						setTimeout(() => {
							uni.reLaunch({
								url: '/pages/index/index'
							})
							this.isRotate = false
						}, 800)
					} else {
						uni.showToast({
							icon: 'none',
							title: '注册失败'
						});
					}

				}).catch(cat => {
					this.isRotate = false
				})

			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>