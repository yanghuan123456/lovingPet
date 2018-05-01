<template>
    <div >
        <div v-if="isFlag">
            <div style="display:flex;flexDirection:row;width:450px;" >
                <el-button type="warning" @click="handleIncre()">增加</el-button>
                <el-input placeholder="请输入内容" v-model="textInput" class="input-with-select">
                    <el-select v-model="select" slot="prepend" placeholder="分类查询" >
                        <el-option label="门店" value="shopName"></el-option>
                        <el-option label="地址" value="shopAdd"></el-option>
                        <el-option label="特色" value="shopFeature"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
                </el-input>
            </div>
            <el-table
                border
                :data="rows"
                style="width: 100%;">
                <el-table-column
                label="门店"
                width="140">
                    <template slot-scope="scope">
                        <span >{{ scope.row.shopName }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="执照号"
                width="100" >
                    <template slot-scope="scope" style="">
                        <span >{{ scope.row.shopLicenceNum }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="执照"
                width="80">
                    <template slot-scope="scope">
                        <img :src="scope.row.shopLicenceImg" alt="执照" style="width:40px;"/>
                    </template>
                </el-table-column>
                <el-table-column
                label="地址"
                width="120">
                    <template slot-scope="scope">
                        <span >{{ scope.row.shopAdd }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="法人"
                width="80">
                    <template slot-scope="scope">
                        <span >{{ scope.row.shopCorporate }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="电话"
                width="130">
                    <template slot-scope="scope">
                        <span >{{ scope.row.shopTel }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                label="头图"
                width="80" >
                    <template slot-scope="scope">
                        <img :src="scope.row.shopImg" alt="头图" style="width:40px;" />
                    </template>
                </el-table-column>
                <el-table-column
                label="特色"
                width="80">
                <template slot-scope="scope">
                    <span >{{ scope.row.shopFeature }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="店员"
                width="100">
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.shopEmployee[0].empName }}</p>
                        <p>职级: {{ scope.row.shopEmployee[0].empLevel }}</p>
                        <p>电话: {{ scope.row.shopEmployee[0].empPhone }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.shopEmployee[0].empName }}</el-tag>
                        </div>
                    </el-popover>
                </template>
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row),dialogFormVisible = true"
                    >
                        修改
                    </el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="curpage"
                :page-sizes="[5, 10, 20, 30]"
                :page-size="eachpage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
        
        <!-- Form 增加-->
        <div v-if="!isFlag">
            <el-form ref="form" :model="form" label-width="80px" style="display:flex;flexDirection:row;">
                <div>
                    <el-form-item label="店名" style="width:400px;">
                        <el-input v-model="form.shopName"></el-input>
                    </el-form-item>
                    <el-form-item label="执照号" style="width:400px">
                        <el-input v-model="form.shopLicenceNum"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="地址" style="width:400px">
                        <el-input v-model="form.shopAdd"></el-input>
                    </el-form-item>
                    <el-form-item label="法人" style="width:400px">
                        <el-input v-model="form.shopCorporate"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" style="width:400px">
                        <el-input v-model="form.shopTel"></el-input>
                    </el-form-item>
                    <div style="display:flex;flexDirection:row">
                        <el-form-item label="头图" style="width:200px">
                            <el-upload
                                class="avatar-uploader"
                                action="/test/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="执照" style="width:200px">
                            <el-upload
                                class="avatar-uploader"
                                action="/test/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccessLicence"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                    </div>
                    
                </div>
                <div>
                    <el-form-item label="特色" style="width:400px">
                        <el-input v-model="form.shopFeature"></el-input>
                    </el-form-item>
                    <div style="display:flex;flexDirection:row">
                        <el-form-item label="店员" style="width:400px">
                            <el-input v-model="empName" placeholder="姓名："></el-input>
                            <el-input v-model="empLevel" placeholder="职位："></el-input>
                            <el-input v-model="empPhone" placeholder="电话："></el-input>
                            <el-button @click="addEmployee">添加店员</el-button>
                        </el-form-item>
                        <div v-for="(item,index) in form.shopEmployee" :key="index">
                            <table style="backgroundColor:#ebbfb7;marginLeft:30px;fleat:left" >
                                <tr >
                                    <td>姓名：{{item.empName}}</td>
                                </tr>
                                <tr >
                                    <td>职位：{{item.empLevel}}</td>
                                </tr>
                                <tr >
                                    <td>电话：{{item.empPhone}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <el-form-item>
                        <el-button type="primary"
                         @click="onSubmit()">增加</el-button>
                        <el-button @click="onCancel()">取消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>

        <!-- Form 修改-->
        <el-dialog title="修改信息" :visible.sync="dialogFormVisible"
            @close="handleClose"
            @open="handleOpen"
            >
            <el-form :model="upDate">
                <el-form-item label="门店" :label-width="formLabelWidth">
                    <el-input v-model="upDate.shopName" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="执照号" :label-width="formLabelWidth" >
                    <el-input v-model="upDate.shopLicenceNum" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="upDate.shopAdd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="法人" :label-width="formLabelWidth" >
                    <el-input v-model="upDate.shopCorporate" auto-complete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="upDate.shopTel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="特色" :label-width="formLabelWidth">
                    <el-input v-model="upDate.shopFeature" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item  :label-width="formLabelWidth" >
                    <el-form-item label="头图" style="width:200px">
                        <el-upload
                            class="avatar-uploader"
                            action="/shopStore/upload"
                            :show-file-list="false"
                            :on-success="handleUpdateSuccess2"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="执照" style="width:200px">
                        <el-upload
                            class="avatar-uploader"
                            action="/shopStore/upload"
                            :show-file-list="false"
                            :on-success="handleUpdateSuccess3"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form-item>
               
                <el-form-item label="店员" :label-width="formLabelWidth" v-for="(item,index) in upDate.shopEmployee" :key="index">
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="item.empName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" :label-width="formLabelWidth">
                        <el-input v-model="item.empLevel" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth">
                        <el-input v-model="item.empPhone" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false,handleUpdate()" >修改</el-button>
            </div>
        </el-dialog>
  </div>


</template>

<script>
import { mapMutations, mapState, mapGetters, mapActions } from "vuex";
    export default{
        name:"shopstoreManage", 
        data() {
            return {
                textInput: '',
                select: '',
                dialogFormVisible: false,
                form: {
                    shopName: '',
                    shopLicenceNum: '',
                    shopLicenceImg: '',
                    shopAdd: '',
                    shopCorporate: '',
                    shopTel:'',
                    shopImg: '',
                    shopFeature: '',
                    shopEmployee:[],    
                },
                empName: '',
                empLevel: '',
                empPhone:'',
                imageUrl: '',
                imageUrl1: '',
                imageUrl2: '',
                imageUrl3: '',
                formLabelWidth: '120px',
                dialogVisible: false,
                // 修改
                dialogFormVisible: false,
                formLabelWidth: '120px'
            }
        },
        computed:{
            ...mapState("ShopStore",["isFlag",'rows',"curpage","eachpage","maxpage","total",'upDate'])
        },
       
        methods: {
            ...mapMutations('ShopStore',['getImgUrl','handleIncre','setCurPage','setEachPage']),
            ...mapActions('ShopStore',['search','postStoreData','getStoreData','deleteData','getUpdate','postUpdate']),
            // 修改
            handleEdit(index, row) {
                this.getUpdate(row._id).then(()=>{
                    this.imageUrl2=this.upDate.shopImg
                    this.imageUrl3=this.upDate.shopLicenceImg
                })
            },
            handleClose() {
                // console.log("close")
                this.imageUrl=""
                this.imageUrl1=""
            },
            handleOpen(){
                // console.log(this.imageUrl)
                // console.log("open")
            },
            handleUpdate(){
                this.postUpdate(this.upDate)
                this.imageUrl=""
                this.imageUrl1=""
                this.getStoreData()
            },
            handleUpdateSuccess2(res, file) {
                this.upDate.shopImg=res
                this.imageUrl2 = URL.createObjectURL(file.raw);
            },
            handleUpdateSuccess3(res, file) {
                this.upDate.shopImg=res
                this.imageUrl3 = URL.createObjectURL(file.raw);
            },
            // 删除
            handleDelete(index, row) {
                this.deleteData(row._id) 
                this.getStoreData()
            },
            //添加门店数据
            onSubmit() {
                if(this.form.shopEmployee.length==0){
                    this.form.shopEmployee.push({empName:'',empLevel:'',empPhone:''})
                }
                this.postStoreData(this.form)
                this.form= {
                    shopName: '',
                    shopLicenceNum: '',
                    shopLicenceImg: '',
                    shopAdd: '',
                    shopCorporate: '',
                    shopTel:'',
                    shopImg: '',
                    shopFeature: '',
                    shopEmployee:[],    
                }
                this.imageUrl=""
                this.imageUrl1=""
                this.getStoreData()
            },
            // 取消
            onCancel(){
                this.form= {
                    shopName: '',
                    shopLicenceNum: '',
                    shopLicenceImg: '',
                    shopAdd: '',
                    shopCorporate: '',
                    shopTel:'',
                    shopImg: '',
                    shopFeature: '',
                    shopEmployee:[],    
                }
                this.handleIncre()
            },
            //添加员工
            addEmployee(){
                if(this.empName!=""){
                    this.form.shopEmployee.push({empName:this.empName,empLevel:this.empLevel,empPhone:this.empPhone})
                    this.empName=""
                    this.empLevel=""
                    this.empPhone=""
                } 
            },

            // 头像
            handleAvatarSuccess(res, file) {
                this.form.shopImg=res
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            // 执照
            handleAvatarSuccessLicence(res, file) {
                this.form.shopLicenceImg=res
                this.imageUrl1 = URL.createObjectURL(file.raw);
                // console.log(res)
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.setEachPage(val)
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.setCurPage(val)
            },
            // 查询
            handleSearch(){
                // console.log("in")
                this.search({type:this.select,value:this.textInput})
            },
            
        },
        mounted(){
                this.getStoreData()
        },
        watch:{
            
            eachpage(){
                this.getStoreData()
            },
            upDate(){
                this.getStoreData()
            },
            form(){
                this.getStoreData()
            }
        }
    }
</script>

<style>
    .el-select .el-input {
        width: 140px;
    },
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }
</style>