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
      { path: 'manager', name: '个人信息', component: () => import('../views/Manager.vue')},
      { path: 'home', name: '主页', component: () => import('../views/Home.vue')},
      { path: 'exam', name: '考试管理', component: () => import('../views/Exam.vue')},
      { path: 'course', name: '课程管理', component: () => import('../views/Course.vue')},
      { path: 'paper', name: '试卷管理', component: () => import('../views/Paper.vue')},
      { path: 'question', name: '题目管理', component: () => import('../views/Question.vue')},
      { path: 'student', name: '学生管理', component: () => import('../views/Student.vue')},
    ]
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
