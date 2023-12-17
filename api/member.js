import request from '@/utils/request'


/**
 * @description: 用户历史列表
 */
export function memberCollectList(params) {
	return request({
		url: '/memberCollect/list',
		method: 'GET',
		params,
		login: true
	});
}

/**
 * @description: 用户收藏列表
 */
export function memberHistoryList(params) {
	return request({
		url: '/memberHistory/list',
		method: 'GET',
		params,
		login: true
	});
}


/**
 * @description: 用户充值记录
 */
export function memberOrderList(data) {
	return request({
		url: '/order/list',
		method: 'GET',
		data,
		login: true
	});
}


/**
 * @description: 用户消费记录
 */
export function memberCoinLogList(data) {
	return request({
		url: '/memberCoinLog/list',
		method: 'GET',
		data,
		login: true
	});
}


export function getMemberLoginInfo(data) {
	return request({
		url: '/member/loginInfo',
		method: 'GET',
		data,
		login: true
	});
}


/**
 * 会员信息
 * @param params
 */

export function getMemberInfoNoLogin(data) {
	return request({
		url: '/member/info',
		method: 'GET',
		data,
		login: true
	});
}

/**
 * @description: 获取产品信息
 */

export function listProductByStatus(data) {
	return request({
		url: '/product/listByStatus',
		method: 'GET',
		data,
		login: true
	});
}


/**
 * @description: 创建订单
 */

export function createOrder(data) {
	return request({
		url: '/order/create',
		method: 'POST',
		data,
		login: true
	});
}


export function queryOrderStatus(data) {
	return request({
		url: '/order/query',
		method: 'POST',
		data,
		login: true
	});
}


// /memberComplain/add  添加投诉 post
// 参数：content 投诉内容
export function memberComplainAdd(data) {
	return request({
		url: '/memberComplain/add',
		method: 'POST',
		data,
		login: true
	});
}



// /memberComplain/page 投诉分页 get
// 参数：分页参数
// 参数：status 状态（1未处理，2已处理）
export function memberComplainList(data) {
	return request({
		url: '/memberComplain/page',
		method: 'get',
		data,
		login: true
	});
}

// /memberComplain/detail  查看投诉详情 get
// 参数：id
// 返回参数：content 内容
// 返回参数：recover 回复内容
// 返回参数：status 状态（1未处理，2已处理）
export function memberComplainDetail(data) {
	return request({
		url: '/memberComplain/detail',
		method: 'get',
		data,
		login: true
	});
}


// /memberComplain/delete 删除投诉 post
// 参数：id
export function delMemberComplain(data) {
	return request({
		url: '/memberComplain/delete',
		method: 'get',
		data,
		login: true
	});
}
