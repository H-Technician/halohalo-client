<template> 
    <div class="login-register-box">
        <div class="login-card">
            <div class="login-left">
                <div class= "login-left-text">
                    <span>扫描二维码登录</span>
                </div>
                <div class="qrcode-login">
                    <div class="qrcode-con">
                        <div class="qrcode-box">
                            <div class="qrcode-img">
                                <img src="@/assets/img/qr-code.png" alt="">
                            </div>
                            <div class="qrcode-tips"></div>
                        </div>
                    </div>
                    <div class="qrcode-footer">
                        <p class="app-link">
                            请使用
                            <a href="" style="text-decoration: none;">
                                哈喽哈喽客户端
                            </a>
                            <br>
                            扫码登陆或扫码下载APP
                        </p>
                    </div>
                </div>

            </div>
            <div class="Vertical-line">
            </div>
            <div class="login-register-container">
                <div class="login-register_header">
                    <div class="navs">
                        <div class="navs-item" @click="switchLoginCard('password')" :class="isPasswordCardActive ? 'active' : ''">
                            密码登录
                        </div>
                        <div class="navs-item" @click="switchLoginCard('verificationCode')" :class="isPasswordCardActive ? '' : 'active'">
                            验证码登录
                        </div>
                    </div>
                </div>
                <div class="login-register_content">
                    <div class="login-box" v-if="isPasswordCardActive">
                        <div class="input-box input-box-top">
                            <span>账号</span>
                            <input type="text" placeholder="请输入账号" v-model="usernameLogin" maxlength="11">
                        </div>
                        <div class="input-box input-box-bottom">
                            <span>密码</span>
                            <input :type="isxianshimima ? 'text' : 'password'" 
                            placeholder="请输入密码" 
                            v-model="passwordLogin" 
                            maxlength="32" 
                            @blur="enterPassword = true" 
                            @focus="enterPassword = false">
                            <IconsLoginreistetZhengYan class="xianshimima" v-if="isxianshimima" @click="YincangMima"/>
                            <IconsLoginreistetBiYan class="yincangmima" v-else @click="XianshiMima"/>
                            <el-popover placement="bottom" :width="300">
                                <template #reference>
                                    <button class="wjma">忘记密码？</button>
                                </template>
                                <template #default>
                                    <div class="wjma-box" style="width: 300px;">
                                        <div @click="switchLoginCard('verificationCode')">
                                            <div class="wjma-text" style="font-size: 13px;">
                                                <span>发送短信快捷登录</span>
                                            </div>
                                            <div class="wjma-text" style="font-size: 12px; color: #808385;">
                                                <span>未注册或绑定哈楼哈喽的手机号，将帮你注册新账号</span>
                                            </div> 
                                        </div>
                                        <div style="margin-top: 10px;">
                                            <div class="wjma-text" style="font-size: 13px;">
                                                <span>去找回密码</span>
                                            </div>
                                            <div class="wjma-text" style="font-size: 12px; color: #808385;">
                                                <span>发送短信快捷登录</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-popover>
                        </div>
                        <div class="submit-box">
                            <el-button class="submit-register" type="primary" @click="switchLoginCard('verificationCode')">注&nbsp;册</el-button>
                            <el-button class="submit" type="primary" @click="login">登&nbsp;录</el-button>
                        </div>
                    </div>
                    <div class="register-box" v-else>
                        <div class="input-box input-box-top">
                            <span>手机号</span>
                            <input type="text" placeholder="请输入手机号" maxlength="11" :clearable="true" v-model="phoneNumber">
                            <button class="yzm" @click="getYzm" v-bind:disabled="isBtnDisabled" :style="isBtnDisabled ? 'cursor: not-allowed; color: #808385;' : 'color: #00aeec;'">{{ yzmTimeText }}</button>
                        </div>
                        <div class="input-box input-box-bottom">
                            <span>验证码</span>
                            <input type="text" placeholder="请输入验证码" maxlength="6" v-model="verificationCode" @blur="enterPassword = true" @focus="enterPassword = false">
                        </div>
                        <el-button  class="submit" type="primary" @click="register">登&nbsp;录/注&nbsp;册</el-button>
                    </div>
                </div>
                <div class="login-oauth">
                    <div class="divider">
                        <div class="liner"></div>
                        <div class="divider-text">
                            <span>其它登录方式</span>
                        </div>
                    </div>
                    <div class="list">
                        <a class="item" title="QQ账号登录" @click="authLogin('qq')">
                            <IconsLoginreistetQQ class="icon" />
                            <span class="text">QQ账号登录</span>
                        </a>
                        <a class="item" title="Gitee账号登录" @click="authLogin('gitee')">
                            <IconsLoginreistetGitee class="icon" />
                            <span class="text">Gitee账号登录</span>
                        </a>
                    </div>   
                </div>
            </div>
        </div>
        <div class="tips" >未注册过哈喽哈喽的手机号，我们将自动帮你注册账号</div>
        <div class="tips" >登录代表你同意<span class="agreement">用户协议</span>&nbsp;和&nbsp;<span class="agreement">隐私政策</span></div>
        <div class="login-register-bottom fixed-left">
            <img src="@/assets/img/loginbox/bottom_left.png" alt="左边小人" v-show="enterPassword">
            <img src="@/assets/img/loginbox/bottom_left_protect.png" alt="左边小人蒙眼">
        </div>
        <div class="login-register-bottom fixed-right">
            <img src="@/assets/img/loginbox/bottom_right.png" alt="右边小人" v-show="enterPassword">
            <img src="@/assets/img/loginbox/bottom_right_protect.png" alt="右边小人蒙眼">
        </div>
        <!-- Captcha验证码弹出框 -->
        <Captcha :showCaptcha="showCaptchaBox" @isshowCaptcha="isshowCaptcha">
            <template #content>
                <span>测试</span>
            </template>
        </Captcha>
    </div>
