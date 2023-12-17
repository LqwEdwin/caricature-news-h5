<template>
	<view>
		<u-overlay :show="showDisOv" @click="showDisOv = false">
			<view class="wrapper size32" @click.stop>
			
			      <view class="wrapper-down"></view>
			      <view>请点击 </view>
			
			      <view><image src="@/static/menu/fenxiang.png" style="height: 40rpx;width: 40rpx; margin-left: 5rpx;
					margin-right: 5rpx;"/></view>
			      <view> 然后点击“添加到主屏幕”</view>
			
			    </view>
		</u-overlay>
	</view>
</template>

<script>
	export default {
		name:"showDisOvComponent",
		
		data() {
			return {
				showDisOv:false
			};
		}
	}
</script>

<style lang="scss">
	.wrapper {
	  position: fixed;
	  left: 0;
	  right: 0;
	  bottom: 1rem;
	  z-index: 10002;
	  margin: 0 0.7rem;
	  padding: 0.7rem;
	  border-radius: 5px;
	  background-color: #fff;
	  color: #212121;
	  letter-spacing: -1px;
	
	  display: flex;
	  align-content: center;
	  justify-content: center;
	}
	.wrapper-down{
	  position: absolute;
	  width: 1rem;
	  height: 1rem;
	  bottom: -0.5rem;
	  left: 50%;
	  margin-left: -0.7rem;
	  border-radius: 3px;
	  background-color: #fff;
	  -webkit-transform: rotate(45deg);
	  transform: rotate(45deg)
	}
</style>