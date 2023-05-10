<template>
    <div class="app-container">
        <div class="image-body" id="screen">
            <canvas ref="minicapRef" class="canvas-bg" v-bind:style="canvasStyle"></canvas>
            <span class="finger finger-0" style="transform: translate3d(200px, 100px, 0px)"></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { ImagePool } from "@/utils/imagepool";

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
    width: number;
    height: number;
    socket: WebSocket | null;
}

const state = reactive<State>({
    width: 0,
    height: 0,
    socket: null,

});



const minicapRef: any = ref<HTMLCanvasElement | null>(null);

const canvasStyle = computed(() => ({
    opacity: 0.5,
    width: `${state.width}px`,
    height: `${state.height}px`,
}));



const imagePool = new ImagePool(100);


const initWebSocket = () => {
    const wsUrl = `ws://${props.ip}:${props.port}/device/ws/scrcpy/screen`;


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
        const blob = event.data;
        const ctx = minicapRef.value.getContext('2d');
        const URL = window.URL || window.webkitURL;
        const BLANK_IMG = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        const url = URL.createObjectURL(blob);
        const img = new Image();

        img.onload = function () {
            state.width = img.width;
            state.height = img.height;

            minicapRef.value.width = img.width;
            minicapRef.value.height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height);

            URL.revokeObjectURL(url);
        };

        img.onerror = function () {
            // Handle errors if needed
        };



        img.src = url;
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
.image-body {
    background-color: white;
}

.canvas-bg {
    z-index: 10;
}

.finger {
    position: absolute;
    border-style: solid;
    border-radius: 50%;
    border-color: white;
    border-width: 1mm;
    width: 6mm;
    height: 6mm;
    top: -3mm;
    left: -3mm;
    opacity: 0.7;
    pointer-events: none;
    background: red;
    z-index: 200;
    display: none;
}
</style>