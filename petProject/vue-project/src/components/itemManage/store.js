import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
Vue.use(Vuex)
export default {
    namespaced: true,
   
    state: {
        shopList: [],
        islist:1,
        issee:true,
        alter:true,
        curpage:1,
        eachpage:7,
        maxpage:0,
        total:0,
        imgid:{imgid:'',shopid:''},
        id:{id:''},
        updated: {
            name: '',
            money: '',
            number: '',
            qualit:'',
            weight:'',
            _id:''
          },
          url:''
    },
    mutations: {//同步
        openadd(state) {
            state.islist=2;
        },
        list(state){
            state.islist=1;
            state.issee=true;
        },
        alter(state,row){   //修改
        //    console.log(row)
            state.updated=row;
            state.islist=3;
            // console.log(state.issee)
        },
        handlesuccess123(state,res){
            // console.log(res)
            state.url=res;
        },
        seteachpage(state,val){
            state.eachpage=val;
            // console.log(state.eachpage)
        },
        setcurpage(state,val){
            state.curpage=val
            // console.log(state.total,state.eachpage);
           
            // console.log(val);
        }
    },
    actions: {//异步
        async getdataAsync(context) { //列表渲染
            const {data} =  await axios.get(`/items/?rows=${context.state.eachpage}&page=${context.state.curpage}`)
            context.state.shopList=data.rows;
            context.state.curpage=data.curpage;
            context.state.eachpage=data.eachpage;
            context.state.maxpage=data.maxpage;
            context.state.total = data.total;
        },
        async sureadd(context,formLabelAlign){ 
            // console.log("123456789");
            let obj={
                name:formLabelAlign.name,
                money:formLabelAlign.money,
                number:formLabelAlign.number,
                qualit:formLabelAlign.qualit,
                weight:formLabelAlign.weight
            }
            await axios.post("/items/", obj).then(function(res){  //新增
                context.state.id.id=res.data._id;
                context.state.shopList.push(res.data);
            });
            context.state.issee=!context.state.issee;
        },
        async searchshop(context,value){ //查询
             await axios.get(`/items?value=${value}&type=name`).then(function(res){  
                 context.state.shopList=res.data.rows
            });
        },
        async deltele(context,id){   //删除
            await axios.delete("/items/"+id).then(function(res){      
            });
            // console.log(context.state.total,context.state.eachpage);
            if(context.state.total%context.state.eachpage==1){
                context.state.curpage--;
                // console.log(context.state.curpage);
                context.dispatch("getdataAsync");//异步调用异步的方法
                
            }
        },
        async updatedshop(context, id) {   //修改
            // console.log(id)
            // console.log(context.state.updated);
            await axios.put("/items/"+id,context.state.updated).then(function(res){  
                context.state.issee=!context.state.issee;
            });
          
        },
        async updatedimg(context,id){ //点击修改的时候去请求图片路径回来
        //    console.log("123456789daaaaaaaaaaaaaaa0-=")  
            await axios.get(`/items?type=img&id=${id}`).then(function(res){  
                if (res.data.length>0) {
                    context.state.imgid.imgid=res.data.rows[0]._id;
                    context.state.imgid.shopid=id;
                    context.state.url=res.data.rows[0].path;
                }
           });
       },
    },
    getters: {
        // isseelist(state){
        //     console.log(state)
           
        // }
        
    }
}

