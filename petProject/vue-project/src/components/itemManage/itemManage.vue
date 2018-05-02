
<template>
<div style="position: relative;">
    <div v-if="islist==1">
        <el-button type="primary" @click="openadd">上传商品<i class="el-icon-upload el-icon--right"></i></el-button>
        <el-input  v-model="search" style="width:300px;"
        placeholder="请输入你要查询你的商品"
        >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchshop(search)">查询</el-button>
      <el-table
        :data="shopList"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="name"
          label="商品名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="money"
          label="价格"
          width="150">
        </el-table-column>
        <el-table-column
          prop="number"
          label="剩余数量"
          width="150">
        </el-table-column>
        <el-table-column
          prop="qualit"
          label="保质期"
          width="150">
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          width="150">
        </el-table-column>
         <el-table-column
          prop="image"
          label="图片"
          width="300">
        </el-table-column>
        <el-table-column
          prop="_id"
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button  type="text" size="small" @click="remove(scope.row._id)">删除</el-button>
            <el-button  type="text" size="small" @click="altersee(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
        <div class="block">
          <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="curpage"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
    </div>
    <div v-if="islist==2"  class="add">
        <el-radio-group v-model="labelPosition" size="small" style="margin-left:250px;">
        <el-radio-button label="left">左对齐</el-radio-button>
        <el-radio-button label="right">右对齐</el-radio-button>
        <el-radio-button label="top">顶部对齐</el-radio-button>
        </el-radio-group>
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="商品名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formLabelAlign.money"></el-input>
        </el-form-item>
        <el-form-item label="剩余数量">
          <el-input v-model="formLabelAlign.number"></el-input>
        </el-form-item>
        <el-form-item label="保质期">
          <el-input v-model="formLabelAlign.qualit"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="formLabelAlign.weight"></el-input>
        </el-form-item>
         <el-form-item label="图片上传" style="margin-right:80px;color:black">
          <el-upload :disabled="issee"
            class="upload-demo"
            action="items/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :data="this.id"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :on-success="handlesuccess"
            :file-list="fileList">
            <el-button size="small" type="primary" >添加商品图片</el-button>
            <div slot="tip" class="el-upload__tip" >
              <span style="color:red;">只能上传jpg/png文件 且不超过500kb</span>
              </div>
               <img :src="url" alt="" style="position: absolute;top:0px;right:0;width:200px;height:200px;">
          </el-upload>
        </el-form-item>
      </el-form>
      <el-row style="margin-left:80px;">
          <el-button type="primary" @click="sureaddshop(formLabelAlign)">添加商品信息</el-button>
      </el-row>
    </div>
      <el-row style="margin-left:600px;margin-top:50px" v-if="islist==2">
          <el-button type="primary" @click="list">查看列表</el-button>
      </el-row>
  <div v-if="islist==3"  class="add">
      <el-radio-group v-model="labelPosition" size="small" style="margin-left:250px;">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
      </el-radio-group>
      <div style="margin: 20px;"></div>
      <el-form :label-position="labelPosition" label-width="80px" :model="updated">
      <el-form-item label="商品名称">
        <el-input  v-model="updated.name"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="updated.money"></el-input>
      </el-form-item>
      <el-form-item label="剩余数量">
        <el-input v-model="updated.number"></el-input>
      </el-form-item>
      <el-form-item label="保质期">
        <el-input v-model="updated.qualit"></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="updated.weight" ></el-input>
      </el-form-item>
        <el-form-item label="图片上传" style="margin-right:80px;color:black">
        <el-upload :disabled="issee"
          class="upload-demo"
          action="items/uploader"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :data="this.imgid"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :on-success="handlesuccess"
          :file-list="fileList">
          <el-button size="small" type="primary" >修改商品图片</el-button>
          <div slot="tip" class="el-upload__tip" >
            <span style="color:red;">只能上传jpg/png文件 且不超过500kb</span>
            </div>
              <img :src="url" alt="" style="position:absolute;top:0px;right:0;width:200px;height:200px;">
        </el-upload>
      </el-form-item>
    </el-form>
    <el-row style="margin-left:80px;">
        <el-button type="primary" @click="updatedshop(updated._id)">确认修改商品信息</el-button>
    </el-row>
    <el-row style="margin-left:600px;margin-top:50px" v-if="islist==3">
          <el-button type="primary" @click="list">查看列表</el-button>
      </el-row>
  </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { MessageBox } from "element-ui";
export default {
  name: "itemManage",
  data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        search:'',
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          money: '',
          number: '',
          qualit:'',
          weight:'',
        },
        fileList: []
      };
      
    },
  methods: {
    ...mapActions("Item", ["getdataAsync","sureadd","searchshop","deltele","updatedshop","updatedimg"]),
    ...mapMutations("Item", ["openadd","list","alter","handlesuccess123","seteachpage","setcurpage"]),
    remove(id){
      this.deltele(id)
      this.getdataAsync();
    },
    sureaddshop(formLabelAlign){
      // console.log(formLabelAlign)
      this.sureadd(formLabelAlign);
      // console.log(this.formLabelAlign.name);
      this.formLabelAlign.name='';
      this.formLabelAlign.money='';
      this.formLabelAlign.number='';
      this.formLabelAlign.qualit='';
      this.formLabelAlign.weight='';
    },
    handleSizeChange(val) {
      this.seteachpage(val);
      this.getdataAsync()
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {       
        this.setcurpage(val);
         this.getdataAsync()
      },
    altersee(row){
      this.alter(row)
      this.updatedimg(row._id);
    },
    handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handlesuccess(res,file){
        this.handlesuccess123(res)
      },
      beforeRemove(file, fileList) {
        this.url='';
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
  },
  computed: {
    ...mapState("Item", ["shopList", "islist","issee","id","updated","url","imgid","curpage","eachpage","maxpage","total"])
  },
  mounted() {
    this.getdataAsync();
  }
};
</script>
<style>
.completed {
  
  text-decoration: line-through;
  color: red;
}
.add{
 
  width:650px;
  /* text-align: center; */
  margin:auto
}
.add input{
 margin-bottom: 30px;
 /* background-color: yellow */
}
</style>