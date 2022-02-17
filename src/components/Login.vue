<template>
  <div class="model-mask">
    <div class="model-container">
      <div class="main"></div>
      <form class="form" @submit.prevent>
        <h3 @click="showRegister">创建账户</h3>
        <div :class="{show:isShowRegister}" class="register">
          <input type="text" placeholder="用户名" v-model.trim="register.userName" @change="ValidRegister">
          <input type="password" placeholder="密码" v-model="register.password" @change="ValidRegister">
          <p :class="{error:register.isError}">{{ register.notice }}</p>
          <button class="button">创建账号</button>
        </div>
        <h3 @click="showLogin">登陆</h3>
        <div :class="{show: isShowLogin}" class="login">
          <input type="text" placeholder="输入用户名" v-model.trim="login.userName" @change="ValidLogin">
          <input type="password" placeholder="输入密码" v-model="login.password" @change="ValidLogin">
          <p :class="{error:login.isError}">{{ login.notice }}</p>
          <button class="button">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import Bus from '../helpers/bus'
export default {
  name: 'Login',
  data() {
    return {
      isShowRegister: true,
      isShowLogin: false,
      // 注册用户数据
      register: {
        userName: '',
        password: '',
        notice: '创建账号后请记住用户名和密码',
        isError: false,
      },
      // 登陆用户数据
      login: {
        userName: '',
        password: '',
        notice: '请输入用户名和密码',
        isError: false,
      }
    }
  },
  methods: {
    // 显示注册表单
    showRegister(e) {
      this.isShowRegister = true
      this.isShowLogin = false
    },
    // 显示登陆表单
    showLogin() {
      this.isShowLogin = true
      this.isShowRegister = false
    },
    // 监听register中input事件
    ValidRegister() {
      const RegisterName = this.ValidName(this.register.userName)
      const RegisterPassword = this.ValidPassword(this.register.password)
      if (!RegisterName.valid) {
        this.register.notice = RegisterName.notice
        this.register.isError = true
        return
      }
      if (!RegisterPassword.valid) {
        this.register.notice = RegisterPassword.notice
        this.register.isError = true
        return
      }

      Auth.register(this.register.userName, this.register.password)
        .then(data => {
          this.register.isError = false
          this.register.notice = ''
          Bus.$emit('userInfo', {username: this.register.userName})
          this.$router.push({path: 'notebooks'})
        })
        .catch(data => {
          this.register.isError = true
          this.register.notice = data.msg
        })
    },
    // 监听login中input事件
    ValidLogin() {
      const LoginName = this.ValidName(this.login.userName)
      const LoginPassword = this.ValidPassword(this.login.password)
      if (!LoginName.valid) {
        this.login.notice = LoginName.notice
        this.login.isError = true
        return
      }
      if (!LoginPassword.valid) {
        this.login.notice = LoginPassword.notice
        this.login.isError = true
        return
      }
      Auth.login(this.login.userName, this.login.password)
        .then(data => {
          this.login.isError = false
          this.login.notice = ''
          Bus.$emit('userInfo', {username: this.login.userName})
          this.$router.push({path: 'notebooks'})
        })
        .catch(data => {
          this.login.isError = true
          this.login.notice = data.msg
        })
    },
    // 校验用户名规范
    ValidName(username) {
      return {
        valid: /^[\w\u4e00-\u9fa5]{3,15}$/.test(username),
        notice: '用户名3~15个字符，仅限于字母数字下划线中文'
      }
    },
    // 校验密码规范
    ValidPassword(password) {
      return {
        valid: /^.{6,16}$/.test(password),
        notice: '密码长度为6~16字符'
      }
    },
  }
}
</script>

<style  scoped>
/*遮罩，遮住全屏*/
.model-mask {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, .7);
  transition: opacity .3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

/*主容器，页面居中*/
.model-container {
  width: 800px;
  height: 500px;
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  border-radius: 2px;
  background-color: #fff;
  font-family: Helvetica, Arial, sans-serif;
}

/*左侧背景图*/
.main {
  flex: 1;
  background-image: url("../assets/baobao.jpg");
  max-height: 100%;
  max-width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}

/*右侧表单*/
.form {
  width: 270px;
}

h3 {
  padding: 10px 20px;
  font-weight: normal;
  font-size: 16px;
  cursor: pointer;
}

.button {
  width: 100%;
  background-color: #003399;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  margin-top: 18px;
  cursor: pointer;
}

.form .register, .login {
  padding: 0 20px;
  height: 0;
  transition: height .5s;
  overflow: hidden;
}

.register.show, .login.show {
  height: 193px;
}


input {
  margin-top: 10px;
  width: 100%;
  height: 35px;
  line-height: 35px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  padding: 0 6px;
  outline: none;
}

input:focus {
  border: 3px solid #9dcaf8;
}

p {
  font-size: 12px;
  margin-top: 10px;
  color: #444;
}

.error {
  color: red;
}

.login {
  border-top: 0;
}
</style>
