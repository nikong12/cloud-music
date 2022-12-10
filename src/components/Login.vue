<template>
    <div class="app"  @click="loginBox = false">
            <div class="Loginbox" @click.stop>
                <img class="img" src="@/assets/backImg.jpg"></img>
                <div class="log">
                    <h1>Login</h1>
                    <!-- <transition name="el-fade-in"> -->
                        <div v-if="!loginType" style="display:flex;flex-direction: column;align-items: center;">
                            <div v-if="!code">
                                <input type="text" class="inp" placeholder="Email or Phone" v-model="userName">
                            </div>
                            <div v-else>
                                <input style="width:140px" type="text" class="inp" placeholder="Phone" v-model="userName">
                                <button class="codeBtn" @click="getYzm">获取验证码</button>
                            </div>
                            <div class="log_yzm" style="position: relative">
                                <input type="password" class="inp" :placeholder="pltext" v-model="passWord">
                                <span @click="changeType">{{phoneType}}</span>
                            </div>
                            <div class="btn" @click="login">Login</div>
                        </div>
                    <!-- </transition> -->
                    <!-- <transition name="el-fade-in"> -->
                        <div v-if="loginType" style="position: relative">
                            <img style="margin-top:20px" :src="img" alt="">
                            <div style="text-align: center;">状态:{{message}}</div>
                            <div v-if="invalid" class="changeQRcode">
                                <i @click="Toupdate" class="iconfont icon-xunhuan1"></i>
                            </div>
                        </div>
                    <!-- </transition> -->
                    <i @click="changeLoginType" v-if="loginType" class="iconfont icon-shouji"></i>
                    <i @click="changeLoginType" v-if="!loginType" class="iconfont icon-31erweima"></i>
                </div>
            </div>
    </div>
</template>

