<template>
	<view>
		<view class="box">
		      <!-- <NavBar /> -->
		      <u-sticky :offset-top="0">
				  <div style="background-color: #fff;">
					  <u-search
					  style="margin: 0 30rpx;"
					  	height="60rpx"
					    v-model="value"
					    placeholder="请输入搜索关键词"
					    input-align="left"
					    @search="onSearch"
					    @custom="onSearch"
					  /> 
				  </div>
		      
		      </u-sticky>
		
		      <view class="recommend mt30">
					<classItem  v-if="allComicList && allComicList.length" :data="allComicList"></classItem>
		     
					<u-empty description="暂无内容" v-else />
		      </view>
		
		
		    </view>
	</view>
</template>

<script>
	  import { comicList } from '@/api/class';
	import classItem from "@/components/classItem.vue"
	export default {
		data() {
			return {
				value:'',
				allComicList:[],
			};
		},
		components:{
			classItem
		},
		methods:{
			onSearch() {
			    comicList(
			       { keyword:this.value,pageNo: 1, pageSize:1000}
			    ).then((res) => {
			      if (res.code == 200) {
			        this.allComicList = [];
			        this.allComicList.push(...res.data.rows);
			      }
			    });
			  }
		}
	}
</script>

<style lang="scss">

</style>
