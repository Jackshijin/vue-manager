import Vue from 'vue'
import Router from 'vue-router'
import Login from './../components/login/Login'
import Home from './../components/home/Home'
import User from './../components/users/User'
import Rights from './../components/rights/Rights'
import Role from './../components/rights/Role'
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
      children: [
        {
          name: 'users',
          path: 'users',
          component: User
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'role',
          path: '/role',
          component: Role
        }
      ]
    }
  ]
})
