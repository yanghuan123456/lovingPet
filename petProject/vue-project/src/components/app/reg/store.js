import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
      isTrue:"",
      userStatus:""

    },
    mutations: {
        setData(state,data) {
            state.isTrue=data.status
            state.userStatus=data.userStatus
        }
        
    },
    actions: {
        async getUser(context,obj) {
            console.log(obj)
            const {data} = await axios.post(`/users/up`,obj)
            context.commit('setData',data)
        }
    }
}