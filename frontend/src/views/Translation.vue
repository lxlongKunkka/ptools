<template>
  <div class="mt-6">
    <h2 class="text-2xl font-bold mb-4">题目翻译</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <!-- 输入区 -->
      <div>
        <label class="block text-sm font-medium mb-2">英文题目</label>
        <textarea 
          v-model="inputText" 
          class="w-full h-64 p-3 border rounded-md"
          placeholder="输入或粘贴英文题目..."
        ></textarea>
      </div>
      
      <!-- 输出区 -->
      <div>
        <label class="block text-sm font-medium mb-2">中文翻译</label>
        <textarea 
          v-model="outputText" 
          class="w-full h-64 p-3 border rounded-md bg-gray-50"
          readonly
        ></textarea>
        <div class="mt-3 flex gap-2">
          <button @click="handleTranslate" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            翻译
          </button>
          <button @click="copyResult" class="px-4 py-2 border rounded hover:bg-gray-100">
            复制
          </button>
        </div>
      </div>
    </div>
    <p class="mt-3 text-sm text-gray-600">{{ status }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const inputText = ref('')
const outputText = ref('')
const status = ref('就绪')

// 调用后端翻译接口
const handleTranslate = async () => {
  if (!inputText.value.trim()) {
    status.value = '请输入内容'
    return
  }
  
  status.value = '翻译中...'
  try {
    // 注意：这里的API地址在Codespace中需要使用相对路径
    const res = await axios.post('/api/translate', {
      text: inputText.value
    })
    outputText.value = res.data.result
    status.value = '翻译完成'
  } catch (err) {
    status.value = '翻译失败：' + err.message
  }
}

// 复制结果
const copyResult = () => {
  navigator.clipboard.writeText(outputText.value)
  status.value = '已复制到剪贴板'
}
</script>