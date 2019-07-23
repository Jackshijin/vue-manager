// 编写插件
import axios from 'axios'
const MyPlugin = {}
MyPlugin.install = (Vue) => {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1'
  // 4. 添加实例方法
  Vue.prototype.$http = axios
}
export default MyPlugin
