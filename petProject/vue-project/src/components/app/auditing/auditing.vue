<template>
<div class="jindu" >
<el-row>
  <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
<el-card :body-style="{ padding: '0px' }">
      <img src="../../../assets/20121019194714_WRu8W.thumb.700_0.jpeg"  class="image">
      <div style="padding: 14px;">
      <span>主人 正在审核中，请稍等哟~</span>
      </div>
      <div style="padding: 14px;">
      <el-button round type="danger" @click="gin">登录</el-button>
       </div>
       </el-card>
      </el-col>
</el-row>
</div>

</template>
<style scoped>
.jindu{
  margin-left:500px;
}
img{
  height:400px;
}
span{
  color:#ae6367;
}
</style>
<script>
export default{
  
  methods: {
    gin(){
          this.$router.push('/login')
    }
  }
}
    
</script>