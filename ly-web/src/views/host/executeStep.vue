<template>
    <div class="app-container">
        <div>
            <el-steps :active="wizard.stepIndex">
                <el-step title="配置文件修改" @click="handleClickStep(1)"></el-step>
                <el-step title="用例执行" @click="handleClickStep(2)"></el-step>
            </el-steps>
            <div style="padding:20px 0">
                <viewConfig v-if="wizard.stepIndex === 1"></viewConfig>
                <pyAutoRun v-if="wizard.stepIndex === 2"></pyAutoRun>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import viewConfig from '@/views/host/viewConfig.vue';
import pyAutoRun from '@/views/host/pyAutoRun.vue';
import { useRoute } from 'vue-router';
import { hostStatusModify } from '@/api/host';

const wizard = ref({ stepIndex: 1 });
const route = useRoute();
const handleClickStep = (step: any) => {
    wizard.value.stepIndex = step

}
const ip = ref(route.query.ip);
const port = ref(route.query.port);
// onBeforeUnmount(async () => {
//     // Update host status to "在线" before unmounting
//     const data = {
//         ip: ip.value,
//         port: port.value,
//         status: '在线'
//     };
//     await hostStatusModify(data);
// });
</script>
<style lang="scss" scoped></style>