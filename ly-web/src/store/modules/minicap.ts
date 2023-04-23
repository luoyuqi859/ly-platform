import { ElMessage } from "element-plus";
import { defineStore } from "pinia";


interface State {
    socket: WebSocket | null;
}

const minicapStore = defineStore("minicap", {
    state: (): State => ({
        socket: null,
    }),
    actions: {
        initWebSocket(ip: string, port: string, serial: string) {
            const wsUrl = `ws://${ip}:${port}/device/ws`;
            this.socket = new WebSocket(wsUrl);
      
            this.socket.onclose = () => {
                ElMessage.success('投屏断开....');
            };
            this.socket.onopen = () => {
                ElMessage.success('连接成功,开始投屏.....');
                // 发送消息给后端，触发任务执行
                this.socket?.send(JSON.stringify({ serial: serial }));
            };
            this.socket.onmessage = (event: any) => {
              try {
                // 解析消息体为 JavaScript 对象
                const data = JSON.parse(event.data);
      
                // TODO: 处理从 WebSocket 接收到的数据
              } catch (error) {
                console.error(error);
              }
            };
          },
    }
})