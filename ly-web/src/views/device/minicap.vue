<template>
    <div class="app-container">
        {{ ip }}:{{ port }}
    </div>
</template>

<script setup lang="ts">
import { getHostByUserId } from '@/api/host';
import { ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const owner = ref(route.query.owner)


const ip = ref("")
const port = ref("")



const getOwnHost = () => {
    const id = parseInt(owner.value as string, 10);
    getHostByUserId({ ID: id }).then((res: any) => {
        ip.value = res.data.hostInfo.ip
        port.value = res.data.hostInfo.port
    })

}

getOwnHost()

</script>
<style lang="scss" scoped></style>