import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import md5 from 'js-md5';
import JsEncrypt from 'jsencrypt' //加密token
import moment from 'moment'//导入文件
import elementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';  //element默认主题
import '../theme/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// import 'lib-flexible/flexible.js' //引入flexible
import http from './http/config';//封装 的 axios

import  VueQuillEditor from 'vue-quill-editor' //富文本
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)


Vue.prototype.$http = http;
Vue.use(elementUI)
Vue.use(zhLocale)
Vue.config.productionTip = false
Vue.prototype.$moment = moment;//赋值使用
moment.locale('zh-cn');//需要汉化
Vue.prototype.$md5 = md5; //md5加密  在需要用到的文件中使用：this.$md5('holle') // bcecb35d0a12baad472fbe0392bcc043
Vue.prototype.$jsEncrypt = JsEncrypt //加密token

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
