<template>
	<!-- 
	swiper中的transfrom会使fixed失效,此时用height固定高度; 
	swiper中无法触发mescroll-mixins.js的onPageScroll和onReachBottom方法,只能用mescroll-uni,不能用mescroll-body
	-->
	<!-- ref动态生成: 字节跳动小程序编辑器不支持一个页面存在相同的ref (如不考虑字节跳动小程序可固定值为 ref="mescrollRef") -->
	<!-- top的高度等于悬浮菜单tabs的高度 -->
	<mescroll-uni @scroll="scroll" :ref="'mescrollRef'+i" @init="mescrollInit" :height="height" :down="downOption"
		@down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" :top="i==1?up_nav_height:0">
		<!-- 数据列表 -->
	
		</mescroll-uni>
</template>
<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	import {
		getIndexData
	} from '@/api/index.js'
	export default {
		components: {
			w_md5
		},
		mixins: [MescrollMixin, MescrollMoreItemMixin], // 注意此处还需使用MescrollMoreItemMixin (必须写在MescrollMixin后面)
		data() {
			return {
				downOption: {
					auto: true, // 不自动加载 (mixin已处理第一个tab触发downCallback)
					inOffsetRate: 0.4,
					minAngle: 60
				},
				upOption: {
					auto: false, // 不自动加载
					onScroll: true,
					textNoMore: "没有更多了",
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
						btnText: '去看看'
					},
					toTop: {
						// 回到顶部按钮,需配置src才显示
						// src: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-fc0da29a-7f60-4d5e-92de-6d664018ab77/d27c3887-1994-46fc-b816-5b88d40493ac.png", // 图片路径
						src: "/static/image/mkz_pic_detail_nlhd.png",
						offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
						duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
						zIndex: 9990, // fixed定位z-index值
						left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
						right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
						bottom: 120, // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
						safearea: false, // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取mescroll组件props的safearea值)
						width: 72, // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
						radius: "90%" // 圆角, 默认"50%" (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
					},
				},
				list: [1, 2, 3, 4, 5, 6], //列表数据
				nav_color: "rgba(0,0,0,0)",
				search_bgColor: "rgba(0,0,0,0.2)",
				search_color: "#fff",
				inactiveStyle: {
					color: '#ffffff'
				},
				activeStyle: {
					color: '#ffffff',
					'font-size': '18px',
					'font-weight': '500'
				},
				grid_list: [{
						icon: '/static/menu/1.png',
						name: '排行'
					},
					{
						icon: '/static/menu/2.png',
						name: '会员中心'
					},
					{
						icon: '/static/menu/3.png',
						name: '收藏'
					},
					{
						icon: '/static/menu/4.png',
						name: '摄影写真'
					},
					// {
					// 	icon:'/static/menu/mkz_ic_home_sd.png',
					// 	name:'分类'
					// },
					{
						icon: '/static/menu/5.png',
						name: '小说'
					}
				],
				gj_loading: true,
				lunbo_loading: true,
				lunbo_list: [],

		
				time: '',
				token: '',
				app_key: '',
				websiteUrl: '',
				utoken: '',
				statusHeight: 0,
				hits_list: [],
				hits_one: {},

				new_list: [],
				jx_data: [], //APP精选必看内容,显示6个
				love_list: [],
				love_page_num: 1,
				today_page_num: 1,

				update_data: [],
				nums: 0, //数据量
				pass: 'password',
				height: "600px", // 需要固定swiper的高度

			}
		},
		props: {
			i: Number, 
			index: { 
				type: Number,
				default () {
					return 0
				}
			},
			tabs: { 
				type: Array,
				default () {
					return []
				}
			},

			ctgg: [Object, Array],
			height: [Number, String], // mescroll的高度
	
			up_nav_height: {
				type: String,
				default: '80px'
			}
		},
		methods: {
			opulrafl() {
				uni.switchTab({
					url: '/pages/class/class'
				})
			},
			
			opulra(url) {
				uni.navigateTo({
					url: url
				})
			},
			
			scroll(e) {
				// this.mescroll.lockUpScroll(true)
				// console.log('当前滚动条的位置:' + e.scrollTop + ', 是否向上滑:'+e.isScrollUp)
				console.log('当前滚动条的位置:' + this.i)
				if (this.i == 0) {
					if (e.isScrollUp) {
						if (e.scrollTop > 28) {
							this.$emit('myEvent', true)
						}
					} else {
						if (e.scrollTop < 28) {
							this.$emit('myEvent', false)
						}
					}
				}
			},
	
			toLogin() {
				this.utoken = uni.getStorageSync('user')
				if (this.utoken == '') {
					uni.navigateTo({
						url: '../login/login'
					})
				} else {
					uni.navigateTo({
						url: '../ucenter/vip/vip'
					})
				}

			},
			click_tab(item) {
				console.log('item', item);
			},
			chakangengduo(id) {
				uni.switchTab({
					url: '../class/class?id=' + id
				})
			},
			imageError: function(e, index) {
				// console.error('image发生error事件，携带值为' + e.detail.errMsg)
				this.new_list[index]['cover_url'] = '../../static/img_error.jpg'
			},
			search() {
				uni.navigateTo({
					url: "../search/search"
				})
			},
			more_click() {
				uni.navigateTo({
					url: "../class/class"
				})
			},
			grid_click(index) {
				this.utoken = uni.getStorageSync('user')
				uni.navigateTo({
					url: '../ranking/ranking'
				})
			},
			// 轮播图点击
			lunbo_click(index) {
				this.get_detail(this.lunbo_list[index].id)
				// console.log(this.lunbo_list)
				// this.LinkTojumpurl(this.lunbo_list[index].urllink)
			},
			
			// 跳转到其他网页
			LinkTojumpurl(url) {
				// #ifdef H5
				window.open(url, "_self")
				// #endif
				// #ifdef APP-PLUS
				plus.runtime.openURL(url)
				// #endif
			},
			get_detail(id) {
				console.log(id)
				uni.navigateTo({
					url: '../detail/detail?id=' + id
				})
			},
			// 自动注册
			reg() {
				if (!uni.getStorageSync('user')) {
					console.log("未登录", uni.getStorageSync('user'))
					var email = getApp().globalData.deviceid + "@qq.com"
					var time = new Date().getTime()
					this.app_key = getApp().globalData.websiteKey
					var param = "code=1234&deviceid=" + getApp().globalData.deviceid + "&email=" + email + "&facility=" +
						getApp().globalData.facility + "&inviteid=10001&pass=" + this.pass + "&timestamp=" + time
					var sign = w_md5.hex_md5_32Upper(param + this.app_key)
					uni.request({
						url: getApp().globalData.websiteUrl + "/index.php/appv1/login/reg?" + param + "&sign=" +
							sign,
						success: (res) => {
							console.log("注册结果: ", res);
							if (res.data.code == 1) {
								uni.showToast({
									icon: 'none',
									position: 'bottom',
									title: res.data.msg
								});
								console.log("注册成功")
							} else {
								// uni.showToast({
								//     icon: 'none',
								// 	position: 'bottom',
								//     title: res.data.msg
								// });
								console.log(res.data.msg)
							}
						},
						complete: (e) => {
							this.login()
						}
					})
				} else {
					console.log("已登录", uni.getStorageSync('user'))
				}
			},
			// 自动登录
			login() {
				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey
				var email = getApp().globalData.deviceid + "@qq.com"
				var param = "deviceid=" + getApp().globalData.deviceid + "&email=" + email + "&facility=" + getApp()
					.globalData.facility + "&pass=" + this.pass + "&timestamp=" + time
				var sign = w_md5.hex_md5_32Upper(param + this.app_key)
				uni.request({
					url: getApp().globalData.websiteUrl + '/index.php/appv1/login/index?' + param + "&sign=" +
						sign,
					header: {
						'content-type': 'application/json' //自定义请求头信息
					},
					success: (res) => {
						//console.log(res.data)
						if (res.data.code == 0) {
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: res.data.msg
							});
						} else {
							getApp().globalData.uid = res.data.uid
							getApp().globalData.utoken = res.data.token
							uni.setStorageSync('user', {
								uid: res.data.uid,
								utoken: res.data.token
							})
							console.log("登录成功", uni.getStorageSync('user'))
						}
					}
				});
			},
			index_data() {
				// this.reg()
				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey

				var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility +
					"&reco_size=7&timestamp=" + time
				// console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",param)
				var sign = w_md5.hex_md5_32Upper(param + this.app_key)

				uni.request({
					url: getApp().globalData.websiteUrl + "/index.php/appv1/comic/index?" + param + "&sign=" +
						sign,
					success: (res) => {
						// console.log(res.data)
						this.hits_list = res.data.data.reco
						this.hits_one = this.hits_list[0]
						this.hits_list.shift() //删除数组第一个元素
						this.lunbo_list = res.data.data.banner
						this.new_list = res.data.data.news
						this.jx_data = res.data.data.class
						this.lunbo_loading = false
						this.gj_loading = false
						// uni.stopPullDownRefresh()
						this.mescroll.endSuccess()
					}
				})
			},
			love_data() {
				this.love_page_num = 1
				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey

				var param = "cid=0&deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData
					.facility + "&page=" + this.love_page_num + "&pay=0&size=10&sort=hits&state=0&timestamp=" + time
				var sign = w_md5.hex_md5_32Upper(param + this.app_key)

				uni.request({
					url: getApp().globalData.websiteUrl + "/index.php/appv1/comic/data?" + param + "&sign=" + sign,
					success: (res) => {
						//console.log(res.data)
						this.love_list = res.data.list
						this.nums = res.data.nums
						// uni.stopPullDownRefresh()
						this.mescroll.endSuccess()
					}
				})
			},
			love_data_more() {

				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey

				var param = "cid=0&deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData
					.facility + "&page=" + this.love_page_num + "&pay=0&size=10&sort=hits&state=0&timestamp=" + time
				var sign = w_md5.hex_md5_32Upper(param + this.app_key)

				uni.request({
					url: getApp().globalData.websiteUrl + "/index.php/appv1/comic/data?" + param + "&sign=" + sign,
					success: (res) => {
						//console.log(res.data)
						this.love_list = this.love_list.concat(res.data.list)
						// uni.stopPullDownRefresh()
						this.mescroll.endSuccess(res.data.list.length)
					}
				})
			},

			/*下拉刷新的回调 */
			downCallback() {
				console.log('刷新成功')
				// this.index_data()
				this.love_data()
				// // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				this.love_page_num = this.love_page_num + 1
				this.love_data_more()
				// this.mescroll.endUpScroll(true)
				// this.index_data()
			},
			//点击空布局按钮的回调
			emptyClick() {
				uni.showToast({
					title: '点击了按钮,具体逻辑自行实现'
				})
			}
		}
	}
