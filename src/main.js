import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import axios from 'axios'
import VueCookie from 'vue-cookies'
import ElementUI from 'element-ui';
import store from '@/store/index'
import 'element-ui/lib/theme-chalk/index.css';
import { UTable, UTableColumn } from 'umy-ui';



Vue.use(VueCookie)
Vue.use(ElementUI);
Vue.component(UTable.name, UTable);
Vue.component(UTableColumn.name, UTableColumn);


Vue.config.productionTip = false
axios.defaults.withCredentials = true


new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.cookie = VueCookie
  }
}).$mount('#app')
