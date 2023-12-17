<template>
	<view>

		<u-navbar :title="comicEpd.title" :autoBack="true" v-if="menu_show">
		</u-navbar>

		<!-- <view style="width: 100%;" :style="'height:' + pmHeight + 'px'" @click="menu_open()"> -->
		<mescroll-uni ref="mescrollRef" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption"
			height="100%">
			<u-loading-page :loading="loading_status" imgStyle="width: 111px;height: 135px" loading-text="漫漫加载中"
				image="/static/loading.jpg"></u-loading-page>
			<view @click="menu_open()">
				<view v-for="(item,index) in imgList" :key="index" style="width: 100%;height: auto;">
					<u-image :src="item" width="100%" height="100%" mode="widthFix" :lazy-load="true"
						@error="imgerror(index)">
						<view slot="loading" style="font-size: 24px;width: 100%;">
							<image src="@/static/loading.gif" style="width: 100%;" mode="aspectFit"></image>
						</view>
					</u-image>
				</view>

				<view style="font-size: 28rpx;width: 100%;margin: 5px auto;display: flex;justify-content: center;"
					v-if="next-0==0 && imgList.length != 0">
					主人，已经到底了哦~
				</view>

				<view :style="'height:' + pmHeight + 'px'" style="display: flex;align-items: center;"
					v-if="imgList.length == 0">
					<view style="padding: 46rpx;width: 100%;">
						<view style="background-color: #f6f6f7;padding: 10px 0px;border-radius: 10px;">

							<view style="color: #28292d;font-size: 30rpx;text-align: center;margin-top: 5px;">
								当前章节无数据，请点击按钮返回上一页
							</view>
						</view>
						<view style="width: 100%;margin-top: 30rpx;" @click.stop="toBlack">
							<view
								style="width: 100%; background-color: #ffa54a;height: 80rpx;border-radius: 100rpx; text-align: center;line-height: 80rpx; color: #fff;">
								返回上一页
							</view>
						</view>
						<!-- {{data}} -->
					</view>
				</view>
				<!-- <view style="width: 100%; height: 100upx;"></view> -->
			</view>
		</mescroll-uni>
		<!-- </view> -->
		<view style="padding: 0px 0upx; width: 100%; display: flex; position: fixed; bottom: 0px; z-index: 1;">
			<image @click="LinkTojumpurl(detailad.urllink)" style="width: 100%;  height: 160upx; border-radius: 5px;"
				:src="detailad.pic" mode="aspectFill"></image>
		</view>
		<!-- 弹出菜单 -->
		<!-- <u-overlay :show="menu_show" :duration="400" :z-index ="999" :opacity="0.3"></u-overlay> -->
		<u-popup :show="menu_show" :overlay="true" :round="3" mode="buttom" class="xuanfu" @close="menu_open()">
			<view style="z-index: 999999;background-color: #fff;">
				<u-grid :col="5" :border="false">
					<u-grid-item @click="nextEpisodes('left', comicEpd.episodesNum, comicEpd.comicId)">
						<u-icon name="play-left" :size="20" style="padding: 5px;"></u-icon>
						<view class="grid-text">上一话</view>
					</u-grid-item>
					<u-grid-item @click="list_click()">
						<u-icon name="order" :size="20" style="padding: 5px;"></u-icon>
						<view class="grid-text">目录</view>
					</u-grid-item>
					<u-grid-item @click="get_detail()">
						<u-icon name="more-circle" :size="20" style="padding: 5px;"></u-icon>
						<view class="grid-text">详情</view>
					</u-grid-item>
					<u-grid-item @click="isfavor">
						<u-icon name="setting" :size="20" style="padding: 5px;"></u-icon>
						<view class="grid-text">线路</view>
					</u-grid-item>
					<u-grid-item @click="nextEpisodes('right', comicEpd.episodesNum, comicEpd.comicId)">
						<u-icon name="play-right" :size="20" style="padding: 5px;"></u-icon>
						<view class="grid-text">下一话</view>
					</u-grid-item>
				</u-grid>
			</view>
		</u-popup>

		<u-popup :show="chapter_list_show" :round="6" mode="right" class="list_xuanfu" @close="list_close">
			<view style="position: fixed;top: 0;bottom: 0;left: 30%;right: 0;">
				<scroll-view scroll-y="true" :style="'height:' + pmHeight + 'px'"
					style="background-color: #fff;width: 100%;">
					<view :style="'height:' + statusHeight + 'px'"
						style="position: fixed;top: 0;background-color: #fff;left: 30%;right: 0;z-index: 99999;"></view>
					<view
						style="position: fixed;padding: 20rpx 20rpx;background-color: #fff;left: 30%;right: 0;z-index: 99999;"
						:style="'top:' + statusHeight + 'px'">
						<view
							style="padding: 10px 6px;background-color: #f6f6f7;border-radius: 6px;display: flex;justify-content: space-between;">
							<view style="display: flex;align-items: center;">
								<view style="font-weight: 500;font-size: 32rpx;">
									<text>目录</text>
								</view>
								<view style="color: #3b3c40;font-size: 28rpx;margin-left: 3px;">
									<text> 共{{chapter_list.length}}话</text>
								</view>
							</view>
							<view style="display: flex;align-items: center;" @click="c_sort()">
								<view style="margin-right: 2px;">
									<image
										:src="chapter_sort==1?'/static/image/mkz_ic_read_sort_down.png':'/static/image/mkz_ic_read_sort_up.png'"
										style="height: 23rpx;width: 27rpx;"></image>
								</view>
								<view style="color: #3b3c40;font-size: 27rpx;">
									<text>{{chapter_sort==1?'倒叙':'正序'}}</text>
								</view>
							</view>
						</view>
					</view>
					<view :style="'margin-top:' + statusHeight + 'px'" style="margin-bottom: 40rpx;">
						<view
							style="padding: 10px 5px;background-color: #f6f6f7;border-radius: 8px;display: flex;justify-content: space-between;">
							<view style="font-weight: 500;font-size: 32rpx;">
								<text>连载中</text>
							</view>
						</view>
					</view>
					<view style="padding:25rpx 20rpx;font-size:30rpx;color:#3b3c40;display: flex;align-items: center;"
						v-for="(item,index) in chapter_list" @click="read_chapter(item)">
						<view style="display:flex;margin-top: auto;margin-bottom: auto;" v-if="item.cion!=='0'">
							<image src="/static/image/mkz_ic_readlist_wz_ff.png" style="width: 30rpx;height: 30rpx;"
								v-if="getLockIconStatus(item.episodesCoin,item.unlockId)" lazy-load></image>
						</view>

						<view style="display:flex;margin-top: auto;margin-bottom: auto;margin-left: 3px;">
							<text>{{item.title}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</u-popup>

		<u-popup :show="login_show" :round="10" mode="center" :closeOnClickOverlay="false"
			:customStyle="{'width':'80%'}">
			<view style="padding: 15px;">
				<view style="font-size: 30rpx;color: #aaaaaa;margin-bottom: 15px;text-align: center;">
					请注册后继续观看！
				</view>
				<view style="display: flex;justify-content: space-between;">
					<view
						style="background-color: #eaeaea;display: flex;justify-content: center;padding: 8px;width: 40%;border-radius: 50px;"
						@click="back()">
						<text style="font-size: 32rpx;color: #000;">返回</text>
					</view>
					<view
						style="background-color: #4e98f0;display: flex;justify-content: center;padding: 8px;width: 40%;border-radius: 50px;"
						@click="login()">
						<text style="font-size: 32rpx;color: #fff;">去登录</text>
					</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import useMatomo from '@/api/matomo'
	import {
		comicTurnPages,
		getComicContent,
		getComicDetail,
		getLoginComicContent,
		loginStartRead,
		loginTurnPages,
		setComicLike,
		startReadComic,
		loginListEpisodes,
		listEpisodes,
	} from '@/api/comic';
	import CryptoJS from 'crypto-js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			w_md5
		},
		data() {
			return {
				encryptedImageUrl: 'https://img.xxmubiao.com/ase3.png', // 替换为后台加密图片的 URL
				userInfo: uni.getStorageSync('userInfo'),
				speedMode: 0,
				comicEpd: {},
				imgList: [],
				pageNo: 1,
				totalPage: 2,
				totalRows: 0,
				pageSize: 20,
				comicId: '',
				epdNumId: '',
				readType: '',
				login_show: false, //是否需要登录查看
				autoBuy: false,
				data: {},
				pmHeight: 0,
				statusHeight: 0,
				isfavor_status: false,
				loading_status: false,
				menu_show: false,
				chapter_list_show: false,
				time: '',
				token: '',
				utoken: '',
				app_key: '',
				webUrl: '',
				websiteUrl: '',
				img_websiteUrl: '',
				book_id: 0,
				id: 0, //章节id
				chapter_name: '',
				book_name: '',
				detailad: [],
				book_img: '',
				prev: 0, //上一话
				next: 0, //下一话
				read_chapter_type: 0, //0=覆盖内容列表，1=合并内容数组列表
				chapter_sort: 0, //0=正序，1=倒叙
				chapter_list: [],
				chapter_content_list: [], //章节内容列表
				downOption: {
					use: true,
					auto: false, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					beforeEndDelay: 0, // 延时结束的时长 (显示加载成功/失败的时长, android小程序设置此项结束下拉会卡顿, 配置后请注意测试)
					offset: 60, // 在列表顶部,下拉大于80upx,松手即可触发下拉刷新的回调
					bgColor: "#fff", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
					textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
					textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
					textOutOffset: '放开手就刷新了~', // 下拉的距离大于offset范围的提示文本
					textLoading: '加载中~', // 加载中的提示文本
					textSuccess: '',
					textErr: '已经是第一话了',
					beforeEndDelay: 1000,
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
					textNoMore: '', // 没有更多数据的提示文本
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
				// downOption: {
				// 	use : true
				// },
				// upOption: {
				// 	use : false
				// }
			}
		},
		onLoad(option) {
			console.log(option)
			this.comicId = option.comicId;
			this.epdNumId = option.epdNumId;
			this.readType = option.type;
			this.speedMode = option.speedMode

			if (option.id == undefined) {
				console.log("没有指定章节ID")
				this.get_mh_history()
			} else {
				console.log("指定章节ID", option.id)
				this.id = option.id
			}
			this.pmHeight = uni.getSystemInfoSync().windowHeight
			this.statusHeight = uni.getSystemInfoSync().statusBarHeight


			this.book_img = getApp().globalData.book_img

			if (!uni.getStorageSync('autoBuy')) {
				uni.setStorageSync('autoBuy', false)
			}
			this.autoBuy = uni.getStorageSync('autoBuy')
			console.log("是否自动购买章节", this.autoBuy)
		},
		onUnload() {
			this.set_mh_history()
			// #ifndef H5
			plus.navigator.setFullscreen(false);
			// #endif
		},
		onHide() {
			this.set_mh_history()
		},
		onPageScroll() {
			this.menu_show = false
		},

		onShow() {
			this.initComicContentData('2')
			// #ifndef H5
			plus.navigator.setFullscreen(true);
			// #endif
		},
		methods: {
			toBlack() {
				uni.navigateBack()
			},
			initComicContentData(type = '1') {
				this.loading_status = true

				let data = {
					id: this.epdNumId,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					cdn: this.getCdn()
				}
				let token = uni.getStorageSync('token')

				if (this.readType === 0 || this.readType === '0') {
					if (token) {
						getLoginComicContent(data)
							.then((res) => {
								if (res.code == 200) {
									this.initData(res, type)
								} else {
									this.errCodeFun(res);
									// showFailToast(res.message || '加载失败');
								}
							})
							.catch((err) => {
								this.errCodeFun(err);
							});
					} else {
						getComicContent(data)
							.then((res) => {
								if (res.code == 200) {
									this.initData(res, type)
								} else {
									this.errCodeFun(res);
									// showFailToast(res.message || '加载失败');
								}
							})
							.catch((err) => {
								this.errCodeFun(err);
							});
					}


				}

				if (this.readType === 1 || this.readType === '1') {
					if (token) {
						loginStartRead({
							comicId: this.comicId,
							pageNo: this.pageNo,
							pageSize: this.pageSize
						}).then((res) => {
							if (res.code == 200) {
								this.initData(res, type)
							} else {
								uni.showToast({
									icon: 'none',
									title: '加载失败'
								})
								this.loading_status = false
							}
						});
					} else {
						startReadComic({
							comicId: this.comicId,
							pageNo: this.pageNo,
							pageSize: this.pageSize
						}).then((res) => {
							if (res.code == 200) {
								this.initData(res, type)
							} else {
								uni.showToast({
									icon: 'none',
									title: '加载失败'
								})
								this.loading_status = false

							}
						});
					}
				}
			},
			getCdn() {
				let cdn_select = uni.getStorageSync('IDX_CND_SETTING')
				let vip = this.userInfo.vip
				let unlockId = this.comicEpd.unlockId
				if (this.comicEpd.episodesCoin == 0 || this.comicEpd.episodesCoin == '0') {
					if (cdn_select || cdn_select == '0') {
						return cdn_select
					} else {
						let cdn = this.speedMode != 1 ? 1 : 2
						uni.setStorageSync('IDX_CND_SETTING', cdn)
						return cdn
					}

				} else {
					if (unlockId != '0' || unlockId != 0) {
						if (cdn_select || cdn_select == '0') {
							return cdn_select
						} else {
							let cdn = this.speedMode != 1 ? 1 : vip == 1 ? 2 : 1
							uni.setStorageSync('IDX_CND_SETTING', cdn)
							return cdn
						}
					}
				}
				return 1
			},
		   	initData(res, type = '1') {
				let cdn_select = uni.getStorageSync('IDX_CND_SETTING')
				if (this.pageNo == 1) {
					this.imgList = []
				}
				if (!res.data.imgUrl || !res.data.imgUrl.length || res.data.imgUrl.length < this.pageSize) {
					this.totalPage = 0;
				} else {
					this.totalPage = this.pageNo + 1;
				}
			
				if(cdn_select == 2) {
					res.data.imgUrl.forEach(async item => {
						this.imgList.push(await this.decryptImage(item)) 
					})
				}else{
					this.imgList.push(...res.data.imgUrl);
				}
				

				this.comicEpd = res.data;
				if (type == '2') {
					this.getEpisodes(this.chapter_sort == 1 ? '' : 'dir-asc')
				}

				this.loading_status = false
				this.mescroll.endSuccess();
				document.title = res.data.title

				// this._gaAction(res.data.comicId, res.data.title, res.data.episodesCoin)
			},
			async decryptImage(url) {
				return new Promise( async(resolve, reject) => {
					const response = await this.imgRequest(url);
					const encryptedData = await response.data;
								
					const decryptedData = await this.decrypt(encryptedData);
					
					// this.encryptedImageUrl = "data:image/png;base64," + decryptedData
					resolve( "data:image/png;base64," + decryptedData);
					return "data:image/png;base64," + decryptedData
				})
			
				
			},
			async decrypt(encryptedData) {
				const key = "1954682168dd5975"; // Replace with your secret key
				const iv = "1954682168dd5975"; // Replace with your IV
			
				const keyBytes = CryptoJS.enc.Utf8.parse(key);
				const ivBytes = CryptoJS.enc.Utf8.parse(iv);
			
				const decryptedBuffer = CryptoJS.AES.decrypt({
						ciphertext: CryptoJS.lib.WordArray.create(new Uint8Array(encryptedData))
					},
					keyBytes, {
						iv: ivBytes,
						mode: CryptoJS.mode.CBC,
						padding: CryptoJS.pad.Pkcs7
					}
				);
			
				const decryptedArray = new Uint8Array(decryptedBuffer.words.length * 4);
				decryptedBuffer.words.forEach((word, i) => {
					decryptedArray[i * 4 + 0] = (word & 0xff000000) >> 24;
					decryptedArray[i * 4 + 1] = (word & 0x00ff0000) >> 16;
					decryptedArray[i * 4 + 2] = (word & 0x0000ff00) >> 8;
					decryptedArray[i * 4 + 3] = (word & 0x000000ff);
				});
				return uni.arrayBufferToBase64(decryptedArray)
			},
			async imgRequest(url) {
				return new Promise((resolve, reject) => {
					uni.request({
						url, //仅为示例，并非真实接口地址。
						responseType: 'arraybuffer',
						success: (res) => {
							resolve(res);
						},
						fail: (res) => {
							
							reject(res);
						},
					});
				})
			},
			// 章节列表排序
			c_sort() {
				if (this.chapter_sort == 0) {
					this.chapter_sort = 1
				} else {
					this.chapter_sort = 0
				}
				this.getEpisodes(this.chapter_sort == 1 ? '' : 'dir-asc')
			},
			getEpisodes(orderBy) {
				let token = uni.getStorageSync('token')
				if (token) {
					loginListEpisodes({
						id: this.comicEpd.comicId,
						orderByModal: orderBy,

					}).then((res) => {
						this.chapter_list = [];
						this.chapter_list.push(...res.data.rows);
						this.orderByModal = orderBy;


					});
				} else {
					listEpisodes({
						id: this.comicEpd.comicId,
						orderByModal: orderBy,

					}).then((res) => {
						this.chapter_list = [];
						this.chapter_list.push(...res.data.rows);
						this.orderByModal = orderBy;

					});
				}
				console.log(this.data, '详情数据')
			},

			_gaAction(id, title, coin) {
				event('read_comic', {
					comic_id: id,
					comic_title: title,
					comic_coin: coin
				})
				matomo.trackPageView(title)
				matomo.trackEvent('漫画阅读', title, '消耗金币' + coin)
			},
			errCodeFun(res) {
				uni.showModal({
					title: '提示',
					// showCancel: res.code == 500 || res.code == 501 || res.code == 504 ? false : true,
					showCancel: true,
					confirmText: res.code == 500 ? '返回上一页' : res.code == 501 || res.code == 504 ? '去充值' : '去登录',
					content: res.message || '加载失败',
					success: function(r) {
						if (r.confirm) {
							console.log(res)
							if (res.code == 500) {
								uni.navigateBack()
							} else if (res.code == 501) {
								uni.navigateTo({
									url: '/pages/coin/coin'
								})
							} else if (res.code == 504) {
								uni.navigateTo({
									url: '/pages/vip/vip'
								})
							} else if (res.code == 401 || res.code == 403 || res.code == 503) {
								uni.reLaunch({
									url: '/pages/login/login'
								})
							}
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
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


			get_detail() {
				uni.redirectTo({
					url: '/pages/comicDirectory/comicDirectory?id=' + this.comicId
				})
			},

			nextEpisodes(type, num, comicId) {
				let nextNum = 0;
				if (type === 'left') {
					nextNum = num - 1;
				} else {
					nextNum = num + 1;
				}

				if (nextNum <= 0) {
					uni.showToast({
						icon: 'none',
						title: '前面再无章节了'
					})

					return;
				}
				this.pageNo = 1;


				this.mescroll.scrollTo(0, 0)
				let data = {
					episodesNum: nextNum,
					comicId: this.comicEpd.comicId,
					pageNo: this.pageNo,
					pageSize: this.pageSize,
					cdn: this.getCdn()
				}
				let token = uni.getStorageSync('token')
				if (token) {
					loginTurnPages(data).then((res) => {
						if (res.code == 200) {
							this.initData(res)
						} else if (res.code == 501) {
							this.errCodeFun(res);
						} else {
							uni.showToast({
								icon: 'none',
								title: '加载失败'
							})

						}
					})
				} else {
					comicTurnPages(data).then((res) => {
						if (res.code == 200) {
							this.initData(res)
						} else if (res.code == 501) {
							this.errCodeFun(res);
						} else {
							uni.showToast({
								icon: 'none',
								title: '加载失败'
							})
						}
					});
				}
			},
			LinkTojumpurl(url) {
				// #ifdef H5
				window.open(url, "_self")
				// #endif
				// #ifdef APP-PLUS
				plus.runtime.openURL(url)
				// #endif
			},
			// 返回
			back() {
				uni.navigateBack({

				})
			},
			// 登录
			login() {
				uni.navigateTo({
					url: '../login/login'
				})
			},

			imgerror(index) {
				this.imgList[index] = "@/static/loading.gif"
				this.imgList = JSON.parse(JSON.stringify(this.imgList))
			},

			menu_open() {
				if (this.menu_show) {
					this.menu_show = false
					// #ifndef H5
					plus.navigator.setFullscreen(true);
					// #endif
				} else {
					this.menu_show = true
					// #ifndef H5
					plus.navigator.setFullscreen(false);
					// #endif
				}
			},
			get_mh_history() {
				let mh_history = uni.getStorageSync('mh_history')
				if (typeof mh_history !== 'object') {
					mh_history = []
				}
				mh_history.forEach((value) => {
					if (value.book_id === this.book_id) {
						this.id = value.id
					}
				})
			},
			set_mh_history() {
				let mh_history = uni.getStorageSync('mh_history')
				if (typeof mh_history !== 'object') {
					mh_history = []
				}
				let have = false
				mh_history.forEach((value) => {
					if (value.book_id === this.book_id) {
						have = true
						value.chapter_name = this.chapter_name
						value.id = this.id
						value.book_name = this.book_name
						value.book_img = this.book_img
					}
				})
				if (!have) {
					mh_history.unshift({
						book_id: this.book_id,
						chapter_name: this.chapter_name,
						id: this.id,
						book_name: this.book_name,
						book_img: this.book_img
					})
				}
				uni.setStorageSync('mh_history', mh_history)
				console.log("保存阅读记录: ", mh_history)
			},
			get_chapter_list() {

				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey
				var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility +
					"&id=" + this.book_id + "&timestamp=" + time
				var sign = w_md5.hex_md5_32Upper(param + this.app_key)
				uni.request({
					url: getApp().globalData.websiteUrl + '/index.php/appv1/comic/chapter?' + param + "&sign=" +
						sign,
					// header: {
					//     'content-type': 'application/json' //自定义请求头信息
					// },
					success: (res) => {
						this.loading_show = false
						console.log("章节目录", res.data.list)
						this.chapter_list = res.data.list
						if (this.chapter_list.length == 0) {
							uni.navigateBack({})
							uni.showToast({
								icon: 'none',
								title: '章节还未更新'
							})
						} else {
							if (this.id !== 0) {
								this.get_chapter_content()
							} else {
								this.id = res.data.list[0].id
								console.log(this.id)
								this.get_chapter_content()
							}
						}
					}
				});
			},
			get_chapter_content() {
				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey

				if (!uni.getStorageSync('user')) {
					console.log("未登录", uni.getStorageSync('user'))
					var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility +
						"&mid=" + this.book_id + "&timestamp=" + time + "&zid=" + this.id
				} else {
					var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility +
						"&mid=" + this.book_id + "&timestamp=" + time + "&user_id=" + uni.getStorageSync('user').uid +
						"&user_token=" + uni.getStorageSync('user').utoken + "&zid=" + this.id
				}

				var sign = w_md5.hex_md5_32Upper(param + this.app_key)
				uni.request({
					url: getApp().globalData.websiteUrl + '/index.php/appv1/comic/read?' + param + "&sign=" + sign,
					// header: {
					//     'content-type': 'application/json' //自定义请求头信息
					// },
					success: (res) => {
						console.log("章节内容: ", res.data);
						// this.chapter_content_list = res.data.chapter.photos.reverse()
						// uni.showModal({
						// 	content:this.chapter_content_list.length + ''
						// })

						uni.setNavigationBarTitle({
							title: res.data.data.name
						})
						this.data = res.data.data
						this.chapter_name = res.data.data.name
						this.book_name = res.data.data.comic.name

						this.prev = res.data.data.szid
						this.next = res.data.data.xzid
						this.loading_status = false

						if (res.data.data.comic.fav == 1) {
							this.isfavor_status = true
						} else {
							this.isfavor_status = false
						}

						if (this.read_chapter_type == 0) {
							this.chapter_content_list = res.data.data.piclist
						} else {
							if (this.chapter_content_list.length > 100) {
								this.mescroll.scrollTo(0, 0)
								this.chapter_content_list = res.data.data.piclist
							} else {
								this.chapter_content_list = this.chapter_content_list.concat(res.data.data
									.piclist)
							}
						}

						this.mescroll.endSuccess(res.data.data.piclist.length);

						if (this.data.pay == -1) {
							this.login_show = true
						}

						if (this.data.pay == 2) {
							if (this.autoBuy) {
								this.buy_chapter()
							}
						}

					}
				});
			},
			// 购买章节
			buy_chapter() {
				uni.setStorageSync('autoBuy', this.autoBuy)
				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey
				var param = "auto=0&deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData
					.facility + "&mid=" + this.book_id + "&timestamp=" + time + "&user_id=" + uni.getStorageSync('user')
					.uid + "&user_token=" + uni.getStorageSync('user').utoken + "&zid=" + this.id
				var sign = w_md5.hex_md5_32Upper(param + this.app_key)
				uni.request({
					url: getApp().globalData.websiteUrl + '/index.php/appv1/comic/buy?' + param + "&sign=" + sign,
					// header: {
					//     'content-type': 'application/json' //自定义请求头信息
					// },
					success: (res) => {
						console.log("章节购买结果：", res.data)
						if (res.data.code == 1) {
							uni.showToast({
								icon: "none",
								position: "bottom",
								title: res.data.msg
							})
							this.read_chapter_type = 1
							this.get_chapter_content()
						} else {
							uni.showToast({
								icon: "none",
								position: "bottom",
								title: res.data.msg
							})
						}
					}
				});
			},
			isfavor() {
				let itemList = ['线路一', '线路二']
				if (this.speedMode == 1) {
					itemList.push('vip线路')
				}
				uni.showActionSheet({
					itemList,
					success: (res) => {
						uni.setStorageSync('IDX_CND_SETTING', res.tapIndex)
						this.pageNo = 1;
						this.initComicContentData();
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			list_click() {
				this.menu_show = false
				this.chapter_list_show = true
			},
			list_close() {
				this.chapter_list_show = false
				// #ifndef H5
				plus.navigator.setFullscreen(true);
				// #endif
			},
			read_chapter(item) {

				this.mescroll.scrollTo(0, 0)
				this.epdNumId = item.id
				this.pageNo = 1
				this.readType = 0
				this.initComicContentData()

			},
			/*下拉刷新的回调 */
			downCallback() {
				this.pageNo = 1;
				this.initComicContentData()

			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				console.log(page)

				if (this.pageNo >= this.totalPage) {
					this.mescroll.optUp.textNoMore = "主人，已经到底了哦~"
					this.mescroll.endErr()
					return;
				}
				this.pageNo += 1;
				this.initComicContentData()
			}
		}
	}
</script>

<style>
	.xuanfu {
		width: 100%;
		height: 55px;
		position: fixed;
		bottom: 0px;
		/* background-color: #F0F0F0; */
		left: 0;
		right: 0;
		margin: auto;
		z-index: 2;
	}

	.list_xuanfu {
		width: 100%;
		/* height: 500px; */
		position: fixed;
		top: 0px;
		/* bottom: 0px; */
		/* background-color: #F0F0F0; */
		left: 0;
		right: 0;
		margin: auto;
	}

	.grid-text {
		font-size: 12px;
		/* color: #909399; */
		padding: 0rpx 0 10px 0rpx;
	}
</style>