</script>
<style>
	.imgisd {
		width: 60upx;
		height: 60upx;
	}

	.tinda {
		top: -100upx;
		line-height: 60upx;
		text-align: center;
		padding: 50upx 0px 0px 0upx;
		background: #ffffff;
		position: absolute;
		width: 100%;
		border-top-left-radius: 40upx;
		border-top-right-radius: 40upx;
	}

	.fdad {
		margin-left: 6upx;
		font-size: 30upx;
		font-weight: 600;
	}

	.text-over {
		overflow: hidden;
		text-align: left;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.text-over2 {
		overflow: hidden;
		text-align: left;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.text-over3 {
		overflow: hidden;
		text-align: left;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.imgst {
		width: 100%;
		height: 250upx;
		border-radius: 16upx;
	}

	/* 游戏 */
	.mt16 {
		margin-top: 32rpx;
	}

	.box {
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0rpx 8rpx 40rpx 0rpx rgba(0, 0, 0, 0.04);
		border-radius: 32rpx;
	}

	.pd16_15 {
		padding: 32rpx 30rpx;
	}

	.flex {
		display: flex;
	}

	.flex.alcenter {
		align-items: center;
	}

	.ml15 {
		margin-left: 30rpx;
	}

	.ft14 {
		font-size: 28rpx;
	}

	.ftw500 {
		font-weight: 500;
	}

	.cl-main {
		color: #2E2F33;
	}

	/* 游戏 */
</style>