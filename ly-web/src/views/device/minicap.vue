<template>
    <div class="app-container">
        <img id="screen" ref="minicapRef" alt="" src="" />
    </div>
</template>

<script setup lang="ts">
import { getHostByUserId } from '@/api/host';
import { ElMessage } from 'element-plus';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';




const route = useRoute()

const owner = ref(route.query.owner)


const ip = ref("")
const port = ref("")


const minicapData: any = ref()
const minicapRef = ref<HTMLImageElement | null>(null);

let socket: any = null;



const initWebSocket = async () => {
    const wsUrl = `ws://10.4.17.56:5555/device/ws`;
    console.log(wsUrl)
    // 创建 WebSocket 连接
    const socket = new WebSocket(wsUrl);



    socket.onclose = () => {
        console.log('WebSocket disconnected');
    };
    socket.onopen = () => {
        console.log('WebSocket opened!');
        ElMessage.success("任务提交成功,开始执行......");
        // 发送消息给后端，触发任务执行
        socket.send('minicap start');
    };

    socket.onmessage = (event: any) => {
        try {
            // 解析消息体为 JavaScript 对象
            const data = JSON.parse(event.data);

            // 获取 width、image 和 height 字段
            const width = data.width;
            const image = data.image;
            const height = data.height;
            if (minicapRef.value) {
                minicapRef.value.setAttribute('src', `data:image/png;base64,${image}`);
            }
            // minicapData.value = document.getElementById('screen') as HTMLImageElement;
            // minicapData.src = 'data:image/png;base64,' + data.image;

            console.log(width, height, image);
        } catch (error) {
            console.error(error);
        }

    };
}

initWebSocket()

onUnmounted(() => {
    socket?.close();
});

</script>
<style lang="scss" scoped></style>