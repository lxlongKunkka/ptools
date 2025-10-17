<template>
  <div class="mt-8 text-center">
    <h2 class="text-3xl font-bold mb-8">欢迎使用编程题目工具集</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
      <!-- 翻译工具卡片 -->
      <router-link to="/translation" class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-blue-600 text-xl">🌐</span>
        </div>
        <h3 class="text-xl font-semibold mb-2">题目翻译</h3>
        <p class="text-gray-600">将英文题目翻译成中文</p>
      </router-link>

      <!-- 代码生成卡片 -->
      <router-link to="/code-generate" class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-green-600 text-xl">💻</span>
        </div>
        <h3 class="text-xl font-semibold mb-2">代码生成</h3>
        <p class="text-gray-600">根据题目生成对应代码</p>
      </router-link>

      <!-- 题解生成卡片 -->
      <router-link to="/solution-generate" class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-purple-600 text-xl">📝</span>
        </div>
        <h3 class="text-xl font-semibold mb-2">题解生成</h3>
        <p class="text-gray-600">生成题目详细解题步骤</p>
      </router-link>

      <!-- 代码查错卡片 -->
      <router-link to="/error-check" class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span class="text-orange-600 text-xl">🔍</span>
        </div>
        <h3 class="text-xl font-semibold mb-2">代码查错</h3>
        <p class="text-gray-600">检查代码中的错误并修复</p>
      </router-link>
    </div>
  </div>
</template>