<template>
    <div class="left-menu">
        <el-menu :collapse="state.collapsed" collapse-transition router unique-opened class="el-menu-vertical-demo"
            background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
            <div class="logobox" @click="toggle(state.collapsed)">
                <img class="logoimg" src="../../../assets/img/logo.png" alt="">
                <span :class="state.pftitle">流马测试平台</span>
            </div>
        </el-menu>
    </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
const state = reactive({
    collapsed: true,
    pftitle: 'title-hidden',
    allmenu: []
})

const toggle = (showtype:boolean) =>{
    state.collapsed = !showtype;
      if (showtype) {
        state.pftitle = 'title-show';
      } else {
        state.pftitle = 'title-hidden';
      }
    
}

</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu-vertical-demo {
    width: 48px;
}

.el-menu-item-demo .el-submenu__title {
    height: 48px;
    line-height: 48px;
    padding-left: 16px !important;
}

.el-menu-item-group__title {
    padding: 0px;
}

.el-menu-bg {
    background-color: #1f2d3d !important;
}

.el-menu {
    border: none;
}

.logobox {
    height: 32px;
    font-size: 16px;
    text-align: center;
    padding: 10px 0px;
    white-space: nowrap;
}

.logoimg {
    color: #ffffff;
    height: 28px;
    vertical-align: middle;
}

.title-hidden {
    vertical-align: middle;
    height: 0;
    width: 0;
    display: none;
}

.title-show {
    vertical-align: middle;
    height: 20px;
    margin-left: 10px;
    margin-right: 20px;
    color: rgb(255, 255, 255);
}</style>
  