<template>
	<view :class="chapter_show?'control-scroll':''">
		<u-navbar :safeAreaInsetTop="true" :placeholder="false" :border="false" :fixed="true" :bgColor="nav_color"
			autoBack>
			<view class="" style="display: flex;" slot="left">
				<u-icon name="/static/image/mkz_ic_mhdetail_nav_return.png" width="22" height="22" color="#ffffff"
					style="margin-left: 4px;"></u-icon>
				<view :style="bgcolor">
					<u-text size="16" :text="title" color="#FFFFFF" lines="1"></u-text>
				</view>
				<!-- <u-image src="/static/image/mkz_ic_mhdetail_nav_return.png" width="18px" height="18px"></u-image> -->
			</view>

		</u-navbar>

		<u-sticky zIndex="3">
			<view class="page-conatiner" v-show="nav_show" :style="bgcolor">
				<view class="card" :style="'height:'+nav_height+'px'">
					<view class="bg-image" :style="'height:'+nav_height+'px'">
						<image :src="data.detailPic" mode="aspectFill" ></image>
					</view>
					<view class="bg-gray"></view>
				</view>
			</view>
		</u-sticky>

		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			:up="upOption">
			<view style="width: 100%;height: 215px;background-size: cover;"
				:style="'background-image: url(../../static/img_moren.jpg)'">
				<view style="display: flex;height: 215px;background-size: cover;background-position: center;"
					:style="'background-image: url(' + data.detailPic + ')'">
					<view
						style="background: linear-gradient(180deg,#ff000000,rgba(0,0,0,.5));width: 100%;height: 100%;">
						<view style="display: flex;height: 100%;">
							<view
								style="display: flex;margin-bottom: 25px;margin-top: auto;margin-left: 15px;margin-right: 15px;width: 100%;align-items: center;">
								<view style="display: flex; flex-direction: column;">
									<text style="font-weight: 600;color: #fff;font-size: 20px;">{{data.title}}</text>
									<view style="margin-top: 5px;margin-bottom: 2px;">
										<text v-for="(item,index) in comicTags" :key="index" class="mr10"
											style="color: #ffffff;font-size: 11px;background-color: rgba(255,255,255,0.3); padding: 2px 8px 2px 8px;border-radius: 3px;">{{item}}</text>
									</view>
								</view>
								<view style="margin-left: auto; margin-right: 5px;">
									<view>
										<div class="right_btn size26" @click="setComicLikes" v-if="!likeShow">点赞</div>
										<div class="right_btn size26"  v-if="likeShow" ><van-icon name="good-job" />+1</div>
									</view>
								</view>
							</view>
						</view>
						<view
							style="margin-top: -15px;border-radius: 15px 15px 0 0;height: 15px;width: 100%;background-color: #fff;">
						</view>
					</view>
				</view>
			</view>


			<!-- 简介 -->
			<view style="margin-left: 15px;margin-right: 15px;">
				<text-ellipsis font-size="28rpx" show-more-label="展开" show-shrink="" style="color: #5a5a5a;">
					{{data.summary}}
				</text-ellipsis>
			</view>
			<!-- 作者 -->
			<view style="display: flex;font-size: 26rpx;color: #000000;font-weight: 500;margin: 13px 15px 13px 15px;">
				<view style="margin-top: auto;margin-bottom: auto;">
					<text style="font-size: 26rpx;color: #333333;">作者:</text>
				</view>
				<u-avatar size="20" style="margin: auto 3px auto 5px;"></u-avatar>
				<view style="margin-top: auto;margin-bottom: auto;">
					{{data.author}}
				</view>
			</view>
			<!-- 热度数据 -->
			<view style="display: flex;justify-content: space-between;width: 83%;margin: 10px auto 15px auto;">
				<view style="display: flex;" @click="slw_open">
					<view style="margin-top: auto;margin-bottom: auto;">
						<u-image width="25px" height="25px" src="/static/detail/mkz_ic_detail_ds.png"></u-image>
					</view>
					<view style="margin-left: 5px;margin-top: auto;margin-bottom: auto;">
						<view style="margin: auto auto 1px auto;display: flex;justify-content: center;">
							<text class="size32 mb10" style="font-weight: 900;line-height: 1;">{{data.readerFmt}}</text>
						</view>
						<view style="margin: 0px auto auto auto;display: flex;">
							<text style="font-size: 12px;color: #999999;line-height: 1;">人气值</text>
						</view>
					</view>
				</view>
				<view style="display: flex;" @click="typ_open">
					<view style="margin-top: auto;margin-bottom: auto;">
						<u-image width="25px" height="25px" src="/static/detail/mkz_ic_detail_yp.png"></u-image>
					</view>
					<view style="margin-left: 5px;margin-top: auto;margin-bottom: auto;">
						<view style="display: flex;justify-content: center;">
							<text class="size32 mb10" style="font-weight: 900;line-height: 1;">{{data.likesFmt}}</text>
						</view>
						<view style="margin: 0px auto auto auto;display: flex;">
							<text style="font-size: 12px;color: #999999;line-height: 1;">点赞人数</text>
						</view>
					</view>
				</view>
				<view style="display: flex;" @click="isfavor()">
					<view style="margin-top: auto;margin-bottom: auto;">
						<u-image width="25px" height="25px" src="/static/detail/mkz_ic_detail_jrsd.png"></u-image>
					</view>
					<view style="margin-left: 5px;margin-top: auto;margin-bottom: auto;">
						<view style="margin: auto auto 1px auto;display: flex;justify-content: center;">
							<text class="size32 mb10"
								style="font-weight: 900;line-height: 1;">{{data.collectFmt}}</text>
						</view>
						<view style="display: flex;">
							<text style="font-size: 12px;color: #999999;line-height: 1;">已收藏</text>
						</view>
					</view>
				</view>
			</view>

			<u-line dashed></u-line>

			<!-- 章节列表 -->
			<view style="margin: 15px 15px 15px 15px;">
				<view style="display: flex;justify-content: space-between;margin-bottom: 15px;margin-top: 5px;">
					<text style="font-weight: 500;margin-left: 10rpx;color: #000;font-size: 18px;">{{data.state}}</text>
					<u-icon v-if="totalRows!=='0'" :label="'已更新'+totalRows+'话'" labelPos="left" labelSize="12px"
						labelColor="grey" size="14px" bold color="grey" name="arrow-right"
						@click="chapter_open"></u-icon>
					<u-icon v-else label="暂无更新" labelPos="left" labelSize="12px" labelColor="grey"></u-icon>
				</view>
				<view v-if="data.nums!=='0'">
					<u-scroll-list :indicator="false">
						<view v-for="(item, index) in comicEpisodes" :key="index" @click="read_chapter(item)">
							<view style="position: relative;">
								<u-image width="130px" height="70px" radius="5" :src="data.detailPic"
									style="border:0.5px solid #eee;border-radius:5px; margin-right: 10px;margin-bottom: 8px;">
									<view slot="error" style="font-size: 24rpx;">加载失败</view>
									<view slot="loading" style="width: 130px;height: 70px;border-radius: 5px;">
										<image src="/static/detail/mkz_bg_chapter_loading_img.png"
											style="width: 100%;height: 100%;border-radius: 5px;" mode="scaleToFill">
										</image>
									</view>
								</u-image>
								<view style="position: absolute;left: 0px;top: -2px;border-radius: 0px;"
									v-if="getLockIconStatus(item.episodesCoin,item.unlockId)">
									<image src="/static/detail/mkz_ic_detaillist_vip_w.png"
										style="width: 48rpx;height: 32rpx;border-radius: 0px;" lazy-load></image>
								</view>
								<view v-if="item.historyId != '0' || item.historyId != 0"
									style="position: absolute;right: 8px;top: -2px;border-radius: 0px;">
									<text
										style="color: #ffffff;font-size: 11px;background-color: rgba(255,255,255,0.3); padding: 2px 8px 2px 5px;border-radius: 3px;">已读</text>
								</view>

							</view>
							<u--text :lines="1" :text="item.title" size="14" color="#444444"></u--text>
						</view>
						<view style="width: 60px;margin-top: auto;margin-bottom: auto;" @click="chapter_open">
							<u-icon name="/static/detail/mkz_ic_detail_mllist_r.png" size="30"
								style="margin-left: 15px;margin-right: 15px;"></u-icon>
							<view style="display: flex;justify-content: center;margin-top: 5px;">
								<text style="color: #aaaaaa;font-size: 12px;">查看更多</text>
							</view>
						</view>
					</u-scroll-list>
				</view>
			</view>
			
			<view v-for="(item,index) in bookList">
			
				<view style="display: flex;justify-content: space-between;margin-bottom: 15px;margin-top: 10px;">
					<text style="font-weight: 500;margin-left: 20rpx;color: #000;font-size: 18px;">{{item.name}}</text>
					<!-- <u-icon label="更多" labelPos="left" labelSize="12px" name="arrow-right"
						></u-icon> -->
				</view>
				<view>
					<homeList :hot-list="item.list"></homeList>
				</view>
			</view>

			<view style="height: 65px;"></view>
		</mescroll-body>



		<!-- 章节列表弹窗 -->
		<hqs-popup title="目录" v-model="chapter_show" showClose="close" :height="chapter_height+'px'" showBack>
			<u-sticky>
				<u-line></u-line>
			</u-sticky> 
			<view
				style="height: 88rpx;left: 0;right: 0;top: 0;display: flex;margin: auto 15px;justify-content: space-between;">
				<view style="display: flex;margin-top: auto;margin-bottom: auto;">
					<text style="font-weight: 600;font-size: 16px;">连载中({{totalRows}})</text>
				</view>
				<view
					style="display: flex;margin-top: auto;margin-bottom: auto;justify-content: space-between;width: 20%;">
					<view style="font-size: 28rpx;" :class="orderByModal== 'dir-asc'?'active':''" @click="sort_click('dir-asc')">
						<text>正序</text>
					</view>
					<view style="color: grey;font-size: 12px;">
						<text>|</text>
					</view>
					<view style="font-size: 28rpx;" :class="orderByModal== ''?'active':''" @click="sort_click('')">
						<text>倒叙</text>
					</view>
				</view>
			</view>
			<virtual-list :items="chapter_list_data" :detailPic="comicDetail.detailPic"  :size="size" :remain="remain">
				<template v-slot:default="slotItem">
					<list-item :item="slotItem.item" class="a" :id="id" @read_chapter="read_chapter"></list-item>
				</template>
			</virtual-list>
		</hqs-popup>

		<!-- 底部按钮 -->
		<view class="tabbar"
			:style="typ_show || slw_show?'z-index:0':'' || isfavor_show?'z-index:0':'' || comment_show?'z-index:0':'' ">
			<u-line></u-line>
			<view style="display: flex; margin-left: auto;margin-right: auto;height: 100%;">
				<view style="display: flex;margin-left: 20px;margin-right: 0px; width: 100%;">
					<!-- 评论按钮 -->
					<view style="display: flex;" @click="toHome">
						<view style="margin:auto;">
							<view style="margin-left: auto;margin-right: auto;display: flex;justify-content: center;">
								
								<u-icon name="home" size="25"></u-icon>
							</view>
						
						</view>
						<view style="margin-top: auto;margin-bottom: auto;">
							<text style="margin-left: 8px;color: #000000;font-size: 14px;">主页</text>
						</view>
					</view>
					<view style="margin: auto 10px auto 10px;">
						<u-line direction="col" dashed length="16px" :hairline="false"></u-line>
					</view>
					<!-- 收藏按钮 -->
					<view style="display: flex;" @click="isfavor()">
						<view style="margin:auto;">
							<view style="margin-left: auto;margin-right: auto;display: flex;justify-content: center;">
								<u-icon v-if="data.collectId == 0"  name="star" size="25" ></u-icon>
								<u-icon v-else name="star-fill" color="#ff4e32" size="25"></u-icon>

							</view>
						</view>
						<view style="margin-top: auto;margin-bottom: auto;">
							<text v-if="data.collectId == 0 " style="margin-left: 8px;color: #a8a8a8;font-size: 14px;">收藏</text>
							<text v-else style="margin-left: 8px;color: #000000;font-size: 14px;" >已收藏</text>
						</view>
					</view>
					
					
					<u-button @click="toRead()" hoverStayTime="0"  text="开始阅读"
						color="#ff2663"
						style="width: 49%;height: 60%; margin: auto;border-radius: 50px;box-shadow: -1px 1px 1px 1px #ff2663;"></u-button>
				</view>
			</view>
		</view>


		<!-- 确认解锁 -->
		<u-modal :show="isUnlock" title="确认解锁"  showCancelButton confirmColor="#ff2663"
			@cancel="isUnlock=false" @confirm="UnlockSubmit()" :asyncClose="true">
			<view style="width:100%;display: flex;justify-content: center; align-items: center;margin-top: 10px;">
			  <view style="font-size: 11pt;color: #9f9e9e;margin-top: 10px;">确认花费<text class="size36" style="color: #333;"> {{episodesCoin}}</text>书币解锁下一话？<br>
			  开通VIP可享受全站全部漫画免费阅读。 </view>
			</view>
		</u-modal>
		
		<!-- 全屏加载中 -->
		<u-loading-page image="/static/loading.jpg" imgStyle="width: 111px;height: 135px" :loading="loading_show"
			loadingText="主人，再等等..." fontSize="16" style="z-index: 9999999;"></u-loading-page>
	</view>
