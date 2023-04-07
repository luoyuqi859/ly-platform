<template>
    <div class="editor" ref="dom"></div>
</template>
  
<script setup lang="ts">
import { onMounted, defineProps, ref } from 'vue';
import * as monaco from 'monaco-editor';
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";


//@ts-ignore
self.MonacoEnvironment = {
  getWorker(_: any, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};


const props = defineProps({
    // route object
    modelValue: {
        type: String,
        default: '',
    },

});

const emit = defineEmits(['update:modelValue']);

const dom = ref();

let instance: any;

onMounted(() => {
    const jsonModel = monaco.editor.createModel(
        props.modelValue,
        'json',
        monaco.Uri.parse('json://grid/settings.json')
    );

    instance = monaco.editor.create(dom.value, {
        model: jsonModel,
        tabSize: 2,
        automaticLayout: true,
        scrollBeyondLastLine: false,
    });

    instance.onDidChangeModelContent(() => {
        const value = instance.getValue();
        emit('update:modelValue', value);
    });
});
</script>
  
<style scoped>
.editor {
    height: 100%;
}
</style>