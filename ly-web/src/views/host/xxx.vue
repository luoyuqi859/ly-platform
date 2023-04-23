<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="8" :xs="24">
                <el-card>
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
                                        :disabled="!deviceSelected" @click="confirmDeviceSelection">投屏</el-button>
                                </el-tooltip>
                                <el-tooltip content="取消投屏" placement="top">
                                    <el-button class="confirm-btn" link type="primary" icon="View"
                                        :disabled="!deviceSelected" @click="cancelDeviceSelection">取消投屏</el-button>
                                </el-tooltip>
                                <el-tooltip content="用例执行" placement="top">
                                    <el-button class="confirm-btn" link type="danger" icon="Key" :disabled="!deviceSelected"
                                        @click="runxxx()">执行</el-button>
                                </el-tooltip>

                            </div>
                        </div>
                    </el-form>
                    <minicap :ip="ip" :port="port" :serial="selectedDevice" v-if="showMinicap" />
                </el-card>
            </el-col>
            <el-col :span="16" :xs="24">
                <pyrun :ip="ip" :port="port" ref="RefChildExpose" />
                <!-- <el-card class="log-card">
                    <pre id="output" class="log-container"
                        style="height: 400px; max-height: 400px; overflow-y: scroll;"></pre>
                </el-card> -->
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { getHostByUserId } from "@/api/host";
import { onMounted, ref, computed, reactive, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import minicap from "@/components/Minicap/index.vue";
import pyrun from "@/views/host/pyrun.vue";
import { getDeviceListById } from "@/api/device";
import { ElMessage } from "element-plus";

const route = useRoute();

const owner = ref(route.query.owner);
const isLoaded = ref(false);
const ip = ref("");
const port = ref("");
const devices: any = ref([]);
const selectedDevice = ref("");
const showMinicap = ref(false);
const RefChildExpose: any = ref(null)
interface State {
    socket: WebSocket | null;
}

const state = reactive<State>({
    socket: null,

});

const getOwnHost = async () => {
    const id = parseInt(owner.value as string, 10);
    const res = await getHostByUserId({ ID: id });
    ip.value = res.data.hostInfo.ip;
    port.value = res.data.hostInfo.port;
};

const getOwnDevice = async () => {
    const id = parseInt(owner.value as string, 10);
    const res = await getDeviceListById({ ID: id });
    devices.value = res.data.deviceList;
};

const confirmDeviceSelection = () => {
    if (selectedDevice.value !== "") {
        showMinicap.value = true;
    }
};
const cancelDeviceSelection = () => {
    if (selectedDevice.value !== "") {
        showMinicap.value = false;
    }
};

const deviceSelected = computed(() => {
    return selectedDevice.value !== "";
});
const runxxx = () => {
    RefChildExpose.value.connectSocket()

}

const run = () => {
    const wsUrl = `ws://${ip.value}:${port.value}/task/ws`;
    state.socket = new WebSocket(wsUrl);
    // 创建 WebSocket 连接
    // const socket = new WebSocket(wsUrl);
    state.socket.onopen = () => {
        console.log('WebSocket opened!');
        ElMessage.success("任务提交成功,开始执行......");
        // 清空输出日志内容
        const output_div = document.getElementById('output');
        if (output_div) {
            output_div.innerText = '';
        }
        // 发送消息给后端，触发任务执行
        state.socket?.send('task_start');
    };

    state.socket.onmessage = (event) => {
        // console.log(`Message received: ${event.data}`);
        const data = JSON.parse(event.data);
        const output_div = document.getElementById('output');
        if (output_div) {
            output_div.innerText += `${data.message}\n`;
            // 滚动到底部
            output_div.scrollTop = output_div.scrollHeight;

            // 监听鼠标滚轮事件
            output_div.addEventListener('wheel', function (event) {
                event.preventDefault();
                const scroll_step = Math.max(30, output_div.clientHeight / 10);
                output_div.scrollTop += event.deltaY > 0 ? scroll_step : -scroll_step;
            });
        }

    };

    state.socket.onerror = (error) => {
        console.error(`WebSocket error: ${error}`);
        // 显示提示框，提示任务提交失败
        ElMessage.error("任务提交失败！");
        // 将当前主机的 loading 置为 false 表示任务执行完成
        // 关闭 WebSocket 连接
        state.socket?.close();
    };
    state.socket.onclose = (event) => {
        console.log(`WebSocket closed with code ${event.code}`);
        ElMessage.success("任务执行完成！");
        // 将当前主机的 loading 置为 false 表示任务执行完成

    }
};

onBeforeUnmount(() => {
    if (state.socket?.readyState === WebSocket.OPEN) {
        console.log("kankan1",)
        state.socket.send('disconnect');
        state.socket.close();
    }
    window.removeEventListener('beforeunload', () => { });
    state.socket = null;
});




onMounted(async () => {
    await getOwnHost();
    await getOwnDevice();
    isLoaded.value = true;
    window.addEventListener('beforeunload', () => {
        if (state.socket?.readyState === WebSocket.OPEN) {
            state.socket.send('disconnect');
            state.socket.close();
        }
    });
});
</script>

  
<style lang="scss" scoped>
.app-container {
    padding: 20px;
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

#output {
    font-family: monospace;
    white-space: pre-wrap;
}

.log-container {
    font-size: 12px;
    line-height: 1.5;
    color: #333;
    background-color: #f5f5f5;
    margin: 0;
    padding: 10px;
    word-wrap: break-word;
    white-space: pre-wrap;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
}
</style>