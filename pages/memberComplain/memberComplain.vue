<template>
	<view>
		<u-tabs :current="tabIndex" @change="onClickTab" :scrollable="false" :list="tabs" lineColor="#ff2663"
			:inactiveStyle="inactiveStyle" :activeStyle="activeStyle"></u-tabs>
		<view class="list" v-if="memberCoinList && memberCoinList.length">
			<view class="item" v-for="(item, index) in memberCoinList" :key="index" @click="toDetail(item)">
				<view class="size32 bold" >
					投诉建议：
				</view>
				<view class="content size28 mt10">
					{{item.content}}
				</view>
				
				<view v-if="item.recover"  style="padding-top: 20rpx; border-top: 1rpx solid #ddd;margin-top: 20rpx;">
					<view class="size32 bold" >
						回复：
					</view>
					<view class="content size28 mt10">
						{{item.recover}}
					</view>
				</view>
			
			</view>
		</view>
		<view class="mt240" v-else >
			<u-empty class="mt240" description="暂无内容" />
		</view>
		
		<view class="bottom_btn_box" @click="toAdd">
			我要建议
		</view>
		
	</view>
</template>

<script>
	import {
		memberComplainList
	} from "@/api/member.js"

	export default {
		components: {

		},
		data() {
			return {
				pageNo: 1,
				total: 1,
				data_null: false,
				tabIndex: 0,
				inactiveStyle: {
					color: '#333'
				},
				activeStyle: {
					color: '#000',
					'font-weight': '500'
				},
				tabs: [{
						name: "未处理"
					},
					{
						name: "已处理"
					}
				
				],
				memberCoinList: [],
			};
		},
		onPullDownRefresh() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.pageNo = 1;
				this.memberComplainList();
			}
		},
		onReachBottom() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.pageNo++;
				if (this.memberCoinList.length >= this.total) {
					return;
				}
				this.memberComplainList();
			}
		},
		onShow() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.pageNo = 1;
				this.memberComplainList()
			}

		},
		methods: {
			onClickTab(item) {
				console.log(item.index)
				this.tabIndex = item.index
				this.pageNo = 1;
				this.memberComplainList()
			
			},
			toAdd(){
				uni.navigateTo({
					url:'/pages/memberComplain/memberComplainAdd'
				})
			},
			toDetail(item){
				uni.navigateTo({
					url:'/pages/memberComplain/memberComplainDetail?id=' + item.id
				})
			},
			
			
			memberComplainList() {
				memberComplainList({
					pageNo: this.pageNo,
					pageSize: 30,
					status:this.tabIndex == 0 ? 1 : 2
				}).then(res => {
					if (res.code == 200) {
						if (this.pageNo == 1) {
							this.memberCoinList = []
						}
						uni.stopPullDownRefresh();
						this.memberCoinList.push(...res.data.rows)
						this.total = res.data.totalRows

					}
				})
			},

		},
	}
</script>


<style lang="scss">
	.list {

		display: flex;
		flex-direction: column;
		padding-top: 10rpx;
		min-height: calc(100vh - 120rpx);
		margin-bottom: 140rpx;
		.item {
			position: relative;
			margin: 10px 15px;
			background-color: #fff;
			border-radius: 10rpx;
			// border-bottom: 1px solid #f6f6f6;
			padding: 20rpx 30rpx; 
			box-shadow: 0px 0px 10rpx #00000033;
			overflow: hidden;
			.content{
				word-wrap: break-word;
			}
			.recover{
				
			}
		
		}
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