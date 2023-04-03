<template>
    <div class="app-container">
        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="hostList">
            <el-table-column label="名称" prop="name" />
            <el-table-column label="地址">
                <template #default="scope">
                    {{ scope.ip }}:{{ scope.port }}
                </template>
            </el-table-column>
            <el-table-column label="端口" prop="port" />
            <el-table-column label="类别" prop="category" />
            <el-table-column label="所有者" prop="owner" />
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.Page" v-model:limit="queryParams.PageSize"
            @pagination="getHots" />
    </div>
</template>

<script setup lang="ts">
import { getHostList } from '@/api/host';
import { ref } from 'vue';
import pagination from "@/components/Pagination/index.vue"


const loading = ref(true);
const hostList = ref([]);
const total = ref(0);
const queryParams = ref({
    Page: 1,
    PageSize: 10,
})


const getHots = () => {
    getHostList(queryParams.value).then(res => {
        hostList.value = res.data.list
        total.value = res.data.total
        loading.value = false;
    })
}

getHots()

</script>
<style lang="scss" scoped></style>