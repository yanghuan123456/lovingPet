<template>
    <div v-if="this.form==true">
        <el-button type="primary" @click="addtodo" >增加服务</el-button>
        <el-input placeholder="请输入店名" style="width:900px"  v-model="value" prefix-icon="el-icon-search" ></el-input>
        <el-button type="primary"  @click="seekclick" >搜索服务</el-button>
            <el-table
            :data="rows"
            border
            style="width:90%">
            <el-table-column
            prop="stores"
            label="店名"
            width="150">
            </el-table-column>
            <el-table-column
            prop="name"
            label="服务名"
            width="150">
            </el-table-column>
            <el-table-column
            prop="king"
            label="种类"
            width="150">
            </el-table-column>
            <el-table-column
            prop="money"
            label="价格"
            width="150">
            </el-table-column>
            <el-table-column
            prop="time"
            label="耗时"
            width="150">
            </el-table-column>
            <el-table-column
            prop="img"
            label="图片"
            width="180">
                <template slot-scope="scope" >
                    <img :src="scope.row.img" alt="img" style="width:50px;height:50px">
                </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="170">
            <template slot-scope="scope">
                <el-button type="primary" size="small" @click="putclick(scope.row)">修改</el-button>
                <el-button type="primary" size="small" @click="deleteclick({text:scope.row})">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div>
            <el-pagination
            @size-change="handsizeclick"
            @current-change="handnextclick"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
    <div v-else style="width:380px;border:1px solid #f2f2f2;border-radius:10px">
        <el-form  :model="form1" label-width="70px" style="margin-right:20px;margin-top:15px">
            <el-form-item label="店名">
                <el-input v-model="form1.stores"></el-input>
            </el-form-item>
            <el-form-item label="服务名:" >
                <el-input  v-model="form1.name"></el-input>
             </el-form-item>
            <el-form-item label="种类:" >
                <el-input  v-model="form1.king"></el-input>
             </el-form-item>
            <el-form-item label="价格:"   >
                <el-input v-model="form1.money" ></el-input>
            </el-form-item>
            <el-form-item label="耗时:" >
                <el-input  v-model="form1.time"></el-input>
            </el-form-item>

            <el-upload action="/service/upload" :on-success="uploadclick" multiple list-type="picture" style="margin-left:30px"> 
                <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" style="margin-top:15px;width:300px">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

            <el-form-item>
                <el-button type="success" v-if="!isForm" @click="handClick" style="margin-right:100px;margin-top:30px">确定</el-button>
                <el-button type="success" v-else @click="puthandclick" style="margin-right:100px;margin-top:30px">修改</el-button>
                <el-button type="warning" @click="clearvalue" style="margin-top:30px">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

   <script>
import {mapState,mapMutations,mapGetters,mapActions} from "vuex";
  export default {
      name:"Service",
       data() {
      return {
        form1: {
          stores: '',
          name: '',
          king: '',
          money: '',
          time: " ",
          img:"",
        },
          value:"",
          isForm:false
      }
    },
    name:"serviceManage",
    mounted(){
        this.getdataAsync()
    },
    methods: {
        ...mapMutations("Service",["addtodo",'getForm',"nextclick","sizechange"]),
        ...mapActions("Service",[
            "getdataAsync","postdataAsync","deletedataAsync","putdataAsync","huntdataAsync"
            ]),
        handClick(){
            this.postdataAsync(this.form1)
            this.getdataAsync()
            this.form1={}
            this.addtodo()
        },
        clearvalue(){
            this.form1={}
            this.addtodo()
        },
        deleteclick(text){
            this.deletedataAsync(text)
            this.getdataAsync()
        },
        uploadclick(res,file){
            this.form1.img=res
        },
        seekclick(){
            this.huntdataAsync(this.value)
            this.value=""
        },
        putclick(text){
            this.addtodo() 
            this.isForm=!this.isForm
            this.form1=text
        },
        puthandclick(){
            this.putdataAsync(this.form1)
            this.isForm=!this.isForm
            this.addtodo()
            this.form1={} 
        },
        handnextclick(value){
           this.nextclick(value)
            this.getdataAsync() 
        },
        handsizeclick(value){
            this.sizechange(value)
            this.getdataAsync() 
        },
            
       
        // 点击每页条数
        
         
    },
    computed:{
        ...mapState("Service",["rows","form","total"]),
    },
  }
</script>

<style>
    .completed{
        text-decoration: line-through;
        color:red;
    }
</style>