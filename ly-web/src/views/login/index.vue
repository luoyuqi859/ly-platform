<template>
  <!-- <div class="login-wrap">
    <div class="welcome-title">
      <img class="logoimg" src="../../assets/img/logo.png">
      <span>欢 迎 使 用 测 试 平 台</span>
    </div>
    <el-form label-position="left" :model="loginFormData" :rules="rules" ref="loginForm" label-width="0px"
      class="login-container">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="account">
        <el-input type="text" id="username" v-model="loginFormData.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" id="password" v-model="loginFormData.password"
           placeholder="密码"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="8">
          <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px"
                >记住密码</el-checkbox
            >
        </el-col>
        <el-col :span="16">
          <el-button type="primary" style="float:right;text-align: right">立即注册</el-button>
        </el-col>
      </el-row>
      <el-form-item style="width:100%; margin-top:20px">
        <el-button type="primary" id="login" style="width:100%;" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>

  </div> -->
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">PyAuto测试平台</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" size="large" auto-complete="off" placeholder="密码"
          @keyup.enter="handleLogin">
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2099 PyAuto All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import { encrypt } from "@/utils/jsencrypt";
import { ElMessage, FormInstance } from "element-plus";
import Cookies from "js-cookie";
import { ref } from "vue";
import { useRouter } from "vue-router";


const userStore = useUserStore();
const router = useRouter();
const loginRef = ref<FormInstance>();
const loading = ref(false);
const register = ref(false);
const loginForm = ref<any>({
  username: 'admin',
  password: 'admin',
  rememberMe: false,
});


const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
};



const handleLogin = () => {
  loginRef.value?.validate(valid => {
    if (valid) {
      loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set('username', loginForm.value.username, { expires: 30 });
        const enPwd = encrypt(loginForm.value.password);
        if (enPwd) {
          Cookies.set('password', enPwd, { expires: 30 });
        }
        if (loginForm.value.rememberMe) {
          Cookies.set('rememberMe', String(loginForm.value.rememberMe), { expires: 30 });
        }
      } else {
        // 否则移除
        Cookies.remove('username');
        Cookies.remove('password');
        Cookies.remove('rememberMe');
      }
      // 调用action的登录方法
      userStore
        .login(loginForm.value)
        .then(() => {
          router.push({ path: '/home/dashboard' });
        })
        .catch(() => {
          loading.value = false;
        });
    }
  })
}

</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../../assets/images/login-background.jpg');
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 40px;

    input {
      height: 40px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 40px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>