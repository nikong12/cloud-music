<template>
    <div class="app">
        <Header class="header" />
        <div class="aaaaaa">
            <div class="ddd">
                <el-menu
                    router
                    :default-active="activeMenu"
                    @select="handleSelect"
                >
                    <el-menu-item-group>
                        <template slot="title">我的音乐</template>
                        <el-menu-item
                            :index="item.path"
                            v-for="item in leftList"
                            :key="item.index"
                        >
                            <span slot="title">{{ item.title }}</span>
                        </el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group v-if="isLogin">
                        <template slot="title">
                            创建的歌单
                            <i
                                @click="setList = true"
                                class="iconfont icon-chuangjian"
                            ></i>
                            <i
                                @click="opendel = true"
                                class="iconfont icon-shanchu"
                            ></i>
                        </template>
                        <el-menu-item
                            :index="subPath(item.id)"
                            v-for="(item, index) in creList"
                            :key="item.id"
                        >
                            <div slot="title" class="text-hidden">
                                <svg
                                    v-if="index === 0"
                                    t="1664982082416"
                                    class="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="4798"
                                    width="16"
                                    height="16"
                                >
                                    <path
                                        d="M667.786667 117.333333C832.864 117.333333 938.666667 249.706667 938.666667 427.861333c0 138.250667-125.098667 290.506667-371.573334 461.589334a96.768 96.768 0 0 1-110.186666 0C210.432 718.368 85.333333 566.112 85.333333 427.861333 85.333333 249.706667 191.136 117.333333 356.213333 117.333333c59.616 0 100.053333 20.832 155.786667 68.096C567.744 138.176 608.170667 117.333333 667.786667 117.333333z m0 63.146667c-41.44 0-70.261333 15.189333-116.96 55.04-2.165333 1.845333-14.4 12.373333-17.941334 15.381333a32.32 32.32 0 0 1-41.770666 0c-3.541333-3.018667-15.776-13.536-17.941334-15.381333-46.698667-39.850667-75.52-55.04-116.96-55.04C230.186667 180.48 149.333333 281.258667 149.333333 426.698667 149.333333 537.6 262.858667 675.242667 493.632 834.826667a32.352 32.352 0 0 0 36.736 0C761.141333 675.253333 874.666667 537.6 874.666667 426.698667c0-145.44-80.853333-246.218667-206.88-246.218667z"
                                        p-id="4799"
                                        fill="#707070"
                                    ></path>
                                </svg>
                                <svg
                                    v-else
                                    t="1664981982049"
                                    class="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="3359"
                                    width="16"
                                    height="16"
                                >
                                    <path
                                        d="M384 810.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667V213.333333c0-21.333333 17.066667-38.4 34.133334-42.666666l512-85.333334c12.8 0 25.6 0 34.133333 8.533334 12.8 8.533333 17.066667 21.333333 17.066667 34.133333v554.666667c0 25.6-17.066667 42.666667-42.666667 42.666666s-42.666667-17.066667-42.666667-42.666666V179.2L426.666667 247.466667V768c0 25.6-17.066667 42.666667-42.666667 42.666667z"
                                        p-id="3360"
                                        fill="#515151"
                                    ></path>
                                    <path
                                        d="M256 938.666667c-93.866667 0-170.666667-76.8-170.666667-170.666667s76.8-170.666667 170.666667-170.666667 170.666667 76.8 170.666667 170.666667-76.8 170.666667-170.666667 170.666667z m0-256c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333333zM768 853.333333c-93.866667 0-170.666667-76.8-170.666667-170.666666s76.8-170.666667 170.666667-170.666667 170.666667 76.8 170.666667 170.666667-76.8 170.666667-170.666667 170.666666z m0-256c-46.933333 0-85.333333 38.4-85.333333 85.333334s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333334z"
                                        p-id="3361"
                                        fill="#515151"
                                    ></path>
                                </svg>
                                {{ item.name | ellipsis }}
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group v-if="isLogin">
                        <template slot="title">收藏的歌单</template>
                        <el-menu-item
                            :index="subPath(item.id)"
                            v-for="item in subList"
                            :key="item.id"
                            ><div slot="title" class="text-hidden">
                                <svg
                                    t="1664981982049"
                                    class="icon"
                                    viewBox="0 0 1024 1024"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    p-id="3359"
                                    width="16"
                                    height="16"
                                >
                                    <path
                                        d="M384 810.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667V213.333333c0-21.333333 17.066667-38.4 34.133334-42.666666l512-85.333334c12.8 0 25.6 0 34.133333 8.533334 12.8 8.533333 17.066667 21.333333 17.066667 34.133333v554.666667c0 25.6-17.066667 42.666667-42.666667 42.666666s-42.666667-17.066667-42.666667-42.666666V179.2L426.666667 247.466667V768c0 25.6-17.066667 42.666667-42.666667 42.666667z"
                                        p-id="3360"
                                        fill="#515151"
                                    ></path>
                                    <path
                                        d="M256 938.666667c-93.866667 0-170.666667-76.8-170.666667-170.666667s76.8-170.666667 170.666667-170.666667 170.666667 76.8 170.666667 170.666667-76.8 170.666667-170.666667 170.666667z m0-256c-46.933333 0-85.333333 38.4-85.333333 85.333333s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333333zM768 853.333333c-93.866667 0-170.666667-76.8-170.666667-170.666666s76.8-170.666667 170.666667-170.666667 170.666667 76.8 170.666667 170.666667-76.8 170.666667-170.666667 170.666666z m0-256c-46.933333 0-85.333333 38.4-85.333333 85.333334s38.4 85.333333 85.333333 85.333333 85.333333-38.4 85.333333-85.333333-38.4-85.333333-85.333333-85.333334z"
                                        p-id="3361"
                                        fill="#515151"
                                    ></path>
                                </svg>
                                {{ item.name | ellipsis }}
                            </div>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-menu>
            </div>
            <transition name="el-fade-in-linear">
                <div class="set" v-if="setList" @click="setList = false">
                    <div @click.stop="" class="setMusicList">
                        <h3>创建歌单</h3>
                        <el-input
                            placeholder="请输入内容"
                            v-model="musicListName"
                            clearable
                            class="inputtt"
                        >
                        </el-input>
                        <el-button @click="setMusicList" type="primary" plain
                            >创建歌单</el-button
                        >
                    </div>
                </div>
            </transition>
            <transition name="el-fade-in-linear">
                <div class="set" v-if="opendel" @click="opendel = false">
                    <div @click.stop="" class="delMusicList">
                        <h3>删除歌单</h3>
                        <div class="delList">
                            <div v-for="(item, index) in creList.slice(1, len)">
                                <el-checkbox label="复选框 A">{{
                                    item.name
                                }}</el-checkbox>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            <div class="div1">
                <router-view></router-view>
            </div>
        </div>
        <transition name="el-fade-in-linear">
            <Login v-if="loginBox" />
        </transition>
        <Footer class="footer" />
    </div>
