import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import NotFound from '@/views/NotFound'
import Quiz from '@/views/quiz/Quiz'
import QuizList from '@/views/quiz/QuizList'
import QuizCreation from '@/views/quiz/QuizCreation'
import LoginForm from '@/views/user/LoginForm'
import RegistrationForm from '@/views/user/RegistrationForm'
import UserProfile from '@/views/user/UserProfile'
import EmailConfirmation from '@/views/user/EmailConfirmation'
import PasswordReset from '@/views/user/PasswordReset'
import PasswordRecovery from '@/views/user/PasswordRecovery'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { transition: 'zoom', layout: 'None' }
    },
    {
      path: '/quiz/list/:pageNumber',
      name: 'QuizList',
      component: QuizList
    },
    {
      path: '/quiz/create',
      name: 'QuizCreate',
      component: QuizCreation,
      meta: { layout: 'Large' }
    },
    {
      path: '/quiz/:quizId',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
      meta: { transition: 'fade-in-down' }
    },
    {
      path: '/register',
      name: 'RegistrationForm',
      component: RegistrationForm,
      meta: { transition: 'fade-in-up' }
    },
    {
      path: '/confirm/:id/:token',
      name: 'EmailConfirmation',
      component: EmailConfirmation
    },
    {
      path: '/passwordRecovery',
      name: 'PasswordRecovery',
      component: PasswordRecovery,
      meta: { transition: 'fade-in-up' }
    },
    {
      path: '/resetPassword/:id/:token',
      name: 'PasswordReset',
      component: PasswordReset
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
