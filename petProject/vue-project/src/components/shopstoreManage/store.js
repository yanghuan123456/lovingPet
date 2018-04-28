import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)
// let relatedId  = JSON.parse(sessionStorage.getItem("user"))._id||""
export default {
    namespaced:true,
    state: {
        curpage: 1,
        eachpage: 5,
        maxpage: 0,
        total: 0,
        upDate: {
            shopName: '',
            shopLicenceNum: '',
            shopLicenceImg: '',
            shopAdd: '',
            shopCorporate: '',
            shopTel:'',
            shopImg: '',
            shopFeature: '',
            shopEmployee:[{
                empName: '',
                empLevel: '',
                empPhone:''
            }],
        },
        rows: [],
        urlState:true,
        isFlag:true,
    },
    mutations:{//同步
        handleIncre(state){
            state.isFlag = !state.isFlag
        },
        getPAge(state,payload) {
            // state.rows.push(...{payload})
            Object.assign(state, payload)
        },
        setCurPage(state, curpage) {
            state.curpage = curpage
        },
        setEachPage(state, eachpage) {
            state.eachpage = eachpage
        },
        setUpdata(state,data) {
            let arr = state.upDate
            for (let key in data) {
                if (data[key] instanceof Array) {
                    data[key].map((item, index) => {
                        arr[key][index]=item
                    })
                } else {
                    arr[key]=data[key]
                }  
            }
        },
        
        
    },
    actions: {//异步
        // 渲染
        async getStoreData(context) {
            // console.log("render")
            let getObj = JSON.parse(sessionStorage.getItem("users"))
            // console.log(getObj)
            if (getObj.userAcount) {
                let relatedId = getObj.id ||""
                const {
                    curpage,
                    eachpage
                } = context.state
                // get只能通过拼接获取数据page=${curpage}&rows=${eachpage}
                let  {data}  = await axios.get(`/shopStore/?page=${curpage}&rows=${eachpage}&relatedId=${relatedId }`)
                context.commit("getPAge", data)
            }
            
        },
        // 添加
        async postStoreData(context, obj) {
            // console.log("add")
            let getObj = JSON.parse(sessionStorage.getItem("users"))
            if (getObj.userAcount) {
                let relatedId = getObj.id || ""
                let newObj=Object.assign({relatedId,...obj})
                await axios.post("/shopStore/", newObj)
                context.commit("handleIncre")
            }
            
        },
        // 删除
        async deleteData(context, id) {
            await axios.delete("/shopStore/"+id)
        },
        // 修改
        async getUpdate(context, id) {
            const { data } = await axios.get(`/shopStore/` + id)
            console.log(data)
            context.commit("setUpdata",data)
        },
        async postUpdate(context, obj) {
             await axios.put("/shopStore/", obj)
        },
        // 查询
        async search(context, { type, value }) {
            let getObj=JSON.parse(sessionStorage.getItem("users"))
            if (getObj) {
                let relatedId  = getObj.id||""
                const {
                    curpage,
                    eachpage
                } = context.state
                const { data } = await axios.get(`/shopStore/?type=${type}&value=${value}&relatedId=${relatedId}`)
                context.commit("getPAge", data)
            }
        }
    },
    getters:{
        
    }
}