</template>

<script>
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import VirtualList from '@/components/xc-virtual-list/xc-virtual-list.vue'
	import ListItem from '@/components/xc-virtual-list/xc-list-item.vue';
	import lffBarrage from '@/components/lff-barrage/lff-barrage.vue' //弹幕组件
	import homeList from '@/components/homeList.vue'
	import {
		getComicDetail,
		switchMemberCollect,
		listEpisodes,
		checkContentAuthority,
		unlockContent,
		getComicDetailForLogin,
		loginCheckContentAuthority,
		setComicLike,
		loginListEpisodes,
	} from '@/api/comic';
	import {
		getRecommendData
	} from "@/api/index";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			w_md5,
			VirtualList,
			ListItem,
			lffBarrage,
			homeList
		},
		data() {
			return {
				bookList:[],
				likeShow:false,
				comicDetail: {}, //详情
				comicEpisodes: [], //列表
				comicTags: [],
				pageNo: 1,
				totalPage: 1,
				totalRows: 1,
				pageSize: 1,
				isLogin: false, //登陆状态
				user: {}, //用户详情,金币和会员状态
				typ_show: false, //投月票弹窗
				typ_num: 1, //投月票选项,1,2,3,4对应四个选项
				typ_height: 0, //投月票弹窗高度
				slw_data: [], //礼物列表
				slw_show: false, //送礼物弹窗
				slw_id: 1, //礼物ID
				slw_cion: 0, //礼物价格
				slw_height: 0, //送礼物弹窗高度
				dsq_id: '', //打上列表弹幕定时器id
				bgcolor: 0, //导航栏渐变背景
				userinfo: '',
				nav_color: "rgba(0,0,0,0)",
				chapter_show: false,
				chapter_height: 0,
				chapter_heighta: 0,
				loading_show: false, // 全屏加载中
				jianpan: 30,
				comment: '',
				comment_list: [],
				comment_show: false,
				random_comment_list: [
					'同九义，汝河秀？',
					'同样是腰间盘，阁下为何这么突出？',
					'可爱，想太阳',
					'我以为你喜欢海，原来你喜欢浪。',
					'完了，你也不理我了，我成狗不理了。',
					'现在大学生吃饱了没事干就想找个男朋友女朋友。而我就比较牛逼了，我吃不饱。',
					'每当我准备认真看书的时候，这个世界就变得非常有趣，任何风吹草动都能吸引我。',
					'脚踏两只船，迟早要翻船，脚踏万只船，翻都翻不完。',
					'暑假在家没事做？不如跟我一起做复读机吧。复制这段话再发出去，每天收入0元，我和身边朋友都在做，反正闲着也是闲着。',
					'好看呀',
					'你应该很孤单吧，一个人缓慢的翻着漫画，看着评论，而这一秒你正好看到我的评论，这一秒你是属于我的，你好，陌生人，我顶你个肺！',
					'有的人喜欢粉色，因为他少女。有的人喜欢红色，因为他热烈。有的人喜欢黑色，因为他emo。有的人喜欢白色，因为他纯洁。有的人喜欢蓝色，因为他忧郁。有的人喜欢绿色，因为他鲜活。有的人喜欢黄色，发给我谢谢'
				], //快评列表
				read_status: 0, //0=从未阅读，1=继续阅读，2=无法阅读
				chapter_name: '',
				title: '', // 导航栏漫画名称
				data_null: false,
				data_null_text: '暂无内容',
				nav_show: false, //导航栏背景是否显示
				nav_height: 0, //导航栏高度
				img_gg: '',
				url_gg: '',
				// img_gg: 'https://image.zymkcdn.com/file/news/000/004/456.jpg-1920x560.webp',
				isfavor_status: false,
				isfavor_show: false, //取消收藏弹窗显示控制
				love_list: '',
				chapter_list: '',
				chapter_list_data: [{
					"id": "1",
					"name": "开心漫画",
					"addtime": "",
					"cion": "0",
					"vip": "0"
				}],
				size: 0,
				item_height: 0,
				remain: 1,
				orderByModal: '', // 0=正序，''=倒叙

				chapter_page_num: 1,
				id: 0, //漫画ID
				time: '',
				token: '',
				app_key: '',
				websiteUrl: '',
				utoken: '',
				episodesCoin:'',
				data: '',
				tabs_index: 0,
				downOption: {
					use: true,
					auto: false,
					autoShowLoading: true,
					inOffsetRate: 0.4,
					// offset: 50
				},
				upOption: {
					use: false
				},
				detailad: [],
				option: {
					//绘制海报内容
					codeUrl: 'https://pic1.zhimg.com/80/v2-2714df42147132464a71af391ed04be4_720w.jpg', //二维码
					// codeUrl: '/static/tym.jpg', //二维码
					coverUrl: 'https://pic1.zhimg.com/80/v2-2714df42147132464a71af391ed04be4_720w.jpg', //图片
					headUrl: 'https://pic1.zhimg.com/80/v2-b9df1fdfe67f2177d5c84af90dcadfc1_720w.jpg?source=1940ef5c', //头像
					bgUrl: 'https://pic3.zhimg.com/v2-8fbde0f9ac6a19a23aa839e73394618a_b.jpg', //图片背景填充，和 fillStyle 只能传一个，bgUrl 优先级高于 fillStyle
					fillStyle: '#0688ff', //纯色背景填充颜色
					nickName: '神秘人', //登录的用户名
					miniName: '@邀请你陪我一起来看漫画啦！', //邀请内容
					tkName: '漫画名称', //漫画名称
					tkAuthor: '漫画简介', //漫画简介
					tkType: '漫画作者', //漫画作者
					cost: '完结', //连载状态

					isPub: '人气' //漫画人气
				},
				isUnlock:false,
			}
		},
		onPageScroll: function(e) {
			this.nav_show = true
			this.title = this.data.title
			if (e.scrollTop >= 0 && e.scrollTop <= 8) {
				// this.flag = true
				this.bgcolor = "opacity:0"
			} else if (e.scrollTop > 8 && e.scrollTop <= 16) {
				// this.flag = false
				this.bgcolor = "opacity:0.1"
			} else if (e.scrollTop > 16 && e.scrollTop <= 24) {
				this.bgcolor = "opacity:0.2"
			} else if (e.scrollTop > 24 && e.scrollTop <= 32) {
				this.bgcolor = "opacity:0.3"
			} else if (e.scrollTop > 32 && e.scrollTop <= 40) {
				this.bgcolor = "opacity:0.4"
			} else if (e.scrollTop > 40 && e.scrollTop <= 48) {
				this.bgcolor = "opacity:0.5"
			} else if (e.scrollTop > 48 && e.scrollTop <= 56) {
				this.bgcolor = "opacity:0.6"
			} else if (e.scrollTop > 56 && e.scrollTop <= 64) {
				this.bgcolor = "opacity:0.7"
			} else if (e.scrollTop > 64 && e.scrollTop <= 72) {
				this.bgcolor = "opacity:0.8"
			} else if (e.scrollTop > 72 && e.scrollTop <= 80) {
				this.bgcolor = "opacity:0.9"
			} else if (e.scrollTop > 80) {
				this.bgcolor = "opacity:1"
			}
		},
		onLoad: function(option) {

			this.id = option.id
			console.log("屏幕高度:", uni.getSystemInfoSync().screenHeight)
			console.log("可使用窗口高度:", uni.getSystemInfoSync().windowHeight)
			this.chapter_height = uni.getSystemInfoSync().windowHeight - uni.getSystemInfoSync().statusBarHeight - 60
			this.chapter_heighta = this.chapter_height - 44
			this.nav_height = uni.getSystemInfoSync().statusBarHeight + 44

			this.req_ad()
		},
		onShow() {
			// this.shuaxin(this.id)
		},
		onBackPress(e) {
			console.log(e)
			if (e.from == 'backbutton') {
				if (this.chapter_show) {
					this.chapter_show = false
				} else if (this.typ_show) {
					this.typ_show = false
				} else if (this.slw_show) {
					this.slw_show = false
				} else if (this.comment_show) {
					this.comment_show = false
				} else {
					uni.navigateBack({})
				}
				return true
			}
		},

		watch: {
			slw_show: {
				handler(newv, old) {
					if (!newv) {
						clearInterval(this.dsq_id)
					}
				}
			}
		},
		methods: {
			req_ad() {
				/**
				 * 登录的用户走 forLogin
				 * 未登录走默认方法
				 *
				 */
				let token = uni.getStorageSync('token')
				this.loading_show = true
				if (token) {
					getComicDetailForLogin({
						id: this.id,
						orderByModal: this.asc
					}).then((res) => {
						this.handleData(res)

					});
				} else {
					getComicDetail({
						id: this.id,
						orderByModal: this.asc
					}).then((res) => {
						this.handleData(res)
					});

				}
			},
			toHome(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			handleData(res) {
				console.log(res)
				if (res.code == 200) {
					this.data = res.data;
					this.comicEpisodes = res.data.comicEpisodesList.rows;
					this.chapter_list_data = res.data.comicEpisodesList.rows;
					//标签
					let tags = res.data.tags;
					this.comicTags = tags ? tags.split(',') : ''
					
					this.totalPage = res.data.comicEpisodesList.totalPage;
					this.totalRows = res.data.comicEpisodesList.totalRows;
					this.pageSize = 10;
					this.title = this.comicDetail.title
				} else {
					uni.showToast({
						icon: 'none',
						title: '加载失败'
					});

				}
				this.getEpisodes(this.orderByModal)
				this.clickComicDetail()
				this.loading_show = false
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
			
			sort_click(orderByModal) {
				this.orderByModal = orderByModal
				this.getEpisodes(orderByModal)
			},
			/**
			 * 刷新章节方法
			 * 往上滑动翻页也用次方法
			 * @param orderBy 排序方式，传空字符串为倒叙x
			 */
			getEpisodes(orderBy) {
				let token = uni.getStorageSync('token')
				if (token) {
					loginListEpisodes({
						id: this.id,
						orderByModal: orderBy,
					
					}).then((res) => {
						this.chapter_list_data = [];
						res.data.rows.forEach(item => {
							item.imgUrl = this.data.detailPic
						})
						this.chapter_list_data.push(...res.data.rows);
						this.orderByModal = orderBy;
						this.totalPage = res.data.totalPage;
						this.totalRows = res.data.totalRows;
						this.refreshing = false;
						this.mescroll.endSuccess();
					});
				} else {
					listEpisodes({
						id: this.id,
						orderByModal: orderBy,
				
					}).then((res) => {
						this.chapter_list_data = [];
						res.data.rows.forEach(item => {
							item.imgUrl = this.data.detailPic
						})
						this.chapter_list_data.push(...res.data.rows);
						this.orderByModal = orderBy;
						this.totalPage = res.data.totalPage;
						this.totalRows = res.data.totalRows;
						this.mescroll.endSuccess();
					});
				}
				console.log(this.data,'详情数据')
			},

			// 点赞
			setComicLikes() {
			  setComicLike({ comicId: this.id }).then((res) => {
			    /**
			     * 需要加上请求未完成的情况下，不能继续点击ICON
			     */
			    if (res.code == 200) {
			      this.likeShow = true
				  uni.setStorageSync("IS_LIKE_COMIC_"+comicId,"Y")
			    } else {
					uni.showToast({
						icon: 'none',
						title: '点赞失败'
					});
			    
			    }
			  });
			},
			
			// 目录列表
			chapter_close() {
				this.chapter_show = false
			},
			// 目录列表
			chapter_open() {
				let that = this
				this.chapter_show = true
				setTimeout(() => {
					let _this = this;
					uni.getSystemInfo({
						success: function(res) { // res - 各种参数

							let obj = uni.createSelectorQuery().select('.a')

							obj.boundingClientRect(function(data) { // data - 各种参数

								console.log(data)
								_this.item_height = data.height
								console.log(_this.item_height)
								// this.size = +uni.upx2px(52);
								_this.size = _this.item_height
								console.log(_this.chapter_heighta)
								_this.remain = _this.chapter_heighta / _this.size / 10 * 9
								console.log(_this.remain)

							}).exec()
							console.log(that.chapter_show)
						}
					})
				}, 800);
			},

		
			// 点击目录进去阅读页
			read_chapter(item) {
				let token = uni.getStorageSync('token')
				let userInfo = uni.getStorageSync('userInfo')
				
				if (token){
				  loginCheckContentAuthority({ id: item.id })
				    .then((res) => {
				      if (res.code == 200) {
				        let unlockId = res.data.unlockId
				        let unCoin = res.data.episodesCoin
				        let vip =  userInfo.vip
							
				        if (unlockId !=0 || unCoin <= 0){
				          //console.log('aaa'+unlockId +'bbb'+unCoin)
						  uni.navigateTo({
						  	url:'/pages/reading/reading?epdNumId='+  item.id + '&type=0&comicId=' + this.id + '&speedMode=' + this.data.speedMode
						  })
				        }else {
				          // 提示收费
				          if (vip && vip==1){
				           uni.navigateTo({
				           	url:'/pages/reading/reading?epdNumId='+  item.id + '&type=0&comicId=' + this.id + '&speedMode=' + this.data.speedMode
				           })
				          }else {
							this.isUnlock = true
							this.epdNumId = item.id
							this.episodesCoin = res.data.episodesCoin
				
				          }
							
				        }
				      } else {
				        this.errCodeFun(res, item);
				      }
				    })
				    .catch((err) => {
				      this.errCodeFun(err, item);
				    });
				}else {
				  checkContentAuthority({ id: item.id })
				    .then((res) => {
				      if (res.code == 200) {
				        uni.navigateTo({
				        	url:'/pages/reading/reading?epdNumId='+  item.id + '&type=0&comicId=' + this.id + '&speedMode=' + this.data.speedMode
				        })
				      } else {
				        this.errCodeFun(res, item);
				      }
				    })
				    .catch((err) => {
				      this.errCodeFun(err, item);
				    });
				}
			},
			// 确认解锁
			UnlockSubmit(){
				this.isUnlock = false
			
				uni.navigateTo({
					url:'/pages/reading/reading?epdNumId='+  this.epdNumId + '&type=0&comicId=' + this.id + '&speedMode=' + this.data.speedMode
				})
				this.epdNumId = ''
				this.episodesCoin = ''
			},
			
			errCodeFun(res, item) {
			  if (res.code == 500) {
			    return;
			  }
			  if (res.code == 502) {
			    toReading(item);
			  }
			  uni.showModal({
			  	title: '提示',
				showCancel:res.code == 500 ? false : true,
				confirmText:res.code == 500 ? '返回上一页' : res.code == 501 ? '去充值' : '去登录',
			  	content:  res.message || '获取失败，请登录后重试',
			  	success: (data) =>  {
			  		if (data.confirm) {
			  			console.log(res)
			  			if (res.code == 500) {
			  			  uni.navigateBack()
			  			} else if (res.code == 501) {
			  			  uni.navigateTo({
			  			  	url:'/pages/coin/coin'
			  			  })
			  			}  else if (res.code == 504) {
			  			  uni.navigateTo({
			  			  	url:'/pages/vip/vip'
			  			  })
			  			}
			  			else if (res.code == 401 || res.code == 403 || res.code == 503) {
			  			  uni.reLaunch({
			  			  	url:'/pages/login/login'
			  			  })
			  			}
			  		} else if (res.cancel) {
			  			console.log('用户点击取消');
			  		}
			  	}
			  });
		
			 
			},
			
			toReading(item) {
			  if (!Number(item.unlockId) && item.episodesCoin != '0') {
			     uni.showModal({
			      title: '提示',
			      content: '解锁该章节需要' + item.episodesCoin + '书币，是否解锁。',
			    })
			      .then((data) => {
					  if (data.confirm) {
						unlockContent({ id: item.id })
						  .then((res) => {
						    if (res.code == 200) {
						      uni.navigateTo({
						      	url:'/pages/reading/reading?epdNumId='+  item.id + '&type=0&comicId=' + this.id + '&speedMode=' + this.data.speedMode
						      })
						    } else {
						      this.errCodeFun(res, item);
						    }
						  })
						  .catch((err) => {
						    this.errCodeFun(err, item);
						  });
					  }
			       
			      })
			      .catch(() => {});
			
			    return;
			  }
			},
			
			isfavor() {
				switchMemberCollect({ comicId: this.id }).then((res) => {
				    /**
				     * 需要加上请求未完成的情况下，不能继续点击ICON
				     */
				    if (res.code == 200) {
						this.data.collectId = this.data.collectId == 0 ? 1 : 0
						
				    } else {
						uni.showToast({
							icon: 'none',
							
							title: "收藏失败"
						});
				      
				    }
				  });
			},

			toRead() {
				uni.navigateTo({
					url:'/pages/reading/reading?comicId='+  this.id + '&type=1&speedMode=' + this.data.speedMode
				})
			},
			
			clickComicDetail(){
			
			 //热门推荐加载
			  getRecommendData({}).then((res) => {
			    if (res.code == 200) {
					this.bookList = [{
						name:'热门必看',
						list:res.data
					}]
			      // this.recommendData = res.data;
			    }
			  });
			
			},

			subComment() {
				if (this.comment == "") {
					return uni.showToast({
						icon: 'none',
						title: '是不是忘记写点什么了'
					})
				}
				if (!uni.getStorageSync('user')) {
					console.log("未登录")
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: "请先登录"
					});
					uni.navigateTo({
						url: "../login/login"
					})
				} else {
					console.log("已登录", uni.getStorageSync('user'))
					var time = new Date().getTime()
					this.app_key = getApp().globalData.websiteKey

					var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility +
						"&mid=" + this.id + "&text=" + this.comment + "&timestamp=" + time + "&user_id=" + uni
						.getStorageSync('user').uid + "&user_token=" + uni.getStorageSync('user').utoken
					var sign = w_md5.hex_md5_32Upper(param + this.app_key)
					uni.request({
						url: getApp().globalData.websiteUrl + '/index.php/appv1/comment/add?' + param + "&sign=" +
							sign,
						// header: {
						//     'content-type': 'application/json' //自定义请求头信息
						// },
						success: (res) => {
							this.comment_show = false
							this.comment = ''
							console.log("评论结果: ", res.data);
							uni.showToast({
								icon: 'none',
								position: 'bottom',
								title: res.data.msg
							});
							this.shuaxin(this.id)
							// this.get_comment_list()
						}
					});
				}
			},
			shuaxin(id) {
				// this.loading_show = true
				this.chapter_page_num = 1
				this.read_status = 2
				this.chapter_name = ''

				this.id = id
				if (!uni.getStorageSync('user')) {
					console.log("未登录", uni.getStorageSync('user'))
					this.isLogin = false
				} else {
					console.log("已登录", uni.getStorageSync('user'))
					this.isLogin = true
				}
				// this.get_chapter_list()
				// this.get_comment_list()

				//获取阅读记录
				var mh_history = uni.getStorageSync('mh_history')
				if (typeof mh_history !== 'object') {
					mh_history = []
				}
				mh_history.forEach((value) => {
					if (Number(value.book_id) === Number(this.id)) {
						this.read_status = 1
						this.chapter_name = value.chapter_name
					}
				})
				this.get_detail()
				this.get_chapter_list()
			},
			
			// 取消收藏
			cancel_fav() {
				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey
				var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility +
					"&ids=" + this.id + "&timestamp=" + time + "&user_id=" + uni.getStorageSync('user').uid +
					"&user_token=" + uni.getStorageSync('user').utoken
				var sign = w_md5.hex_md5_32Upper(param + this.app_key)
				uni.request({
					url: getApp().globalData.websiteUrl + '/index.php/appv1/cases/del/comic?' + param + "&sign=" +
						sign,
					// header: {
					//     'content-type': 'application/json' //自定义请求头信息
					// },
					success: (res) => {
						console.log("删除书架成功")
						this.data.fav = 0
						this.data.shits = parseInt(this.data.shits) - 1
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: "取消收藏成功"
						});
						this.isfavor_status = false //无用
						this.isfavor_show = false
					}
				});
			},
			get_chapter_list() {
				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey
				var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility +
					"&id=" + this.id + "&timestamp=" + time
				var sign = w_md5.hex_md5_32Upper(param + this.app_key)
				uni.request({
					url: getApp().globalData.websiteUrl + '/index.php/appv1/comic/chapter?' + param + "&sign=" +
						sign,
					// header: {
					//     'content-type': 'application/json' //自定义请求头信息
					// },
					success: (res) => {
						this.loading_show = false
						// console.log(111)
						// console.log(res.data.list)
						this.chapter_list_data = res.data.list
					}
				});
			},
			get_detail() {
				var time = new Date().getTime()
				this.app_key = getApp().globalData.websiteKey

				if (!uni.getStorageSync('user')) {
					console.log("未登录", uni.getStorageSync('user'))
					var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility +
						"&id=" + this.id + "&timestamp=" + time
				} else {
					var param = "deviceid=" + getApp().globalData.deviceid + "&facility=" + getApp().globalData.facility +
						"&id=" + this.id + "&timestamp=" + time + "&user_id=" + uni.getStorageSync('user').uid +
						"&user_token=" + uni.getStorageSync('user').utoken
				}

				var sign = w_md5.hex_md5_32Upper(param + this.app_key)
				uni.request({
					url: getApp().globalData.websiteUrl + '/index.php/appv1/comic/info?' + param + "&sign=" + sign,
					// header: {
					//     'content-type': 'application/json' //自定义请求头信息
					// },
					success: (res) => {
						console.log(res.data)
						this.data = res.data.comic
						this.love_list = res.data.comic.love_list
						this.mescroll.endSuccess();
						this.loading_show = false
						if (this.title !== '') {
							this.title = this.data.name
						}

						if (res.data.comic.chapter_list.length == 0) {
							this.data_null = true,
								this.data_null_text = '暂无章节'
							this.read_status = 2
							this.chapter_name = '暂无章节'
						} else {
							if (this.chapter_name == '') {
								this.read_status = 0
								this.chapter_name = res.data.comic.chapter_list[0].name
							}
						}
						// 判断是否登录
						if (this.isLogin) {
							this.user = res.data.comic.user
						}
					}
				});
			},
			/*目录列表下拉刷新的回调 */
			downCallback() {
				this.getEpisodes(this.orderByModal);
			},
			ad() {
				// plus.runtime.openWeb(this.url_gg)
				uni.navigateTo({
					url: '../webview/webview?uri=' + this.url_gg
				})
			}
		}
	}
