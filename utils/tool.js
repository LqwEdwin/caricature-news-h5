/**
 * 
 * 百度营销埋码 应用API 
 */

let url = "http://baidu.yunshanyunche.com";


/**
 * 上报激活
 */
function XBDActive() {

	//缓存周期内，仅执行一次
	let XBDactiveState = uni.getStorageSync("XBDactiveState");
	if (XBDactiveState) {
		return;
	}

	let system = uni.getSystemInfoSync();

	if (system.osName == "android") {

		//android
		plus.device.getOAID({
			success: (e) => {
				uni.request({
					url: url + '/api/active',
					data: {
						oaid: e.oaid,
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						uni.setStorageSync("XBDactiveState",true);
						console.log(res.data);
					}
				});
			},
			fail: (e) => {
				console.log('getOAID failed: ' + JSON.stringify(e));
				uni.request({
					url: url + '/api/active',
					data: {
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						uni.setStorageSync("XBDactiveState",true);
						console.log(res.data);
					}
				});
			}
		});

	} else {

		//iOS
		plus.device.getInfo({ //需要勾选IDFA
			success: (e) => {
				let idfa = e.idfa;
				uni.request({
					url: url + '/api/active',
					data: {
						idfa: idfa,
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			},
			fail: function(e) {
				console.log('getIDFA failed: ' + JSON.stringify(e));
				uni.request({
					url: url + '/api/active',
					data: {
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			}
		});

	}

	uni.setStorageSync("XBDactiveState", true);
}


/**
 * 上报注册
 */
function XBDRegister() {


	let system = uni.getSystemInfoSync();

	if (system.osName == "android") {

		//android
		plus.device.getOAID({
			success: (e) => {
				uni.request({
					url: url + '/api/register',
					data: {
						oaid: e.oaid,
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			},
			fail: (e) => {
				console.log('getOAID failed: ' + JSON.stringify(e));
				uni.request({
					url: url + '/api/register',
					data: {
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			}
		});

	} else {

		//iOS
		plus.device.getInfo({ //需要勾选IDFA
			success: (e) => {
				let idfa = e.idfa;
				uni.request({
					url: url + '/api/register',
					data: {
						idfa: idfa,
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			},
			fail: function(e) {
				console.log('getIDFA failed: ' + JSON.stringify(e));
				uni.request({
					url: url + '/api/register',
					data: {
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			}
		});

	}

}


/**
 * 上报下单
 * 
 * money: 下单金额，单位：分
 */
function XBDOrders(money) {


	let system = uni.getSystemInfoSync();

	if (system.osName == "android") {

		//android
		plus.device.getOAID({
			success: (e) => {
				uni.request({
					url: url + '/api/orders',
					data: {
						money: money,
						oaid: e.oaid,
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			},
			fail: (e) => {
				console.log('getOAID failed: ' + JSON.stringify(e));
				uni.request({
					url: url + '/api/orders',
					data: {
						money: money,
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			}
		});

	} else {

		//iOS
		plus.device.getInfo({ //需要勾选IDFA
			success: (e) => {
				let idfa = e.idfa;
				uni.request({
					url: url + '/api/orders',
					data: {
						money: money,
						idfa: idfa,
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			},
			fail: function(e) {
				console.log('getIDFA failed: ' + JSON.stringify(e));
				uni.request({
					url: url + '/api/orders',
					data: {
						money: money,
						os: system.osName,
						device_info: system.deviceModel,
					},
					success: (res) => {
						console.log(res.data);
					}
				});
			}
		});

	}

}

export {
	XBDActive,
	XBDRegister,
	XBDOrders
}