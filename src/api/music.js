import request from "@/utils/index";
// 获取日推
export const getEverDayMusic = () => {return request.get('/recommend/songs',{params:{timestamp: Date.now()}})}
// 获取喜欢音乐
export const getIsLike = (uid) => {return request.get('/likelist',{params:{uid:uid,timestamp: Date.now()}})}
// 获取用户歌单
export const getUserMusicList = (uid) =>{ return request.get('/user/playlist',{params:{uid:uid,timestamp: Date.now()}})}
// 获取音乐url
export const getMusicUrl = (id,level) => {return request.get('/song/url/v1',{params:{id:id,level:level,timestamp: Date.now()}})}
// 喜欢音乐
export const getLikeMusic = (id,like) => {return request.get('/like',{params:{id:id,like:like,timestamp: Date.now()}})}
// 获取推荐新音乐
export const getNewMusic = (limit) => {return request.get('/personalized/newsong',{params:{limit:limit,timestamp: Date.now()}})}
// 获取歌曲详情
export const getMusicDetail = (ids) => {return request.get('/song/detail',{params:{ids:ids,timestamp: Date.now()}})}
//获取歌词
export const getMusicLyric = (id) => {return request.get('/lyric',{params:{id:id}})}
// 

// 

// 














