<template>
	<view>
		<view class="list" v-if="memberOList && memberOList.length">
			<view class="item" v-for="(item, index) in memberOList" :key="index" @click="goResult(item.id,item.status)">
				<view class="item_top size30">
					<view class="item_name">订单号：<text class="name_text size28">{{ item.sn }}</text></view>
					<view v-if="item.status == 0 " class="item_status size28" style="color:#E6A23C">充值中</view>
					<view v-if="item.status == 1 " class="item_status size28" style="color:#67C23A">充值成功</view>
					<view v-if="item.status == -1 " class="item_status size28" style="color:#e63c3c">订单关闭</view>

				</view>
				<view class="item_bottom">
					<view class="time size28">{{ item.orderDate }} </view>
					<view class="pay_type size28" v-if="item.payType == 'WECHAT'">微信</view>
					<view class="pay_type size28" v-if="item.payType == 'ALIPAY'">支付宝</view>
					<view class="item_right size36"  v-if="item.type == 1">
						<text>{{ item.amount }}</text>
					</view>
					<view class="item_right size36" v-else>
						<text> {{ item.amount }}</text>
					</view>
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
		memberOrderList
	} from "@/api/member.js"

	export default {
		components: {

		},
		data() {
			return {
				pageNo: 1,
				total: 1,
				memberOList: [],
			};
		},
		onPullDownRefresh() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.pageNo = 1;
				this.memberOrderList();
			}
		},
		onReachBottom() {
			this.pageNo++;
			if (this.memberOList.length >= this.total) {
				return;
			}
			this.memberOrderList();
		},
		onShow() {
			const token = uni.getStorageSync('token')
			if (token) {
				this.pageNo = 1;
				this.memberOrderList()
			}

		},
		methods: {
			memberOrderList() {
				memberOrderList({
					pageNo: this.pageNo,
					pageSize: 30
				}).then(res => {
					if (res.code == 200) {
						if (this.pageNo == 1) {
							this.memberOList = []
						}
						uni.stopPullDownRefresh();
						this.memberOList.push(...res.data.rows)
						this.total = res.data.totalRows

					}
				})
			},

		}
	}
</script>

<style lang="scss">
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 20rpx;
		min-height: calc(100vh - 120rpx);

		.item {
			
			margin: 10rpx 15rpx;
			background-color: #fff;
			border-radius: 10rpx;
			// border-bottom: 1rpx solid #f6f6f6;
			padding: 10rpx 30rpx;
			box-shadow: 0rpx 0rpx 10rpx #00000033;

			.item_top {
				
				display: flex;
				align-items: center;
				justify-content: space-between;

				.item_name {
					

					.name_text {
						// color: red;
					}
				}

				.item_status {
					
				}
			}

			.item_bottom {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 10rpx;

				.time {
					color: #999;
					
				}

				.pay_type {
					
				}

				
			}
		}
	}
</style>