<template>
<div>
  <el-row :gutter="20">
    <el-col :span="16"><el-input
    placeholder="请搜索状态'申请中'，可以进行审核"
    v-model="input10"
    clearable>
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input></el-col>
    <el-col :span="8"><el-button type="warning" plain @click="search(input10)">点击搜索</el-button></el-col>
  </el-row>

  <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
  
    <el-table-column label="登录名" width="130">
      <template slot-scope="scope">
        <span>{{ scope.row.userAcount }}</span>
      </template>
    </el-table-column>
    <el-table-column label="密码" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.userPwd }}</span>
      </template>
    </el-table-column>
    <el-table-column label="手机号" width="150">
      <template slot-scope="scope">
        <i class="el-icon-phone"></i>
        <span>{{ scope.row.userPhone }}</span>
      </template>
    </el-table-column>
    <el-table-column label="邮箱" width="180">
      <template slot-scope="scope">
        <span>{{ scope.row.userMail }}</span>
      </template>
    </el-table-column>
    <el-table-column label="姓名" width="90">
      <template slot-scope="scope">
        <span>{{ scope.row.userName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="角色" width="110">
      <template slot-scope="scope">
        <span>{{ scope.row.userType }}</span>
      </template>
    </el-table-column>
    <el-table-column label="状态" width="130">
      <template slot-scope="scope">
        <i :class="scope.row.userClass"></i>
        <span>{{ scope.row.userStatus }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="150">
      <template slot-scope="scope">
        <el-button size="mini"  @click="changeBtn(scope)">修改</el-button>
        <el-button size="mini" type="danger" @click.native.prevent="del(scope.row._id)" >删除</el-button>
      </template> 
    </el-table-column>
  </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="curpage"
        :page-sizes="[1, 3, 5, 7 ]"
        :page-size="eachpage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>


    <el-dialog :title='name' width="450px" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="密码" :label-width="formLabelWidth">
          <input type="text" v-model="pwdText">
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <input type="text" v-model="phoneText">
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <input type="text" v-model="emailText">
        </el-form-item>
        <el-form-item label="审核状态" :label-width="formLabelWidth">
          <el-radio-group v-model="radio2"><el-radio :label="0">申请中</el-radio><el-radio :label="1">审核通过</el-radio><el-radio :label="-1">未通过</el-radio></el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updata(inputId)">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    created(){
      this.getdata();
    },
    // watch:{
    //   curpage(){
    //     this.getdata();
    //   }
    // },
    name: "todoList",
    data() {
      return {
        inputId:"",
        pwdText:'555',
        emailText:'',
        phoneText:'',
        name:"",
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        radio2: 0,
        input10: '',
        total:5,
        eachpage:5,
        maxpage:1,
        curpage:1,
        aryAll:[],
        tableData: [{
          userAcount:'花花花',
          userPwd:'123456',
          userPhone:'12345678900',
          userMail:'123123@qq.com',
          userName:'李华',
          userType:'后台管理员',
          userStatus:'',
          userClass:"",
        }]
      }
    },
    methods: {
      //查看
      getdata(){
        axios.get(`/userslist/storeManagers?page=${this.curpage}&rows=${this.eachpage}`)
        .then((response)=> {
           for(let i=0;i<response.data.rows.length;i++){
            if(response.data.rows[i].userStatus=="0"){
              response.data.rows[i].userStatus="申请中",
              response.data.rows[i].userClass="el-icon-time"
            }else if(response.data.rows[i].userStatus=="1"){
              response.data.rows[i].userStatus="审核通过"
              response.data.rows[i].userClass="el-icon-check"
            }else{
              response.data.rows[i].userStatus="没通过"
              response.data.rows[i].userClass="el-icon-close"
            }
          }
          this.tableData=response.data.rows;
          this.total=response.data.total;
          this.eachpage=response.data.eachpage;
          this.curpage=response.data.curpage;
          this.maxpage=response.data.maxpage;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      //删除
      del(id){
        axios.delete(`/userslist/storeManagers/${id}`)
        .then((response)=> {
          this.getdata()
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      //搜索
      search(value){
        axios.get(`/userslist/storeManagers?page=${this.curpage}&rows=${this.eachpage}`,{
          params: {
            value,
          }
        })
        .then((response)=> {
          for(let i=0;i<response.data.rows.length;i++){
            if(response.data.rows[i].userStatus=="0"){
              response.data.rows[i].userStatus="申请中",
              response.data.rows[i].userClass="el-icon-time"
            }else if(response.data.rows[i].userStatus=="1"){
              response.data.rows[i].userStatus="审核通过"
              response.data.rows[i].userClass="el-icon-check"
            }else{
              response.data.rows[i].userStatus="没通过"
              response.data.rows[i].userClass="el-icon-close"
            }
          }
          this.tableData=response.data.rows;
          this.total=response.data.total;
          this.eachpage=response.data.eachpage;
          this.curpage=response.data.curpage;
          this.maxpage=response.data.maxpage;
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) { return 'warning-row'; } else if (rowIndex === 3) {
          return 'success-row';
        } return '';
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      //分页设置
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.eachpage=val;
        this.getdata()
        
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.curpage=val;
        this.getdata()
      },
      //修改设置
      changeBtn({row}){
        this.dialogFormVisible = true;
        if(row.userStatus=="申请中"){
          this.radio2=0;
        }else if(row.userStatus=="审核通过"){
          this.radio2=1;
        }else{
          this.radio2=-1;
        }
        this.inputId=row._id;
        this.name=row.userAcount;
        this.pwdText=row.userPwd;
        this.emailText=row.userMail;
        this.phoneText=row.userPhone
      },
      updata(id){
        this.dialogFormVisible = false;
        console.log()
        axios({
          method: 'put',
          url:`/userslist/storeManagers/${id}`,
          data: {
            userPwd:this.pwdText,
            userPhone:this.phoneText,
            userMail:this.emailText,
            userStatus:this.radio2
          }
        })
        .then((response)=> {
          this.getdata()
        })
        .catch(function (error) {
          console.log(error);
        });

      }
    }
  }

</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-icon-check{
    color:green;
  }
  .el-icon-close{
    color: red;
  }
    .el-pagination{
    display:flex;
    justify-content:center;
  }
</style>