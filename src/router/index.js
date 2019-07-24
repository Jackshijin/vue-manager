import Vue from 'vue'
import Router from 'vue-router'
import Login from './../components/login/Login'
import Home from './../components/home/Home'
import User from './../components/users/User'
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
      component: Home,
      children: [{
        name: 'users',
        path: 'users',
        component: User
      }]
    }
  ]
})