<script>
import 'animate.css'
import {
    getPhoneLogin,
    getVerification,
    getCaptcha,
    getCaptchaLogin,
    getEmailLogin,
    getQRCodeKey,
    getQRCodeBass,
    getQRCodeLogin
} from '@/api/user'
export default {
    name: 'Login',
    computed: {
        loginBox: {
            get() {
                return this.$store.state.loginBox
            },
            set(val) {
                return (this.$store.state.loginBox = val)
            }
        },
        phoneType() {
            if (this.code) {
                return '密码登录'
            } else return '验证码登录'
        }
    },
    data() {
        return {
            userName: '',
            passWord: '',
            // true:验证码登录  false:密码登录
            code: false,
            pltext: 'Password',
            // true:二维码登录  false:账号登录
            loginType: false,
            img: '',
            key: '',
            timer: null,
            message: '',
            invalid: false
        }
    },
    created() {
        if (this.loginType) {
            this.changeLoginType()
        }
    },
    beforeDestroy() {
        window.clearTimeout(this.timer)
    },

    methods: {
        changeType() {
            if (this.code === false) {
                this.code = true
                this.pltext = 'Verification Code'
            } else {
                this.code = false
                this.pltext = 'Password'
            }
        },
        changeLoginType() {
            if (this.loginType === false) {
                this.loginType = true
                this.geiQRkey()
            } else {
                this.loginType = false
            }
        },
        async geiQRkey() {
            const { data: res } = await getQRCodeKey()
            if (res.code !== 200) return
            this.key = res.data.unikey
            // unikey
            const { data: ress } = await getQRCodeBass(this.key)
            if (ress.code !== 200) return
            this.img = ress.data.qrimg
            this.QRCodeLogin()
            this.invalid = false
        },

        async QRCodeLogin() {
            const { data: res } = await getQRCodeLogin(this.key)
            this.message = res.message
            if (res.code === 800) {
                this.invalid = true
            } else if (res.code === 801 || res.code === 802) {
                this.timer = window.setTimeout(() => {
                    this.QRCodeLogin()
                }, 3000)
            } else if (res.code === 803) {
                // this.$message('登录成功')
                this.$message({
                    message: '登录成功',
                    type: 'success'
                })
                this.$store.commit('setIslogin', true)
                this.$store.dispatch('getAcount')

                this.loginBox = false
                window.sessionStorage.setItem('isLogin', true)
            }
        },
        Toupdate() {
            this.geiQRkey()
        },
        async getYzm() {
            let phone = /^(?:(?:\+|00)86)?1\d{10}$/
            if (phone.test(this.userName)) {
                const { data: res } = await getVerification(this.userName)
                if (res.code !== 200) this.$message.error('发送失败')
            } else {
                this.$message.error('请输入正确的电话号码')
            }
        },
        async login() {
            let phone = /^(?:(?:\+|00)86)?1\d{10}$/
            let email = /^[A-Za-z]\w{5,17}@(163\.com)$/

            if (phone.test(this.userName)) {
                // phone
                // 判断登录方式
                // 手机号
                if (this.code === false) {
                    const { data: res } = await getPhoneLogin(
                        this.userName,
                        this.passWord
                    )
                    if (res.code !== 200) {
                        this.$message.error('账号或密码错误')
                    } else {
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        })

                        this.$store.commit('setIslogin', true)
                        this.$store.dispatch('getAcount')

                        this.loginBox = false
                        window.sessionStorage.setItem('isLogin', true)
                    }
                } else if (this.code === true) {
                    // 验证码
                    const { data: res } = await getCaptcha(
                        this.userName,
                        this.passWord
                    )
                    if (res.code === 200) {
                        const { data: res } = await getCaptchaLogin(
                            this.userName,
                            this.passWord
                        )
                        if (res.code !== 200) return
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        })

                        this.$store.commit('setIslogin', true)
                        this.$store.dispatch('getAcount')

                        this.loginBox = false
                        window.sessionStorage.setItem('isLogin', true)
                    } else {
                        this.$message.error('验证码错误')
                    }
                }
            } else if (email.test(this.userName)) {
                // email
                const { data: res } = await getEmailLogin(
                    this.userName,
                    this.passWord
                )
                if (res.code !== 200) {
                    this.$message.error('邮箱或密码错误')
                } else {
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    })

                    this.$store.commit('setIslogin', true)
                    this.$store.dispatch('getAcount')

                    this.loginBox = false
                    window.sessionStorage.setItem('isLogin', true)
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.app {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.256);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9999;
    .Loginbox {
        width: 860px;
        height: 400px;
        border-radius: 16px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        display: flex;
        h1 {
            margin-top: 40px;
            font-size: 36px;
        }
        .img {
            width: 540px;
            height: 100%;
        }
        .log {
            width: 100%;
            height: 100%;
            display: flex;
            // justify-content: center;
            align-items: center;
            flex-direction: column;
            .inp {
                width: 220px;
                margin-top: 40px;
                border: 0;
                height: 30px;
                border-bottom: 3px solid rgb(80, 80, 170);
                font-size: 18px;
                font-weight: bold;
                padding-left: 10px;
                &::placeholder {
                    font-size: 14px;
                    color: rgb(178, 178, 178);
                }
                &:focus {
                    outline: none;
                }
            }
            span {
                position: absolute;
                font-size: 12px;
                right: 0;
                bottom: -20px;
                cursor: pointer;
                &:hover {
                    color: #ec4141;
                }
            }
            .btn {
                text-align: center;
                margin-top: 50px;
                width: 152px;
                height: 42px;
                line-height: 42px;
                background-color: rgb(71, 71, 135);
                border-radius: 16px;
                cursor: pointer;
                color: white;
                font-weight: bold;
                font-size: 18px;
                border: 4px solid rgb(71, 71, 135);
                transition: 0.3s;
                &:hover {
                    background-color: #fff;
                    border: 4px solid rgb(71, 71, 135);
                    color: rgb(71, 71, 135);
                }
            }
            .codeBtn {
                margin-left: 10px;
                width: 70px;
                font-size: 12px;
                height: 30px;
                background-color: #fff;
                color: rgb(71, 71, 135);
                border: 1px solid rgb(71, 71, 135);
                cursor: pointer;
                border-radius: 6px;
                transition: 0.3s;
                &:hover {
                    background-color: rgb(240, 240, 240);
                }
            }
            .icon-31erweima,
            .icon-shouji {
                position: absolute;
                right: 10px;
                bottom: 10px;
                font-size: 20px;
                cursor: pointer;
                &:hover {
                    color: #ec4141;
                }
            }
            .changeQRcode {
                margin-top: 20px;
                position: absolute;
                top: 10px;
                left: 10px;
                width: 160px;
                height: 160px;
                background-color: rgba(235, 57, 57, 0.374);
                display: flex;
                justify-content: center;
                align-items: center;
                i {
                    color: #ec4141;
                    font-size: 2em;
                    cursor: pointer;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>