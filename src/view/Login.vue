<template>
  <div class="app">
    <div class="div1">
      <p
        :class="{ ppp: key === item.key }"
        v-for="item in loginType"
        :key="item.index"
        @click="seleType(item.key)"
      >
        {{ item.name }}
      </p>
    </div>
    <div class="div2" v-if="key === 0">
      <div>
        <el-input placeholder="请输入手机号码" v-model="phone" clearable>
        </el-input>
      </div>
      <div>
        <el-input
          placeholder="请输入密码"
          v-model="password"
          show-password
        ></el-input>
      </div>
      <el-button type="primary" plain @click="login">登录</el-button>
    </div>
    <div class="div2" v-if="key === 1">
      <div v-if="!iscaptcha">
        <el-input placeholder="请输入手机号码" v-model="phone" clearable>
        </el-input>
        <el-button type="primary" plain @click="getYzm">获取验证码</el-button>
      </div>
      <div v-if="iscaptcha" class="btn">
        <input class="inp" maxlength="4" type="tel" placeholder="请输入验证码" v-model="captcha"></input>
        <div class="yzm">
            <div class="icon" v-for="item in 4" :key="item">{{captcha[item-1]}}</div>
        </div>
        <el-button type="primary" plain @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
    getPhoneLogin,
    getCaptcha,
    getCaptchaLogin,
    getVerification
} from '@/api/user'
export default {
    name: 'Login',

    data() {
        return {
            phone: '',
            password: '',
            captcha: '',
            loginType: [
                { name: '手机号', key: 0 },
                { name: '验证码', key: 1 },
                { name: '二维码', key: 2 }
            ],
            key: 0,
            iscaptcha: false
        }
    },
    methods: {
        seleType(e) {
            this.key = e
            this.phone = ''
            console.log(this.key)
        },
        async getYzm() {
            let z_reg = /^(?:(?:\+|00)86)?1\d{10}$/
            if (this.phone == '') {
                this.$message('请输入电话号码')
            } else if (z_reg.test(this.phone)) {
                this.iscaptcha = true
            } else {
                this.$message('请输入正确的电话号码')
            }
            const { data: res } = await getVerification(this.phone)
            if (res.code !== 200) return
        },
        async login() {
            if (this.key === 0) {
                const { data: res } = await getPhoneLogin(
                    this.phone,
                    this.password
                )
                if (res.code == 200) {
                    this.$store.dispatch('getAcount')
                    this.$router.push('/recommend')
                    window.sessionStorage.setItem('isLogin', true)
                }
                this.phone = ''
                this.password = ''
            } else if (this.key === 1) {
                const { data: res } = await getCaptcha(this.phone, this.captcha)
                console.log(res)
                if (res.code !== 200) return
                const { data: res } = await getCaptchaLogin(
                    this.phone,
                    this.captcha
                )
                if (ree.code !== 200) return
                this.$store.dispatch('getAcount')
                this.$router.push('/recommend')
                window.sessionStorage.setItem('isLogin', true)
            } else {
                // alert(res.meg);
            }
        }
    }
}
</script>

<style scoped>
.btn {
    width: 200px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
}
.yzm {
    width: 200px;
    display: flex;
    justify-content: space-around;
}
.icon {
    /* display: flex; */
    width: 40px;
    height: 40px;
    text-align: center;
    background-color: #f2f2f2;
    border-radius: 10px;
    line-height: 40px;
}
.inp {
    width: 300px;
    height: 40px;
    color: rgb(206, 206, 206);
    color: gray;
    border: 1px solid rgb(206, 206, 206);
    opacity: 0;
    position: absolute;
    left: 0;
}
.app {
    display: flex;
    text-align: center;
    flex-direction: column;
    width: 1336px;
    align-items: center;
}
.div1 {
    margin-top: 100px;
    /* width: 1000px; */
    display: flex;
    justify-content: space-evenly;
    font: 800 26px '';
    color: gray;
}
p {
    width: 100px;
    height: 55px;
    line-height: 55px;
    text-align: center;
    box-sizing: border-box;
}
p:hover {
    cursor: pointer;
    border: 2px solid rgb(173, 173, 173);
    border-radius: 10px;
}
.ppp {
    background-color: rgb(234, 234, 234);
    border-radius: 10px;
}
.div2 {
    width: 300px;
    margin-top: 30px;
}
.div2 div {
    margin-bottom: 10px;
}
.button {
    position: absolute;
    margin-top: 5px;
    margin-left: 10px;
}
</style>