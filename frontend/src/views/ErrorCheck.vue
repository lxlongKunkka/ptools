<template>
  <div class="mt-6">
    <h2 class="text-2xl font-bold mb-4">代码查错</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <!-- 输入区：待查错的代码 -->
      <div>
        <label class="block text-sm font-medium mb-2">选择语言</label>
        <select v-model="language" class="w-full p-2 border rounded-md mb-3">
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>
        
        <label class="block text-sm font-medium mb-2">输入待查错的代码</label>
        <textarea 
          v-model="codeContent" 
          class="w-full h-64 p-3 border rounded-md font-mono text-sm"
          placeholder="粘贴有问题的代码（如：function add(a, b) { return a + b }）..."
        ></textarea>
      </div>
      
      <!-- 输出区：查错结果 -->
      <div>
        <label class="block text-sm font-medium mb-2">查错结果</label>
        <div class="w-full h-64 p-3 border rounded-md bg-gray-50 overflow-auto">
          <div v-if="!errorResult" class="text-gray-400">点击"开始查错"按钮检测代码问题...</div>
          <div v-else>
            <!-- 错误提示 -->
            <div v-for="(error, index) in errorResult.errors" :key="index" class="mb-3 text-red-600">
              <span class="font-medium">问题 {{ index + 1 }}：</span> {{ error.message }}
            </div>
            <!-- 修正建议 -->
            <div v-if="errorResult.correctedCode" class="mt-4">
              <span class="font-medium text-green-600">修正后代码：</span>
              <pre class="mt-2 p-2 bg-gray-100 rounded-md font-mono text-sm">{{ errorResult.correctedCode }}</pre>
            </div>
          </div>
        </div>
        <div class="mt-3 flex gap-2">
          <button @click="checkError" class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
            开始查错
          </button>
          <button @click="copyCorrectedCode" :disabled="!errorResult?.correctedCode" class="px-4 py-2 border rounded hover:bg-gray-100" :class="!errorResult?.correctedCode ? 'opacity-50 cursor-not-allowed' : ''">
            复制修正代码
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

// 定义变量
const language = ref('javascript')
const codeContent = ref('')
const errorResult = ref(null) // 存储查错结果
const status = ref('就绪：请粘贴代码并选择对应语言')

// 代码查错（调用后端接口）
const checkError = async () => {
  if (!codeContent.value.trim()) {
    status.value = '错误：请输入待查错的代码'
    return
  }

  status.value = '查错中...'
  try {
    const res = await axios.post('/api/check-error', {
      code: codeContent.value,
      language: language.value
    })
    errorResult.value = res.data
    status.value = `查错完成：共发现 ${res.data.errors.length} 个问题`
  } catch (err) {
    status.value = '查错失败：' + (err.response?.data?.error || err.message)
    errorResult.value = null
  }
}

// 复制修正后的代码
const copyCorrectedCode = () => {
  navigator.clipboard.writeText(errorResult.value.correctedCode)
  status.value = '修正代码已复制到剪贴板'
}
</script>