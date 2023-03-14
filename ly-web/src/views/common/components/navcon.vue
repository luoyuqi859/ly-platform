<template>
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#fff" text-color="#000">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" size="small" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/home/dashboard' }"><i class="iconfont icon-icon-test"
                    style="font-size:14px"></i> 首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(name, index) in props.breadList" :key="index">
                {{ name }}
            </el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 公众号图片 -->
        <el-image-viewer v-if="state.showQR" :on-close="() => { state.showQR = false }" :url-list="[state.qrUrl]" />
    </el-menu>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({
    showQR: false,
    qrUrl: '../../../assets/img/qr.png',
})



const props = defineProps({
    breadList: {
        default: ["breadList"]
    }
})


</script>
<style scoped>
.breadcrumb {
    float: left;
    padding: 13px 0px;
}

.dropdown-user {
    cursor: pointer;
    font-size: 14px;
    line-height: 40px;
    display: flex;
}

.user-name {
    margin-left: 5px;
    min-width: 40px;
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dropdown-proj {
    cursor: pointer;
    font-size: 14px;
    color: #334157;
    line-height: 40px;
    margin-right: 20px;
}

.align-right {
    float: right;
    height: 40px;
}
</style>
  