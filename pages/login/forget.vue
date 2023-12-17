<template>
	<view class="forget">

		<view class="content">
			<!-- 头部logo -->

			<!-- 主体 -->
			<view class="main mt140">


				<wInput class="mb60" v-model="oldPassword" type="password" maxlength="11" placeholder="请输入旧密码" isShowPass></wInput>
				<wInput class="mb60" v-model="password" type="password" maxlength="11" placeholder="请输入新密码" isShowPass></wInput>
				<wInput class="mb60" v-model="password1" type="password" maxlength="11" placeholder="请再次确认密码" isShowPass></wInput>

			</view>
			<view style="margin: 0 72rpx;">
				<wButton class="wbutton" text="确认修改" :rotate="isRotate" @click.native="startRePass()"></wButton>
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
		changePassword
	} from "@/api/user";
	export default {
		data() {
			return {
				// logoImage: 'http://q1.qlogo.cn/g?b=qq&nk=1660875559&s=100',
				oldPassword: '',
				password: '',
				password1: '',
				isRotate:false,
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
		methods: {
			startRePass() {
				//重置密码
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				
				if (this.oldPassword == '') {
					uni.showToast({
						icon: 'none',
						
						title: '请输入旧密码'
					});
					return false;
				}
				if (this.password == '') {
					uni.showToast({
						icon: 'none',
						
						title: '请输入新密码'
					});
					return false;
				}
				if (this.password1 == '') {
					uni.showToast({
						icon: 'none',
						
						title: '请再次确认密码'
					});
					return false;
				}
				if (this.password != this.password1) {
					uni.showToast({
						icon: 'none',
						
						title: '两次密码不一致'
					});
					return false;
				}

				

				this.isRotate = true
				changePassword({
					oldPassword: this.oldPassword,
					password: this.password,
					password1: this.password1,
				}).then((res) => {
					if (res.code == 200) {
						console.log('1111')
						uni.showToast({
							icon: 'none',
							title: '密码修改成功'
						});
					
						setTimeout(() => {
							this.$store.dispatch('Logout');
							this.isRotate = false
							uni.reLaunch({
								url:'/pages/login/login'
							})
						},600)

						
						
					} else {
						console.log('aaaa')
						uni.showToast({
							icon: 'none',
							title: '修改失败'
						});
						this.isRotate = false

					}
				});
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>