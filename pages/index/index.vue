<template>

	<view>
		<mescroll-uni-diy ref="mescrollRef" :top="status_height" :down="downOption" @down="downCallback" :up="upOption"
			@up="upCallback">
			<view class="select van-safe-area-top" v-show="showDisV">
				<img src="/static/logo.png" style="height: 80rpx">

				<view class="size28" style="margin-left: 20rpx;">海量未删减漫画-丁丁漫画</view>
				<view class="size26" style="background-color: #fff; height: 60rpx;color: #ff2563;line-height: 60rpx; padding: 0 20rpx; border-radius: 10rpx;"  @click="$refs.showDisOvComponent.showDisOv = true">添加桌面</view>
			
				<view style="float: right">
					<u-icon name="close-circle" size="20" color="#fff" @click="showDisV = false" />
				</view>
			</view>
			<view style="margin-bottom: 30rpx;">
				<u-swiper :list="bannerList" keyName="image" indicator indicatorMode="line" circular
					:loading="lunbo_loading" radius="0" height="200" imgMode="aspectFill"></u-swiper>
			</view>
			<view class="m-row-30 mb50" @click="searchvd()">
				<u-search :inputStyle="{'font-size':'14px'}" placeholder="请输入搜索关键词" height="60rpx" :show-action="false"
					@click="searchvd()"></u-search>
			</view>

			<u-grid :col="4" :border="false">
				<u-grid-item v-for="(item,index) in grid_list" :key="index" @click="opulra(item.url)">
					<u-icon :name="item.icon" :size="36"></u-icon>
					<view class="grid-text">{{item.name}}</view>
				</u-grid-item>
			</u-grid>


			<!-- <view v-for="(item,index) in bookList"> -->

			<view style="display: flex;justify-content: space-between;margin-bottom: 15px;margin-top: 10px;">
				<text style="font-weight: 500;margin-left: 20rpx;color: #000;font-size: 18px;">热门必看</text>

			</view>
			<view>
				<homeList :hot-list="list"></homeList>
			</view>
			<!-- </view> -->

			<u-empty text="暂时没有数据哦" mode="list" iconSize="280" icon="/static/image/list.png"
				style="margin-top: 88px; margin-bottom: auto;" :show="data_null"></u-empty>
		</mescroll-uni-diy>


<showDisOvComponent ref="showDisOvComponent"></showDisOvComponent>

	</view>
</template>

