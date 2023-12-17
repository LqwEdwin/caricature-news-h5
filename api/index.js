import request from '@/utils/request'


/**
 * @description: 首页数据
 */
export function getIndexData(data) {
  return request({
      url: '/indexData',
      method: 'GET',
      data,
	 login:true
    }
  );
}

/**
 * 推荐数据
 * @param params
 */

export function getRecommendData(data) {
  return request({
		url: '/list/recommend',
		method: 'GET',
      data,
	 login:true
    }
  );
}

/**
 * 获取排行榜数据
 * case "hot": 总榜
 * case "free": 免费
 * case "recommend": 推荐
 * case "fee": 畅销
 * case "new": 新作
 *
 * @param params
 */
export function getRankingData(params) {
  return request({
	url: '/list/ranking/'+params,
	method: 'GET',
	 login:true
    }
  );
}
