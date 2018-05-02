import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"

Vue.use(Vuex)

export default {
    namespaced:true,
    state:{
        curpage:1,
        eachpage:5,
        maxpage:0,
        total:0,
        rows:[],
        form:true
    },
    mutations:{//同步
        addtodo(state){
            state.form=!state.form
        },
        setdata(state,payload){
            Object.assign(state,payload);  //把不同的地方会合并
        }, 
        sizechange(state,value){
            state.eachpage=value
        },
        nextclick(state,value){
            state.curpage=value
        }
        
    },
    actions:{//异步
        async getdataAsync(context){
            //抓取数据
            const {curpage,eachpage}=context.state
            let id=sessionStorage.getItem("users")
            const {data} = await axios.get(`/service/?page=${curpage}&rows=${eachpage}&id=${id}`)
            context.commit("setdata",data) 
        },
        async huntdataAsync(context,value){
            let id=sessionStorage.getItem("users")
            const{data}=await axios.get(`/service/?value=${value}&id=${id}`,)
            context.commit("setdata",data)
        },
        // 上传数据
        async postdataAsync(context,form1){
            let id=sessionStorage.getItem("users")
            await axios.post("/service",{...form1,id})
        },
        // 删除数据
        async deletedataAsync(context,{text}){
            await axios.delete("/service/"+text._id)
        },
        // 修改数据
        async putdataAsync(context,text){
            await axios.put("/service/"+text._id,text)
        },
    },
    // 计算属性
    getters:{
      
    }
}



