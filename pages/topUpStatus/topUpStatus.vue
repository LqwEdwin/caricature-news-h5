<template>
	<view>
		 <view class="page_box">
		      <view class="status_box">
		        <u-icon v-if="status == 0" name="clock" size="80" color="#E6A23C" />
		       <u-icon v-if="status == 1" name="checkmark-circle" size="80" color="#7ec050" />
		        <u-icon v-if="status == 2" name="close-circle" size="80" color="#F56C6C" />
		        <view class="status_text size45">{{ status == 0 ? '充值中' : status == 1 ? '充值成功 ' : '充值失败' }}</view>
		      </view>
			  <div class="mt240">
				  
				  <u-button type="primary" shape="circle" @click="gotoPayUrl" v-if="status==0" >继续支付</u-button>
				  <u-button @click="goHome">返回主页</u-button>
			  </div>
				
		    </view>
	</view>
</template>

<script>
	import {queryOrderStatus} from '@/api/member.js'
	export default {
		data() {
			return {
				status:'',
				jumpUrl:'',
				orderId:'',
			}
		},
		onLoad(op) {
			this.orderId = op.id;
			this.status = Number(op.status);
			this.queryOrder()
		},
		methods: {
			goHome(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			gotoPayUrl(){
			  window.location.href = this.jumpUrl
			},
			queryOrder(){
			    queryOrderStatus({id:this.orderId}).then((res) => {
			      try {
			        if (res.code == 200) {
			          this.status = res.data.status
			          //showFailToast(res.data.msg)
			          this.jumpUrl = res.data.payUrl
			          
			        }
			      }finally {
			        
			      }
			    });
			
			
			
			}
		}
	}
</script>

<style lang="scss" scoped>
.page_box{
  
  padding: 150rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  .status_box{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .status_text{
      
      margin-top: 20px;
    }
  }
}
</style>