</script>

<style lang="scss">
	.chapter_title {
		// font-size: 14px;
		// font-weight: 300;
		// color: #fff;
		display: -webkit-box;
		/* -webkit-box-orient: vertical; */
		/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.tabbar {
		z-index: 99999;
		width: 100%;
		height: 65px;
		position: fixed;
		bottom: 0px;
		background-color: #FFFFFF;
		left: 0;
		right: 0;
	}

	.cm_tabbar {
		width: 95%;
		height: 55px;
		position: fixed;
		background-color: #F0F0F0;
		left: 0;
		right: 0;
	}

	.i_new_title {
		font-size: 14px;
		font-weight: 300;
		color: #000;
		display: -webkit-box;
		/* -webkit-box-orient: vertical; */
		/*! autoprefixer: off */
		-webkit-box-orient: vertical;
		/* autoprefixer: on */
		-webkit-line-clamp: 1;
		overflow: hidden;
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


	.page-conatiner {
		.card {
			position: fixed;
			top: 0;
			width: 100%;
			z-index: 2;
			overflow: hidden;

			.bg-image {
				position: absolute;
				width: 100%;
				top: 0;
				z-index: -1;
				filter: blur(20rpx) brightness(70%); // 模糊半径和变暗
				transform: scale(1.8); // 控制边缘是否模糊，小于1的话边缘会模糊

				image {
					height: 100%;
					width: 100%;
					vertical-align: middle;
				}
			}

			.bg-gray {
				// 相当于加了一层遮罩
				position: absolute;
				height: 100%;
				width: 100%;
				top: 0;
				background: rgba(0, 0, 0, .1);
				z-index: -1;
				opacity: 0.5;
			}
		}

	}

	.active {
		color: #fd610e;
	}

	//禁止滚动
	.control-scroll {
		height: 100vh;
		overflow-y: hidden;
	}
	
	 .right_btn {
	    width: 100rpx;
	    height: 50rpx;
	    line-height: 50rpx;
	    margin-right: 20rpx;
	    
	    text-align: center;
	    border-radius: 30px;
	    background: #ff4e31;
	    color: #fff;
	  }
</style>