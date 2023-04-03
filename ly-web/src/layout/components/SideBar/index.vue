<template>
  <div :class="{ 'has-logo': showLogo }"
    :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu :router="true" :default-active="route.path" :collapse="isCollapse"
        :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor" :unique-opened="true"
        :active-text-color="theme" :collapse-transition="false" mode="vertical">
        <SidebarItem/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/layout/components/SideBar/Logo.vue'
import { useAppStore } from '@/pinia/modules/app';
import variables from '@/assets/styles/variables.module.scss'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SidebarItem from './SidebarItem.vue'

const route = useRoute();

const appStore = useAppStore()
const showLogo = computed(() => appStore.sidebarLogo);
const sideTheme = computed(() => appStore.sideTheme);
const isCollapse = computed(() => !appStore.sidebar.opened);
const theme = computed(() => appStore.theme);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
})


</script>
<style lang="scss" scoped></style>
