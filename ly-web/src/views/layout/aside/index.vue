<template>
    <div :style="{ background: userStore.sideMode }">
        <el-scrollbar style="height: calc(100vh - 60px)">
            <transition :duration="{ enter: 800, leave: 100 }" mode="out-in" name="el-fade-in-linear">
            </transition>
        </el-scrollbar>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/pinia/modules/user';
import { emitter } from '@/utils/bus';
import { onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const userStore = useUserStore()
const isCollapse: any = ref(false)
const active: any = ref('')
const theme: any = ref({})
const route = useRoute()
const router = useRouter()
const getTheme = () => {
    switch (userStore.sideMode) {
        case '#fff':
            theme.value = {
                background: '#fff',
                activeBackground: '#4D70FF',
                activeText: '#fff',
                normalText: '#333',
                hoverBackground: 'rgba(64, 158, 255, 0.08)',
                hoverText: '#333',
            }
            break
        case '#191a23':
            theme.value = {
                background: '#191a23',
                activeBackground: '#4D70FF',
                activeText: '#fff',
                normalText: '#fff',
                hoverBackground: 'rgba(64, 158, 255, 0.08)',
                hoverText: '#fff',
            }
            break
    }
}
const initPage = () => {
  active.value = route.meta.activeName || route.name
  const screenWidth = document.body.clientWidth
  if (screenWidth < 1000) {
    isCollapse.value = !isCollapse.value
  }

  emitter.on('collapse', (item) => {
    isCollapse.value = item
  })
}

initPage()

getTheme()
watch(() => route, () => {
    active.value = route.meta.activeName || route.name
}, { deep: true })

watch(() => userStore.sideMode, () => {
    getTheme()
})
onUnmounted(() => {
  emitter.off('collapse')
})


</script>
<style lang="scss">
.el-sub-menu__title:hover,
.el-menu-item:hover {
    background: transparent;
}

.el-scrollbar {
    .el-scrollbar__view {
        height: 100%;
    }
}

.menu-info {
    .menu-contorl {
        line-height: 52px;
        font-size: 20px;
        display: table-cell;
        vertical-align: middle;
    }
}
</style>