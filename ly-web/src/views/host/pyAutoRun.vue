

<template>
    <div class="app-container">
        <section class="usage">
            <h2 class="usage-title">使用说明：</h2>
            <p class="usage-content">手动点击上方数字阶段<br>执行控制台，选择设备后可执行投屏、取消投屏、执行操作</p>
        </section>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="24" :xs="24">
                    <el-form>
                        <div class="form-item">
                            <label class="form-label">选择设备:</label>
                            <div class="form-control">
                                <el-select v-model="selectedDevice">
                                    <el-option v-for="(device, index) in devices" :key="index" :label="device.name"
                                        :value="device.serial" />
                                </el-select>
                                <el-tooltip content="投屏" placement="top">
                                    <el-button class="confirm-btn" link type="primary" icon="View"
                                        :disabled="!deviceSelected" @click="toggleScreen">{{ isShowingScreen ? '取消投屏' : '投屏'
                                        }}</el-button>
                                </el-tooltip>
                                <el-tooltip content="用例执行" placement="top">
                                    <el-button class="confirm-btn" link type="danger" icon="Key"
                                        :disabled="!deviceSelected || isRunning" :loading="isRunning"
                                        @click="pyAutoRunSocket">执行</el-button>
                                </el-tooltip>
                            </div>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col v-if="!showMinicap" :span="24" :xs="24">
                    <!-- 控制台打印 -->
                    <div class="console-container">
                        <div class="console-header">
                            <h3 class="console-title">Console</h3>
                            <el-icon v-if="socketConnected" name="disconnected" @click="disconnectSocket" />
                            <el-icon v-else name="power" />
                        </div>
                        <pre class="console-output" ref="outputEl"></pre>
                    </div>
                </el-col>
                <el-col v-else :span="16" :xs="24">
                    <!-- 控制台打印 -->
                    <div class="console-container">
                        <div class="console-header">
                            <h3 class="console-title">Console</h3>
                            <el-icon v-if="socketConnected" name="disconnected" @click="disconnectSocket" />
                            <el-icon v-else name="power" />
                        </div>
                        <pre class="console-output" ref="outputEl"></pre>
                    </div>
                </el-col>
                <el-col v-if="showMinicap" :span="8" :xs="24">
                    <!-- 投屏展示 -->
                    <minicap :ip="ip" :port="port" :serial="selectedDevice" />
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { getHostByUserId } from "@/api/host";
import { onMounted, ref, computed, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import minicap from "@/components/Minicap/index.vue";

import { getDeviceListById } from "@/api/device";
import { ElMessage } from "element-plus";

const route = useRoute();

const owner = ref(route.query.owner);
const isLoaded = ref(false);
const ip: any = ref(route.query.ip);
const port: any = ref(route.query.port);
const devices: any = ref([]);
const selectedDevice = ref("");

const showMinicap = ref(false);

const isRunning = ref(false); // 添加loading状态变量
const isShowingScreen = ref(false);


const socket = ref<WebSocket | null>(null);
const outputEl = ref<HTMLPreElement | null>(null);
const socketConnected = ref(false);



const toggleScreen = () => {
    if (selectedDevice.value !== "") {
        showMinicap.value = !showMinicap.value;
        isShowingScreen.value = showMinicap.value;
    }
};

const getOwnDevice = async () => {
    const id = parseInt(owner.value as string, 10);
    const res = await getDeviceListById({ ID: id });
    devices.value = res.data.deviceList;
};


const deviceSelected = computed(() => {
    return selectedDevice.value !== "";
});




const pyAutoRunSocket = () => {
    if (!socket.value) {
        const wsUrl = `ws://${ip.value}:${port.value}/task/ws`;
        socket.value = new WebSocket(wsUrl);
        socket.value.onopen = () => {
            console.log("WebSocket opened!");
            ElMessage.success("任务提交成功,开始执行......");
            outputEl.value!.innerText = "";
            // socket.value?.send("task_start");
            socket.value?.send(JSON.stringify({ serial: selectedDevice.value }));
            socketConnected.value = true;
            isRunning.value = true;
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
            isRunning.value = false;
        };
        socket.value.onclose = (event) => {
            console.log(`WebSocket closed with code ${event.code}`);
            ElMessage.success("任务执行完成！");
            socketConnected.value = false;
            socket.value = null;
            isRunning.value = false; // 任务完成后将 isRunning 设置为 false
        };
    }
};

const disconnectSocket = () => {
    if (socket.value?.readyState === WebSocket.OPEN) {
        socket.value.send("disconnect");
        socket.value.close();
    }
};


onUnmounted(() => {
    if (socket.value?.readyState === WebSocket.OPEN) {
        disconnectSocket();
    }
    window.removeEventListener("beforeunload", disconnectSocket);
});


onMounted(async () => {
    await getOwnDevice();
    isLoaded.value = true;
    window.addEventListener("beforeunload", disconnectSocket);
});
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

.form-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    .form-label {
        flex-grow: 0;
        margin-right: 10px;
    }

    .form-control {
        flex-grow: 1;
        display: flex;

        .el-select {
            flex-grow: 1;

            &+button {
                margin-left: 10px;
            }
        }

        .confirm-btn {
            height: auto;
            line-height: normal;
            padding-top: 0;
            padding-bottom: 0;
            margin-left: 10px;
        }
    }
}

.console-container {
    display: flex;
    flex-direction: column;
    max-height: 500px;
    flex: 1;
    /* 均分剩余高度 */
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
    text-align: left;
    /* 改为左对齐 */
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
    overflow-y: auto;
}

.form-control>*:not(:last-child) {
    margin-right: 10px;
    /* 加入间隔 */
}
</style>