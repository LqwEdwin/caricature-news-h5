<template>
	<view class="item" style="display: flex;padding: 15px;" @click="read_chapter(item)">
		<view style="position: relative; border:0.5px solid #eee;border-radius: 5px;width: 120px;height: 65px;background-size: cover;background-image: url(/static/detail/mkz_bg_chapter_loading_img.png);">
			<image :src="item.imgUrl || '/static/detail/mkz_bg_chapter_loading_img.png'" style="width: 120px;height: 65px;border-radius: 5px;" lazy-load mode="aspectFill" ></image>
			<view v-if="getLockIconStatus(item.episodesCoin,item.unlockId)" style="position: absolute;left: 0px;top: -2px;border-radius: 0px;" >
				<image src="/static/detail/mkz_ic_detaillist_vip_w.png" mode="aspectFill"  style="width: 48rpx;height: 32rpx;border-radius: 0px;" lazy-load></image>
			</view>
			
		</view>
		<view style="margin-left: 13px;margin-top: auto;margin-bottom: auto;">
			<view style="line-height: 50rpx;">
				<u-text :text="item.title" size="14"></u-text>
			</view>
			<view style="line-height: 50rpx;">
				<text class="size24 font-color-grey" v-if="item.episodesCoin && Number(item.episodesCoin) > 0">
					{{item.episodesCoin}}书币
				</text>
				<text class="size24 font-color-grey"  v-else>
					免费	
				</text>
				<!-- <u-text :text="item.addtime | date('yyyy-mm-dd')" color="grey" size="12"></u-text> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {

			item: {
				type: Object,
				default: () => ({
					id: 1,
					picx: '/static/detail/mkz_bg_chapter_loading_img.png',
					name: 1,
					addtime: '2020-01-01 22:22:22',
					cion: '0',
					vip: '0'
				})
			},
			id: [Number, String]
		},
		methods: {
			getLockIconStatus(episodesCoin, unlockId) {
				if (unlockId != '0' || unlockId != 0) {
					//已解锁，不显示
					// console.log('已解锁，不显示');
					return false;
				} else {
					if (episodesCoin != '0' || episodesCoin != 0) {
						//金币大于0 并且 解锁ID等于0，未解锁
						// console.log('未解锁');
						return true;
					} else {
						// console.log('免费');
						return false;
					}
				}
			},
			
			read_chapter(item){
				this.$emit('read_chapter',item)
			},
		}
	}
</script>

<style>
</style>
