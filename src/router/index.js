import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import { ElMessage, formItemValidateStates } from "element-plus";

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// const router = new VueRouter()
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
