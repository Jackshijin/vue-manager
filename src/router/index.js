import Vue from 'vue'
import Router from 'vue-router'
import Login from './../components/login/Login'
import Home from './../components/home/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home
    }
  ]
})
