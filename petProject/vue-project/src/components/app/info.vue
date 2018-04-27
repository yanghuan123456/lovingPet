<template>
<el-container style="height: 620px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: #f6c593">
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
  
  <el-container>
    <el-header style="text-align: right; font-size: 16px;height:100px">
        <span style="display:inline-block;margin-right:540px;font-size:30px;color:#fff">爱宠大机密</span>
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>一组</span>
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