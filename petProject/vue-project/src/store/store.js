import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

import ShopStore from "../components/shopstoreManage/store"
import Item from "../components/itemManage/store"
import Order from "../components/orderManage/store"
import Pethost from "../components/pethostManage/store"
import Pet from "../components/petManage/store"
import Service from "../components/serviceManage/store"
import User from "../components/userManage/store"
import Login from "../components/app/login/store"
import Reg from "../components/app/reg/store"
import Auditing from "../components/app/auditing/store"

export default new Vuex.Store({
    modules: {
        Login,
        Reg,
        ShopStore,
        Item,
        Order,
        Pethost,
        Pet,
        Service,
        User,
        Auditing
    }
})