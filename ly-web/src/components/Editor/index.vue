<template>
  <div ref="container" style="height: calc(100% - 2.5rem)" />
</template>
  
<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { createGlobalState, useDark, useDebounceFn, useResizeObserver, useStorage } from '@vueuse/core'
// Import monaco
// https://github.com/vitejs/vite/discussions/1791
import * as monaco from 'monaco-editor'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CSSWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HTMLWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'


enum StorageName {
  ACTIVE_TAB = 'active-tab',
  EDITOR_STATE = 'editor-state',
  EDITOR_VALUE = 'editor-value',
}

const useDarkGlobal = createGlobalState(() => useDark())

const initialEditorValue = {
  html: '<div id="app" class="min-h-screen bg-gray-300 dark:bg-gray-600 py-6 flex flex-col sm:py-12 space-y-4">\n    <div v-for="(post, index) in posts" :key="index" class="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">\n        <div class="flex items-center justify-between">\n            <span class="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>\n            <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">Design</a>\n        </div>\n\n        <div class="mt-2">\n            <a href="#" class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline text-capitalize" v-text="post.title"></a>\n            <p class="mt-2 text-gray-600 dark:text-gray-300" v-text="post.body"></p>\n        </div>\n        \n        <div class="flex items-center justify-between mt-4">\n            <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline">Read more</a>\n\n            <div class="flex items-center">\n                <img class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" :src="post.avatar" alt="avatar">\n                <a class="font-bold text-gray-700 cursor-pointer dark:text-gray-200" v-text="post.name"></a>\n            </div>\n        </div>\n    </div>\n</div>',
  javascript: 'import { setup as twindSetup } from \'https://cdn.skypack.dev/twind/shim\'\nimport { \n    createApp, \n    ref \n} from \'https://esm.sh/vue@3.2.37/dist/vue.esm-browser.js\'\nimport { faker } from \'https://cdn.skypack.dev/@faker-js/faker\'\n  \n\ntwindSetup({\n    darkMode: \'class\'\n})\n\nconst generateFakePosts = (count) => {\n    return [...Array(count).keys()].map(() => ({\n        name: faker.name.fullName(),\n        avatar: faker.image.avatar(),\n        cover: faker.image.image().replace(\'http\', \'https\'),\n        title: faker.lorem.words(5),\n        body: faker.lorem.sentences(5)\n    }))\n}\n\ncreateApp({\n  data() {\n    return {\n      posts: generateFakePosts(10)\n    }\n  }\n}).mount(\'#app\')',
  css: '',
}

const props = defineProps<{
  activeTab: string
}>()
const emit
  = defineEmits<(e: 'change', payload: typeof editorValue.value) => void>()

self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === 'json')
      return new JSONWorker()
    if (label === 'css' || label === 'scss' || label === 'less')
      return new CSSWorker()
    if (label === 'html' || label === 'handlebars' || label === 'razor')
      return new HTMLWorker()
    if (label === 'typescript' || label === 'javascript')
      return new TSWorker()
    return new EditorWorker()
  },
}
const container = ref<HTMLDivElement | null>(null)
let editor: monaco.editor.IStandaloneCodeEditor
const isDark = useDarkGlobal()
const { activeTab } = toRefs(props)
const editorState = useStorage<Record<string, any>>(
  StorageName.EDITOR_STATE,
  {},
)
const editorValue = useStorage<Record<string, any>>(
  StorageName.EDITOR_VALUE,
  initialEditorValue,
)
onMounted(() => {
  editor = monaco.editor.create(container.value!, {
    language: activeTab.value,
    theme: isDark.value ? 'vs-dark' : 'vs',
  })
  emit('change', editorValue.value)
  editor.onDidChangeModelContent(
    useDebounceFn(() => {
      if (editorValue.value[activeTab.value] !== editor.getValue()!) {
        editorValue.value[activeTab.value] = editor.getValue()!
        emit('change', editorValue.value)
      }
    }, 500),
  )
  // Set values from storage on load
  if (editorValue.value[activeTab.value]) {
    editor.setValue(editorValue.value[activeTab.value])
    editor.restoreViewState(editorState.value[activeTab.value])
  }
})
watch(activeTab, (currentTab, prevTab) => {
  monaco.editor.setModelLanguage(editor.getModel()!, currentTab)
  editorState.value[prevTab] = editor.saveViewState()
  if (editorValue.value[currentTab])
    editor.setValue(editorValue.value[currentTab])
  else
    editor.setValue('')
  if (editorState.value[currentTab]) {
    editor.restoreViewState(editorState.value[currentTab]!)
    editor.focus()
  }
})
watch(isDark, (value) => {
  editor.updateOptions({
    theme: value ? 'vs-dark' : 'vs',
  })
})
const editorObserver = useResizeObserver(container, () => {
  editor.layout()
})
onUnmounted(() => {
  editor?.dispose()
  editorObserver.stop()
})
</script>
  
<style scoped>
.editor {
  height: 100%;
}
</style>