<template>
  <div class="mt-6">
    <h2 class="text-2xl font-bold mb-4">题解生成</h2>
    <div class="grid md:grid-cols-2 gap-6">
      <!-- 输入区：题目描述 -->
      <div>
        <label class="block text-sm font-medium mb-2">题目描述</label>
        <textarea 
          v-model="problemDesc" 
          class="w-full h-64 p-3 border rounded-md"
          placeholder="输入完整题目描述（如：给定一个数组，求所有元素的和）..."
        ></textarea>
        <label class="block text-sm font-medium mt-3 mb-2">题解类型</label>
        <select v-model="solutionType" class="w-full p-2 border rounded-md">
          <option value="detailed">详细步骤（适合初学者）</option>
          <option value="concise">简洁思路（适合进阶）</option>
          <option value="optimized">优化方案（多解法对比）</option>
        </select>
      </div>
      
      <!-- 输出区：生成的题解 -->
      <div>
        <label class="block text-sm font-medium mb-2">生成的题解</label>
        <div class="w-full h-64 p-3 border rounded-md bg-gray-50 overflow-auto">
          <div v-if="!solutionContent" class="text-gray-400">点击"生成题解"按钮获取结果...</div>
          <div v-else class="whitespace-pre-line text-gray-800">
            {{ solutionContent }}
          </div>
        </div>
        <div class="mt-3 flex gap-2">
          <button @click="generateSolution" class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            生成题解
          </button>
          <button @click="copySolution" :disabled="!solutionContent" class="px-4 py-2 border rounded hover:bg-gray-100" :class="!solutionContent ? 'opacity-50 cursor-not-allowed' : ''">
            复制题解
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
const problemDesc = ref('')
const solutionType = ref('detailed')
const solutionContent = ref('')
const status = ref('就绪：请输入题目描述并选择题解类型')

// 生成题解（调用后端接口）
const generateSolution = async () => {
  if (!problemDesc.value.trim()) {
    status.value = '错误：请输入完整的题目描述'
    return
  }

  status.value = '生成中...（题解生成需要10-20秒，请耐心等待）'
  try {
    const res = await axios.post('/api/generate-solution', {
      problem: problemDesc.value,
      type: solutionType.value
    })
    solutionContent.value = res.data.solution
    status.value = '题解生成完成'
  } catch (err) {
    status.value = '生成失败：' + (err.response?.data?.error || err.message)
  }
}

// 复制题解
const copySolution = () => {
  navigator.clipboard.writeText(solutionContent.value)
  status.value = '题解已复制到剪贴板'
}
</script>