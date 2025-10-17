<template>
  <div class="mt-6">
    <h2 class="text-2xl font-bold mb-4">代码生成</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium mb-2">题目描述</label>
        <textarea 
          v-model="problemDesc" 
          class="w-full h-40 p-3 border rounded-md"
          placeholder="输入题目要求..."
        ></textarea>
        <label class="block text-sm font-medium mt-3 mb-2">选择语言</label>
        <select v-model="language" class="w-full p-2 border rounded-md">
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium mb-2">生成代码</label>
        <textarea 
          v-model="generatedCode" 
          class="w-full h-64 p-3 border rounded-md bg-gray-50 font-mono text-sm"
          readonly
        ></textarea>
        <div class="mt-3 flex gap-2">
          <button @click="generateCode" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            生成代码
          </button>
          <button @click="copyCode" class="px-4 py-2 border rounded hover:bg-gray-100">
            复制代码
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

const problemDesc = ref('')
const language = ref('javascript')
const generatedCode = ref('')
const status = ref('就绪')

const generateCode = async () => {
  if (!problemDesc.value.trim()) {
    status.value = '请输入题目描述'
    return
  }
  
  status.value = '生成中...'
  try {
    const res = await axios.post('/api/generate-code', {
      problem: problemDesc.value,
      language: language.value
    })
    generatedCode.value = res.data.code
    status.value = '代码生成完成'
  } catch (err) {
    status.value = '生成失败：' + err.message
  }
}

const copyCode = () => {
  navigator.clipboard.writeText(generatedCode.value)
  status.value = '已复制到剪贴板'
}
</script>