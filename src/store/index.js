import Vuex from 'vuex'
import Vue from 'vue'
import { getAcount, setLoginOut } from '@/api/user'
import { getIsLike, getUserMusicList } from '@/api/music'
Vue.use(Vuex)

const actions = {
    async getAcount({ commit, dispatch }) {
        const { data: res } = await getAcount()
        if (res.code !== 200) return
        console.log(res)
        if (res.account !== null) {
            commit('setLoginInfo', res)
            commit('setIslogin', true)
            dispatch('getLikeList')
            dispatch('getmyPlayList')
        }
    },
    // async doLoginOut() {
    //     const { data: res } = await setLoginOut()
    //     if (res.code !== 200) return
    //     // this.$message({
    //     //     type: 'success',
    //     //     message: '已退出登录'
    //     // })
    //     console.log(res)
    //     let item = { account: {}, profile: {} }
    //     // commit('setLoginInfo', item)
    //     // commit('setIslogin', false)
    //     // commit('setLoginInfo', item)
    //     commit('setIslogin', false)

    // },
    // doLoginOut({ commit, state }) {
    //     this.$confirm('是否退出登录', '提示', {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning'
    //     })
    //         .then(async () => {
    //             const { data: res } = await setLoginOut()
    //             if (res.code !== 200) return
    //             this.$message({
    //                 type: 'success',
    //                 message: '已退出登录'
    //             })
    //             commit('setLoginInfo', { account: null, profile: null })
    //             commit('setIslogin', false)
    //         })
    //         .catch(() => {
    //             this.$message({
    //                 type: 'info',
    //                 message: '已取消'
    //             })
    //         })
    // },
    async getLikeList({ commit, state }) {
        const { data: res } = await getIsLike(state.profile.id)
        if (res.code !== 200) return
        // console.log(res)

        if (res.ids instanceof Array) {
            commit('setLikeMusic', {
                type: 'get',
                data: res.ids
            })
        }
    },
    async getmyPlayList({ commit, state }) {
        const { data: res } = await getUserMusicList(state.profile.userId)
        if (res.code !== 200) return
        // console.log(res)

        commit('setmyPlayList', res.playlist)
    },
    getPlayList({ commit }, playrold) {
        commit('setPlayList', playrold.playList)
        commit('setPlayId', playrold.id)
        let index = playrold.playList.findIndex((item) => item.id == playrold.id)
        commit('setPlayIndex', index)
        commit('setPlayMusic', playrold.playList[index])
        commit('setisPlay', true)
        commit('setTotalTime', playrold.playList[index].dt)
    }

}
const mutations = {
    // 登录状态
    setIslogin(state, isLogin) {
        state.isLogin = isLogin
        if (isLogin === true) {
            window.sessionStorage.setItem('isLogin', true)
        } else {
            window.sessionStorage.setItem('isLogin', false)
        }
    },
    setmyPlayList(state, value) {
        state.myPlayList = value
    },
    setLoginInfo(state, value) {
        state.account = value.account
        state.profile = value.profile
    },
    // 获取喜欢音乐
    setLikeMusic(state, value) {
        if (value.type === 'get') {
            state.likeMusic = value.data
        } else if (value.type === 'unshift') {
            state.likeMusic.unshift(value.data)
        } else if (value.type === 'remove') {
            state.likeMusic.splice(state.likeMusic.indexOf(value.data), 1)
        }
    },
    setPlayList(state, value) {
        state.playList = value
    },
    setPlayId(state, value) {
        state.playId = value
    },
    setPlayIndex(state, value) {
        state.playIndex = value
    },
    setisPlay(state, value) {
        state.isPlay = value
    },
    setPlayMusic(state, value) {
        state.playMusic = value
    },
    setTotalTime(state, value) {
        state.currenMusicInfo.totalTime = value
    },
    setCurrenTime(state, value) {
        state.currenMusicInfo.currenTime = value
    },
    setHistoryList(state, value) {
        state.historyList = value
    },
    setDrawertow(state, value) {
        state.drawertow = value
    },
    setLoginBox(state, value) {
        state.loginBox = value
    }
}
const state = {
    // 登录状态
    isLogin: window.sessionStorage.getItem('isLogin') !== 'true' ? false : true,
    // isLogin: true,
    // 账户信息
    account: {},
    // 用户信息
    profile: {},
    // 喜欢音乐id列表
    likeMusic: [],
    // 我的歌单
    myPlayList: [],


    // 当前播放的id
    playId: 0,
    // 播放列表
    playList: [],
    // 播放索引
    playIndex: 0,
    // 是否在播放
    isPlay: false,
    // 当前播放的音乐
    playMusic: [],
    // 播放时长，歌曲时长
    currenMusicInfo: {
        // 歌曲时长
        totalTime: 0,
        // 当前时长
        currenTime: 0
    },
    // 播放列表
    drawertow: false,
    // 登录窗口
    loginBox: false
}
export default new Vuex.Store({
    actions,
    mutations,
    state
})

