/**
 * 扩展 VuePress 应用
 */
// import echarts from 'echarts';
import ec from '../../src/index.js';
let opt = {
  install(Vue) {
    Vue.prototype.$ec = ec
    // Vue.prototype.$echarts = echarts
  }
}
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData // 站点元数据
}) => {
  Vue.use(opt);
}