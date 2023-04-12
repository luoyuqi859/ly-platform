<template>
    <div class="container">

    </div>
  </template>


<script setup lang="ts">
import { ref } from 'vue';
import JsonEditor from '@/components/Editor/index.vue';

const code = ref('');
</script>


<style scoped>


.container {
  position: fixed;
  height: 100%;
  width: 100%;
}
</style>
