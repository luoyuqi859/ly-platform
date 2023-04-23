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
                    <el-tag :type="row.status === '在线' ? 'success' : row.status === '离线' ? 'danger' : 'warning'">{{
                        row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="230" class-name="fixed-width">
                <template #default="scope">
                    <el-tooltip content="测试执行" placement="top">
                        <el-button link type="danger" icon="Key" :disabled="scope.row.status != '在线'"
                            @click="executeStep(scope)">测试执行</el-button>
                    </el-tooltip>
                    <el-tooltip content="报告查看(只能查看最新报告)" placement="top">
                        <el-button link type="primary" icon="Open" :disabled="scope.row.status != '在线'"
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
import { getHostList, hostStatusModify } from '@/api/host';
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
        console.log(res)
        total.value = res.data.total;
        hostList.value = res.data.list
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

const executeStep = async (scope: any) => {
    // const data = {
    //     ip: scope.row.ip,
    //     port: scope.row.port,
    //     status: '使用中'
    // };
    // // 更新主机状态
    // await hostStatusModify(data);
    // // 重新获取主机列表，更新主机状态
    // await getHosts();
    router.push({
        path: `/host/executeStep`,
        query: {
            owner: scope.row.owner,
            ip: scope.row.ip,
            port: scope.row.port
        }
    })

}

const checkHeartbeat = async () => {
    for (const host of hostList.value) {
        const pingUrl = `http://${host.ip}:${host.port}/ping`;
        try {
            await axios.get(pingUrl, { timeout: 3000 });
            host.status = "在线"
        } catch (_) {
            host.status = "离线";
        }
    }
};


onUnmounted(() => clearInterval(timer));


const viewReport = async (scope: any) => {
    const Url = `http://${scope.row.ip}:${scope.row.port}/task/report`;
    console.log(Url)
    axios.get(Url).then((res: any) => {
        if (res.data.message.includes('报告已生成')) {
            ElMessage.success(res.data.message);
        } else {
            ElMessage.warning(res.data.message);
        }
    }).catch((error: any) => {
        console.log(error);
        ElMessage.error("打开报告失败");
    });

}


getHosts()

</script>
<style lang="scss" scoped></style>