</template>

<script>
import { setMusicList } from '@/api/musiclist'
import 'animate.css'
import Header from '@/components/Header'
import Left from '@/components/Left'
import Footer from '@/components/Footer'
import Login from '@/components/Login'
import { mapState } from 'vuex'
export default {
    name: 'Home',
    components: {
        Header,
        Left,
        Footer,
        Login
    },
    computed: {
        ...mapState([
            'myPlayList',
            'likeMusic',
            'profile',
            'isLogin',
            'loginBox'
        ]),
        // 创建的歌单
        creList() {
            return this.myPlayList.filter((item) => item.userId == this.userId)
        },
        len() {
            return this.creList.length
        },
        // 收藏的歌单
        subList() {
            return this.myPlayList.filter((item) => item.userId !== this.userId)
        },
        // userId
        userId() {
            return this.isLogin ? this.profile.userId : 0
        }
    },
    watch: {
        isLogin() {
            console.log('change')
            this.$store.dispatch('getAcount')
        }
    },
    data() {
        return {
            activeMenu: '/recommend',
            leftList: [
                { title: '发现音乐', path: '/recommend', key: 0 },
                { title: '每日推荐', path: '/daylist', key: 1 }
            ],
            key: 0,
            musicListName: '',
            setList: false,
            opendel: false
        }
    },
    created() {
        if (window.sessionStorage.getItem('activeMenu'))
            this.activeMenu = window.sessionStorage.getItem('activeMenu')
    },
    mounted() {},

    methods: {
        goindex(e) {
            this.key = e.key
            this.$router.push(e.path)
            // console.log(this.$refs.lli[e.key]);
        },
        handleSelect(key, keyPath) {
            // console.log(key, keyPath)
            window.sessionStorage.setItem('activeMenu', key)
            this.activeMenu = key
        },
        subPath(id) {
            // if (typeof id === 'number')
            // else return '/404'
            return `/playList/${id}`
        },
        async setMusicList() {
            if (this.musicListName == '') this.$message('请输入歌单名')
            const { data: res } = await setMusicList(this.musicListName)
            if (res.code !== 200) return
            this.$store.dispatch('getmyPlayList')
            this.setList = false
            this.$message({
                message: '创建成功',
                type: 'success'
            })
        }
    },
    filters: {
        ellipsis(value) {
            if (!value) return ''
            if (value.length > 9) {
                return value.slice(0, 9) + '...'
            }
            return value
        }
    }
}
</script>

