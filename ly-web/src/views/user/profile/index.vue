<template>
    <div class="app-container">
        <el-row :gutter="20">
            <el-col :span="6" :xs="24">
                <el-card class="box-card">
                    <template #header>
                        <div class="clearfix">
                            <span>个人信息</span>
                        </div>
                    </template>
                    <div>
                        <div class="text-center">
                            <userAvatar :user="state.user" />
                        </div>
                        <ul class="list-group list-group-striped">
                            <li class="list-group-item">
                                <svg-icon icon-class="user" />用户昵称
                                <div class="pull-right">{{ state.user.nickName }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon icon-class="phone" />手机号码
                                <div class="pull-right">{{ state.user.phone }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon icon-class="email" />用户邮箱
                                <div class="pull-right">{{ state.user.email }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon icon-class="peoples" />所属角色
                                <div class="pull-right">{{ state.user.authorityId }}</div>
                            </li>
                            <li class="list-group-item">
                                <svg-icon icon-class="date" />创建日期
                                <div class="pull-right">{{ state.user.CreatedAt }}</div>
                            </li>
                        </ul>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="18" :xs="24">
                <el-card>
                    <template #header>
                        <div class="clearfix">
                            <span>个人管理</span>
                        </div>
                    </template>
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="基本资料" name="userinfo">
                            <userInfo :user="state.user" />
                        </el-tab-pane>
                        <el-tab-pane label="修改密码" name="resetPwd">
                            <resetPwd />
                        </el-tab-pane>
                        <el-tab-pane label="主机权限管理" name="host">
                            <hostManager />
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup name="Profile" lang="ts">


import { ref, reactive } from 'vue';
import { getUserInfo } from '@/api/user';
import resetPwd from './resetPwd.vue';
import userInfo from './userInfo.vue';
import userAvatar from './userAvatar.vue';
import hostManager from './hostManager.vue';


const activeTab = ref('userinfo');
const state = reactive<{
    user: any;
}>({
    user: {},
});

function getUser() {
    getUserInfo().then((response: any) => {
        state.user = response.data.userInfo;
    });
}

getUser();
</script>
