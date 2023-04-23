<template>
    <div class="console-container">
        <div class="console-header">
            <h3 class="console-title">Console</h3>
            <el-icon v-if="socketConnected" name="disconnected" @click="disconnectSocket" />
            <el-icon v-else name="power" @click="connectSocket" />
        </div>
        <pre class="console-output" ref="outputEl"></pre>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import { ElMessage } from "element-plus";



const props = defineProps({
    ip: {
        type: String,
        required: true,
        default: ""
    },
    port: {
        type: String,
        required: true,
        default: ""
    },
})

const socket = ref<WebSocket | null>(null);
const outputEl = ref<HTMLPreElement | null>(null);
const socketConnected = ref(false);


const connectSocket = () => {
    if (!socket.value) {
        const wsUrl = `ws://${props.ip}:${props.port}/task/ws`;
        socket.value = new WebSocket(wsUrl);
        socket.value.onopen = () => {
            console.log("WebSocket opened!");
            ElMessage.success("任务提交成功,开始执行......");
            outputEl.value!.innerText = "";
            socket.value?.send("task_start");
            socketConnected.value = true;
        };
        socket.value.onmessage = (event) => {
            const data = JSON.parse(event.data);
            outputEl.value!.innerText += `${data.message}\n`;
            outputEl.value!.scrollTop = outputEl.value!.scrollHeight;
        };
        socket.value.onerror = (error) => {
            console.error(`WebSocket error: ${error}`);
            ElMessage.error("任务提交失败！");
            socket.value?.close();
        };
        socket.value.onclose = (event) => {
            console.log(`WebSocket closed with code ${event.code}`);
            ElMessage.success("任务执行完成！");
            socketConnected.value = false;
        };
    }
};

const disconnectSocket = () => {
    if (socket.value?.readyState === WebSocket.OPEN) {
        socket.value.send("disconnect");
        socket.value.close();
    }
};

onMounted(() => {
    window.addEventListener("beforeunload", disconnectSocket);
});

onUnmounted(() => {
    if (socket.value?.readyState === WebSocket.OPEN) {
        disconnectSocket();
    }
    window.removeEventListener("beforeunload", disconnectSocket);
});


defineExpose({ connectSocket })


</script>

  
<style lang="scss" scoped>
.console-container {
    display: flex;
    flex-direction: column;
    height: 500px; /* 设置最大高度 */
}

.console-header {
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: #fafafa;
    border-bottom: 1px solid #ebebeb;
}

.console-title {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
}

.console-output {
    flex: 1;
    margin: 0;
    padding: 10px;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    font-size: 12px;
    line-height: 1.5;
    color: #333;
    background-color: #f5f5f5;
    overflow-y: scroll;
}
</style>