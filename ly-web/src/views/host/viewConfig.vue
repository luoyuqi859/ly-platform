<template>
  <div class="app-container">
    <section class="usage">
      <h2 class="usage-title">使用说明：</h2>
      <p class="usage-content">手动点击上方数字阶段<br>执行机配置文件，执行前请详细检查配置文件参数，点击保存会同时修改本地主机配置文件</p>
    </section>
    <el-card>
      <div class="card-header">
        <div class="left-section">
          <h2 class="card-title">配置文件</h2>
        </div>
        <div class="right-section">
          <el-button type="primary" class="save-btn" @click="handleSave">保存</el-button>
        </div>
      </div>
      <div class="editor-container">
        <vue-monaco-editor v-model:value="code" theme="vs-dark" @change="handleEditorChange"
          :style="{ height: editorHeight }" />
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, ref } from 'vue'
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';


const { proxy } = getCurrentInstance() as any;

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
    proxy!.$modal.msgSuccess('host文件修改成功');
  })
}

const editorHeight = computed(() => {
  const lineHeight = 19; // 改成你的编辑器字体大小和行高
  return `${code.value.split('\n').length * lineHeight}px`;
});

getYaml();

</script>



<style lang="scss" scoped>
.usage {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 30px;
}

.usage-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.usage-content {
  font-size: 16px;
  line-height: 1.6;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 30px;
  /* 将高度改为30px */
}

.left-section {
  display: flex;
  align-items: center;
}

.card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 0;
  /* 清除标题的底部 margin */
  height: 100%;
  line-height: 30px;
  /* 修改为30px */
  display: flex;
  align-items: center;
  /* 让标题垂直居中对齐 */
  /* 让标题和按钮在一行显示 */
  justify-content: space-between;
}

.right-section {
  display: flex;
  align-items: flex-start;
  /* 修改为flex-start对齐 */
  height: 30px;
  /* 设置与标题一样的高度，并将高度改为30px */
}

.save-btn {
  height: 100%;
  /* 将按钮高度设置为容器高度的百分比，以便让它垂直居中对齐 */
  width: 120px;
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    background-color: #0069d9;
  }
}

.editor-container {
  margin-top: 10px;
  overflow: hidden;
}

.vue-monaco-editor {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 14px;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-x: hidden;
  border-radius: 4px;
  border: solid 1px #dcdfe6;
}

@media screen and (max-width: 768px) {
  .container {
    width: 100%;
    padding: 0 20px;
  }

  .usage {
    margin-bottom: 10px;
  }

  .card-header {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 60px;
    /* 将高度改为60px */
  }

  .left-section {
    margin-bottom: 10px;
  }

  .save-btn {
    height: 30px;
    /* 将高度改为30px */
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
  }

  .editor-container {
    margin-top: 10px;
  }
}
</style>
