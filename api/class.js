import request from '@/utils/request'


/**
 * @description: 漫画分类信息
 */
export function comicCategoryList(data) {
  return request({
      url: '/comicCategory/list',
      method: 'GET',
      data,
	  login:true
    }
  );
}
/**
 * @description: 所有漫画
 */
export function comicList(data) {
  return request({
      url: '/comic/list',
      method: 'GET',
      data,
	  login:true
    }
  );
}