<style scoped>
:deep(.el-checkbox) {
    margin-top: 5px;
}
.delList {
    margin-top: 20px;
    margin-left: 120px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}
.set {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.256);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 19;
}
.setMusicList {
    padding-top: 15px;
    text-align: center;
    width: 400px;
    height: 200px;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
}
.delMusicList {
    padding-top: 15px;
    text-align: center;
    width: 400px;
    /* height: 50%; */
    /* height: 200px; */
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    padding-bottom: 20px;
}
.icon-chuangjian {
    position: absolute;
    right: 0;
    font-size: 14px;
    cursor: pointer;
    margin-right: 30px;
    margin-top: 1px;
}
.icon-shanchu {
    position: absolute;
    right: 0;
    font-size: 14px;
    cursor: pointer;
    margin-right: 10px;
    margin-top: 1px;
}
.icon-chuangjian:hover {
    color: #ec5241;
}
.icon-shanchu:hover {
    color: #ec5241;
}
.footer {
    height: 10%;
}
.el-menu-item.is-active {
    color: rgb(79, 79, 79);
    font-weight: bolder;
    background-color: rgb(240, 240, 240);
}
.div1 {
    position: absolute;
    top: 75px;
    left: 200px;
    height: 82%;
}
.aaaaaa {
    display: flex;
}
.ddd {
    padding-top: 60px;
    position: absolute;
    width: 200px;
    /* top: 75px; */
    /* height: 616px; */
    height: 82%;
    overflow: auto;
    z-index: 0;
    /* border-right: 2px solid rgb(160, 160, 160); */
}
.header {
    z-index: 3;
    height: 8%;
}
::-webkit-scrollbar {
    width: 6px;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    /* -webkit-box-shadow:inset006pxrgba(0,0,0,0.5); */
}
.el-menu-item {
    border-radius: 8px;
    height: 46px;
    line-height: 46px;
}
.el-menu-item:hover {
    background-color: rgb(240, 240, 240);
}
.inputtt {
    margin-top: 25px;
    width: 350px;
    border-radius: 10px;
}
/* :deep(.el-input) {
  margin-top: 25px;
  width: 350px;
  border-radius: 20px;
} */
/* :deep(.el-input__inner) {
  border-radius: 10px;
} */
:deep(.el-button--primary.is-plain) {
    color: rgb(27, 171, 255);
    margin-top: 20px;
    background-color: white;
    border-radius: 10px;
}
:deep(.el-button--primary.is-plain):hover {
    background-color: rgb(10, 154, 237);
    color: white;
    border: 1px solid white;
}
/* .app {
} */
</style>