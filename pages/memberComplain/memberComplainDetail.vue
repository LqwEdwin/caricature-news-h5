<template>
	<view >
		<view class="box">
			<view class="size32 bold" >
				投诉建议：
			</view>
			<view class="size28 mt10">
				{{content}}
			</view>
			<view v-if="recover" style="padding-top: 20rpx; border-top: 1rpx solid #ddd;margin-top: 20rpx;">
				<view class="size32 bold" >
					回复：
				</view>
				<view class="size28 mt10">
					{{recover}}
				</view>
			</view>
		</view>
		
		<view class="bottom_btn_box" @click="delMemberComplain">
			删除
		</view>
	</view>
</template>

<script>
	import {
		memberComplainDetail,
		delMemberComplain
	} from "@/api/member.js"
	export default {
		data() {
			return {
				id:'',
				content:'',
				recover:'',
			}
		},
		onLoad(op) {
			this.id = op.id
			this.memberComplainDetail()
		},
		methods: {
			memberComplainDetail(){
				memberComplainDetail({id:this.id}).then(res => {
					console.log(res)
					if(res.code == 200){
						this.content = res.data.content
						this.recover = res.data.recover
					}
				})
			},
			delMemberComplain(){
				uni.showModal({
					title: '提示',
					content: '是否删除该建议？',
					success: function (res) {
						if (res.confirm) {
							delMemberComplain({id:this.id}).then(res => {
								console.log(res)
								if(res.code == 200){
									uni.showToast({
										icon: 'none',
										title: '删除成功'
									});
									uni.navigateBack()
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
				
			},
			
		}
	}
</script>

<style>
page{
	background-color: #f8f8f8;
	padding: 30rpx 0;
}
</style>
<style lang="scss" scoped>
.box{
	background-color: #fff;
	margin: 0 30rpx;
	padding: 20rpx 30rpx;
	border-radius: 20rpx;
	box-shadow: 0 0 6rpx 0 #00000044;
}

.bottom_btn_box{
	position: fixed;
	bottom: 50rpx;
	left: 50rpx;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	color: #333;
	border: 1rpx solid #333;
	width: 650rpx;
	
	border-radius: 100rpx;
}
</style>