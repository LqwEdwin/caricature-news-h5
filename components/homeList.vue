<template>
	<view >
		<view class="lists" style="display: flex;flex-wrap: wrap;">
		    <view v-for="(item,index) in hotList" :key="index" style="width: 48%;margin-left: 1%;margin-right: 1%;" @click="toComicDirectory(item)">
		    	
		    	<u-image  width="100%" height="90px" radius="5" :src="item.coverPic" :lazy-load="true">
					<view slot="error" style="font-size: 24rpx;">加载失败</view>
				</u-image> 
		    	<u--text :lines="1" :text="item.title" margin="10px 0 3px 0"></u--text>
				<u--text :lines="1" :text="item.summary" margin="0 0 15px 0" size="12" color="#616161"></u--text>

		    </view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "homeList",
		props: {
			hotList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				list: [],
			};
		},
		watch: {
			hotList() {
				this.list = JSON.parse(JSON.stringify(this.hotList))
			}

		},
		mounted() {
			this.list = JSON.parse(JSON.stringify(this.hotList))
		},
		methods: {
			imageError(e, index) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
				// console.log(e)
				this.list[index]['coverPic'] = '@/static/img_error.jpg'
			},
			toComicDirectory(item) {
				uni.navigateTo({
					url: '/pages/comicDirectory/comicDirectory?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		// justify-content: space-around;
		margin: 0 12rpx !important;
	}

	.content_item {
		flex-shrink: 0;
		width: 230rpx;
		padding: 0 6rpx !important;
	}

	.img_box {
		position: relative;
		width: 100%;
		height: 300rpx;
	}

	.content_img {
		width: 100%;
		height: 100%;
	}

	.dec {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 50rpx;
		// padding: 0 5%;
		background: rgba(0, 0, 0, 0.25);
		color: #fff;
		line-height: 50rpx;

		text-align: right;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.item_title {

		color: #101010;
		font-weight: 500;
		overflow: hidden; //超出的文本隐藏
		text-overflow: ellipsis; //溢出用省略号显示
		white-space: nowrap;
	}

	.item_dec {

		color: #475467;
		overflow: hidden; //超出的文本隐藏
		text-overflow: ellipsis; //溢出用省略号显示
		white-space: nowrap;
	}
</style>