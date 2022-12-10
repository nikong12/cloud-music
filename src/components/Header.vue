<template>
    <div class="app">
        <h2>网易云音乐</h2>
        <el-input
            class="el-input"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="value"
        >
        </el-input>
        <div class="login" @click="goLogin">
            <el-image class="my" :src="avatarUrl" fit="fill"> </el-image>
        </div>
        <p @click="loginOut">{{ name }}</p>
        <div class="loginCar"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { setLoginOut } from '@/api/user'
export default {
    name: 'Header',
    computed: {
        ...mapState(['profile', 'userName', 'isLogin']),
        loginBox: {
            get() {
                return this.$store.state.loginBox
            },
            set(val) {
                return (this.$store.state.loginBox = val)
            }
        },
        avatarUrl() {
            return this.isLogin ? this.profile.avatarUrl : this.img
        },
        name() {
            return this.isLogin ? this.profile.nickname : '未登录'
        }
    },
    data() {
        return {
            value: '',
            img: 'https://pics3.baidu.com/feed/5243fbf2b2119313d006b93ae04201dc90238d7c.jpeg@f_auto?token=ab8d767995ef4e26803874cbf372d2c4'
        }
    },
    watch: {},
    mounted() {},

    methods: {
        goLogin() {
            this.loginBox = true
        },
        loginOut() {
            // this.$store.dispatch('doLoginOut')
            if (!this.isLogin) {
                this.$message.error('请先登录哦!')
            } else {
                this.$confirm('是否取消登录', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(async () => {
                        const { data: res } = await setLoginOut()
                        if (res.code !== 200) return
                        this.$store.commit('setIslogin', false)
                        this.$store.commit('setLoginInfo', {
                            account: null,
                            profile: null
                        })
                        console.log(this.$store.state.isLogin)
                        this.$message({
                            type: 'success',
                            message: '已退出登录'
                        })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消'
                        })
                    })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.app {
    position: fixed;
    display: flex;
    width: 100%;
    height: 50px;
    background-color: #ec4141;
    align-items: center;
}
h2 {
    font-family: 幼圆;
    margin-left: 25px;
    line-height: 50px;
    color: white;
}
.el-input {
    margin-left: 170px;
    width: 250px;
    border-radius: 8px;
}
::v-deep .el-input__inner {
    height: 35px;
    background: #e33e3e;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #f5bbbb;
    border-radius: 25px;
    border: 0;
    margin-left: 5px;
}
::v-deep .el-input__prefix {
    top: -1px;
}
.login:hover {
    cursor: pointer;
}
.login {
    margin-left: 250px;
}
.my {
    width: 40px;
    height: 40px;
    border-radius: 25px;
    background-color: skyblue;
    background-size: cover;
    /* background: url("https://p3.music.126.net/4DIES5TY_fw_1p2t0eVOXQ==/109951167796885633.jpg"); */
    /* margin-left: 200px; */
}
p {
    font-size: 12px;
    color: rgb(232, 232, 232);
    margin-left: 10px;
    cursor: pointer;
}
</style>