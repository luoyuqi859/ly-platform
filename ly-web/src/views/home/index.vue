<template>
    <div class="app-container">
        <el-card class="index-card">
            <el-row :gutter="10" class="panel-group">
                <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                    <div class="card-panel">
                        <div class="card-panel-icon-wrapper icon-people">
                            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                        </div>
                        <div class="card-panel-description">
                            <div class="card-panel-text">
                                用户数量
                            </div>
                            <div class="card-panel-text">
                                {{ item.user }}
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                    <div class="card-panel">
                        <div class="card-panel-icon-wrapper icon-case">
                            <svg-icon icon-class="monitor" class-name="card-panel-icon" />
                        </div>
                        <div class="card-panel-description">
                            <div class="card-panel-text">
                                主机数量
                            </div>
                            <div class="card-panel-text">
                                {{ item.host }}
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :xs="12" :sm="12" :lg="8" class="card-panel-col">
                    <div class="card-panel">
                        <div class="card-panel-icon-wrapper icon-project">
                            <svg-icon icon-class="phone" class-name="card-panel-icon" />
                        </div>
                        <div class="card-panel-description">
                            <div class="card-panel-text">
                                设备数量
                            </div>
                            <div class="card-panel-text">
                                {{ item.device }}
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :sm="24" :lg="12" style="padding-left: 20px">
                    <h2>PyAuto测试平台</h2>
                    <p>
                        一款移动端自动化测试平台,本项目分为平台端和引擎端，采用分布式执行设计，可以将测试执行的节点(即引擎)注册在任意环境的任意一台机器上，从而突破资源及网络限制。同时，通过将引擎启动在本地PC上，方便用户快速调试测试用例，实时查看执行过程，带来传统脚本编写一致的便捷
                    </p>
                    <p>
                        <b>当前版本:</b> <span>v{{ version }}</span>
                    </p>
                    <p>
                        <el-button type="primary" icon="Cloudy" plain
                            @click="goTarget('https://github.com/luoyuqi859/ly-platform')">平台端代码</el-button>
                        <el-button icon="HomeFilled" plain
                            @click="goTarget('https://github.com/luoyuqi859/pyauto')">引擎端代码</el-button>
                    </p>
                </el-col>

                <el-col :sm="24" :lg="12" style="padding-left: 50px">
                    <el-row>
                        <el-col :span="12">
                            <h2>测试平台技术选型</h2>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <h4>平台端技术</h4>
                            <ul>
                                <li>gin</li>
                                <li>gorm</li>
                                <li>jwt-go</li>
                                <li>go-redis</li>
                                <li>viper</li>
                                <li>zap</li>
                                <li>mysql</li>
                                <li>...</li>
                                <li>vue3</li>
                                <li>vue-router</li>
                                <li>pinia</li>
                                <li>element-plus</li>
                                <li>axios</li>
                                <li>vite</li>
                                <li>monaco-editor</li>
                            </ul>
                        </el-col>
                        <el-col :span="6">
                            <h4>引擎端技术</h4>
                            <ul>
                                <li>fastapi</li>
                                <li>pytest</li>
                                <li>uiautomator2</li>
                                <li>allure</li>
                                <li>xlwings</li>
                                <li>asyncio</li>
                                <li>...</li>
                            </ul>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8">
                </el-col>
            </el-row>
        </el-card>

    </div>
</template>

<script setup name="Index" lang="ts">
import { getDeviceList } from '@/api/device';
import { getHostList } from '@/api/host';
import { getUserList } from '@/api/user';
import { reactive, ref } from 'vue';

const version = ref('1.0.0');

const item = reactive({
    user: 100,
    host: 100,
    device: 100,
})

const queryParams = ref({
    Page: 1,
    PageSize: 10,
})

function goTarget(url: string) {
    window.open(url, '__blank');
}
const getUsers = async () => {
    const res = await getUserList(queryParams.value);
    item.user = res.data.total
}
const getHosts = async () => {
    const res = await getHostList(queryParams.value);
    item.host = res.data.total;

};
const getDevices = async () => {
    const res = await getDeviceList(queryParams.value);
    item.device = res.data.total;

};

getUsers()
getHosts()
getDevices()

</script>

<style scoped lang="scss">
.panel-group {
    margin-top: 18px;

    .card-panel-col {
        margin-bottom: 32px;
    }

    .card-panel {
        height: 90px;
        cursor: pointer;
        font-size: 14px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);

        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }

            .icon-people {
                background: #40c9c6;
            }

            .icon-case {
                background: #36a3f7;
            }

            .icon-project {
                background: #265DF6;
            }

            .icon-success {
                background: #34bfa3
            }

            .icon-group {
                background: #34bfa3
            }

            .icon-call {
                background: #8abf34
            }

            .icon-group {
                background: #bf34bd
            }
        }

        .icon-people {
            color: #40c9c6;
        }

        .icon-case {
            color: #36a3f7;
        }

        .icon-project {
            color: #265DF6;
        }

        .icon-success {
            color: #34bfa3
        }

        .icon-group {
            background: #fff
        }

        .icon-call {
            background: #fff
        }

        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 14px 14px 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-icon {
            float: left;
            font-size: 30px;
        }

        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px 26px 26px 0px;

            .card-panel-text {
                line-height: 18px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 16px;
                margin-bottom: 12px;
            }

            .card-panel-num {
                font-size: 20px;
            }
        }
    }

    .chart-wrapper {
        background: #fff;
        //padding: 16px 16px 0;
        margin-bottom: 32px;
        //box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        //border-color: rgba(0, 0, 0, .05);
    }
}

.index-card {
    border-radius: 10px;
}

@media (max-width:550px) {
    .card-panel-description {
        display: none;
    }

    .card-panel-icon-wrapper {
        float: none !important;
        width: 100%;
        height: 100%;
        margin: 0 !important;

        .svg-icon {
            display: block;
            margin: 14px auto !important;
            float: none !important;
        }
    }
}
</style>
