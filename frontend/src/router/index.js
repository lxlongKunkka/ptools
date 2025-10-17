import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Translation from '../views/Translation.vue'
import CodeGenerate from '../views/CodeGenerate.vue'
import SolutionGenerate from '../views/SolutionGenerate.vue'
import ErrorCheck from '../views/ErrorCheck.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/translation', component: Translation },
    { path: '/code-generate', component: CodeGenerate },
    { path: '/solution-generate', component: SolutionGenerate },
    { path: '/error-check', component: ErrorCheck }
  ]
})

export default router