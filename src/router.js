import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Quiz from '@/views/quiz/Quiz'
import QuizList from '@/views/quiz/QuizList'
import UserProfile from '@/views/user/UserProfile'
import NProgress from 'nprogress'

Vue.use(Router)

NProgress.configure({ parent: '.v-main__wrap' })

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { transition: 'zoom', layout: 'FullWidth' }
    },
    {
      path: '/quiz/create',
      name: 'QuizCreate',
      component: () => import('@/views/quiz/QuizCreation'),
      meta: { layout: 'Large' }
    },
    {
      path: '/quiz/:quizId',
      name: 'Quiz',
      props: true,
      component: Quiz,
      meta: { layout: 'Large' }
    },
    {
      path: '/quiz/list/:pageNumber',
      name: 'QuizList',
      props: true,
      component: QuizList,
      meta: { layout: 'FullWidth' }
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: () => import('@/views/user/LoginForm'),
      meta: { transition: 'fade-in-down' }
    },
    {
      path: '/register',
      name: 'RegistrationForm',
      component: () => import('@/views/user/RegistrationForm'),
      meta: { transition: 'fade-in-up' }
    },
    {
      path: '/confirm/:id/:verificationToken',
      name: 'EmailConfirmation',
      props: true,
      component: () => import('@/views/user/EmailConfirmation')
    },
    {
      path: '/passwordRecovery',
      name: 'PasswordRecovery',
      component: () => import('@/views/user/PasswordRecovery'),
      meta: { transition: 'fade-in-up' }
    },
    {
      path: '/resetPassword/:id/:token',
      name: 'PasswordReset',
      props: true,
      component: () => import('@/views/user/PasswordReset')
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/NotFound')
    }
  ]
})

router.beforeResolve((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