</template>
<script lang="ts" setup>
import { ElPopover } from 'element-plus'
import { loginApi, registerApi, authLoginApi, getCodeApi } from '@/api/login'
import { localStoragejwt } from '@/utils/localStorage';
const isxianshimima = ref(false);
const usernameLogin = ref("");
const passwordLogin = ref("");
const phoneNumber = ref("");
const verificationCode = ref("");
const isBtnDisabled = ref(false);
const totalTime = 60;                // 倒计时时间
const countingDown = ref(false);     // 倒计时状态
const emit = defineEmits(['closeLoginDialog']);
const showLoginDialog = ref(true);
const enterPassword = ref(true); // 密码输入框是否聚焦
const isPasswordCardActive = ref(true);
const showCaptchaBox = ref(false);
const config = useRuntimeConfig();
let aesKey = config.public.aesKey;
// captcha验证回调
const isshowCaptcha = (val: boolean, isCaptcha: boolean) => {
    showCaptchaBox.value = val;
    // console.log(val, isCaptcha);
    if (isCaptcha) {
        loginRequest();
    }
}
// 倒计时剩余时间
const remainingTime = reactive ({
    seconds: totalTime
})
// 计时器变量
let timer: NodeJS.Timeout | null = null
 
// 倒计时
const startCountingDown = () => {
    if (!countingDown.value) {
        let clicktime = new Date().getTime() + 60000;   //未来60秒，这里也毫秒为单位
        sessionStorage.setItem('EndTime', JSON.stringify(clicktime));  //存入sessionStorage
        countingDown.value = true
        remainingTime.seconds = totalTime
    }
    timer = setInterval(() => {
        if (remainingTime.seconds > 0) {
            remainingTime.seconds--
        } else {
            stopCountingDown()
        }
    },1000)
}
 
// 倒计时停止
const stopCountingDown = () => {
    if (timer) {
        clearInterval(timer)
        timer = null
        countingDown.value = false
        sessionStorage.removeItem('EndTime')  //计时完后清除sessionStorage
    }
    
}
// 短信按钮文字切换
const yzmTimeText = computed (() => (countingDown.value ? remainingTime.seconds +"秒后重试" : "获取验证码"));
// 获取验证码
const getYzm = async ()  => {
    // 为了减小后端压力，首先对手机号格式进行验证
    // 使用正则表达式验证手机号码格式
    const phonePattern = /^1[3-9]\d{9}$/;
    if (phonePattern.test(phoneNumber.value)) {
        getVerificationCode();
        startCountingDown()
    } else if (phoneNumber.value === "") {
        ElMessage.error("手机号不能为空");
    } else {
        ElMessage.error("手机号格式不正确");
    }
};
// 请求验证码接口
const getVerificationCode = async () => {
    const data = { phone: phoneNumber.value };
    const response = await getCodeApi(data);
    if (response.code === 200) {
        ElMessage.success(response.msg);
    } else if (response.code === 201) {
        ElMessage.error(response.msg);
    }
};
// 监听按钮是否倒数120s 实现按钮点击事件的禁用
watchEffect (() => {  
    // console.log(phoneNumber.value);
    if (countingDown.value) {
        isBtnDisabled.value=true;
    }else {
        isBtnDisabled.value=false;
    }
})

const YincangMima = () => {
    isxianshimima.value = false;
}
const XianshiMima = () => {
    isxianshimima.value = true;
}

