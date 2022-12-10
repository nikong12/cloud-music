import request from "@/utils/index";
// 获取歌单详情
export const getPlayList =(id) => {return request.get('/playlist/detail',{params:{id:id,timestamp: Date.now()}})}
// 获取歌单所有歌曲
export const getMusic = (id) => {return request.get('/playlist/track/all',{params:{id:id,timestamp: Date.now()}})}
// 收藏取消收藏歌单
export const getCollectMusicList = (t,id) => {return request.get('/playlist/subscribe',{params:{t:t,id:id}})}
// 获取推荐歌单
export const getRecommMusicList = (limit) => {return request.get('/personalized',{params:{limit:limit,timestamp: Date.now()}})}
// 每日推荐歌单
export const getDayMusiList = () => {return request.get('/recommend/resource',{params:{timestamp: Date.now()}})}
// 创建歌单
export const setMusicList = (name) => {return request.get('/playlist/create',{params:{name:name}})}
// 删除歌单
export const delMusicList = (id) => {return request.get('/playlist/delete',{params:{id:id}})}






