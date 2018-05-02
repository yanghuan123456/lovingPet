<template>
<el-row :gutter="24">
        <el-col :span="8"><div class="grid-content bg-purple">..</div></el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="账号: " prop="userAcount">
                        <el-input type="text" v-model="ruleForm2.userAcount" auto-complete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="密码: " prop="userPwd">
                        <el-input type="password" v-model="ruleForm2.userPwd" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码: " prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:" prop="userName">
                        <el-input v-model="ruleForm2.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" prop="userPhone">
                        <el-input v-model.number="ruleForm2.userPhone"></el-input>
                    </el-form-item>
                    <el-form-item
                        prop="userMail"
                        label="邮箱:"
                    >
                        <el-input v-model="ruleForm2.userMail"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="danger" round @click="submitForm('ruleForm2')">注册</el-button>
                        <el-button type="danger" round @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
        <el-col :span="8"><div class="grid-content bg-purple">..</div></el-col>
    </el-row>
</template>

<script>
    import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        userName:"reg",
        data() {
            var checkuserAcount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('账号不能为空'));
                }
                setTimeout(() => {
                    if (value-0 < 2||value.length<2) {
                        callback(new Error('必须不少2位'));
                    } else {
                        this.queryDataType({userAcount:value}).then(()=>{
                            if(this.userAcountStatus==1){
                                callback(new Error('已注册'));
                            }else{
                                callback();
                            }
                        })
                        
                    }
                }, 1000);
            };//账号
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };//密码
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.userPwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };//确认密码

            var validatename =(rule, value, callback) =>{
                if (value === '') {
                    callback(new Error('请输入姓名'));
                }else {
                    callback();
                }
            };//姓名
            var validateuserMail =(rule, value, callback) =>{
                let rel=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!value) {
                    return callback(new Error('邮箱不能为空'));
                }else if(!rel.test(value)){
                    callback(new Error('邮箱格式不正确'));
                }
                else {
                    this.queryDataType({userMail:value}).then(()=>{
                        if(this.userAcountStatus==1){
                            callback(new Error('已使用'));
                        }else{
                            callback();
                        }
                    })
                }
            };//邮箱
            var validatemobil = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入电话号码'));
                } else if (!Number.isInteger(value)) {
                    callback(new Error('电话号码必须是数字'));
                } else if (value.toString().length != 11) {
                    callback(new Error('电话号码必须是11位'));
                } else {
                    this.queryDataType({userPhone:value}).then(()=>{
                        if(this.userAcountStatus==1){
                            callback(new Error('已使用'));
                        }else{
                            callback();
                        }
                    })
                }
            };//手机号
            
            return {
                ruleForm2: {
                    userPwd: '',
                    checkPass: '',
                    userAcount: '',
                    userMail:'',
                    userName:'',
                    userPhone:''
                },
                

                rules2: {
                    userPwd: [{ 
                        validator: validatePass, 
                        trigger: 'blur' 
                    }],
                    checkPass: [{ 
                        validator: validatePass2, 
                        trigger: 'blur' 
                    }],
                    userAcount: [{ 
                        validator: checkuserAcount, 
                        trigger: 'blur' 
                    }],
                    userName:[
                        {validator: validatename, trigger: 'blur' }
                    ],
                    userMail:[
                        {validator: validateuserMail, trigger: 'blur' }
                    ],
                    userPhone:[
                        {validator: validatemobil, trigger: 'blur' }
                    ],
                }
            };
        },
        computed:{
            ...mapState('Reg',['userAcountStatus'])
        },
        methods: {
            ...mapActions('Reg',['getUser','queryDataType']),
            // 注册
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        delete this.ruleForm2.checkPass
                        this.getUser(this.ruleForm2)
                        alert('注册成功!');
                        this.$router.push(`/login/${this.ruleForm2.userAcount||" "}`)
                    } else {
                        console.log('注册失败!!');
                        return false;
                    }
                });
            },
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
            
        }
    }
</script>

<style>
    .el-row {
        margin-top: 100px;
    }
    html,body{
        margin: 0;
        padding: 0;
        position: relative;
    }
</style>