const switchLoginCard = (loginType: string) => {
    switch (loginType) {
        case 'password':
            isPasswordCardActive.value = true;
            break;
        case 'verificationCode':
            isPasswordCardActive.value = false;
            break;
    }
}
const loginRequest = async () => {
    const data = { username: usernameLogin.value, password: aesEncrypt(passwordLogin.value, aesKey) };
    const response = await loginApi(data);
    if (response.code === 200 && response.data) {
        ElMessage.success(response.msg);
        localStoragejwt(
            response.data.jwt, 
            response.data.refreshJwt, 
            response.data.uid, 
            response.data.username);
        showLoginDialog.value = false;
        emit('closeLoginDialog', true);
        //window.open('/', '_self');
    } else if (response.code === 201) {
        ElMessage.error(response.msg);
    }
}
// 登录
const login = async () => {
    if (usernameLogin.value === "") {
        ElMessage.error("账号不能为空");
    } else if (usernameLogin.value.length < 10) {
        ElMessage.error("账号错误");
    } else if (passwordLogin.value === "") {
        ElMessage.error("密码不能为空");
    } else {
        showCaptchaBox.value = true;
    }
}
// 注册
const register = async () => {
    const phonePattern = /^1[3-9]\d{9}$/;
    if (phoneNumber.value.length == 0){
        ElMessage.error("手机号不能为空");
    } else if ( !phonePattern.test(phoneNumber.value)) {
        ElMessage.error("手机号格式不正确");
    } else if (verificationCode.value.length == 0) {
        ElMessage.error("验证码不能为空");
    } else if (verificationCode.value.length < 6) {
        ElMessage.error("验证码错误");
    } else {
        const data = { phone: phoneNumber.value, verificationCode: verificationCode.value };
        const response = await registerApi(data);
        if (response.code === 200 && response.data) {
            ElMessage.success(response.msg);
            localStoragejwt(
            response.data.jwt, 
            response.data.refreshJwt, 
            response.data.uid, 
            response.data.username);
            showLoginDialog.value = false;
            emit('closeLoginDialog', true);
            //window.open('/', '_self');
        } else if (response.code === 201) {
            ElMessage.error(response.msg);
        }
    }
}
// 第三方登录
const authLogin = async (type: string) => {
    const route = useRoute();
    const data = { pageIdentifier: route.path };
    const response = await authLoginApi(data, type);
    if (response.code === 200) {
        window.open(response.data, '_self');
        //window.location.href = data.data as string;
    } else {
        ElMessage.error(response.msg);
    }
}
onMounted(async () => {
    //刷新页面时重新取得计时并将计时
    const count = Math.ceil((JSON.parse(sessionStorage.getItem('EndTime') || '0') - new Date().getTime())/1000);  //取出计时
    // console.log(count);
    if (count > 0) {
        countingDown.value = true;
        remainingTime.seconds = count;
        timer = setInterval(() => {
        if (remainingTime.seconds > 0) {
            remainingTime.seconds--
            } else {
                stopCountingDown()
            }
        },1000)
    }else {
        sessionStorage.removeItem('EndTime'); //如果读取的时间小于0则清除sessionStorage数据
    }

})
</script>
<style scoped lang="scss">  
.loginreister .el-icon {
    height: 40px;
    width: 40px;
}

.login-register-box {
    position: relative;
    width: 100%;
    height: 100%;
}

.tips {
    margin-top: 2px;
    color: $text-color;
    font-size: 12px;
    text-align: center;
    .agreement {
        color: $theme-color;
        margin-left: 4px;
        cursor: pointer;
    }
}

.login-register-bottom {
    position: absolute;
    bottom: 0;
    height: 118px;
    width: 118px;

    img {
        width: 100%;
        height: 100%;
    }
}

.fixed-left {
    left: 0;
}

.fixed-right {
    right: 0;
}

.login-card {
    display: flex;
    padding: 0 32px;
}
.login-card .login-left {
    width: 260px;
}

.login-left-text {
    margin-top: 40px;
    width: 260px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
        font-size: 18px;
    }
}
 
.qrcode-login {
    position: relative;
    width: 260px;
}
 
.qrcode-login .qrcode-con {
    padding-top: 10px;
}
 
.qrcode-login .qrcode-con .qrcode-box {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    background: #ffffff;
    position: relative;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid $item-color-hover;
}
 
.qrcode-img {
    width: 140px;
    height: 140px;
}
 
.qrcode-img>img {
    display: block;
}
 
.qrcode-tips {
    position: absolute;
    width: 260px;
    height: 192px;
    top: -30px;
    left: -80px;
    // margin-left: -240px;
    background: url(@/assets/img/qr-tips.png) no-repeat;
    /*规定把背景图片拓展至足够大，完全覆盖背景区域*/
    background-size: cover;
    background-color: #fff;
    opacity: 0;
    -webkit-transition: opacity .5s;
    transition: opacity .5s;
}
 
