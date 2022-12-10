import request from "@/utils/index";
// 轮播图
export const getBanner = () => { return request.get('/banner')}
// 首页发现
export const getHome = () => {return request.get('/homepage/block/page',{params:{timestamp: Date.now()}})}