<template>
    <div>
        <h1>注册页面</h1>
        <div>
            <input type="text" v-model="username">
        </div>
        <div>
            <input type="text">
        </div>
        <input type="button" value="注册" @click="Reg">
    </div>
</template>

<script>
    export default{
        name:"login",
        data(){
            return {
                username:""
            }
        },
        methods:{
            Reg(){
                this.$router.push(`/login/${this.username||" "}`)
            }
        }
    }
</script>

<style>

</style>