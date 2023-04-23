<template>
    <div class="app-container">
        <div v-if="isLoaded">
            <minicap :ip="ip" :port="port" :serial="serial" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { getHostByUserId } from '@/api/host';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import minicap from '@/components/Minicap/index.vue'




const route = useRoute()

const owner = ref(route.query.owner)
const serial: any = ref("")

const isLoaded = ref(false);
const ip = ref("")
const port = ref("")



const getOwnHost = async () => {
    const id = parseInt(owner.value as string, 10);
    const res = await getHostByUserId({ ID: id });
    console.log(res)
    ip.value = res.data.hostInfo.ip;
    port.value = res.data.hostInfo.port;
    serial.value = route.query.serial
    isLoaded.value = true;

}

getOwnHost()



</script>
<style lang="scss" scoped></style>