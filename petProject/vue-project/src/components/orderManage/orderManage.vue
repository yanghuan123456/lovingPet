<template>
<div>
<div v-if="isxiu"> 
   <el-table
    :data="orders"
    style="width: 100%">

        <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称：">
            <span>{{ props.row.goods.name }}</span>
          </el-form-item>
          <el-form-item label="商品单价：">
            <span>{{ props.row.goods.money }}</span>
          </el-form-item>
          <el-form-item label="店铺地址：">
            <span>{{ props.row.stores.shopAdd }}</span>
          </el-form-item>
          <el-form-item label="买家电话：">
            <span>{{ props.row.users.memberPhone }}</span>
          </el-form-item>
          <el-form-item label="送货地址：">
            <span>{{ props.row.dress }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="时间"
      width="160">
      <template slot-scope="scope">
        <i class="el-icon-date"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="门店"
      width="160">
      <template slot-scope="scope">
        <i class="el-icon-printer"></i>
        <span style="margin-left: 10px">{{ scope.row.stores.shopName}}</span>
      </template>
    </el-table-column>
     <el-table-column
      label="商品"
      width="100">
      <template slot-scope="scope">
        <i class="el-icon-goods"></i>
        <span style="margin-left: 10px">{{ scope.row.goods.name }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="数量"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.quantity }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="买家"
      width="160">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.users.memberAcount}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="订单状态"
      width="160">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.state }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="总价"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.quantity*scope.row.goods.money }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
       <div class="block" style="display: flex;justify-content: center;">
            <el-pagination @size-change="seteachpage" @current-change="setcurpage" :current-page="curpage" :page-sizes="[1,3,5,7]"
                :page-size="eachpage" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

</div>
<div v-else>
<el-radio-group v-model="labelPosition" size="small">
</el-radio-group>
<div style="margin: 20px;"></div>
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="数量：">
    <el-input style="width:500px" v-model="formLabelAlign.quantity"></el-input>
  </el-form-item>
  <el-form-item label="地址：">
    <el-input style="width:500px"  v-model="formLabelAlign.dress"></el-input>
  </el-form-item>
  <el-form-item label="状态：">
    <el-input style="width:500px" v-model="formLabelAlign.state"></el-input>
  </el-form-item>
  <div style="margin-left:85px">
<el-button type="warning" @click="save">保存</el-button>
  <el-button type="warning" @click="display">返回</el-button>
  </div>
  
</el-form>

</div>
</div>

</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "order",
  computed: {
    ...mapState("Order", [
      "orders",
      "curpage",
      "eachpage",
      "maxpage",
      "total",
      "isxiu",
      "labelPosition",
      "formLabelAlign"
    ])
  },

  created() {
    //   localStorage.setItem("users","5ae0330d380ae55643ea27a9")
      let users=sessionStorage.getItem("users")

      this.getuserId(users);
    this.getdataAsync();
  },
  methods: {
    ...mapActions("Order", ["getdataAsync", "putdata", "remove", "putData"]),
    ...mapMutations("Order", [
      "setcurpage",
      "seteachpage",
      "xiugai",
      "display",
      "getuserId"
    ]),
    handleDelete(i, r) {
      this.remove(r._id);
      this.getdataAsync();
    },
    handleEdit(i, row) {
      this.display();
      this.xiugai(row);
    },
    adddata() {
      this.putdata();
      this.getdataAsync();
    },
    save() {
      this.display();
      this.putData();
      this.getdataAsync();
    }
  },
  watch: {
    curpage() {
      this.getdataAsync();
    },
    eachpage() {
      this.getdataAsync();
    },
    total() {
      this.getdataAsync();
    }
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: red;
}
</style>