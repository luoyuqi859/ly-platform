<template>
    <div class="app-container">
        <el-card class="index-card">
        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="hostList">
            <el-table-column label="名称" prop="name" />
            <el-table-column label="地址">
                <template #default="scope: any">
                    {{ scope.row.ip }}:{{ scope.row.port }}
                </template>
            </el-table-column>
            <el-table-column label="类别" prop="category" />
            <el-table-column label="状态">
                <template #default=" scope: any ">
                    <el-tag
                        :type=" scope.row.status === '在线' ? 'success' : scope.row.status === '离线' ? 'danger' : 'warning' ">{{
                        scope.row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="230" class-name="fixed-width">
                <template #default=" scope: any ">
                    <el-tooltip content="测试执行" placement="top">
                        <el-button link type="danger" icon="Key" :disabled=" scope.row.status != '在线' "
                            @click=" executeStep(scope) ">
                            测试执行
                        </el-button>
                    </el-tooltip>
                </template>

            </el-table-column>
        </el-table>

        </el-card>
        <pagination v-show=" total > 0 " :total=" total " v-model:page=" queryParams.Page "
            v-model:limit=" queryParams.PageSize " @pagination=" getHosts " />


    </div>
</template>

<script setup lang="ts">
import { checkHostPermission, getHostList, hostStatusModify } from '@/api/host';
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

        for (let i in res.data.list) {
            const host = res.data.list[i];
            const response = await checkHostPermission({ host: host.ID });
            host.canControl = response.data.canControl == "1" ? "有权限" : "无权限";
        }

        total.value = res.data.total;
        hostList.value = res.data.list;
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
    if (scope.row.canControl !== '有权限') {
        ElMessage.warning('您当前没有该主机权限，请点击头像前往个人中心申请主机权限');
        return;
    }
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
            const res = await axios.get(pingUrl, { timeout: 3000 });
            if (res.data == "pong") {
                host.status = "在线"
            }
        } catch (_) {
            host.status = "离线";
        }
    }
};


onUnmounted(() => clearInterval(timer));


getHosts()

</script>
<style lang="scss" scoped>
.index-card {
    border-radius: 10px;
}
</style>