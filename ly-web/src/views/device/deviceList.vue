<template>
    <div class="app-container">
        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="deviceList">
            <el-table-column label="名称" prop="name" />
            <el-table-column label="序列号" prop="serial"/>
            <el-table-column label="品牌" prop="brand"/>
            <el-table-column label="型号" prop="model" />
            <el-table-column label="平台" prop="platform" />
            <el-table-column label="平台版本" prop="platformVersion" />
            <el-table-column label="状态" prop="status" />
            <el-table-column label="所有者" prop="owner" />
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.Page" v-model:limit="queryParams.PageSize"
            @pagination="getDevices" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import pagination from "@/components/Pagination/index.vue"
import { getDeviceList } from '@/api/device';


const loading = ref(true);
const deviceList = ref([]);
const total = ref(0);
const queryParams = ref({
    Page: 1,
    PageSize: 10,
})


const getDevices= () => {
    getDeviceList(queryParams.value).then(res => {
        deviceList.value = res.data.list
        total.value = res.data.total
        loading.value = false;
    })
}

getDevices()

</script>
<style lang="scss" scoped></style>