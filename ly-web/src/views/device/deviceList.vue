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
            <el-table-column label="操作" width="230" class-name="fixed-width">
                <template #default="scope">
                    <el-tooltip content="投屏" placement="top">
                        <el-button link type="primary" icon="View" @click="projectionScreen(scope)">投屏</el-button>
                    </el-tooltip>
                    <el-tooltip content="性能测试" placement="top">
                        <el-button link type="danger" icon="Key" :loading="scope.row.loading" :disabled="scope.row.disabled"
                            @click="performanceTest(scope)">性能测试</el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
            <!-- <el-table-column label="操作" width="230" class-name="fixed-width">
                <template #default="{ row, $index }">
                    <el-button type="primary" size="small" @click="projectionScreen(row)">
                        投屏
                    </el-button>
                </template>
            </el-table-column> -->
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.Page" v-model:limit="queryParams.PageSize"
            @pagination="getDevices" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import pagination from "@/components/Pagination/index.vue"
import { getDeviceList } from '@/api/device';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(true);
const deviceList = ref([]);
const total = ref(0);
const queryParams = ref({
    Page: 1,
    PageSize: 10,
})

const performanceTest = (scope: any) => {
    console.log(scope)
    router.push({
        path: `/device/performance`,
        query:{
            owner: scope.row.owner,
            serial:scope.row.serial,
            brand:scope.row.brand,
            platform:scope.row.platform,
        }
    })

}


const getDevices= () => {
    getDeviceList(queryParams.value).then(res => {
        deviceList.value = res.data.list
        total.value = res.data.total
        loading.value = false;
    })
}

const projectionScreen = (scope:any)=>{
    console.log(scope)

    router.push({
        path: `/device/projectionScreen`,
        query:{
            owner: scope.row.owner,
            serial:scope.row.serial
        }
    })
}

getDevices()

</script>
<style lang="scss" scoped></style>