import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NotFound from '@/components/error-pages/NotFound'
import Quiz from '@/components/quiz/Quiz.component'
import QuizList from '@/components/quiz/QuizList.component'
import QuizCreate from '@/components/quiz/QuizCreate.component'
import UserLogin from '@/components/user/UserLogin.component'
import UserRegistration from '@/components/user/UserRegistration.component'
import UserProfile from '@/components/user/UserProfile.component'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: 'register',
      name: 'UserRegistration',
      component: UserRegistration
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
