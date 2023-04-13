<template>
    <div class="app-container">
        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="hostList">
            <el-table-column label="名称" prop="name" />
            <el-table-column label="地址">
                <template #default="scope">
                    {{ scope.row.ip }}:{{ scope.row.port }}
                </template>
            </el-table-column>
            <el-table-column label="类别" prop="category" />
            <el-table-column label="状态">
                <template #default="{ row }">
                    <el-tag :type="
                        typeof row.alive === 'undefined'
                            ? 'info'
                            : row.alive
                                ? 'success'
                                : 'danger'
                    ">
                        {{
                            typeof row.alive === 'undefined'
                            ? '执行中'
                            : row.alive
                                ? '在线'
                                : '离线'
                        }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="所有者" prop="owner" />
            <el-table-column label="操作" width="230" class-name="fixed-width">
                <template #default="scope">
                    <el-tooltip content="查看配置文件" placement="top">
                        <el-button link type="primary" icon="View" :disabled="!scope.row.alive"
                            @click="viewconfig(scope)">配置</el-button>
                    </el-tooltip>
                    <el-tooltip content="用例执行" placement="top">
                        <el-button link type="danger" icon="Key" :loading="scope.row.loading"
                            :disabled="scope.row.disabled || !scope.row.alive" @click="run(scope)">执行</el-button>
                    </el-tooltip>
                    <el-tooltip content="报告查看" placement="top">
                        <el-button link type="primary" icon="Open" :disabled="!scope.row.alive"
                            @click="viewReport(scope)">报告</el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.Page" v-model:limit="queryParams.PageSize"
            @pagination="getHosts" />
    </div>
</template>

<script setup lang="ts">
import { getHostList } from '@/api/host';
import { onUnmounted, ref } from 'vue';
import pagination from "@/components/Pagination/index.vue"
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const loading = ref(true);
const hostList: any = ref([]);
const total = ref(0);
const queryParams = ref({
    Page: 1,
    PageSize: 10,
})

let timer: any;

const getHosts = async () => {
    try {
        const res = await getHostList(queryParams.value);
        total.value = res.data.total;
        hostList.value = res.data.list.map((host: any) => ({ ...host, loading: false, disabled: false }));
        loading.value = false;
        // 执行心跳检查
        startHeartbeat();

    } catch (error) {
        console.error(error);
    }
};

const startHeartbeat = () => {
    checkHeartbeat(); // 执行一次心跳检查

    // 定时周期性执行心跳检查
    timer = setInterval(checkHeartbeat, 10000);
};

const checkHeartbeat = async () => {
    for (const host of hostList.value) {
        const pingUrl = `http://${host.ip}:${host.port}/ping`;
        try {
            const response = await axios.get(pingUrl, { timeout: 3000 });
            // 如果主机不在执行任务，则将其 alive 属性标记为在线或离线
            if (!host.loading) {
                host.alive = response.status === 200;
            }
        } catch (_) {
            // 如果主机不在执行任务，则将其 alive 属性标记为离线
            if (!host.loading) {
                host.alive = false;
            }
        }
    }
}

onUnmounted(() => clearInterval(timer));

const viewconfig = (scope: any) => {
    router.push({
        path: `/host/config`,
        query: {
            owner: scope.row.owner,
            ip: scope.row.ip,
            port: scope.row.port
        }
    })

}

const viewReport = async (scope: any) => {
    const Url = `http://${scope.row.ip}:${scope.row.port}/task/report`;
    console.log(Url)
    axios.get(Url).then((res: any) => {
        console.log(res)
        if (res.data.message === '打开报告成功！') {
            ElMessage.success("打开报告成功！");
        } else {
            ElMessage.warning(res.data.message);
        }
    }).catch((error: any) => {
        console.log(error);
        ElMessage.error("打开报告失败");
    });

}




const run = (scope: any) => {
    const wsUrl = `ws://${scope.row.ip}:${scope.row.port}/task/ws`;

    // 创建 WebSocket 连接
    const socket = new WebSocket(wsUrl);
    socket.onopen = () => {
        console.log('WebSocket opened!');
        // 发送消息给后端，触发任务执行
        socket.send('task_start');

        // 将当前主机的 loading 置为 true 表示正在执行任务
        scope.row.loading = true;
        scope.row.disabled = true;

        scope.row.alive = undefined;
    };

    socket.onmessage = (event) => {
        console.log(`Message received: ${event.data}`);
        if (event.data === 'task_finished') {
            // 显示提示框，提示任务已成功执行完成
            ElMessage.success("任务已成功执行完成！");
            // 将当前主机的 loading 置为 false 表示任务执行完成
            scope.row.loading = false;
            scope.row.disabled = false;
            checkHeartbeat();
            // 关闭 WebSocket 连接
            socket.close();

        }
    };

    socket.onerror = (error) => {
        console.error(`WebSocket error: ${error}`);
        // 显示提示框，提示任务提交失败
        ElMessage.error("任务提交失败！");
        // 将当前主机的 loading 置为 false 表示任务执行完成
        scope.row.loading = false;
        scope.row.disabled = false;
        checkHeartbeat();
        // 关闭 WebSocket 连接
        socket.close();
    };
    socket.onclose = (event) => {
        console.log(`WebSocket closed with code ${event.code}`);
        // 将当前主机的 loading 置为 false 表示任务执行完成
        scope.row.loading = false;
        scope.row.disabled = false;
        checkHeartbeat();
        // 如果主机状态仍然不确定，则将其标记为离线状态
        if (typeof (scope.row.alive) === 'undefined') {
            scope.row.alive = false;
        }
    }
};


getHosts()

</script>
<style lang="scss" scoped></style>