.qrcode-tips:hover {
    opacity: 1.0;
}
 
.qrcode-login .qrcode-footer {
    width: 260px;
    height: 80px;
}
 
.app-link {
    text-align: center;
    color: #717171;
    font-size: 14px;
}
 
.app-link>a {
    color: $theme-color;
}

.Vertical-line {
    margin-top: 70px;
    height: 160px;
    border-right: 1px solid $item-color-hover;
}
.login-register-container {
    display: block;
    width: 280px;
    height: 240px;
    flex: 10;
    padding: 40px;

    .login-register_header {
        .navs {
            display: flex;
            justify-content: center;
            .navs-item {
                display: block;
                cursor: pointer;
                font-size: 16px;
            }
            :nth-child(1) {
                padding-right: 20px;
                border-right: .5px solid $item-color-hover;
            }
            :nth-child(2) {
                padding-left: 20px;
            }
            .active {
                color: $theme-color;
            }
        }
    }
}


.login-box, .register-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    padding-top: 10px;
    padding-right: 2px;
    padding-left: 2px;
}

.login-box .submit-box {
    margin-top: 30px;
    width: 100%;
    height: 40px;
    font-size: 14px;
    display: flex;

    .submit {
        width: 50%;
    }
}

.login-box .input-box, .register-box .input-box {
    width: 100%;
    height: 46px;
    font-size: 14px;
    border: 1px solid $item-color-hover;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    span {
        margin-left: 24px;
        margin-right: 14px;
        font-size: 14px;
    }

    input {
        height: 30px;
        width: 170px;
        outline: none;
        margin: 0;
        color: #000000;
        padding-left: 10px;
        padding-bottom: 0;
        border: none;
        font-size: 14px;
        font-family: "HarmonyOS_Sans_SC_Medium";
    }

    input[type="text"] {
        letter-spacing: 0.1rem;
    }
    input[type="password"] {
        letter-spacing: 0.1rem;
    }

    input[type="password"]::-ms-reveal {
        display: none;
    }
}

.login-box .input-box-top, .register-box .input-box-top {
    border-radius: 10px 10px 0 0;
    border-bottom: none;
}
.login-box .input-box-bottom, .register-box .input-box-bottom {
    border-radius: 0 0 10px 10px;
}

.wjma-box {
    .wjma-text {
        cursor: pointer;
    }
}

.register-box .submit{
    margin-top: 30px;
    width: 50%;
    height: 40px;
    font-size: 14px;
}

.xianshimima, .yincangmima {
    height: 25px;
    width: 25px;
    cursor: pointer;
    display: inline-block;
    vertical-align: -8px;
}
.xianshimima:hover, .yincangmima:hover {
    color: $theme-color;
    fill: $theme-color;
}

.yzm {
    border: none;
    height: 20px;
    width: 90px;
    background: none;
    cursor: pointer;
    text-align: center;
    border-left: 1px solid $item-color-hover;
}

.wjma {
    color: $theme-color;
    border: none;
    height: 20px;
    width: 80px;
    background: none;
    cursor: pointer;
    text-align: center;
}
.submit {
    color: #fff;
    border: none;
    border-radius: 8px;
    background-color: $theme-color;
    text-align: center;
    cursor: pointer;
    height: 40px;
}

.submit-register {
    width: 50%;
    color: #000000;
    border: 1px solid $item-color-hover;
    border-radius: 8px;
    background-color: #ffffff;
    text-align: center;
    cursor: pointer;
    height: 40px;
}

.submit:hover {
    background-color: $theme-color--;
}

.submit-register:hover {
    background-color: #ffffff;
    color: #000000;
    border: 1px solid $item-color-hover;
}

.login-oauth {
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    .divider {
            width: 260px;
            height: 16px;
            position: relative;
            margin: 10px auto;
             
        }
        .liner {
            width: 100%;
            height: 1px;
            background-color: #ccc;
            position: relative;
            top: 50%;
        }
        .divider-text {
            text-align: center;
            width: 90px;
            height: 20px;
            line-height: 20px;
            margin:0 auto;
            background-color: #fff;
            position: relative;
            z-index: 3;
            color: $text-color;
            font-size: 12px;
        }

    .list {
        align-items: center;
        display: flex;
        justify-content: center;
        width: 100%;
        .item {
            margin-left: 10px;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon {
                height: 28px;
                width: 28px;
                margin: 0 auto;
                cursor: pointer;
            }

            .text {
                font-size: 12px;
                margin-left: 6px;
                color: #000;
                cursor: pointer;
            }
        }
    }
}
</style>
  