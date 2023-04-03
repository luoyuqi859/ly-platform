<template>
    <div class="app-container">
        <!-- 表格数据 -->
        <el-table v-loading="loading" :data="userList">
            <el-table-column label="昵称" prop="nickName" />
        </el-table>

        <pagination v-show="total > 0" :total="total" v-model:page="queryParams.Page" v-model:limit="queryParams.PageSize"
            @pagination="getUsers" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import pagination from "@/components/Pagination/index.vue"
import { getUserList } from '@/api/user';


const loading = ref(true);
const userList = ref([]);
const total = ref(0);
const queryParams = ref({
    Page: 1,
    PageSize: 10,
})


const getUsers = () => {
    getUserList(queryParams.value).then(res => {
        userList.value = res.data.list
        total.value = res.data.total
        loading.value = false;
    })
}

getUsers()

</script>
<style lang="scss" scoped></style>