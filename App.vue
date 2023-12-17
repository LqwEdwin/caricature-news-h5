<script>
	export default {
		globalData: {
			 
			websiteKey: 'wymh888', //后台APP密钥
			facility: 'Android', //系统 Android 、ios
			deviceid: '', //系统 id
			img_websiteUrl: '',
			uid: '',
			utoken: '',
			webUrl: 'http://mh.gskmh.cn',
			book_img: '',
			sigmob: 1849548002,
			version: '',
			adpid:'1693227216' //uniapp激励广告位id
		},
		onLoad() {
			let token = uni.getStorageSync('token')
			if(!token){
				this.$store.dispatch('GetUserInfoNow')
			}
				
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			// #ifdef APP-PLUS
				var args= plus.runtime.arguments;  
				if(args){  
					console.log(args)
					// 处理args参数，如直达到某新页面等  
				}  
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
	
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/static/css/index.scss";  
	
	@font-face {
		  font-family: 'iconfont' ;  /* project id 1997429 */
		  src: url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.eot');
		  src: url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.eot?#iefix') format('embedded-opentype'),
		  url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.woff2') format('woff2'),
		  url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.woff') format('woff'),
		  url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.ttf') format('truetype'),
		  url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.svg#iconfont') format('svg');
	}
	.iconfont{
	    font-family:"iconfont" !important;
		font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2px;
	    -moz-osx-font-smoothing: grayscale;
	}
</style>
