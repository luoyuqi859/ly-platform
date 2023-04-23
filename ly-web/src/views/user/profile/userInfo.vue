<!-- eslint-disable vue/no-mutating-props -->
<template>
    <el-form ref="userRef" :model="user" :rules="rules" label-width="80px">
        <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="user.nickName" maxlength="30" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
            <el-input v-model="user.phone" maxlength="11" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="user.email" maxlength="50" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">保存</el-button>
            <el-button type="danger" @click="close">关闭</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { setUserInfo } from '@/api/user';
import { ElMessage } from 'element-plus';
import { getCurrentInstance, ref } from 'vue';

const props = defineProps({
    user: {
        type: Object as () => any,
    },
});

const { proxy } = getCurrentInstance() as any;

const rules = ref({
    nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
    email: [
        { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
    ],
    phonenumber: [
        { required: true, message: '手机号码不能为空', trigger: 'blur' },
        { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' },
    ],
});

/** 提交按钮 */
function submit() {
    (proxy?.$refs.userRef as any).validate((valid: any) => {
        if (valid) {
            setUserInfo(props.user).then((response: any) => {
                ElMessage.success('修改成功');
            });
        }
    });
}
/** 关闭按钮 */
function close() {
    proxy!.$tab.closePage();
}
</script>