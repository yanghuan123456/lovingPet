<template>
<div>
    <div>
      <el-input placeholder="请输入内容" v-model="input5">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="种类" value="1"></el-option>
          <el-option label="年龄" value="2"></el-option>
          <el-option label="品种" value="3"></el-option>
          <el-option label="毛色" value="4"></el-option>
          <el-option label="性别" value="5"></el-option>
          <el-option label="价格" value="6"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchBtn()"></el-button>
      </el-input>
    </div>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">宠物列表</el-menu-item>
            <el-menu-item index="2">宠物新增</el-menu-item>
        </el-menu>
    </div>
    <div v-if="isDisplay">
        <el-table
        :data="rows"
        border
        style="width: 100%"
        max-height="350"
        >
            <el-table-column
            align='center'
            fixed
            prop="variety"
            label="品种"
            width="150">
            </el-table-column>
            <el-table-column
            align='center'
            prop="name"
            label="种类"
            width="150">
            </el-table-column>
            <el-table-column
            align='center'
            prop="color"
            label="毛色"
            width="150">
            </el-table-column>
            <el-table-column
            align='center'
            prop="gender"
            label="性别"
            width="120">
            </el-table-column>
            <el-table-column
            align='center'
            prop="money"
            label="价格"
            width="120">
            </el-table-column>
            <el-table-column
            align='center'
            prop="age"
            label="年龄"
            width="120">
            </el-table-column>
            <el-table-column
            align='center'
            prop="photo"
            label="图片"
            width="120">
            <template slot-scope="scope">
              <img  :src="scope.row.photo" alt="" style="width: 50px;height: 50px">
            </template>      
            </el-table-column>
            <el-table-column
            align='center'
            fixed="right"
            label="操作"
            >
            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                <el-button type="text" size="small"  @click="handleUpdate(scope.row);updateVisible = true">修改</el-button>
                <el-button type="text" size="small"  @click="handleAddImage(scope.row);dialogVisible = true">增加图片</el-button>
                <!-- 增加图片对话框 -->
                <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="400px"
                    height="400px"
                    :modal="false"
                    :before-close="handleClose">                
                    <el-upload
                      class="upload-demo"
                      action="/addPetimg/upload"
                      multiple
                      :data="this.id"
                      :on-success="handleAvatarSuccess">
                      <el-button size="small" type="primary">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>


                    <span slot="footer" class="dialog-footer">
                      <el-button @click="dialogVisible = false">取 消</el-button>
                      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
                <!-- 修改对话框 -->
                <el-dialog
                    title="提示"
                    :visible.sync="updateVisible"
                    width="400px"
                    :modal="false"
                    :before-close="handleClose">
                    <el-form ref="form" :model="updateForm" label-width="80px">
                       <!-- <input type="hidden" v-model="updateForm.id"> -->
                        <el-form-item label="品种" style="width:300px">
                            <el-input v-model="updateForm.variety"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" style="width:300px">
                            <el-select v-model="updateForm.gender" placeholder="请选择性别">
                            <el-option label="公" value="公"></el-option>
                            <el-option label="母" value="母"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="种类" style="width:300px">
                            <el-input v-model="updateForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="毛色" style="width:300px">
                            <el-input v-model="updateForm.color"></el-input>
                        </el-form-item>
                        <el-form-item label="价格" style="width:300px">
                            <el-input v-model="updateForm.money"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" style="width:300px">
                            <el-input v-model="updateForm.age"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" style="width: 50px;height: 50px">
                            <!-- <el-input v-model="updateForm.photo"></el-input> -->

                    <el-upload
                        class="avatar-uploader"
                        action="/addPetimg/upload"
                        multiple
                        :data="this.id"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        >
                        <img :src="updateForm.photo" class="avatar">
                    </el-upload>

                            <!-- <div>
                              <img :src="updateForm.photo" alt="">
                            </div> -->
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="updateVisible = false">取 消</el-button>
                      <el-button type="primary" @click="confirmUpdate();updateVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </template>
            </el-table-column>
        </el-table>
    <!-- 分页 -->
        <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="curpage"
                    :page-sizes="[5,10, 20, 30]"
                    :page-size="eachpage"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
        </div>

    </div> 
    <div v-else style="width:400px;margin:auto">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="品种" style="width:300px">
                <el-input v-model="form.variety"></el-input>
            </el-form-item>
            <el-form-item label="性别" style="width:300px">
                <el-select v-model="form.gender" placeholder="请选择性别">
                <el-option label="公" value="公"></el-option>
                <el-option label="母" value="母"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="种类" style="width:300px">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
             <el-form-item label="毛色" style="width:300px">
                <el-input v-model="form.color"></el-input>
            </el-form-item>
             <el-form-item label="价格" style="width:300px">
                <el-input v-model="form.money"></el-input>
            </el-form-item>
            <el-form-item label="年龄" style="width:300px">
                <el-input v-model="form.age"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">增加</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>

</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";
export default {
  name: "petManage",
  watch: {
    curpage: {
      immediate: true,
      handler: "getPetByPageAsync"
    },
    eachpage() {
      this.getPetByPageAsync();
    }
  },
  methods: {
    ...mapActions("Pet", [
      "postPet",
      "getPetByPageAsync",
      "petImagePost",
      "updateConfirm",
      "search",
      "delete",
      "getPetImageAsync"
    ]),
    ...mapMutations("Pet", ["update", "setcurPage", "eachPage"]),
    //删除
    handleClick(row) {
      const { _id } = row;
      this.delete(_id);
    },
    handleAddImage(row) {
      this.id.id = row._id;
    },
    handleSelect(key, keyPath) {
      if (key == 1) {
        this._data.isDisplay = true;
      }
      if (key == 2) {
        this._data.isDisplay = false;
      }
    },
    handleSizeChange(val) {
      this.eachPage(val);
    },
    handleCurrentChange(val) {
      this.setcurPage(val);
    },
    //增加
    onSubmit() {
      this.postPet(this.form);
      this.getPetByPageAsync();
      this._data.isDisplay = true;
    },
    handleAvatarSuccess(res, file) {
      this.petImagePost(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 预备修改
    handleUpdate(row) {
      this.update(row);
      this.getPetImageAsync(row)
    },
    //确认修改
    confirmUpdate() {
      this.updateConfirm(this.updateForm);
    },
    //搜索
    searchBtn() {
      let item = {
        choice: this.select,
        text: this.input5
      };
      this.search(item);
      this.input5 = ""
    }
  },
  computed: {
    ...mapState("Pet", [
      "curpage",
      "eachpage",
      "maxpage",
      "total",
      "rows",
      "pet",
      "id",
      "updateForm",
      "petImages"
    ])
  },
  data() {
    return {
      input5: "",
      select: "",
      isDisplay: true,
      dialogVisible: false,
      updateVisible: false,
      activeIndex: "1",
      activeIndex2: "1",
      imageUrl: "",
      form: {
        photo: "",
        variety: "",
        name: " ",
        color: "",
        gender: "",
        money: "",
        age: ""
      }
    };
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: red;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>