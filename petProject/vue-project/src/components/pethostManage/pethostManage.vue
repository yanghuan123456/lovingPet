<template>
<div>
<div style="margin-top: 15px;">
  <el-input placeholder="请输入相应搜索内容" v-model="input5" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="选择类型">
      <el-option label="真实姓名" value="memberName"></el-option>
      <el-option label="昵称" value="memberAcount"></el-option>
      <el-option label="区域" value="memberArea"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search(input5,select)"></el-button>
  </el-input>
</div>

  <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">

    <el-table-column fixed label="真实姓名" width="130">
      <template slot-scope="scope">
        <span>{{ scope.row.memberName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="昵称" width="130">
      <template slot-scope="scope">
        <span>{{ scope.row.memberAcount }}</span>
      </template>
    </el-table-column>
        <el-table-column label="头像" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.memberImg }}</span>
      </template>
    </el-table-column>
    <el-table-column label="手机号" width="150">
      <template slot-scope="scope">
        <i class="el-icon-phone"></i>
        <span>{{ scope.row.memberPhone }}</span>
      </template>
    </el-table-column>
    <el-table-column label="密码" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.memberPwd }}</span>
      </template>
    </el-table-column>
    <el-table-column label="会员卡" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.memberCard }}</span>
      </template>
    </el-table-column>
    <el-table-column label="送货地址" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.memberAdd }}</span>
      </template>
    </el-table-column>
    <el-table-column label="区域" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.memberArea }}</span>
      </template>
    </el-table-column>
    <el-table-column label="积分" width="130">
      <template slot-scope="scope">
        <span>{{ scope.row.memberPoint }}</span>
      </template>
    </el-table-column>
    <el-table-column label="拥有的宠物" width="150">
      <template slot-scope="scope">
        <span>{{ scope.row.hadPets }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button size="mini" @click="changeBtn(scope)">编辑</el-button>
        <el-button size="mini" type="danger"  @click.native.prevent="del(scope.row._id)">删除</el-button>
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
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <input type="text" v-model="phoneText">
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <input type="text" v-model="pwdText">
        </el-form-item>
        <el-form-item label="区域" :label-width="formLabelWidth">
          <input type="text" v-model="areaText">
        </el-form-item>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <input type="text" v-model="addText">
        </el-form-item>
        <el-form-item label="积分" :label-width="formLabelWidth">
          <input type="text" v-model="pointText">
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
    name: "todoList",
    data() {
      return {
        inputId:"",
        pwdText:'555',
        areaText:'',
        phoneText:'',
        addText:'',
        pointText:'',
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
        input5: '',
        select: '',
        total:6,
        eachpage:5,
        maxpage:1,
        curpage:1,
        aryAll:[],
        tableData: [{
            memberAcount:"疯狂的茄子",
            memberPhone:"12345688111",
            memberPwd:"123456",
            memberName:"张洒",
            memberCard:"012312897141821",
            memberImg:"",
            memberAdd:"迎春路25号11栋",
            memberArea:"扶摇区",
            memberPoint:"98",
            hadPets:"猫咪",
        }, {
            memberAcount:"疯狂的茄子",
            memberPhone:"12345688111",
            memberPwd:"123456",
            memberName:"张洒",
            memberCard:"012312897141821",
            memberImg:"",
            memberAdd:"迎春路25号11栋",
            memberArea:"扶摇区",
            memberPoint:"98",
            hadPets:"猫咪",
        }]
      }
    },
    methods: {
      getdata(){
        axios.get(`/userslist/users?page=${this.curpage}&rows=${this.eachpage}`)
        .then((response)=> {
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
        axios.delete(`/userslist/users/${id}`)
        .then((response)=> {
          this.getdata()
        })
        .catch(function (error) {
          console.log(error);
        });
      },
    //修改设置
      changeBtn({row}){
        this.dialogFormVisible = true;
        this.inputId=row._id;
        this.name=row.memberAcount;
        this.pwdText=row.memberPwd;
        this.areaText=row.memberArea;
        this.phoneText=row.memberPhone;
        this.addText=row.memberAdd;
        this.pointText=row.memberPoint
      },
      updata(id){
        this.dialogFormVisible = false;
        axios({
          method: 'put',
          url:`/userslist/users/${id}`,
          data: {
            memberPwd:this.pwdText,
            memberPhone:this.phoneText,
            memberArea:this.areaText,
            memberAdd:this.addText,
            memberPoint:this.pointText,
          }
        })
        .then((response)=> {
          this.getdata()
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

      //搜索
      search(value,name){
        axios.get(`/userslist/users?page=${this.curpage}&rows=${this.eachpage}`,{
          params: {
            value,
            name,
          }
        })
        .then((response)=> {
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
      handleChange(value) {
        console.log(value);
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
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
    .el-select .el-input {
    width: 130px;
  }
  .el-pagination{
    display:flex;
    justify-content:center;
  }
</style>