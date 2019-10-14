import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NotFound from '@/views/NotFound'
import Quiz from '@/components/quiz/Quiz'
import QuizList from '@/components/quiz/QuizList'
import QuizCreate from '@/components/quiz/QuizCreate'
import LoginForm from '@/components/user/LoginForm'
import RegistrationForm from '@/components/user/RegistrationForm'
import UserProfile from '@/components/user/UserProfile'
import ConfirmEmail from '@/components/user/ConfirmEmail'
import ResetPassword from '@/components/user/ResetPassword'
import PasswordRecovery from '@/components/user/PasswordRecovery'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { transition: 'zoom' }
    },
    {
      path: '/quiz/list/:pageNumber',
      name: 'QuizList',
      component: QuizList
    },
    {
      path: '/quiz/:quizId',
      name: 'Quiz',
      component: Quiz
    },
    {
      path: '/quiz/create',
      name: 'QuizCreate',
      component: QuizCreate
    },
    {
      path: 'login',
      name: 'LoginForm',
      component: LoginForm,
      meta: { transition: 'fade-in-down' }
    },
    {
      path: 'register',
      name: 'RegistrationForm',
      component: RegistrationForm,
      meta: { transition: 'fade-in-up' }
    },
    {
      path: '/confirm/:id/:token',
      name: 'ConfirmEmail',
      component: ConfirmEmail
    },
    {
      path: '/passwordRecovery',
      name: 'PasswordRecovery',
      component: PasswordRecovery,
      meta: { transition: 'fade-in-up' }
    },
    {
      path: '/resetPassword/:id/:token',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: 'profile',
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
