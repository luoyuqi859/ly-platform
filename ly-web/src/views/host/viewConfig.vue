<template>
  <div class="app-container">
    <el-card class="container">
      <div class="card-title">
        配置文件
        <div class="button-group">
          <el-button type="primary" class="save-btn" @click="handleSave">保存</el-button>
          <el-button type="warning" class="save-btn" @click="handleReturn">返回</el-button>
        </div>
      </div> <!-- 添加标题 -->
      <div class="editor-container">
        <vue-monaco-editor v-model:value="code" theme="vs-dark" @change="handleEditorChange" />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute()
const ip = ref(route.query.ip)
const port = ref(route.query.port)


const code = ref('');
const getYaml = async () => {
  const runUrl = `http://${ip.value}:${port.value}/repo/code`;

  axios.get(runUrl).then(res => {
    code.value = res.data
  })
}
const handleEditorChange = async (data: any) => {
  code.value = data;
  console.log(code.value)
}
const handleSave = async () => {
  const runUrl = `http://${ip.value}:${port.value}/repo/save/code`;
  const requestBody = { code: code.value };
  axios.post(runUrl, requestBody).then(res => {
    console.log(res)
  })
}

const handleReturn = () => {
  router.go(-1); // 返回上一页
}
getYaml();

</script>

<style scoped>
.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  height: 40px;
  line-height: 40px;
  display: flex;
  /* 让标题和按钮在一行显示 */
  justify-content: space-between;
  /* 让按钮靠右对齐 */
}

.save-btn {
  height: 30px;
  margin-top: 5px;
  font-size: 14px;
}

.container {
  position: fixed;
  height: 100%;
  width: 85%;
}

.editor-container {
  position: absolute;
  height: 100%;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>


