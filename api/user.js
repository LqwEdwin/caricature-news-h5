import request from '@/utils/request'


/**
 * @description: 用户登录
 */
export function login(data) {
	return request({
		url: '/login',
		method: 'POST',
		data,
		login: false
	});
}
/**
 * @description: 用户注册
 *
 * 用户注册成功后直接后台登录，返回登录后的Token
 *
 * 如果注册失败会返回异常
 */
export function reg(data) {
	return request({
		url: '/reg',
		method: 'POST',
		data,
		login: false
	});
}


/**
 * @description: 获取用户信息
 */

export function getUser(data) {
	return request({
		url: '/getUserInfo',
		method: 'GET',
		data,
		login: true
	});
}


export function getUserNow(data) {
	return request({
		url: '/getUserInfoNow',
		method: 'GET',
		data,
		login: true
	});
}


/**
 * @description: 用户登出
 */
export function doLogout(data) {
	return request({
		url: '/logout',
		method: 'POST',
		data,
		login: true
	});
}

/**
 * @description: 用户修改密码
 */

export function changePassword(data) {
	return request({
		url: '/changePass',
		method: 'POST',
		data,
		login: true
	});
}


export function pushVisitor(data) {
	return request({
		url: '/visitor',
		method: 'POST',
		data,
		login: false
	});
}

export function autoReg(data) {
	return request({
		url: '/autoReg',
		method: 'POST',
		data,
		login: false
	});
}


export function bindPhone(data) {
	return request({
		url: '/bind',
		method: 'POST',
		data,
		login: true
	});
}
