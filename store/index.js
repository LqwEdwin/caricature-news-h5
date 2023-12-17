import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";
import {
	getUser,
	login,
	doLogout,
	reg,
	pushVisitor,
	autoReg,
	getUserNow
} from '@/api/user';
import cookie from "@/utils/cookie";


import _config from '@/utils/config'; // 导入私有配置
import { promises } from "stream";
const loginKey = "login_status";

const vuexStore = new Vuex.Store({
	state: {
		userInfo: null,
		token: undefined,
		lastUpdateTime: 0,
	},
	getters: {
		getUserInfo() {
			console.log(this.userInfo, '数据')
			return this.userInfo || uni.getStorageSync('userInfo') || {};
		},
		getToken() {
			return this.token || uni.getStorageSync('token');
		},
		getLastUpdateTime() {
			return this.lastUpdateTime;
		},

	},
	mutations: {
		login(state, token, expires_time) {
			state.token = token;
			uni.setStorageSync('number', '1')
			cookie.set(loginKey, token, expires_time);
		},
		logout(state) {
			state.token = null;
			state.userInfo = null
			cookie.clearAll()

		},
		getUserInfo(state, userInfo) {
			state.userInfo = userInfo;
			cookie.set('userInfo', userInfo);
		},
		setToken(state, token) {
			state.token = token ? token : '';
			uni.setStorageSync('token', token)
		},
		setUserInfo(state,info) {
			state.userInfo = info;
			state.lastUpdateTime = new Date().getTime();
			uni.setStorageSync('userInfo', info)
		},

	},
	actions: {
		

		async Login(params) {
			try {
				const response = await login(params);
				const code = response.code;
				const result = response.data;
				if (code === 200) {
					// save token
					this.commit('setToken',result);  
					await this.dispatch('GetUserInfoNow');
				}
				return Promise.resolve(response);
			} catch (error) {
				return Promise.reject(error);
			}
		},

		async Register(params) {
			try {
				const response = await reg(params);
				const code = response.code;
				const result = response.data;
				if (code === 200) {
					// save token
					this.commit('setToken',result);  
				}
				return Promise.resolve(response);
			} catch (error) {
				return Promise.reject(error);
			}
		},

		// 获取设备或浏览器唯一标识
		async getVisitorId() {
			
			return new Promise(async (resolve, reject) => {
				const fpPromise = import('@/assets/FingerprintJS.js')
					.then(FingerprintJS => FingerprintJS.load())
				fpPromise.then(fp => fp.get()).then(async result => {
					// This is the visitor identifier:
					
					const visitorId = result.visitorId
					uni.setStorageSync('visitorId', visitorId)
					let reqData = {
						visitorId: visitorId
					}
					
					await pushVisitor(reqData)
					
					//console.log('唯一标识', visitorId)
					//自动请求注册且登录
					try {
						const loginResponse = await autoReg(reqData);
						const code = loginResponse.code;
						const result = loginResponse.data;
						if (code === 200) {
							// save token
							this.commit('setToken',result);  
							await this.dispatch('GetUserInfoNow')
						}
						return resolve(loginResponse);
					} catch (error) {
						return reject(error);
					}
				})
			}) 
		},

		async GetUserInfo() {
			return new Promise((resolve, reject) => {
				let token = this.token || uni.getStorageSync('token')
				// console.log(token)
				// console.log('token')

				//浏览器指纹
				let visitorId = uni.getStorageSync('visitorId')
				// 1 = 第一次
				let firstIn = uni.getStorageSync('firstIn') || '1'

				if (firstIn == '2' && !token && !visitorId) {
					uni.setStorageSync('firstIn',2)
					
					console.log('token22')
					// 第一次进来不注册
					this.getVisitorId()
				} else {
					uni.setStorageSync('firstIn',2)
					console.log('token33')

					if (!token) {
						console.log('token55 ' + token)
						reject();
						return
					}

					getUser()
						.then((res) => {
							this.commit('setUserInfo',res.data);
							resolve(res.data);
						})
						.catch((error) => {
							reject(error);
						});
				}



			});
		},

		/**
		 * no cache
		 * @constructor
		 */
		async GetUserInfoNow() {
			return new Promise(async (resolve, reject) => {
				let token = this.token || uni.getStorageSync('token')
				// console.log(token)
				if (!token) {
					console.log(this)
				   let res = await this.dispatch('getVisitorId');
					// console.log('auto.....false....',res)
					resolve(res)
					return
				}
			   let res = await getUserNow()
			   if(res.code == 200){
				    resolve(res.data)
				   this.commit('setUserInfo',res.data);
			   }else{
				   	reject(null);
			   }
			
			


			});
		},


		async Logout() {
			
			if (this.getToken) {
				try {
					await doLogout();
				} catch {
					console.error('注销Token失败');
				}
			}
			this.commit('setToken',undefined);  
			this.commit('setUserInfo',null);  
			
			uni.removeStorageSync('token') 
			uni.removeStorageSync('userInfo') 
		},
	},

});

export default vuexStore