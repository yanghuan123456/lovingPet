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
        userType: '',
        userPhone: '',
        userAcount:''
    },
    mutations: {
        setData(state, data) {
            state.isTrue=data.status
            state.userStatus=data.userStatus
            state.users = data.users
            state.userType = data.userType
            state.userAcount=data.userAcount
        }
        
    },
    actions: {
        async getUser(context, obj) {
            console.log(obj)
            const { data } = await axios.post(`/users`, obj)
            context.commit('setData',data)
        }
    }
}