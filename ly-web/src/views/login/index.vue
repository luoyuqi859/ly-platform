<template>
    <div class="login-wrap">
        <div class="welcome-title">
            <img class="logoimg" src="../../assets/img/logo.png">
            <span>欢 迎 使 用 测 试 平 台</span>
        </div>
        <el-form label-position="left" :model="state.loginForm" :rules="state.rules" ref="FormRef" label-width="0px"
            class="login-container">
            <h3 class="title">用户登录</h3>
            <el-form-item prop="account">
                <el-input type="text" id="username" v-model="state.loginForm.account" placeholder="账号/手机号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" id="password" v-model="state.loginForm.password" @keyup.enter.native="submitForm(FormRef)"
                    placeholder="密码"></el-input>
            </el-form-item>
            <el-row style="margin-top: -10px">
                <el-col :span="8">
                    <el-checkbox class="remember" >记住密码</el-checkbox>
                </el-col>
                <el-col :span="16">
                    <el-button type="text" style="float:right">立即注册</el-button>
                </el-col>
            </el-row>
            <el-form-item style="width:100%; margin-top:20px">
                <el-button type="primary" id="login" style="width:100%;">登录</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script setup lang="ts">
import { FormInstance } from "element-plus";
import { reactive, ref, toRefs } from "vue";

const FormRef = ref<FormInstance>()
const state = reactive({
    loginForm: {
        account: '',
        password: '',
    },
    rules: {
        account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        newPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        repeatPassword: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        email: [{ required: true, message: '邮箱地址不能为空', trigger: 'blur' }],
        newAccount: [{ required: true, message: '登录账号不能为空', trigger: 'blur' }]
      }
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style scoped>

.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  /* background-color: #112346; */
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}
.welcome-title{
  font-family: initial;
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
}
.footer{
  position: fixed;
  font-size: 12px;
  left: 0;
  right: 0;
  bottom: 0;
}
.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 11px 0px 0px 0px;
}
.logoimg{
  width: 40px;
  height: 40px;
  margin-bottom: 4px;
}
</style>