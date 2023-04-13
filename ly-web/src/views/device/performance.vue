<template>
    <div class="app-container">
        <el-row :gutter="20">
            <!--部门数据-->
            <el-col :span="4" :xs="24">
                <el-card class="container">
                    <div class="card-title">
                        配置文件
                        <div class="button-group">
                            XXX
                        </div>
                    </div> <!-- 添加标题 -->
                    <div class="editor-container">
                        XXX
                    </div>
                </el-card>

            </el-col>
            <!--用户数据-->
            <el-col :span="20" :xs="24">
                <el-row :gutter="10" class="mb8">
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
                    <el-col :span="1.5">
                        XXX
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
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
<style lang="scss" scoped>
</style>