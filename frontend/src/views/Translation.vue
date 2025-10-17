<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <!-- 导航栏 -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a href="#" class="flex-shrink-0 flex items-center">
              <img class="h-8 w-8" src="https://picsum.photos/200/200" alt="Logo">
              <span class="ml-2 text-xl font-semibold text-gray-900">编程助手</span>
            </a>
            <nav class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" class="border-gray-300 text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">首页</a>
              <a href="#" class="border-blue-500 text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">翻译工具</a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">代码工具</a>
              <a href="#" class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">关于</a>
            </nav>
          </div>
          <div class="flex items-center">
            <button class="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span class="sr-only">查看通知</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-grow">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="text-center mb-8">
            <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">题目翻译工具</h1>
            <p class="mt-3 max-w-2xl mx-auto text-base text-gray-500 sm:text-lg md:mt-4">
              轻松将英文编程题目翻译成中文，帮助你更好地理解问题要求，专注于解决方案的实现
            </p>
          </div>

          <div class="bg-white shadow-xl rounded-lg overflow-hidden">
            <div class="p-6">
              <div class="grid md:grid-cols-2 gap-6">
                <!-- 输入区 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">英文题目</label>
                  <textarea 
                    v-model="inputText" 
                    class="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    placeholder="输入或粘贴英文题目..."
                  ></textarea>
                  <p class="mt-2 text-xs text-gray-500">
                    支持常见的编程竞赛题目格式，包括Markdown语法
                  </p>
                </div>
                
                <!-- 输出区 -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">中文翻译</label>
                  <textarea 
                    v-model="outputText" 
                    class="w-full h-64 p-3 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                    readonly
                  ></textarea>
                  <div class="mt-3 flex gap-2">
                    <button 
                      @click="handleTranslate" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                      翻译
                    </button>
                    <button 
                      @click="copyResult" 
                      class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                      复制
                    </button>
                  </div>
                </div>
              </div>
              <p class="mt-3 text-sm text-gray-600">{{ status }}</p>
            </div>
          </div>

          <!-- 功能特点 -->
          <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707-.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900">精准翻译</h3>
              <p class="mt-2 text-gray-600">专业针对编程术语和题目描述进行优化，确保翻译准确性。</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900">快速响应</h3>
              <p class="mt-2 text-gray-600">即时翻译，无需等待，让你专注于解题思路的构建。</p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900">格式保留</h3>
              <p class="mt-2 text-gray-600">保留原有的代码格式和结构，让翻译后的题目保持良好的可读性。</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center mb-4 md:mb-0">
            <img class="h-8 w-8" src="https://picsum.photos/200/200" alt="Logo">
            <span class="ml-2 text-lg font-semibold text-gray-900">编程助手</span>
          </div>
          <p class="text-sm text-gray-500">
            &copy; 2023 编程助手. 保留所有权利.
          </p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">GitHub</span>
              <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">帮助</span>
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
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
  
  // 显示复制成功的视觉反馈
  const originalText = status.value
  setTimeout(() => {
    status.value = originalText
  }, 2000)
}
</script>