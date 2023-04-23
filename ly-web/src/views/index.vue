<template>
    <div class="app-container">
        <div class="process">
            <h1>测试平台使用教程</h1>
            <ul>
                <li v-for="(step, index) in steps" :key="index" :class="{ 'active': activeStep === index }">
                    <span @click="goToStep(index)">{{ step.title }}</span>
                    <!-- <button @click="goToStep(index)">Go</button> -->
                </li>
            </ul>

            <div class="step-content">
                <h2>{{ currentStep.title }}</h2>
                <p>{{ currentStep.description }}</p>
                <a :href="currentStep.linkUrl" class="btn">{{ currentStep.linkText }}</a>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';


interface Step {
    title: string;
    description: string;
    linkUrl: string;
    linkText: string;
}
const steps = ref<Step[]>([
    {
        title: '第一步',
        description: '这是第一步的详细说明。',
        linkUrl: '#',
        linkText: '了解更多',
    },
    {
        title: '第二步',
        description: '这是第二步的详细说明。',
        linkUrl: '#',
        linkText: '了解更多',
    },
    // 可以添加更多的步骤...
]);
const activeStep = ref(0);

const currentStep = computed(() => {
    return steps.value[activeStep.value];
});
const goToStep = (index: number) => {
    activeStep.value = index;
}
</script>
<style scoped>
.process {
    font-family: Arial, sans-serif;
    text-align: center;
}

.process h1 {
    margin-bottom: 30px;
}

.process ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.process li {
    display: inline-block;
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    background-color: #f9f9f9;
    margin-right: 20px;
}

.process li:last-child {
    margin-right: 0;
}

.process li.active {
    background-color: #4caf50;
    color: white;
}

.process .step-content {
    border: 1px solid #ccc;
    padding: 40px;
    margin-top: 50px;
    position: relative;
    border-radius: 10px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
}

.process .step-content h2 {
    margin-bottom: 20px;
}

.process .step-content p {
    margin-bottom: 30px;
}

.process .step-content img {
    max-width: 100%;
    margin-bottom: 30px;
}

.process .step-content .btn {
    display: block;
    width: 200px;
    background-color: #4caf50;
    color: white;
    text-align: center;
    padding: 10px 30px;
    border-radius: 5px;
    text-decoration: none;
    margin: 0 auto;
}
</style>