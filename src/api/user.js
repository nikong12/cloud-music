import request from "@/utils/index";

// 手机号登录
export const getPhoneLogin = (phone, password) => { return request.get('/login/cellphone', { params: { phone: phone, password: password, timestamp: Date.now() } }) }
// 获取验证码
export const getVerification = (phone) => { return request.get('/captcha/sent', { params: { phone: phone, timestamp: Date.now() } }) }
// 验证验证码
export const getCaptcha = (phone, captcha) => { return request.get('/captcha/verify', { params: { phone: phone, captcha: captcha, timestamp: Date.now() } }) }
// 验证码登录
export const getCaptchaLogin = (phone, captcha) => { return request.get('/login/cellphone', { params: { phone: phone, captcha: captcha, timestamp: Date.now() } }) }
// 邮箱登录
export const getEmailLogin = (email, password) => { return request.get('/login', { params: { email: email, password: password, timestamp: Date.now() } }) }
// 获取二维码key
export const getQRCodeKey = () => { return request.get('/login/qr/key', { params: { timestamp: Date.now() } }) }
// 获取bass64编码
export const getQRCodeBass = (key) => { return request.get('/login/qr/create', { params: { key: key, qrimg: true, timestamp: Date.now() } }) }
// 二维码登录
export const getQRCodeLogin = (key) => { return request.get('/login/qr/check', { params: { key: key, timestamp: Date.now() } }) }
// 退出登录
export const setLoginOut = () => { return request.get('/logout', { params: { timestamp: Date.now() } }) }



// 获取账号信息
export const getAcount = () => { return request.get('/user/account', { params: { timestamp: Date.now() } }) }
