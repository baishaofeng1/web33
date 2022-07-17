import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import "./assets/css/common.css"
import "./router/permission"
import "./utils/eventbus"
import i18n from "./plugins/i18n"

Vue.config.productionTip = false

/**
 * 初始化   用户登录刷新页面vuex里面的token会消失，然后回到登录页面；这里可以在刷新时把本地的token
 *          存入vuex，就不会回到登录页面
 */
if(localStorage.getItem("ego")){
  store.commit("loginModule/updateToken",JSON.parse(localStorage.getItem("ego")).token);
  store.commit("loginModule/updateUsername",JSON.parse(localStorage.getItem("ego")).username);
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
