<template>
    <div :class="classObj" class="app-wrapper" :style="{ '--current-color': theme }">
        <el-scrollbar>
            <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
            <Sidebar v-if="!sidebar.hide" class="sidebar-container" />
            <div :class="{ hasTagsView: needTagsView, sidebarHide: sidebar.hide }" class="main-container">
                <div :class="{ 'fixed-header': fixedHeader }">
                    <Navbar/>
                </div>
                <AppMain />
            </div>
        </el-scrollbar>
    </div>
</template>
  
<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { useAppStore } from '@/pinia/modules/app';
import { computed, ref, watchEffect } from 'vue';
import Sidebar from '@/layout/components/SideBar/index.vue'
import AppMain from '@/layout/components/AppMain/index.vue';
import Navbar from '@/layout/components/Navbar/index.vue'



const sidebar = computed(() => useAppStore().sidebar);
const device = computed(() => useAppStore().device);
const theme = computed(() => useAppStore().theme);
const needTagsView = computed(() => useAppStore().tagsView);
const fixedHeader = computed(() => useAppStore().fixedHeader);

const classObj = computed(() => ({
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === 'mobile'
}))
const { width, height } = useWindowSize();
const WIDTH = 992; // refer to Bootstrap's responsive design
watchEffect(() => {
    if (device.value === 'mobile' && sidebar.value.opened) {
        useAppStore().closeSideBar(false)
    }
    if (width.value - 1 < WIDTH) {
        useAppStore().toggleDevice('mobile')
        useAppStore().closeSideBar(true)
    } else {
        useAppStore().toggleDevice('desktop')
    }
})

const handleClickOutside = () => {
    useAppStore().closeSideBar(false)
}

const settingRef = ref(null);



</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    .el-scrollbar {
        height: 100%;
    }

    :deep(.el-scrollbar__wrap) {
        overflow-x: hidden;
    }

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$base-sidebar-width});
    transition: width 0.28s;
}

.hideSidebar .fixed-header {
    width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
    width: 100%;
}

.mobile .fixed-header {
    width: 100%;
}
</style>