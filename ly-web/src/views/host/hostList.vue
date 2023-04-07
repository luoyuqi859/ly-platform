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
                    <el-tooltip content="查看脚本" placement="top">
                        <el-button link type="primary" icon="Edit" @click="viewIde(scope)">IDE</el-button>
                    </el-tooltip>
                    <el-tooltip content="查看脚本" placement="top">
                        <el-button link type="primary" icon="Edit" @click="run(scope)">执行</el-button>
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

        hostList.value = res.data.list;
        loading.value = false;
    } catch (error) {
        console.error(error);
    }
};

const viewIde = (scope: any) => {
    console.log(scope)
    router.push({
        path: `/ide`,
        query: {
            owner: scope.row.owner
        }
    })

}

const run = async (scope: any) => {
    const runUrl = `http://${scope.row.ip}:${scope.row.port}/task/run-tasks`;

    const res = await axios.post(runUrl);
    console.log(res)
}


getHots()
setInterval(getHots, 10000);

</script>
<style lang="scss" scoped></style>