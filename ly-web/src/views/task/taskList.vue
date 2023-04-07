<template>
    <div class="app-container">
        <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button
               type="primary"
               plain
               icon="Plus"
            >新增</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="success"
               plain
               icon="Edit"
               :disabled="single"
            >修改</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="danger"
               plain
               icon="Delete"
               :disabled="multiple"
            >删除</el-button>
         </el-col>
         <el-col :span="1.5">
            <el-button
               type="warning"
               plain
               icon="Download"
            >导出</el-button>
         </el-col>
         <RightToolbar v-model:showSearch="showSearch" @queryTable="getDevices"></RightToolbar>
      </el-row>
        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="deviceList">
            <el-table-column label="名称" prop="name" />
            <el-table-column label="序列号" prop="serial" :show-overflow-tooltip="true" />
            <el-table-column label="品牌" prop="brand" :show-overflow-tooltip="true" />
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
import RightToolbar from "@/components/RightToolbar/index.vue"
import { getDeviceList } from '@/api/device';

const showSearch = ref(true);
const single = ref(true);
const multiple = ref(true);
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