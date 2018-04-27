import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

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
        rows: [{
            shopName: '抚琴东南店',
            shopLicenceNum: '123456',
            shopLicenceImg: "",
            shopAdd: '抚琴东南路十号',
            shopCorporate: '小谢',
            shopTel: '17360267591',
            shopImg: '',
            shopFeature: '理发',
            shopEmployee: [{
                empName: '张三',
                empLevel: '店长',
                empPhone:'17360267591'
            }]
        }],
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
        // async postStoreData(context,obj) { //context是store的实列，通过它可获得store的方法和属性
        //     console.log("in")
        //     let data=JSON.stringify(obj)
        //     const str = await fetch(`/rows/`, {
        //         method: 'POST',
        //         mode: "cors",
        //         credentials: "include",
        //         body:data
        //     }).then(response => response.json())
        // }
        // 渲染
        async getStoreData(context) {
            const {
                curpage,
                eachpage
            } = context.state
            const {data} = await axios.get(`/shopStore/?page=${curpage}&rows=${eachpage}`)
            context.commit("getPAge", data)
        },
        // 添加
        async postStoreData(context,obj) {
            await axios.post("/shopStore/", obj)
            context.commit("handleIncre")

        },
        // 删除
        async deleteData(context, id) {
            // console.log("into")
            await axios.delete("/shopStore/"+id)
        },
        // 修改
        async getUpdate(context, id) {
            const {data} = await axios.get("/shopStore/"+id)
            // console.log(data)
            context.commit("setUpdata",data)
        },
        async postUpdate(context, obj) {
             await axios.put("/shopStore/" + obj._id, obj)
            
        },
        // 查询
        async search(context,{type,value}){
            const {
                curpage,
                eachpage
            } = context.state
            const { data } = await axios.get(`/shopStore/?type=${type}&value=${value}`)
            context.commit("getPAge", data)
        }
    },
    getters:{
        
    }
}


