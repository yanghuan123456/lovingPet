import Vue from 'vue'
import Router from 'vue-router'

import Auditing from '../components/app/auditing/auditing.vue'
import Login from '../components/app/login/login.vue'
import Reg from '../components/app/reg/reg.vue'
import Info from '../components/app/info.vue'
import UeserManage from "../components/userManage/userManage.vue"
import ItemManage from "../components/itemManage/itemManage.vue"
import OrderManage from "../components/orderManage/orderManage.vue"
import PethostManage from "../components/pethostManage/pethostManage.vue"
import PetManage from "../components/petManage/petManage.vue"
import ServiceManage from "../components/serviceManage/serviceManage.vue"
import ShopstoreManage from "../components/shopstoreManage/shopstoreManage.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login/:username',
      name: 'loginWithParams',
      component: Login
    },{
      path: '/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/auditing',
      name: 'auditing',
      component: Auditing
    }, {
      path: '/info',
      name: 'info',
      component: Info,
      children:[{
        path: 'ueserManage',
        name: 'ueserManage',
        component: UeserManage
      },{
        path: 'itemManage',
        name: 'itemManage',
        component: ItemManage
      },{
        path: 'orderManage',
        name: 'orderManage',
        component: OrderManage
        },
        {
          path: 'pethostManage',
          name: 'pethostManage',
          component: PethostManage
        },
        {
          path: 'petManage',
          name: 'petManage',
          component: PetManage
        },
        {
          path: 'serviceManage',
          name: 'serviceManage',
          component: ServiceManage
        },
        {
          path: 'shopstoreManage',
          name: 'ShopstoreManage',
          component: ShopstoreManage
        }]
    }

  ]
})
