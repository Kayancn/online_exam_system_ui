import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/manage',
    name: 'Manage',
    component: () => import('../views/Manage.vue'),
    redirect: "/manage/home",
    children: [
      { path: 'home', name: '主页', component: () => import('../views/Home.vue')},
      { path: 'student', name: '学生管理', component: () => import('../views/Student.vue')},
      { path: 'manager', name: '个人信息', component: () => import('../views/Manager.vue')}
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
