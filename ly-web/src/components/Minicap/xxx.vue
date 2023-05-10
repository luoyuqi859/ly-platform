<template>
    <div class="app-container">
        <img id="screen" ref="minicapRef" style="object-fit: contain; width: 100%; height: 100%;" />
        <div v-if="!isLoaded" class="loading">加载中...</div>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onBeforeUnmount, onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue';

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
    serial: {
        type: String,
        required: true,
        default: ""
    }
})

interface State {
    width: string;
    height: string;
    socket: WebSocket | null;
}

const state = reactive<State>({
    width: "",
    height: "",
    socket: null,

});
const isLoaded = ref(false);


const minicapRef = ref<HTMLImageElement | null>(null);



const initWebSocket = () => {
    const wsUrl = `ws://${props.ip}:${props.port}/device/ws`;


    state.socket = new WebSocket(wsUrl);

    state.socket.onclose = () => {
        ElMessage.warning('投屏断开....');
        state.socket = null;

    };
    state.socket.onopen = () => {
        ElMessage.success('连接成功,开始投屏.....');

        // 发送消息给后端，触发任务执行
        setTimeout(() => {
            if (state.socket && state.socket.readyState === WebSocket.OPEN) {
                state.socket?.send(JSON.stringify({ serial: props.serial, "msg_type": 2 }));
            }
        }, 1000);
    };
    state.socket.onmessage = (event: any) => {
        try {
            // 解析消息体为 JavaScript 对象
            const data = JSON.parse(event.data);
            console.log(event.data)

            // 获取 width、image 和 height 字段
            const { width, height, image } = data;

            // 更新 minicap 数据和截图
            state.width = width;
            state.height = height;
            if (minicapRef.value) {
                minicapRef.value.setAttribute('src', `data:image/jpeg;base64,${image}`);
                minicapRef.value.onload = () => {
                    isLoaded.value = true;
                };
            }
        } catch (error) {
            console.error(error);
        }
    };
};

onMounted(() => {
    initWebSocket();
    window.addEventListener('beforeunload', () => {
        if (state.socket?.readyState === WebSocket.OPEN) {
            state.socket.send('disconnect');
            console.log("kankan2",)
            state.socket.close();
        }
    });
});

onBeforeUnmount(() => {
    if (state.socket?.readyState === WebSocket.OPEN) {
        console.log("kankan1",)
        state.socket.send('disconnect');
        state.socket.close();
    }
    window.removeEventListener('beforeunload', () => { });
    state.socket = null;
});
</script>


<style lang="scss" scoped>
.loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    color: #999;
}
</style>