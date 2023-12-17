import request from '@/utils/request'



/**
 * @description: 所有漫画
 */
export function comicList(data) {
	return request({
		url: '/comic/list',
		method: 'GET',
		data,
		login: true
	});
}
/**
 * @description: 首页数据
 */
export function getComicDetail(data) {
	return request({
		url: '/comic/detail',
		method: 'POST',
		data,
		login: true
	});
}

export function getComicDetailForLogin(data) {
	return request({
		url: '/comic/loginDetail',
		method: 'POST',
		data,
		login: true
	});
}


/**
 * @description: 首页数据 根据分集ID
 */
export function getComicContent(data) {
	return request({
		url: '/comic/getContentByEpdNumId',
		method: 'GET',
		data,
		login: true
	});
}
export function getLoginComicContent(data) {
	return request({
		url: '/comic/getLoginContentByEpdNumId',
		method: 'GET',
		data,
		login: true
	});
}


/**
 * @description: 开始阅读按钮，需要自动寻找阅读历史
 */

export function startReadComic(data) {
	return request({
		url: '/comic/startRead',
		method: 'GET',
		data,
		login: true
	});
}


/**
 * @description: 开始阅读按钮，需要自动寻找阅读历史
 */

export function loginStartRead(data) {
	return request({
		url: '/comic/loginStartRead',
		method: 'GET',
		data,
		login: true
	});
}



/**
 * @description: 切换收藏信息
 */

export function switchMemberCollect(data) {
	return request({
		url: '/memberCollect/switch',
		method: 'POST',
		data,
		login: true
	});
}




/**
 * @description: 漫画分类信息
 */

export function comicCategoryList(data) {
	return request({
		url: '/comicCategory/list',
		method: 'GET',
		data,
		login: true
	});
}

/**
 * @description: 漫画翻页
 */
export function comicTurnPages(data) {
	return request({
		url: '/comic/turnPages',
		method: 'GET',
		data,
		login: true
	});
}

export function loginTurnPages(data) {
	return request({
		url: '/comic/loginTurnPages',
		method: 'GET',
		data,
		login: true
	});
}


/**
 * @description: 漫画章节目录分页获取
 */
export function listEpisodes(data) {
	return request({
		url: '/comic/listEpisodes',
		method: 'GET',
		data,
		login: true
	});
}


export function loginListEpisodes(data) {
	return request({
		url: '/comic/loginListEpisodes',
		method: 'GET',
		data,
		login: true
	});
}


/**
 * @description:  检查方法，返回502调用解锁方法
 * -401 登录
-500 传参错误
-502 需解锁
-200 正常可查看
 */

export function checkContentAuthority(data) {
	return request({
		url: '/comic/checkContentAuthority',
		method: 'POST',
		data,
		login: true
	});
}


export function loginCheckContentAuthority(data) {
	return request({
		url: '/comic/loginCheckContentAuthority',
		method: 'POST',
		data,
		login: true
	});
}

/**
 * @description:  解锁方法
 * -401 登录
 * -500 传参错误
 * -501 余额不足
 * -200 正常可查看
 */

export function unlockContent(data) {
	return request({
		url: '/comic/unlockContent',
		method: 'GET',
		data,
		login: true
	});
}


export function setComicLike(data) {
	return request({
		url: '/comic/like',
		method: 'POST',
		data,
		login: true
	});
}