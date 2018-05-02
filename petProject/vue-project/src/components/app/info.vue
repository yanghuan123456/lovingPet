
<template>
    <el-container style="height: 620px; border: 1px solid #eee">
        <!--平台管理员-->
        <el-aside v-if="isFlag" width="200px" style="background-color: #f6c593">
            <el-menu
                    default-active="1"
                    router
                    style="background-color:#f6c593;marginTop:100px;"
                    class="el-menu-vertical-demo">  
                    <el-menu-item index="/info/ueserManage" >
                        <span slot="title" style="fontSize:18px">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/info/serviceManage">
                        <span slot="title" style="fontSize:18px">服务管理</span>
                    </el-menu-item>
                    <el-menu-item index="/info/shopstoreManage">
                        <span slot="title" style="fontSize:18px">门店管理</span>
                    </el-menu-item>
                    <el-menu-item index="/info/itemManage">
                        <span slot="title" style="fontSize:18px">商品管理</span>
                    </el-menu-item>
                    <el-menu-item index="/info/pethostManage">
                        <span slot="title" style="fontSize:18px">宠主管理</span>
                    </el-menu-item>
                    <el-menu-item index="/info/petManage">
                        <span slot="title" style="fontSize:18px">宠物管理</span>
                    </el-menu-item>
                    <el-menu-item index="/info/orderManage">
                        <span slot="title" style="fontSize:18px;">订单管理</span>
                    </el-menu-item>
                </el-menu>
        </el-aside>
        <!--门店管理员-->
        <el-aside v-if="!isFlag" width="200px" style="background-color: #f6c593">
            <el-menu
                default-active="1"
                router
                style="background-color:#f6c593;marginTop:100px;"
                class="el-menu-vertical-demo">  
                
                <el-menu-item index="/info/serviceManage">
                    <span slot="title" style="fontSize:18px">服务管理</span>
                </el-menu-item>
                <el-menu-item index="/info/shopstoreManage">
                    <span slot="title" style="fontSize:18px">门店管理</span>
                </el-menu-item>
                <el-menu-item index="/info/itemManage">
                    <span slot="title" style="fontSize:18px">商品管理</span>
                </el-menu-item>
                <el-menu-item index="/info/pethostManage">
                    <span slot="title" style="fontSize:18px">宠主管理</span>
                </el-menu-item>
                <el-menu-item index="/info/petManage">
                    <span slot="title" style="fontSize:18px">宠物管理</span>
                </el-menu-item>
                <el-menu-item index="/info/orderManage">
                    <span slot="title" style="fontSize:18px;">订单管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header style="text-align: right; font-size: 16px;height:100px">
                <span style="display:inline-block;margin-left:340px;float:left;font-size:30px;color:#fff">爱宠大机密</span>
                <i style="display:inline-block;marginRight:20px;marginTop:20px"><img :src="phoneUrl" style="width:40px;display:inline-block;" ></i>
                <el-dropdown v-if="selectStatus"  @command="onlinehandleCommand"  >
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="reg">注册</el-dropdown-item>
                        <el-dropdown-item command="signOut">注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown v-if="!selectStatus" @command="outlinehandleCommand">
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="reg">注册</el-dropdown-item>
                    <el-dropdown-item command="login">登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{this.user.username}}</span>
            </el-header>
            
            <el-main style="background-color:#f6c593;" class="note" :style ="note">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                note: {
                    backgroundImage: "url(" + require("../../assets/bg.jpg") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "auto",
                },
                user:{
                    username:"",
                    type:""
                },
                isFlag:false,
                selectStatus:false,
                phoneUrl:'/photoImg/photo.jpeg'
            }
        },

        beforeMount(){
            let data=JSON.parse(sessionStorage.getItem("users")||"")
            this.user.type=data.userType
            this.user.username=data.userAcount
            if(this.user.type==="平台管理员"){
                this.isFlag=true
            }
            if(data.userAcount){
                this.selectStatus=!this.selectStatus
            }
        },
        methods:{
            getIsFlag(){
                this.isFlag=!this.isFlag
            },
            onlinehandleCommand(command) {
                if(command==="signOut"){
                    sessionStorage.setItem("users",JSON.stringify({}))
                    this.selectStatus=!this.selectStatus
                    this.$router.push(`/`)
                    
                }else if(command==="reg"){
                    this.$router.push(`/reg`)
                }
            },
            outlinehandleCommand(command) {
                if(command==="login"){
                    this.$router.push(`/`)

                }else if(command==="reg"){
                    this.$router.push(`/reg`)
                }
            }
        }
    }
</script>
    
<style>
    .el-header {
        background-color: #f6c593;
        color: #fff;
        line-height: 100px;
    }
  .el-aside {
        color: #fff;
    }
</style>