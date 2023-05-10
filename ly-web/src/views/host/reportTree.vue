

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios';

import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';

const treeData: any = ref([])
const route = useRoute();
const ip = ref(route.query.ip);
const port = ref(route.query.port);

interface FileItem {
    path: string;
    name: string;
    is_dir: boolean;
    size: number;
    create_time: string;
    children?: FileItem[];
}

interface TreeNode {
    id: string;
    label: string;
    isLeaf: boolean;
    children?: TreeNode[];
}


const getReport = async () => {
    const runUrl = `http://${ip.value}:${port.value}/repo/report`;
    const resp = await axios.get(runUrl)
    const items = resp.data.items

    for (const item of items) {
        const treeNode: TreeNode = createTreeNode(item)
        treeData.value.push(treeNode)
    }
}

const createTreeNode = (item: FileItem, level: number = 0): TreeNode => {
    const treeNode: TreeNode = {
        id: item.path,
        label: item.name,
        isLeaf: !item.is_dir
    }
    if (level < 1 && item.children) {  // 只遍历两个层级
        treeNode.children = []
        for (const child of item.children) {
            const childNode: TreeNode = createTreeNode(child, level + 1)
            treeNode.children.push(childNode)
        }
    }
    return treeNode
}


const handleNodeClick = async (node: TreeNode) => {

    const runUrl = `http://${ip.value}:${port.value}/repo/report/display`;
    try {
        const res = await axios.post(runUrl, { path: node.id })
        if (res.data.message.includes('报告已生成')) {
            ElMessage.success(res.data.message);
        } else {
            ElMessage.warning(res.data.message);
        }
    } catch (error) {
        ElMessage.error("打开报告失败");
    }


};


getReport()
</script>

<template>
    <div class="app-container">
        <section class="usage">
            <h2 class="usage-title">使用说明</h2>
            <p class="usage-content">
                手动点击上方数字阶段<br />
                根据时间选取对应的 allure 报告，可自动打开浏览器。如果自动打开失败，按照提示手动输入 IP 和端口号。
            </p>
        </section>
        <el-card class="report-tree">
            <h3 class="tree-title">测试报告</h3>
            <el-tree class="tree" :data="treeData" @node-click="handleNodeClick"></el-tree>
        </el-card>
    </div>
</template>
  
<style lang="scss" scoped>
.usage {
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-bottom: 30px;
}

.usage-title {
    font-size: 24px;
    margin-bottom: 10px;
}

.usage-content {
    font-size: 16px;
    line-height: 1.6;
}

.report-tree {
    border-radius: 8px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
    padding: 20px;
}

.tree-title {
    font-size: 20px;
    margin-bottom: 20px;
}

.tree {
    height: 500px;
    overflow-y: scroll;
}
</style>