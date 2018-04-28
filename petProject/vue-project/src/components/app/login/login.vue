





<template>
    <div class="dialog" >
        <div class="loginPage" >
            <el-row :gutter="24">
            <el-row :gutter="24">

                    <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
                        <el-card :body-style="{ padding: '0px' }" >
                        <!-- <img src="../../../assets/20121019194714_WRu8W.thumb.700_0.jpeg"  class="image"> -->
                        </el-card>
                    </el-col>

                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名:" prop="name">
                            <el-input type="txet" v-model="ruleForm2.username" auto-complete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="pass">
                            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                            <el-radio v-model="radio" label="门店管理员">门店管理员</el-radio>
                            <el-radio v-model="radio" label="平台管理员">平台管理员</el-radio>
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
        if (this.ruleForm2.name !== "") {
          this.$refs.ruleForm2.validateField("name");
        }
        callback();
      }
    };
    var validatename = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };

    return {
      ruleForm2: {
        pass: "",
        username: ""
      },
      rules2: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        name: [{ validator: validatename, trigger: "blur" }]
      },
      radio: "门店管理员"
    };
  },
  computed: {
    ...mapState("Login", ["isTrue", "userStatus","users",'userType'])
  },
  methods: {
    ...mapActions("Login", ["getUser"]),
    Login() {
        // 平台
        if(this.radio==="平台管理员"){
            if(this.ruleForm2.username==="123456"&&this.ruleForm2.pass==="123456"){
                alert('登录成功!');
                sessionStorage.setItem("users",JSON.stringify({
                    userAcount:this.ruleForm2.username,
                    userType:"平台管理员",
                    id:''
                }))
                this.$router.push('/info')
                return ;
            }
        }else if(this.radio==="门店管理员"){
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
                        sessionStorage.setItem('users',(JSON.stringify({
                            id:this.users,
                            userAcount:this.ruleForm2.username,
                            userType:this.radio
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
        }

      
    },
    Reg() {
      this.$router.push("/reg");
    }
  }
};
</script>