<script>
	import showDisOvComponent from '@/components/showDisOvComponent.vue'
	import MescrollItem from "./mescroll-swiper-item.vue";
	import appUpdate from "@/components/yzhua006-update/app-update.vue"
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	import homeList from '@/components/homeList.vue'
	import MescrollUniDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/beibei/mescroll-uni.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		getIndexData
	} from '@/api/index.js'
	import {
		comicCategoryList,
		comicList
	} from '@/api/class.js';
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			w_md5,
			appUpdate,
			MescrollItem,
			MescrollUniDiy,
			homeList,
			showDisOvComponent
		},
		data() {
			return {
				 
				showDisV:true,
				totalPage: 1,
				list: [],
				status_height: 0,
				data_null: false,
				indexData: {},
				bannerList: [],
				hot: [],
				recommend: [],
				fee: [],
				free: [],
				love_list: [],
				height: "600px", // 需要固定swiper的高度
				heightt: "600px", // 需要固定swiper的高度
				isLogin: true,
				grid_list: [{
						icon: '/static/menu/shiduicon.png',
						url: '/pages/ranking/ranking?active=0',
						name: '免费榜'
					},
					{
						icon: '/static/menu/shujurizhi.png',
						url: '/pages/ranking/ranking?active=1',
						name: '畅销榜'
					},
					{
						icon: '/static/menu/new.png',
						url: '/pages/ranking/ranking?active=2',
						name: '新作榜'
					},
					{
						url: '/pages/vip/vip',
						icon: '/static/menu/VIPzhuanshukuaixun.png',
						name: '畅读包'
					}
				],
				bookList: [],
				lunbo_loading: false,
				pageNo: 1,
				pageSize: 20,
				downOption: {
					auto: false,
					offset: 80
					// bgColor: "#000",
				},
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: false, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 1, // 每页数据的数量
						time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					noMoreSize: 6, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
					bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
					textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
					textLoading: '正在加载~', // 加载中的提示文本
					textNoMore: '主人，已经到底了哦~', // 没有更多数据的提示文本
					toTop: {
						src: '' //为空禁用回到顶部按钮
					},
					empty: {
						use: false, // 是否显示空布局
						icon: "https://www.mescroll.com/img/mescroll-empty.png", // 图标路径
						tip: '~ 暂无相关数据 ~', // 提示
						btnText: '按钮', // 按钮
						fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
						top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
						zIndex: 99 // fixed定位z-index值
					},
				}

			}
		},

		onLoad() {
			this.status_height = uni.getSystemInfoSync().statusBarHeight + 'px'
			// 需要固定swiper的高度
			// #ifndef H5
			this.height = uni.getSystemInfoSync().windowHeight + 'px'
			this.heightt = uni.getSystemInfoSync().windowHeight + 'px'
			// #endif
			// #ifdef H5
			this.height = uni.getSystemInfoSync().windowHeight + 'px'
			this.heightt = uni.getSystemInfoSync().windowHeight + 50 + 'px'
			// #endif
			this.statusHeight = uni.getSystemInfoSync().statusBarHeight + 44 + 'px'



		},
		onReady() {
			// this.$refs.app_update.update();
		},

		onShow() {
			
			this.data_null = false
			if (!uni.getStorageSync('user')) {
				console.log("未登录", uni.getStorageSync('user'))
				this.isLogin = true
			} else {
				console.log("已登录", uni.getStorageSync('user'))
				this.isLogin = false
			}
			this.initData()
		},
		methods: {
			
			initData() {

				//本地存一份
				//// 默认缓存期限为1天
				const DEFAULT_CACHE_TIME_IDX = 60 * 60 * 24;
				let taDayTiem = new Date().getTime()
				let time = uni.getStorageSync('DEFAULT_CACHE_TIME')

				let initDateInStorage = uni.getStorageSync('IDX_INIT_DATA')
				if (time && (taDayTiem - time > DEFAULT_CACHE_TIME_IDX)) {
					uni.removeStorageSync('IDX_INIT_DATA', '')
					uni.removeStorageSync('DEFAULT_CACHE_TIME', '')
				}
				if (!initDateInStorage || !time || initDateInStorage === undefined) {
					this.lunbo_loading = true

					getIndexData({}).then((res) => {
						this.lunbo_loading = false
						if (res.code == 200) {
							this.initIndexData(res.data)
							uni.setStorageSync('IDX_INIT_DATA', res.data)
							uni.setStorageSync('DEFAULT_CACHE_TIME', new Date().getTime())
						}
					});
				} else {

					this.initIndexData(initDateInStorage)

				}

			},
			initIndexData(data) {
				this.bookList = []
				this.get_class_list()
				const {
					hot,
					recommend,
					fee,
					free
				} = data

				// if (this.bookList && this.bookList.length == 0) {
				// 	this.data_null = true
				// }
				this.hot = hot
				this.recommend = recommend
				this.fee = fee
				this.free = free
				this.indexData = data;
				this.bannerList = this.indexData.bannerList
				this.bannerList.forEach(item => {
					if (item.image.indexOf('http:') == -1) {
						item.image = 'http:' + item.image
					}

				})
			},
			// 页面跳转 
			opulra(url) {
				uni.navigateTo({
					url: url
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '../login/login'
				})
			},


			search() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			searchvd() {

				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			LinkTojumpurl(url) {
				// #ifdef H5
				window.open(url, "_self")
				// #endif
				// #ifdef APP-PLUS
				plus.runtime.openURL(url)
				// #endif
			},

			/*下拉刷新的回调 */
			downCallback() {
				this.pageNo = 1
				this.mescroll.setPageNum(1)
				this.get_class_list()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				if (this.toListLength < this.pageSize) {
					this.upOption.textNoMore = "主人，已经到底了哦~"
					uni.showToast({
						icon: 'none',
						title: '没有更多了'
					})
					this.mescroll.endByPage(this.toListLength, this.totalPage + 1);
					return;
				}
				this.pageNo += 1;
				this.get_class_list()
			},
			get_class_list() {
				let data = {
					cid: 0,
					status: 0,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}
				comicList(data).then(res => {
					console.log("漫画列表: ", res.data);
					if (this.pageNo == 1) {
						this.mescroll.setPageNum(1)
						this.list = res.data.rows
					} else {
						this.list = this.list.concat(res.data.rows)
					}
					this.toListLength = res.data.rows.length
					if (this.list.length == 0) {
						this.data_null = true
					} else {
						this.data_null = false

					}
					this.totalPage = Math.ceil(this.list.length / this.pageSize)
					this.mescroll.endByPage(res.data.rows.length, this.totalPage + 1);
				})
			},
		}
	}
</script>

<style lang="scss">
	.lists {
		margin-top: 5px;
		width: 100%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		text-align: left;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: flex-start;
	}

	button::after {
		border: none
	}

	.i_new_title {
		font-size: 14px;
		font-weight: 300;
		color: #fff;
		display: -webkit-box;
		/* -webkit-box-orient: vertical; */
		/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.grid-text {
		font-size: 12px;
		/* color: #909399; */
		padding: 5rpx 0 20rpx 0rpx;
	}

	.scroll-list {
		@include flex(column);

		&__goods-item {
			margin-right: 10px;

			&__image {
				width: 80px;
				height: 110px;
				border-radius: 8px;
			}

			&__text {
				color: #f56c6c;
				text-align: center;
				font-size: 12px;
				margin-top: 5px;
			}
		}

		&__show-more {
			background-color: #fff0f0;
			border-radius: 3px;
			padding: 3px 6px;
			@include flex(column);
			align-items: center;

			&__text {
				font-size: 12px;
				width: 12px;
				color: #f56c6c;
				line-height: 16px;
			}
		}
	}
	
	.select {
	  flex: 1;
	  display: flex;
	  height: 100rpx;
	  background: #ff2563;
	  color: #fff;
	  line-height: 100rpx;
	  justify-content: space-around;
	  align-items: center;

	}
</style>