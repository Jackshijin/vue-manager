// 编写插件
import axios from 'axios'
const MyPlugin = {}
MyPlugin.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'

  // 在请求发起之前进行拦截，统一设置头部
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    // console.log('拦截器触发了')
    // console.log(config.url)
    if (config.url !== 'login') {
       //console.log('非登陆url')
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['Authorization'] = AUTH_TOKEN
    }
   return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

// 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}
export default MyPlugin
