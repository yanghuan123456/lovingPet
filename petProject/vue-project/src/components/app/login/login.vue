<<<<<<< HEAD
<template>
   <div>
        <h1>ItemManage</h1>
    </div>
</template>

<script>
    export default{
        name:"itemManage",
    }
</script>

<style>

</style>
=======
<template>
    <div class="dialog" >
        <div class="loginPage" >
            <el-row :gutter="24">
            <el-row :gutter="24">

                    <!--<el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                        <el-card :body-style="{ padding: '0px' }" >
                         <img src="../../../assets/20121019194714_WRu8W.thumb.700_0.jpeg"  class="image"> 
                        </el-card>
                    </el-col>-->

                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="账号:" prop="username">
                            <el-input type="txet" v-model="ruleForm2.username" auto-complete="off" placeholder="账号或手机号"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="">
                            <el-radio v-model="radio" label="门店管理员">门店管理员</el-radio>
                            <el-radio v-model="radio" label="平台管理员">平台管理员</el-radio>
                            <el-checkbox v-model="checked" @change="handleCheckChange" :disabled="ban" >记住账号</el-checkbox>
                            <el-checkbox v-model="checked1" @change="handleCheckChange1" :disabled="ban1" >记住密码</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button round type="danger" @click="Login">登录</el-button>
                            <el-button round type="danger" @click="Reg">注册</el-button>
                        </el-form-item>
                    </el-form>
                    
                </el-row>
            </el-row>
        </div>
    </div>
</template>

<style scoped>
    img {
        width: 100px;
    }
    .el-col {
        margin-left: 55px;
    }
    html,
    body {
        margin: 0;
        padding: 0;
        position: relative;
    }
    .dialog {
        width: 100%;
        height: 100%;
        background-color: #d4bfa4;
    }
    .loginPage {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -190px;
        margin-left: -175px;
        width: 350px;
        min-height: 300px;
        padding: 30px 20px 20px;
        border-radius: 8px;
        box-sizing: border-box;
        background-color: #fff;
    }
</style>


<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (this.ruleForm2.name !== "") {
        //   this.$refs.ruleForm2.validateField("pass");
        // }
            this.ban1=false
            callback();
      }
    };
    var validatename = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'));
      } else {
            this.ban=false
            callback();
      }
    };

    return {
      ruleForm2: {
        pass: "",
        username:this.$route.params.username||""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validatename, trigger: "blur" }]
      },
      radio: "门店管理员",
      checked: false,
      checked1: false,
      ban:false,
      ban1:false,
    };
  },
  computed: {
    ...mapState("Login", ["isTrue", "userStatus","users",'userType','userAcount'])
  },
  methods: {
    ...mapActions("Login", ["getUser"]),
    handleCheckChange(){
        if(this.checked){
            // this.ban1=false
            localStorage.setItem("userAccount",JSON.stringify({
                username:this.ruleForm2.username,
                checked:this.checked
            }||{}))
        }else{
            // this.ban1=true
            localStorage.setItem("userAccount",{})
        }
    },
    handleCheckChange1(){
        if(this.checked1&&this.checked){
            localStorage.setItem("userPwd",JSON.stringify({
                pass:this.ruleForm2.pass,
                checked1:this.checked1
            }||{}))
        }else{
            localStorage.setItem("userPwd",{})
        }
    },
    Login() {
            this.getUser({
                userAcount: this.ruleForm2.username,
                userPwd: this.ruleForm2.pass,
                userType: this.radio
            }).then(() => {
                //平台登录
                if (this.isTrue == 1) {
                    if (this.userStatus == 0) {
                        this.$router.push("/auditing");
                    } else if (this.userStatus == 1) {
                        let id=this.users
                        if(this.userType==="平台管理员"){
                            id=""
                        }
                        sessionStorage.setItem('users',(JSON.stringify({
                            id,
                            userAcount:this.userAcount,
                            userType:this.userType
                        })))
                        this.$router.push("/info")
                    } else {
                        console.log("失败");
                    }
                } else {
                    this.$alert("用户名或者密码错误", "警告", {
                        confirmButtonText: "确定",
                        callback: action => {
                            this.$message({
                                type: "info",
                                message: `action: ${action}`
                            });
                        }
                    });
                }
            });
        

      
    },
    Reg() {
      this.$router.push("/reg");
    }
  },
  beforeMounted(){
      let obj,obj1
      if(localStorage.getItem("userAccount")&&!this.$route.params.username){
            obj=JSON.parse(localStorage.getItem("userAccount"))||{}
            if(obj.username){
                this.ban=false
                this.checked=obj.checked
                this.ruleForm2.username=obj.username
            }
            if(localStorage.getItem("userPwd")){
                obj1=JSON.parse(localStorage.getItem("userPwd")||"")
                if(obj1.pass){
                    this.ban1=false
                    this.checked1=obj1.checked1
                    this.ruleForm2.pass=obj1.pass
                }
            }
      }
      
      
      
      
  }
};
</script>
>>>>>>> bebf6fb41d797e2f5c95716a9909c748b6731e05
