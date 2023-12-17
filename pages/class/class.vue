<template>
	<view>

		<mescroll-uni-diy ref="mescrollRef" :top="status_height"  :down="downOption"
			@down="downCallback" :up="upOption" @up="upCallback">

			<view class="sc" style="z-index: 999;position: relative;top: 0;background-color: #fff;">
				<view class="tabs">
					<view v-for="(item,index) in tabs" :key="index" v-if="item.name">
						<view style="padding: 10px;font-size: 28rpx;" :class="{active:item.id==tag_id}"
							@click="class_click(item.id,index)">{{item.name}}</view>
					</view>

				</view>
				<view class="tabs">
					<view v-for="(item,index) in ends" :key="index">
						<view style="padding: 10px;font-size: 28rpx;" :class="{active:item.id==end_id}"
							@click="end_click(item.id)">{{item.end_name}}</view>
					</view>
				</view>
			</view>

			<view style="z-index: 990;position: fixed;top: 0;background-color: #fff;left: 0;right: 0;"
				:style="'top:'+status_height" @click="mescroll.scrollTo(0,0)">
				<view style="display: flex;justify-content: center;">
					<view style="padding: 12px 0px;font-size: 32rpx;font-weight: 100;" v-if="tag_id==0 && end_id==0">
						全部•
					</view>
					<view style="padding: 12px 0px;font-size: 32rpx;font-weight: 100;" v-if="tag_id!==0">
						{{tabs[tag_index].name}}•
					</view>
					<view style="padding: 12px 0px;font-size: 32rpx;font-weight: 100;" v-if="end_id!==0">
						{{ends[end_id].end_name}}•
					</view>

				</view>
			</view>
			<view>
				<image src="/static/bgxian.jpg" style="width: 100%; height: 20upx;"></image>
			</view>


			<view class="lists main">
				<classItem :data="data"></classItem>
			</view>
		</mescroll-uni-diy>
	</view>
</template>

<script>
	import {
		comicCategoryList,
		comicList
	} from '@/api/class.js';
	import MescrollUniDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/beibei/mescroll-uni.vue";
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	import classItem from "@/components/classItem.vue"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			w_md5,
			MescrollUniDiy,
			classItem
		},
		data() {
			return {
				
				totalPage:0,
				ty: 0,
				status_height: 0,
				data_null: false,
				top: 0,
				num: 0, //页码
				size: 10, //数量
				data: [],
				tabs: [{
					id: 0,
					name: '全部'
				}],
				ends: [{
					id: 0,
					end_name: '全部'
				}, {
					id: 1,
					end_name: '连载'
				}, {
					id: 2,
					end_name: '完结'
				}],
				tag_id: 0,
				end_id: 0,
				toListLength:0,
				tag_index: 0, //标签索引
			
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
		onLoad(options) {
			if (options.id !== undefined) {
				this.tag_id = options.id
			}
			if (options.ty) {
				this.ty = options.ty
			}
			this.get_tabs()
		},
		onShow() {
			this.get_top()
			this.status_height = uni.getSystemInfoSync().statusBarHeight + 'px'
		},
		methods: {
			imageError: function(e, index) {
				// console.error('image发生error事件，携带值为' + e.detail.errMsg)
				this.data[index]['pic'] = '../../static/img_error.jpg'
			},
			
			class_click(id, index) {

				this.tag_index = index
				this.tag_id = id
				this.num = 1
				this.get_list()
				this.mescroll.setPageNum(1)
			},
			end_click(end_id) {
				this.end_id = end_id
				this.num = 1
				this.get_list()
				this.mescroll.setPageNum(1)
			},
			get_list() {
				let data = {
					cid: this.tag_id,
					status: this.end_id,
					pageNo: this.num,
					pageSize: this.size
				}
				comicList(data).then(res => {
					console.log("漫画列表: ", res.data);
					if (this.num == 1) {
						this.data = res.data.rows
					} else {
						this.data = this.data.concat(res.data.rows)
					}
					this.totalPage = Math.ceil(this.data.length / this.size)
					if (this.data.length == 0) {
						this.data_null = true
					} else {
						this.data_null = false
					}
					this.toListLength = res.data.rows.length
					this.mescroll.endByPage(res.data.rows.length, this.totalPage  + 1);
				})
			},
			get_tabs() {
				comicCategoryList().then(res => {
					if (res.code == 200) {
						this.tabs = this.tabs.concat(res.data)
						//到时候接口返回一个大数组就行了otherList
						this.num = 1
						
						this.get_top()
					}
					this.mescroll.triggerDownScroll()
				})

			},
			get_top() {

				const query = uni.createSelectorQuery().in(this);
				query.select('.sc').boundingClientRect(data => {
					console.log("得到布局位置信息" + JSON.stringify(data));
					this.top = data.top + data.height
					console.log(this.top)
				}).exec();
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.num = 1
				this.get_list()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
			
				if (this.toListLength < this.size) {
					this.upOption.textNoMore = "主人，已经到底了哦~"
					uni.showToast({
						icon: 'none',
						title: '没有更多了'
					})
					this.mescroll.endByPage(this.toListLength, this.totalPage);
					return;
				}
				this.num += 1;
				this.get_list()
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.tabs {
		margin-top: 5px;
		width: 96%;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		text-align: left;
		/* flex-direction: row; */
		flex-wrap: wrap;
		/* justify-content: space-around; */
		align-items: flex-start;
		/* color: #A9A9A9; */
	}

	.active {
		color: $uni-color-theme;
		font-weight: 500;
	}

	.top-warp {
		z-index: 9990;
		position: fixed;
		top: --window-top;
		/* css变量 */
		left: 0;
		width: 100%;
		height: 365upx;
		background-color: white;
	}

	.top-warp .tip {
		font-size: 28upx;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
	}

	.main:after {
		content: "";
		width: 32%;
	}
	
	
</style>