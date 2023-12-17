<template>
	<view>
		<u-tabs :current="tabIndex" @change="onClickTab" :scrollable="false" :list="tabs" lineColor="#ff620e"
			:inactiveStyle="inactiveStyle" :activeStyle="activeStyle"></u-tabs>
		<view class="lists main">
			<classItem :data="memberCollects" :sort="true" ></classItem>
		</view>
		<u-empty text="暂无排行榜" mode="list" iconSize="280"
			icon="/static/image/list.png" style="margin-top: 88px; margin-bottom: auto;" :show="data_null"></u-empty>
	</view>
</template>
<script>
	import { getRankingData } from '@/api/index.js';
	import classItem from "@/components/classItem.vue"
	export default {
		components:{
			classItem
		},
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
						name: "总榜",
						code: 4, 
						value: 'hot'
					},
					{
						name: "推荐",
						code: 3, 
						value: 'recommend'
					},
					{
						name: "畅销",
						code: 1, 
						value: 'fee'
					}

				],
				
				memberCollects: [],
			};
		},
		onLoad(op) {
			this.tabIndex = op.active
			
			this.getRankingData()
		},
		onShow() {
			
		},
		methods: {
			toReading(item){
				uni.navigateTo({
					url:'/pages/reading/reading?comicId='+  item.comicId + '&type=1&speedMode=' + item.speedMode
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
				this.getRankingData()


			},
			getRankingData(){
				let tag = this.tabs[this.tabIndex].value;
				getRankingData(tag).then(res => {
					if (res.code == 200) {
						this.memberCollects = res.data;
						
					}
					if (this.tabIndex == 1 && this.memberCollects.length == 0) {
						this.data_null = true
					} else {
						this.data_null = false
					
					}
				})
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