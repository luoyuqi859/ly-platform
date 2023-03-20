<template>
  <div class="login-wrap">
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
          <el-checkbox>记住密码</el-checkbox>
        </el-col>
        <el-col :span="16">
          <el-button type="primary" style="float:right;text-align: right">立即注册</el-button>
        </el-col>
      </el-row>
      <el-form-item style="width:100%; margin-top:20px">
        <el-button type="primary" id="login" style="width:100%;" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/pinia/modules/user";
import { ElMessage, FormInstance } from "element-plus";
import { reactive, ref} from "vue";
import { useRouter } from "vue-router";

const loginForm:any = ref<FormInstance>()
const router = useRouter()

const loginFormData = reactive({
  username: 'admin',
  password: 'admin',
})
const rules = reactive({
  username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
})

const userStore = useUserStore()
const login = async() => {
  return await userStore.LoginIn(loginFormData)
}

const submitForm = () => {
  loginForm.value.validate(async(v:any) => {
    if (v) {
      const flag = await login()
      router.push('/home')
    } else {
      ElMessage({
        type: 'error',
        message: '请正确填写登录信息',
        showClose: true,
      })
      return false
    }
  })
}
</script>
<style scoped>.login-wrap {
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

.logoimg{
  width: 40px;
  height: 40px;
  margin-bottom: 4px;
}
</style>