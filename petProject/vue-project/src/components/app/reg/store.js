
import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
      isTrue:"",
        userStatus: "",

        userAcountStatus: 0
        
    },
    mutations: {
        setData(state,data) {
            state.isTrue=data.status
            state.userStatus=data.userStatus
        },
        setuserAcountStatus(state, { type }) {
            state.userAcountStatus=type
        }
    },
    actions: {
        async getUser(context,obj) {
            console.log(obj)
            const {data} = await axios.post(`/users/up`,obj)
            console.log(data)
            context.commit('setData',data)
        },
        async queryDataType(context, obj ) {
            const {data}  = await axios.post(`/users/queryType`, obj)
            context.commit('setuserAcountStatus',data)
        }
    }
}