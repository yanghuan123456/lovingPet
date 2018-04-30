import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex)

export default {
    namespaced: true,
    state: {
        orders: [
            {
                date: "2016-05-02",
                stores: {
                    shoopAdd: ""
                },
                goods: {
                    name: ""
                },
                users: {
                    userame: ""
                },
                quantity: "2",
                state: "派送中",
                address: "上海市普陀区金沙江路 1518 弄"
            }
        ],
        dress:"",
        curpage: 1,
        eachpage: 1,
        maxpage: 0,
        total: 0,
        isxiu: true,
        storeManagerId:"",
        labelPosition: 'right',
        formLabelAlign: {
            quantity: '',
            dress: '',
            state: '',
            id:""
        }
    },
    mutations: {//同步
        setdata(state, payload) {
            state.orders = payload.rows
            state.curpage = payload.curpage
            state.eachpage = payload.eachpage
            state.total = payload.total
        },
        getuserId(state,userId){
            state.storeManagerId=userId
        }
        ,
        setcurpage(state, curpage) {
            state.curpage = curpage
        },
        seteachpage(state, eachpage) {
            state.eachpage = eachpage;
        },
        xiugai(state,row) {
            state.formLabelAlign.quantity=row.quantity||"";
            state.formLabelAlign.dress=row.dress||""
            state.formLabelAlign.state=row.state||""
            state.formLabelAlign.id=row._id||""
        },
        display(state){
            state.isxiu = !state.isxiu
        }
    },
    actions: {//异步
        async getdataAsync(context) {
            const { curpage, eachpage ,storeManagerId} = context.state
            const { data } = await axios(`/order/?page=${curpage}&rows=${eachpage}&storeManagerId=${storeManagerId}`)
            context.commit("setdata", data)
        },
        // putdata(context){
        //     axios.post(`/order`,{
        //         date:2018
        //     })
        // },
        remove(context, id) {
            axios.delete(`/order/${id}`)
        },
        putData(context){
            const{formLabelAlign}=context.state
            axios.put(`/order`,{formLabelAlign})
        }
    },
    getters: {

    }
}


