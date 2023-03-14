<template>
    <el-container class="index-con">
      <el-aside :class="state.showclass">
        <leftnav></leftnav>
      </el-aside>
      <el-container class="main-con">
        <el-header class="index-header">
          <navcon :breadList="state.breadList" ></navcon>
        </el-header>
        <el-main class="index-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </template>

<script setup lang="ts">
import navcon from "@/views/common/components/navcon.vue";
import leftnav from "@/views/common/components/leftnav.vue";
import { reactive, ref, toRefs } from "vue";

const state = reactive({
    showclass:"aside",
    breadList:[],

})

</script>
<style scoped>
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.aside {
  width: 48px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.asideshow {
  width: 200px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.index-header{
  max-height: 40px;
}
.main-card{
  min-height: 100%;
  border: none;
}
</style>