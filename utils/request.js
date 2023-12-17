import _config from './config'; // 导入私有配置
// import store from '@/store/index.js'
import {
	msgLabel
} from '@/utils/utils.js'
import cookie from "./cookie.js";
let ajaxTimes = 0;
export default function $http(options) {
	// 进行url字符串拼接，_config.url是再config中配置要请求的域名或者id+端口号这样方便管理，
	// options.url是index中请求配置的，完美拼接

	options.url = _config.url + options.url;
	return new Promise((resolve, reject) => {
		// _config.header['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

		// if(options.data && options.data.authCode){
		// 	_config.header['Fex-auth'] = options.data.authCode
		// }
		// 拦截请求
			const token = uni.getStorageSync('token');
		if (token && options.login) {
			_config.header = {
				..._config.header,
				Authorization: "Bearer " + token
			}
		}else{
			_config.header = {
				..._config.header,
				Authorization:'',
			}
		}
		
		ajaxTimes++;
		// 显示加载中 效果
		if(options.url.indexOf('/api/card/open') == -1){
			uni.showLoading({
				title: "加载中",
				mask: true,
			});
		}
		
		_config.complete = (response) => {
			
			ajaxTimes--;
			if (ajaxTimes === 0) {
				//  关闭正在等待的图标
				uni.hideLoading();
			}
			
			// 登录失效
			if (response.data.code === 401 || response.data.code === 1011006 
			|| response.data.code ===  1011009 ||  response.data.code === 1011008 ||
			response.data.code === 1011005) {
				//返回登录界面
				// console.log('登录失效');
				uni.setStorageSync('token',null)
				uni.setStorageSync('phoneNumber','')
				uni.setStorageSync('userInfo', '');
				if(options.url.indexOf('/significant/getTime') != -1){
					resolve(response.data);
					return
				}
				
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					showCancel: false,
					success: (res) => {
						/**
						 * 如果需要强制登录，使用reLaunch方式
						 */
						
						uni.navigateTo({
							url: '/pages/login/login'
						})
						// store.dispatch('user/removeToken')
					}

				})


			} else if (response.data.code == 200 || response.data.code === 0) {
				resolve(response.data);
			} else {
				resolve(response.data);
				// uni.showToast({
				// 	icon: 'none',
				// 	title: msgLabel[response.data.errorCode]
				// });
				// if (response.data.message !== null) {

				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: response.data.message
				// 	});
				// }
				// reject(response.data);
			}
		}
		_config.fail = (response) => {
			// console.log(response)
			reject(response.data);
			uni.showToast({
				icon: 'none',
				title: '系统异常,请稍后再试'
			});
		}
		// console.log(Object.assign({}, _config, options));
		// 开始请求
		uni.request(Object.assign({}, _config, options));
	})
}
