<template>
	<view>
		<view style="padding: 20rpx;background:#fafafa">
			<view class="n-title size45">重要提示</view>
			<view class="n-body size36">1.成功绑定手机后，您可以通过输入<text style="color: red">手机号、密码登录您的账号</text></view>
			<view class="n-body size36">2.为了保障您的账号安全与便捷性，<text style="color: red">付费后请务必绑定手机号码</text></view>
		</view>
		<u-form ref="uForm" class="form_box" :model="formData" :rules="rules">
			<u-form-item  class="input_box m-row-40 mt0"    prop="phoneNumber"  ref="item1">
				<wInput
					style="width: 100%;"
					v-model="formData.phoneNumber"
					type="text"
					maxlength="11" 
					placeholder="请输入手机号码"
					:focus="isFocus"
				></wInput>
			</u-form-item>

			<view class="p-row-40 m-col-50">
				<wButton
					text="提交"
					@click="submit"
				></wButton>
			</view>
		</u-form>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	import {bindPhone} from '@/api/user.js'
	export default {
		components:{
			wInput,
			wButton
		},
		data() {
			return {
				formData: {
					phoneNumber: '',
				},
				rules: {
					// 字段名称
					phoneNumber: [{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur'],
					}]
				}
			};
		},
		methods:{
			submit(){
				this.$refs.uForm.validate().then(res => {
					if (this.formData.phoneNumber.length != 11){
					    
						uni.showToast({
							icon:'none',
							title:'目前只支持大陆手机号码绑定'
						})
					    return
					  }
					
					  bindPhone(this.formData).then((res) => {
					    if (res.code == 200) {
							
					     uni.showToast({
					     	icon:'none',
							title:'绑定成功'
					     })
						 setTimeout(() => {
							  uni.navigateBack()
						 },1000)
						 
					    } else {
							uni.showToast({
								icon:'none',
								title:'绑定失败'
							})
					      // showFailToast(res.message || '');
					    }
					  });
				}).catch(errors => {
					
				})
			},
		},
	}
</script>

<style lang="scss">
	.form_box {
		pad-top: 80rpx;
		background: #fafafa;
		padding: 50rpx 15rpx;
	}
	.input_box{
		display: flex;flex:1;
		flex-direction: column;
		align-items: stretch;
		
	}

	.login_btn {
		margin: 50rpx 0 0 0;
	}



	.n-title {

		color: #ee0a24;
		margin-top: 30rpx;
		text-align: center;
	}

	.n-body {

		margin-top: 30rpx;
		text-align: center;
	}
	.u-form-item__body__right__content__slot{
		flex-direction: column !important;
	}
</style>