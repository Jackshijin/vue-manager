// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import MyBread from './components/custom/myCustom'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'
import MyPlugin from './plugins/http'
import moment from 'moment'
Vue.use(ElementUI)
Vue.use(MyPlugin)
Vue.config.productionTip = false

// 全局过滤器
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
// 全局自定义组件
Vue.component(MyBread.name,  MyBread )
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
