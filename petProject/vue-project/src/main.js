// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index.js'

Vue.config.productionTip = false

import Auditing from "./components/app/auditing/auditing.vue"
import Reg from "./components/app/reg/reg.vue"
import Login from "./components/app/login/login.vue"
import UeserManage from "./components/userManage/userManage.vue"
import ItemManage from "./components/itemManage/itemManage.vue"
import OrderManage from "./components/orderManage/orderManage.vue"
import PethostManage from "./components/pethostManage/pethostManage.vue"
import PetManage from "./components/petManage/petManage.vue"
import ServiceManage from "./components/serviceManage/serviceManage.vue"
import ShopstoreManage from "./components/shopstoreManage/shopstoreManage.vue"

import store from "./store/store"

Vue.component("Reg",Reg)
Vue.component("Login",Login)
Vue.component("UeserManage",UeserManage)
Vue.component("ItemManage", ItemManage)
Vue.component("OrderManage", OrderManage)
Vue.component("PethostManage", PethostManage)
Vue.component("PetManage", PetManage)
Vue.component("ServiceManage", ServiceManage)
Vue.component("ShopstoreManage", ShopstoreManage)
Vue.component("Auditing", Auditing)


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  store,
  router,
  template: '<router-view />'
})


