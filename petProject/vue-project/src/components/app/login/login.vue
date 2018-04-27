<template>
    <!-- <div>
        <h1>登录页面</h1>
        <div>
            <input type="text" v-model="username">
        </div>
        <div>
            <input type="password" >
        </div>
        <input type="button" value="登录"  @click="Login">
        <input type="button" value="注册" @click="Reg">
    </div> -->
    
    <el-row :gutter="24">
        <el-col :span="8"><div class="grid-content bg-purple">..</div></el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-form  status-icon  label-width="100px" >
                    <el-form-item label="用户名：" prop="username">
                        <el-input type="text" v-model="username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码：" prop="pass">
                        <el-input type="password" v-model="pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="Login">登录</el-button>
                        <el-button @click="Reg">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
        <el-col :span="8"><div class="grid-content bg-purple">..</div></el-col>
    </el-row>
</template>

<script>
    export default{
        name:"login",
        data(){
            return {
                username:this.$route.params.username,
                pass:""
            }
        },
        methods:{
            Login(){
                this.$router.push('/info')
            },
            Reg(){
                this.$router.push('/reg')
            }
        }
    }
</script>

<style>
    .el-row {
        margin-top: 100px;
    }
</style>

