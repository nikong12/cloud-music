<template>
    <div class="app">
        <!-- <div class="left">
            <el-image
                class="my"
                @click="drawertow = true"
                :src="musicInfo.imgUrl"
                fit="fill"
            >
            </el-image>
            <el-drawer
                title="我是标题"
                :direction="direction"
                :visible.sync="drawertow"
                :with-header="false"
                ref="drawer_el"
                :close-on-click-modal="false"
                :wrapper-closable="true"
                :modal-append-to-body="false"
                size="100%"
            >
                <span>我来啦!</span>
                <Footer />
            </el-drawer>
            <div>
                <div class="title">
                    <span>{{ musicInfo.name }}</span>
                    <span
                        class="ic"
                        style="cursor: pointer"
                        @click="musiclike(playMusic.id)"
                    >
                        <svg
                            v-if="isLiked(playId)"
                            t="1664864948612"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="6956"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z"
                                p-id="6957"
                                fill="#d81e06"
                            ></path>
                        </svg>
                        <svg
                            v-else
                            t="1664865016839"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="7495"
                            width="20"
                            height="20"
                        >
                            <path
                                d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z m0 63.146667c-41.44 0-70.261333 15.189333-116.96 55.04-2.165333 1.845333-14.4 12.373333-17.941334 15.381333a32.32 32.32 0 0 1-41.770666 0c-3.541333-3.018667-15.776-13.536-17.941334-15.381333-46.698667-39.850667-75.52-55.04-116.96-55.04C230.186667 180.48 149.333333 281.258667 149.333333 426.698667 149.333333 537.6 262.858667 675.242667 493.632 834.826667a32.352 32.352 0 0 0 36.736 0C761.141333 675.253333 874.666667 537.6 874.666667 426.698667c0-145.44-80.853333-246.218667-206.88-246.218667z"
                                p-id="7496"
                                fill="#707070"
                            ></path>
                        </svg>
                    </span>
                </div>
                <div class="name">
                    <div
                        v-for="(item, index) in musicInfo.singer"
                        :key="item.index"
                    >
                        {{ item.name }}
                        <span v-if="index < musicInfo.singer.length - 1"
                            >/</span
                        >
                    </div>
                </div>
            </div>
        </div> -->
        <div class="center">
            <div class="head">
                <div @click="chPlayType">
                    <i
                        v-if="playType === 0"
                        class="playType iconfont icon-24gl-repeat2"
                    ></i>
                    <i
                        v-if="playType === 1"
                        class="playType iconfont icon-24gl-repeatOnce2"
                    ></i>
                    <i
                        v-if="playType === 2"
                        class="playType iconfont icon-xunhuan"
                    ></i>
                </div>
                <i
                    class="pointer iconfont icon-shangyishou"
                    @click="lastMusic"
                ></i>
                <button class="playbtn" @click="parse">
                    <i
                        v-show="isPlay"
                        class="pointer iconfont icon-zanting"
                    ></i>
                    <i
                        v-show="!isPlay"
                        class="pointer iconfont icon-bofang"
                    ></i>
                </button>
                <i
                    class="pointer iconfont icon-xiayishou"
                    @click="nextMusic"
                ></i>
            </div>
            <!-- <div class="bott">
                <span class="spanl">{{
                    currenMusicInfo.currenTime | timeFormat
                }}</span>
                <el-slider
                    v-model="curren"
                    :show-tooltip="false"
                    class="timeSlider"
                    :disabled="url == ''"
                    @change="changeCurrenTime"
                ></el-slider>
                <span class="spanr">{{
                    (currenMusicInfo.totalTime / 1000) | timeFormat
                }}</span>
            </div> -->
        </div>
        <div class="right">
            <div class="leave">
                <div class="leaveSele" @click="openLeave">
                    {{ toneQuality[level].name }}
                </div>
                <transition name="el-fade-in-linear">
                    <div class="leaveBox" v-if="levelbox">
                        <tr
                            class="leavetr"
                            v-for="(item, index) in toneQuality"
                            :key="item.index"
                        >
                            <td class="leavetrtd">
                                <i
                                    style="color: #ec5241"
                                    :class="{ 'icon-duigoux': index === level }"
                                    class="iconfont"
                                ></i>
                            </td>
                            <td
                                :class="{ colorfz: index === level }"
                                class="leavetrtdd"
                                @click="seleLeave(index)"
                            >
                                {{ item.name }}
                            </td>
                        </tr>
                    </div>
                </transition>
            </div>
            <div class="playHistory">
                <i
                    class="iconfont icon-bofangliebiao"
                    @click="drawer = true"
                ></i>
                <el-drawer
                    :visible.sync="drawer"
                    :with-header="false"
                    ref="drawer_el"
                    :close-on-click-modal="false"
                    :wrapper-closable="true"
                    :modal-append-to-body="false"
                >
                    <div class="history_head">
                        <div class="history_title">当前播放</div>
                        <div class="history_botton">
                            <span>共{{ playList.length }}首</span>
                        </div>
                    </div>
                    <el-table
                        class="table"
                        :key="123"
                        :data="playList"
                        stripe
                        style="width: 420px"
                        ref="reference"
                        :row-style="{ height: '36px' }"
                        :cell-style="{ padding: '0' }"
                    >
                        <el-table-column type="index" width="25">
                            <template v-slot="scope">
                                <div v-if="showCurren(scope.row.id)">
                                    <i
                                        v-if="isPlay"
                                        style="font-size: 16px"
                                        class="iconfont icon-tingshu"
                                    ></i>
                                    <i
                                        v-else
                                        style="font-size: 14px"
                                        class="iconfont icon-24gf-play"
                                    ></i>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="musicName" width="155">
                            <template v-slot="{ row }">
                                <div
                                    class="fontsize"
                                    style="cursor: default"
                                    @dblclick="music(row)"
                                    :class="{ fontcolor: showCurren(row.id) }"
                                >
                                    {{ row.name | ellipsis }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="singer" width="145">
                            <template v-slot="{ row }">
                                <span
                                    class="fontsize"
                                    style="cursor: pointer"
                                    :class="{ fontcolor: showCurren(row.id) }"
                                    v-for="(item, index) in row.ar.slice(0, 3)"
                                    :key="item.index"
                                >
                                    {{ item.name | ellipsisName }}
                                    <template v-if="index < row.ar.length - 1">
                                        <span>/</span>
                                    </template>
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="time" width="54">
                            <template v-slot="{ row }">
                                <span
                                    class="fontsize"
                                    :class="{ fontcolor: showCurren(row.id) }"
                                >
                                    {{ (row.dt / 1000) | timeFormat }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="time" width="40">
                            <template v-slot="{ row }">
                                <span
                                    class="fontsize"
                                    :class="{ fontcolor: showCurren(row.id) }"
                                    @click="removeMusic(row.id)"
                                >
                                    <i
                                        class="iconfont icon-icon"
                                        style="font-size: 16px"
                                    ></i>
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-drawer>
            </div>
        </div>
        <audio
            ref="audioRef"
            :src="url"
            autoplay
            muted
            @ended="next"
            @timeupdate="updataCurrenTime"
        ></audio>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getMusicUrl, getLikeMusic } from '@/api/music'
import moment from 'moment'
export default {
    name: 'PlayFooter',
    computed: {
        ...mapState([
            'playId',
            'playList',
            'isPlay',
            'playMusic',
            'likeMusic',
            'currenMusicInfo',
            'historyList'
        ]),
        playIndex: {
            get() {
                return this.$store.state.playIndex
            },
            set(val) {
                return (this.$store.state.playIndex = val)
            }
        }
        // list() {
        //   return this.playList;
        // },
    },
    watch: {
        playId() {
            this.musicUrl()
        },
        isPlay(val) {
            if (this.url === '') return
            if (this.isPlay) {
                this.$refs.audioRef.play()
            } else {
                this.$refs.audioRef.pause()
            }
        },
        level() {
            this.musicUrl()
        }
    },
    data() {
        return {
            musicInfo: {
                imgUrl: 'https://pics3.baidu.com/feed/5243fbf2b2119313d006b93ae04201dc90238d7c.jpeg@f_auto?token=ab8d767995ef4e26803874cbf372d2c4',
                name: '未知歌曲',
                singer: [{ name: '未知歌手' }]
            },
            url: '',
            level: 0,
            curren: 0,
            toneQuality: [
                { name: '标准', level: 'standard' },
                { name: '极高', level: 'exhigh' },
                { name: '无损', level: 'lossless' }
            ],
            levelbox: false,
            playType: 0,
            playHistory: false,
            list: [],
            drawer: false,
            drawertow: false,
            direction: 'btt'
        }
    },

    mounted() {
        document.addEventListener('click', (e) => {
            if (e.target.className !== 'leaveSele') {
                this.levelbox = false
            }
        })
    },
    filters: {
        timeFormat(time) {
            if (time === '') return 0
            let min = parseInt(time / 60)
            let s = parseInt(time % 60)
            min = min < 10 ? '0' + min : min
            s = s < 10 ? '0' + s : s
            return min + ':' + s
        },
        ellipsis(value) {
            if (!value) return ''
            if (value.length > 10) {
                return value.slice(0, 10) + '...'
            }
            return value
        },
        ellipsisName(value) {
            if (!value) return ''
            if (value.length > 6) {
                return value.slice(0, 6) + '...'
            }
            return value
        }
    },
    methods: {
        getList() {
            this.historyList = this.playList
        },
        getMusicInfo() {
            if (this.playMusic.al.picUrl) {
                this.musicInfo.imgUrl = this.playMusic.al.picUrl
            } else {
                this.musicInfo.imgUrl =
                    'https://pics3.baidu.com/feed/5243fbf2b2119313d006b93ae04201dc90238d7c.jpeg@f_auto?token=ab8d767995ef4e26803874cbf372d2c4'
            }
            this.musicInfo.name = this.playMusic.name
            this.musicInfo.singer = this.playMusic.ar
            // console.log(this.musicInfo)
        },
        async musicUrl() {
            this.getMusicInfo()
            const { data: res } = await getMusicUrl(
                this.playId,
                this.toneQuality[this.level]
            )
            if (res.code !== 200) return
            this.url = res.data[0].url
            // console.log(this.playMusic)
        },
        isLiked(id) {
            return this.likeMusic.indexOf(id) !== -1
        },
        parse() {
            if (this.url === '') return
            this.$store.commit('setisPlay', !this.isPlay)
        },
        leaveTime(value) {
            return moment(value).format('mm:ss')
        },
        updataCurrenTime() {
            let time = Math.floor(this.$refs.audioRef.currentTime)
            if (time != this.currenMusicInfo.currenTime) {
                this.$store.commit('setCurrenTime', time)
                let person =
                    ((this.currenMusicInfo.currenTime * 1000) /
                        this.currenMusicInfo.totalTime) *
                    100
                person = Math.floor(person)
                this.curren = person
            }
        },
        lastMusic() {
            // console.log('aa')
            if (this.url === '') return
            if (this.playType === 2) {
                this.randomPlay()
            } else if (this.playList.length === 1) {
                this.circulation()
            } else {
                if (this.playIndex !== 0) {
                    this.$store.commit('setPlayIndex', this.playIndex - 1)
                    // this.$store.commit('setisPlay',true)
                    this.$store.commit(
                        'setPlayId',
                        this.playList[this.playIndex].id
                    )
                    this.$store.commit(
                        'setPlayMusic',
                        this.playList[this.playIndex]
                    )
                    this.$store.commit('setTotalTime', this.playMusic.dt)
                } else {
                    this.$store.commit(
                        'setPlayIndex',
                        (this.playIndex = this.playList.length - 1)
                    )
                    this.$store.commit(
                        'setPlayId',
                        this.playList[this.playIndex].id
                    )
                    this.$store.commit(
                        'setPlayMusic',
                        this.playList[this.playIndex]
                    )
                    this.$store.commit('setTotalTime', this.playMusic.dt)
                }
            }
        },
        nextMusic() {
            if (this.url === '') return
            if (this.playType === 2) {
                this.randomPlay()
            } else if (this.playList.length === 1) {
                this.circulation()
            } else {
                if (this.playIndex !== this.playList.length - 1) {
                    this.$store.commit('setPlayIndex', this.playIndex + 1)
                    this.$store.commit(
                        'setPlayId',
                        this.playList[this.playIndex].id
                    )
                    this.$store.commit(
                        'setPlayMusic',
                        this.playList[this.playIndex]
                    )
                    this.$store.commit('setTotalTime', this.playMusic.dt)
                } else {
                    this.$store.commit('setPlayIndex', (this.playIndex = 0))
                    this.$store.commit(
                        'setPlayId',
                        this.playList[this.playIndex].id
                    )
                    this.$store.commit(
                        'setPlayMusic',
                        this.playList[this.playIndex]
                    )
                    this.$store.commit('setTotalTime', this.playMusic.dt)
                }
            }
        },
        changeCurrenTime(val) {
            console.log(val)
            let time = ((val / 100) * this.currenMusicInfo.totalTime) / 1000
            this.$refs.audioRef.currentTime = time
        },
        openLeave() {
            this.levelbox === false
                ? (this.levelbox = true)
                : (this.levelbox = false)
        },
        openHistory() {
            this.playHistory === false
                ? (this.playHistory = true)
                : (this.playHistory = false)
        },
        showCurren(id) {
            return this.playId === id
        },
        // 音质
        seleLeave(e) {
            this.level = e
            this.levelbox = false
            // console.log(e)
        },
        // 喜欢音乐
        async musiclike(e) {
            let like = this.isLiked(e)
            const { data: res } = await getLikeMusic(e, !like)
            if (res.code !== 200) return
            if (like) {
                this.$confirm('是否取消喜欢', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        this.$store.commit('setLikeMusic', {
                            type: 'remove',
                            data: e
                        })
                        this.$message({
                            type: 'success',
                            message: '取消喜欢成功'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
            } else {
                this.$store.commit('setLikeMusic', {
                    type: 'unshift',
                    data: e
                })
            }
        },
        // 循环播放
        circulation() {
            if (this.url === '') return
            this.$refs.audioRef.currentTime = 0
            this.$store.commit('setisPlay', false)
            this.$refs.audioRef.pause()
            setTimeout(() => {
                this.$store.commit('setisPlay', true)
                this.$refs.audioRef.play()
            }, 500)
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min
        },
        // 随机播放
        randomPlay() {
            let num = this.getRandomInt(0, this.playList.length - 1)
            this.$store.commit('setPlayIndex', (this.playIndex = num))
            this.$store.commit('setPlayId', this.playList[this.playIndex].id)
            this.$store.commit('setPlayMusic', this.playList[this.playIndex])
            this.$store.commit('setTotalTime', this.playMusic.dt)
        },
        chPlayType() {
            this.playType++
            if (this.playType > 2) {
                this.playType = 0
            }
        },
        next() {
            if (this.playType === 0) {
                return this.nextMusic()
            } else if (this.playType === 1) {
                return this.circulation()
            } else {
                return this.randomPlay()
            }
        },
        music(e) {
            this.$store.dispatch('getPlayList', {
                playList: this.playList,
                id: e.id
            })
        },
        removeMusic(e) {
            this.list = this.playList
            let index = this.list.findIndex((item) => item.id == e)
            this.list.splice(index, 1)
            this.$store.commit('setPlayList', this.list)
        }
    }
}
</script>

<style scoped>
.table {
    margin-left: 10px;
}
.history_botton span {
    font-size: 12px;
    color: rgb(214, 214, 214);
}
.history_botton {
    margin-top: 10px;
}
.history_head {
    height: 65px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 20px;
    border-bottom: 1px solid rgb(203, 203, 203);
}
.history_title {
    font-size: 18px;
    font-weight: 700;
}
.fontsize {
    font-size: 12px;
}
.fontcolor {
    color: #ec4141;
}
.icon-tingshu,
.icon-24gf-play {
    font-size: 6px;
    color: #ec5241;
}
.history {
    width: 440px;
    height: 550px;
    background-color: white;
    box-shadow: -2px -2px 16px 2px rgb(0 0 0 / 20%);
    position: absolute;
    top: -576px;
    right: 80px;
    border-radius: 12px;
    overflow: auto;
}
.playType {
    font-size: 20px;
    line-height: 30px;
    cursor: pointer;
}
.playType:hover {
    color: #ec5241;
}
.leavetr {
    width: 100%;
    height: 40px;
}
.leavetrtd {
    width: 30px;
    text-align: center;
}
.leavetrtdd {
    width: 110px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    color: rgb(123, 123, 123);
}
.colorfz {
    font-size: 16px;
    color: black;
}
.leaveBox {
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 160px;
    height: 80px;
    /* border: 1px solid black; */
    border-radius: 8px;
    background-color: white;
    position: absolute;
    box-shadow: 2px 2px 10px 3px rgba(0, 0, 0, 0.2);
    top: -110px;
    right: 105px;
    z-index: 10;
}
.leave {
    margin-left: -215px;
}
.leaveSele {
    width: 38px;
    height: 20px;
    font-size: 13px;
    border: 1px solid #ec5241;
    text-align: center;
    line-height: 20px;
    color: #ec5241;
    cursor: pointer;
}
.bott {
    display: flex;
    width: 540px;
    justify-content: space-around;
    height: 30px;
    line-height: 30px;
    margin-left: 30px;
}
.bott span {
    margin-top: 3px;
    color: rgb(69, 69, 69);
    font-size: 12px;
}
.playbtn {
    width: 30px;
    height: 30px;
    border: 0;
    border-radius: 25px;
    line-height: 30px;
    background-color: rgba(236, 236, 236, 0.79);
}
.pointer:hover {
    color: #ec5241;
    cursor: pointer;
}
.icon-shangyishou {
    left: 80px;
    font-size: 18px;
    margin-top: 6px;
}
.icon-xiayishou {
    right: 80px;
    font-size: 18px;
    margin-top: 6px;
}
.icon-zanting,
.icon-bofang {
    font-size: 16px;
}
.app {
    border-top: 1px solid gray;
    bottom: 0;
    position: fixed;
    position: absolute;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 10;
    background-color: white;
}
.left {
    position: absolute;
    left: 30px;
    display: flex;
}
.my {
    width: 55px;
    height: 55px;
    border-radius: 8px;
}
.right {
    display: flex;
    position: absolute;
    right: 0;
}
.playHistory {
    margin-left: 15px;
}
.playHistory i {
    font-size: 22px;
    /* color: #ec5241; */
    cursor: pointer;
}
.playHistory i:hover {
    color: #ec5241;
}
.title {
    font-size: 14px;
    margin-left: 15px;
    margin-top: 4px;
    display: flex;
    align-items: center;
    height: 22px;
}
svg {
    margin-left: 10px;
}
.name {
    display: flex;
    margin-left: 18px;
    margin-top: 5px;
}
.name div {
    font-size: 12px;
    color: rgb(60, 60, 60);
}
.head {
    display: flex;
    width: 200px;
    justify-content: space-evenly;
    top: 8px;
    margin: 0 auto;
    /* margin-top: 12px; */
}
.timeSlider {
    width: 460px;
    /* bottom: 6px; */
}
.center {
    width: 600px;
}
:deep(.el-slider__button) {
    width: 8px;
    height: 8px;
    margin-bottom: 2px;
    border: 1px solid #ec5241;
    background-color: #ec5241;
}
:deep(.el-slider__runway) {
    height: 4px;
}
:deep(.el-slider__bar) {
    height: 4px;
    background-color: #ec5241;
}
:deep(.el-table__header-wrapper) {
    /* height: 20px; */
    display: none;
}
:deep(.el-table__row):hover {
    color: rgb(43, 43, 43);
}
</style>