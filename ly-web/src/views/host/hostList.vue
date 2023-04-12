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
            <el-table-column label="状态" prop="status" />
            <el-table-column label="所有者" prop="owner" />
            <el-table-column label="操作" width="230" class-name="fixed-width">
                <template #default="scope">
                    <el-tooltip content="查看配置文件" placement="top">
                        <el-button link type="primary" icon="View" @click="viewconfig(scope)">查看配置文件</el-button>
                    </el-tooltip>
                    <el-tooltip content="执行" placement="top">
                        <el-button link type="danger" icon="Key" :loading="scope.row.loading" :disabled="scope.row.disabled"
                            @click="run(scope)">执行</el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.Page" v-model:limit="queryParams.PageSize"
            @pagination="getHots" />
    </div>
</template>

<script setup lang="ts">
import { getHostList } from '@/api/host';
import { ref } from 'vue';
import pagination from "@/components/Pagination/index.vue"
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const loading = ref(true);
const hostList = ref([]);
const total = ref(0);
const queryParams = ref({
    Page: 1,
    PageSize: 10,
})



const getHots = async () => {
    try {
        const res = await getHostList(queryParams.value);
        total.value = res.data.total;

        for (const host of res.data.list) {
            const pingUrl = `http://${host.ip}:${host.port}/ping`;
            try {
                await axios.get(pingUrl);
                host.status = 'online';
            } catch (_) {
                host.status = 'offline';
            }
        }

        hostList.value = res.data.list.map((host: any) => ({ ...host, loading: false, disabled: false }));
        loading.value = false;
    } catch (error) {
        console.error(error);
    }
};

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



// const run = async (scope: any) => {
//     const runUrl = `http://${scope.row.ip}:${scope.row.port}/task/run-tasks`;

//     try {
//         // 将当前主机的 loading 置为 true 表示正在执行任务
//         scope.row.loading = true;
//         scope.row.disabled = true;

//         const res = await axios.post(runUrl);
//         console.log(res);
//         // 显示提示框，提示任务已成功提交
//         ElMessage.success("任务已成功提交！");
//     } catch (err) {
//         console.error(err);
//         // 显示提示框，提示任务提交失败
//         ElMessage.error("任务提交失败！");
//     } finally {
//         // 将当前主机的 loading 置为 false 表示任务执行完成
//         scope.row.loading = false;
//         scope.row.disabled = false;
//     }
// }

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
    };

    socket.onmessage = (event) => {
        console.log(`Message received: ${event.data}`);
        if (event.data === 'task_finished') {
            // 显示提示框，提示任务已成功执行完成
            ElMessage.success("任务已成功执行完成！");
            // 将当前主机的 loading 置为 false 表示任务执行完成
            scope.row.loading = false;
            scope.row.disabled = false;
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
        // 关闭 WebSocket 连接
        socket.close();
    };
    socket.onclose = (event) => {
        console.log(`WebSocket closed with code ${event.code}`);
        // 将当前主机的 loading 置为 false 表示任务执行完成
        scope.row.loading = false;
        scope.row.disabled = false;
    }
};


getHots()
// setInterval(getHots, 100000);

</script>
<style lang="scss" scoped></style>