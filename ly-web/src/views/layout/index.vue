<template>
  <el-container class="layout-cont">
    <el-container :class="[isSider?'openside':'hideside',isMobile ? 'mobile': '']">
      <el-row :class="[isShadowBg?'shadowBg':'']" @click="changeShadow()" />
      <el-aside class="main-cont main-left gva-aside">
        <div class="tilte" :style="{background: backgroundColor}">
          <div v-if="isSider" class="tit-text" :style="{color:textColor}">ly xxxx</div>
        </div>
        <Aside class="aside" />
      </el-aside>


    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useUserStore } from "@/pinia/modules/user";
import { emitter } from "@/utils/bus";
import { computed, reactive, ref, toRefs } from "vue";

const isCollapse = ref(false)
const isSider = ref(true)
const isMobile = ref(false)
const isShadowBg = ref(false)
const userStore = useUserStore()

const changeShadow = () => {
  isShadowBg.value = !isShadowBg.value
  isSider.value = !!isCollapse.value
  totalCollapse()
}
const backgroundColor = computed(() => {
  if (userStore.sideMode === 'dark') {
    return '#191a23'
  } else if (userStore.sideMode === 'light') {
    return '#fff'
  } else {
    return userStore.sideMode
  }
})
const textColor = computed(() => {
  if (userStore.sideMode === 'dark') {
    return '#fff'
  } else if (userStore.sideMode === 'light') {
    return '#191a23'
  } else {
    return userStore.baseColor
  }
})

const totalCollapse = () => {
  isCollapse.value = !isCollapse.value
  isSider.value = !isCollapse.value
  isShadowBg.value = !isCollapse.value
  emitter.emit('collapse', isCollapse.value)
}

</script>
<style lang="scss">
@import '@/style/mobile.scss';

.dark {
  background-color: #191a23 !important;
  color: #fff !important;
}

.light {
  background-color: #fff !important;
  color: #000 !important;
}
</style>