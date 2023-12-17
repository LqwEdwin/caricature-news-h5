<template>
	<view>
		<u-tabs :current="tabIndex" @change="onClickTab" :scrollable="false" :list="tabs" lineColor="#ff2663"
			:inactiveStyle="inactiveStyle" :activeStyle="activeStyle"></u-tabs>
		<view class="recommend-h">
			<template v-if="tabIndex == 0 && memberHistory.length">
				<view class="content-h" v-for="(item, index) in memberHistory">
					<view class="content_item-h">
						<view class="img_box">
							<image v-if="item.comicCoverPic" class="content_img" :src="item.comicCoverPic" :lazy-load="true"
								@error="imageError($event, index,'memberHistory')" mode="aspectFill"></u-image>
							<image v-else class="content_img" src="@/static/img_error.jpg" :lazy-load="true"
									@error="imageError($event, index)" mode="aspectFill"></u-image>
							
						</view>
						<view class="item_right size28">
							<view class="title size36">{{ item.comicTitle }}</view>
							<view class="history">上次看到:{{ item.epdTitle }}</view>
							<view>已完结</view>
						</view>
						<!-- :to="{ path: '/reading', query: { comicId: item.comicId, type: 1 } }"
							 -->
						<view class="right_btn size26"  @click="toReading(item)">续看</view>
					</view>
				</view>
			</template>
			
			<template v-if="tabIndex == 1 && memberCollects.length">
				<view class="content-h" v-for="(item, index) in memberCollects">
					<view class="content_item-h">
						<view class="img_box">
							<image v-if="item.comicCoverPic" class="content_img" :src="item.comicCoverPic" :lazy-load="true"
								@error="imageError($event, index,'memberCollects')" mode="aspectFill"></u-image>
							<image v-else class="content_img" src="@/static/img_error.jpg" mode="aspectFill" :lazy-load="true"
									@error="imageError($event, index)"></u-image>
							
						</view>
						<view class="item_right size28">
							<view class="title size36">{{ item.comicTitle }}</view>
							<view class="history" v-if="item.epdTitle === '' || item.epdTitle == null">暂未阅读</view>
							<view class="history" v-if="item.epdTitle != '' && item.epdTitle != null">上次看到:{{ item.epdTitle }}</view>
							<view v-if="item.comicStatus == 0">已完结</view>
							<view v-if="item.comicStatus == 1">未完结</view>
						</view>
						<!-- :to="{ path: '/reading', query: { comicId: item.comicId, type: 1 } }"
							 -->
						<view class="right_btn size26" @click="toReading(item)">续看</view>
					</view>
				</view>
			</template>
		
			
			
		</view>

		<u-empty :text="tabIndex == 0 ? '您还没有阅读过哟' : '您还没有收藏过哟'" mode="list" iconSize="280"
			icon="/static/image/list.png" style="margin-top: 88px; margin-bottom: auto;" :show="data_null"></u-empty>
	</view>
</template>

<script>
	import { memberCollectList, memberHistoryList } from '@/api/member';

	export default {
		data() {
			return {
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
						name: "历史"
					},
					{
						name: "收藏"
					}

				],
				memberHistory: [],
				memberCollects: [],
			};
		},
		onShow() {
			if(this.tabIndex == 0){
				this.memberHistoryList()
			}else{
				this.memberCollectList()
			}
		},
		methods: {
			toReading(item){
				uni.navigateTo({
					url:'/pages/reading/reading?comicId='+  item.comicId + '&type=1' + '&speedMode=' + item.speedMode
				})
			},
			imageError: function(e, index,list) {
				// console.error('image发生error事件，携带值为' + e.detail.errMsg)
				if(list){
					this[list][index]['comicCoverPic'] = '../../static/img_error.jpg'
				}
				
			},
			onClickTab(item) {
				console.log(item.index)
				this.tabIndex = item.index
				if(this.tabIndex == 0){
					this.memberHistoryList()
				}else{
					this.memberCollectList()
				}

			},
			memberCollectList(){
				if (uni.getStorageSync('token')) {
					memberCollectList().then(res => {
						if (res.code == 200) {
							this.memberCollects = res.data.rows;
							
						}
						
						if (this.tabIndex == 1 && this.memberCollects.length == 0) {
							this.data_null = true
						} else {
							this.data_null = false
						
						}
					})
				}else{
					this.data_null = true
				}
			},
			memberHistoryList(){
				if (uni.getStorageSync('token')) {
					memberHistoryList().then(res => {
						if (res.code == 200) {
							this.memberHistory = res.data.rows;
							if (this.tabIndex == 0 && this.memberHistory.length == 0) {
								this.data_null = true
							} else {
								this.data_null = false
							
							}
						}
					})
				}else{
					this.data_null = true
				}
				
			},

		}
	};
</script>
<style lang="scss" scoped >
	.recommend-h {
	  margin-top: 20rpx;
	  padding: 10rpx;
	  background-color: #fff;
	}
	.content-h {
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
	}
	.content_item-h {
	  margin-right: 2rpx;
	  display: flex;
	  align-items: center;
	  margin-bottom: 20rpx;
	}
	.img_box {
		flex-shrink: 0;
	  position: relative;
	  width: 25%;
	  height: 240rpx;
	}
	.content_img {
		border-radius: 10rpx;
		border: 1rpx solid #ddd;
	  width: 100% !important;
	  height: 100% !important;
	}
	.item_right {
	  width: 75%;
		height: 220rpx;
		padding: 10rpx 0;
	  margin-left: 20rpx;
	  color: #475467;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
	}
	.item_right .title {
	  color: #101010;
	  display: -webkit-box;
		word-break: break-all;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 3;
	  overflow: hidden;
	  font-weight: bold;
	  font-weight: bold;
	}
	
	.right_btn {
	  width: 100rpx;
	  height: 50rpx;
	  line-height: 50rpx;
	  margin-right: 20rpx;
	  
	  text-align: center;
	  border-radius: 30rpx;
	  background:$uni-color-theme;
	  color: $uni-color-white;
	}
</style>