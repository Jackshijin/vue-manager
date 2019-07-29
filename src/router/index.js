import Vue from 'vue'
import Router from 'vue-router'
import Login from './../components/login/Login'
import Home from './../components/home/Home'
import User from './../components/users/User'
import Rights from './../components/rights/Rights'
import Role from './../components/rights/Role'
import {Message} from 'element-ui'
Vue.use(Router)

 const router = new Router({
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
          name: 'roles',
          path: '/roles',
          component: Role
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
 // console.log(to, from)
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      Message.warning('请先登录!')
      router.push({
        name: 'login'
      })
      return
    }
    next()
  }
})
// 在路由配置生效之前 统一判断token
export default router
