<template>
  <div class="min-h-screen flex flex-col">
    <!-- 导航栏 -->
    <nav class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">编程题目工具集</h1>
        <div class="space-x-4">
          <router-link to="/" class="hover:opacity-80">首页</router-link>
          <router-link to="/translation" class="hover:opacity-80">题目翻译</router-link>
          <router-link to="/code-generate" class="hover:opacity-80">代码生成</router-link>
          <router-link to="/solution-generate" class="hover:opacity-80">题解生成</router-link>
          <router-link to="/error-check" class="hover:opacity-80">代码查错</router-link>
        </div>
      </div>
    </nav>

    <!-- 主内容区 -->
    <main class="flex-grow container mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>