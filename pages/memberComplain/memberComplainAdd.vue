<template>
	<view style="padding: 50rpx 0;" >
		<view class="">
			<u--textarea class="textarea_box" v-model="content" maxlength="200" placeholder="请输入建议内容" ></u--textarea>

		</view>
		
		<view class="bottom_btn_box" @click="memberComplainAdd">
			我要建议
		</view>
	</view>
</template>

<script>
	import {
		memberComplainAdd
	} from "@/api/member.js"
	export default {
		data() {
			return {
				content:'',
				isSubmit:false,
			}
		},
		methods: {
			memberComplainAdd(){
				if(!this.content){
					uni.showToast({
						icon: 'none',
						title: '请输入建议内容'
					});
					return
				}
				
				if(this.isSubmit){
					return
				}
				this.isSubmit = true
				memberComplainAdd({content:this.content}).then(res => {
					
					if(res.code == 200){
						uni.showToast({
							icon: 'none',
							title: '提交成功'
						});
						setTimeout(() => {
							this.isSubmit = false
							uni.navigateBack()
						},500)
					}else{
						this.isSubmit = false
					}
				}).catch(res => {
					this.isSubmit = false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.textarea_box{
	background-color: #fff;
	// box-shadow: 0 0 10rpx 0rpx #00000055;
	border-radius: 20rpx;
	margin: 0 50rpx;
	
	height: 300rpx;
}

.bottom_btn_box{
	position: fixed;
	bottom: 50rpx;
	left: 50rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color: #fff;
	background-color: $uni-color-theme;
	width: 650rpx;
	
	border-radius: 100rpx;
}
</style>
