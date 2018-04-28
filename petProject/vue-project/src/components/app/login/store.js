import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
      isTrue:"",
      userStatus:"",
      users: "",
      userType:''
    },
    mutations: {
        setData(state, data) {
            console.log(data)
            state.isTrue=data.status
            state.userStatus=data.userStatus
            state.users = data.users
            state.userType=data.users
            console.log( state.userStatus)
        }
        
    },
    actions: {
        async getUser(context,obj) {
            console.log(obj)
            const {data} = await axios.post(`/users`,obj)
            context.commit('setData',data)
        }
    }
}