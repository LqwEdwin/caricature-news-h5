<template>
	<view>
		<view class="lists main">

			<view v-for="(item,index) in data" :key="index" class="c1content_item " @click="toComicDirectory(item)">
				<view class="c1img_box">
					<image v-if="item.coverPic" class="content_img" :src="item.coverPic"  mode="aspectFill" :lazy-load="true"
						@error="imageError($event, index)"></u-image>
					<image v-else class="content_img" src="@/static/img_error.jpg" mode="aspectFill" :lazy-load="true"
							@error="imageError($event, index)"></u-image>
						<text class="dec size24" v-if="item.status == 1">已完结</text>
						<text class="dec size24" v-if="item.status == 0">更新至{{ item.episodesNum }}话</text>
				</view>
				<view class="c1item_right ">
					<view class="item_text_box size28">
						<view class="title size32 mb5">{{ item.title }}</view>
						<view class="m-col-5">作者:{{ item.author }}</view>
						<view class="m-col-5">人气值：{{ item.readerFmt }}</view>
						<view class="introduce m-col-5">{{ item.summary }}</view>
					</view>
					<view v-if="sort" class="sort_box size30" :style="{
						background:
						  index == 0 ? '#d5625f' : index == 1 ? '#dabda3' : index == 1 ? '#ebd0b9' : '',
					  }">NO.{{ index + 1 }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CryptoJS from 'crypto-js'
	import {
		encrypt,
		decrypt
	} from '@/utils/crypto.js'
	export default {
		name: "classItem",
		props: {
			data: {
				type: Array,
				default () {
					return []
				},
			},
			sort: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				
			};
		},
		mounted() {
			// this.decryptImage(this.encryptedImageUrl)
		},
		methods: {
			imageError: function(e, index) {
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
				// console.log(e)
				this.data[index]['coverPic'] = '@/static/img_error.jpg'
			},
			toComicDirectory(item) {
				uni.navigateTo({
					url: '/pages/comicDirectory/comicDirectory?id=' + item.id
				})
			},

			

		},


	}
</script>

<style lang="scss" scoped>
	.lists {
		margin-top: 5rpx;
		width: 96%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		text-align: left;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: flex-start;
	}


	.c1content_item {
		width: 100%;
		margin-right: 2rpx;
		display: flex;
		margin-bottom: 20rpx;
		padding: 0 10rpx;
	}

	.c1img_box {
		flex-shrink: 0;
		position: relative;
		width: 25%;
		height: 230rpx;
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
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.c1item_right {
		width: 75%;
		margin-left: 20rpx;
		display: flex;
		align-items: center;

		.item_text_box {
			flex: 1;
			color: #475467;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			.title {
				color: #101010;

				font-weight: 300;
				display: -webkit-box;
				/* -webkit-box-orient: vertical; */
				/*! autoprefixer: off */
				-webkit-box-orient: vertical;
				/* autoprefixer: on */
				-webkit-line-clamp: 1;
				overflow: hidden;

				font-weight: bold;
			}
		}

		.sort_box {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100rpx;
			height: 100rpx;
			background: #ccc;
			color: #fff;
			border-radius: 50%;
			margin-left: 10rpx;
			font-weight: bold;

		}
	}

	.c1item_right .introduce {
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>