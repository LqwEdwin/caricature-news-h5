<template>
	<view>
		<view class="list size36" v-if="memberCoinList && memberCoinList.length">
			<view class="item" v-for="(item, index) in memberCoinList" :key="index">
				<view>
					<view class="item_name size28">{{ item.eventName }}</view>
					<view class="time size28">{{ item.createTime }}</view>
				</view>

				<view class="item_right size36" v-if="item.type == 1">
					<text style="color: #ff296c">{{ item.coin }}</text>
				</view>
				<view class="item_right size36" v-else>
					<text style="color: #04be02"> +{{ item.coin }}</text>
				</view>
			</view>
		</view>
		<view class="mt240" v-else >
			<u-empty class="mt240" description="暂无内容" />
		</view>
		
	</view>
</template>

<script>
	import {
		memberCoinLogList
	} from "@/api/member.js"

	export default {
		components: {

		},
		data() {
			return {
				pageNo: 1,
				total: 1,
				memberCoinList: [],
			};
		},
		onPullDownRefresh() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.pageNo = 1;
				this.memberCoinLogList();
			}
		},
		onReachBottom() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.pageNo++;
				if (this.memberCoinList.length >= this.total) {
					return;
				}
				this.memberCoinLogList();
			}
			
		},
		onShow() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.pageNo = 1;
				this.memberCoinLogList()
			}

		},
		methods: {
			memberCoinLogList() {
				memberCoinLogList({
					pageNo: this.pageNo,
					pageSize: 30
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
		padding-top: 20rpx;
		min-height: calc(100vh - 120rpx);

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;

			margin: 10rpx 15rpx;
			background-color: #fff;
			border-radius: 10rpx;
			// border-bottom: 1rpx solid #f6f6f6;
			padding: 10rpx 30rpx;
			box-shadow: 0rpx 0rpx 10rpx #00000033;

			.item_name {}

			.time {
				color: #999;

			}

			.item_right {
				font-weight: bold;

			}
		}
	}
</style>