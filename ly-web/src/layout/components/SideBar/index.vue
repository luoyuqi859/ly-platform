<template>
  <div :class="{ 'has-logo': showLogo }" :style="{
    backgroundColor:
      sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
  }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="
        sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground
      " :text-color="sideTheme === 'theme-dark' ? variables.menuColor : variables.menuLightColor"
        :unique-opened="true" :active-text-color="theme" :collapse-transition="false" mode="vertical">
        <SidebarItem v-for="(routeItem, index) in sidebarRouters" :key="routeItem.path + index" :item="routeItem"
          :base-path="routeItem.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Logo from '@/layout/components/SideBar/Logo.vue'
import variables from '@/assets/styles/variables.module.scss'
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SidebarItem from './SidebarItem.vue'
import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const settingsStore = useSettingsStore();


const sidebarRouters = computed(() => router.options.routes);
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);




const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});


</script>
<style lang="scss" scoped></style>
