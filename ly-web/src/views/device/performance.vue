<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="4" :xs="24">
                <el-card class="phone-card">
                    <div v-if="isLoaded">
                        <minicap :ip="ip" :port="port" :serial="serial" />
                    </div>
                    <!-- <img v-if="phone" :src="phone" class="phone-img" /> -->
                    <div>
                        <div class="phone-name">{{ brand }} {{ serial }}</div>
                        <div class="phone-info">
                            <span>Platform: {{ platform }}</span>
                        </div>

                    </div>

                </el-card>

            </el-col>
            <!--用户数据-->
            <el-col :span="20" :xs="24">
                <div :id="typeItem" :key="typeItem" class="chartitem" style=" width: 100%;height: 18.75rem;"
                    v-for="typeItem in monitorTypes">
                    <el-card>
                        typeItem
                    </el-card>
                </div>

                <!-- <el-row :gutter="10" class="mb8">
                    <el-col :span="1.5">

                    </el-col>
                    <el-col :span="1.5">
                        XXX
                    </el-col>
                    <el-col :span="1.5">
                        XXX
                    </el-col>
                    <el-col :span="1.5">
                        XXX
                    </el-col>
                    <el-col :span="1.5">
                        XXX
                    </el-col>
                </el-row> -->
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { getHostByHostID, getHostByUserId } from '@/api/host';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import phone from '@/assets/images/phone.png';
import minicap from '@/components/Minicap/index.vue'


const route = useRoute()

const owner = ref(route.query.owner)
const brand = ref(route.query.brand)
const platform = ref(route.query.platform)
const hostid = ref(route.query.host)

const monitorTypes = ref(["cpu", "memory", "fps", "gpu", "devicebatterylevel", "devicebatterytemperature"],)

const isLoaded = ref(false);
const ip = ref("")
const port = ref("")
const serial: any = ref("")



const getOwnHost = async() => {
    const id = parseInt(hostid.value as string, 10);
    const res = await getHostByHostID({ host: id })
    console.log("xx",res)
    ip.value = res.data.hostInfo.ip
    port.value = res.data.hostInfo.port
    serial.value = route.query.serial
    isLoaded.value = true;

}

getOwnHost()

</script>
<style lang="scss" scoped>
.phone-card {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.phone-img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    border-radius: 5px;
}

.phone-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
}

.phone-info {
    font-size: 14px;
    color: #666;
}
</style>