import { createRouter, createWebHistory } from 'vue-router'
import Question from '@/pages/Question.vue'
import Cover from '@/pages/Cover.vue'
import Congrats from '@/pages/Congrats.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      // 如果要重定向，也需要先配置这个redirect的路径的Component
      path: '/',
      redirect: '/Cover'
    },
    {
      name: 'cover',
      path: '/Cover',
      component: Cover
    },
    {
      name: 'question',
      path: '/question',
      component: Question // 使用组件对象，而非字符串
    },
    {
      name: 'congrats',
      path: '/congrats',
      component: Congrats
    }
  ]
})

export default router
