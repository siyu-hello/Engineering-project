<script setup>
import { RefreshRight,HomeFilled } from '@element-plus/icons-vue'
import router from '../router/router';

const reload = () =>{
    location.reload()
}
const gohome = () =>{
    router.push('/index')
}
</script>

<template>
    <div class="container">
        <el-icon class="reload" color=" #ffd04b" size="23" @click="reload()"><RefreshRight /></el-icon>
        <el-icon class="home" color=" #ffd04b" size="23" @click="gohome()"><HomeFilled /></el-icon>
        <h3>财政投资全过程实时管控平台</h3>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="30"/>
    </div>
</template>

<style scoped>
.container{
    width: 100%;
    height: 80%;
    background-color: #4a5259;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.reload{
    position: absolute;
    left: 3%;
    cursor: pointer;
}
.home{
    position: absolute;
    left: 6%;
    cursor: pointer;
}
h3{
    color: #fff;
    font-weight: 400;
}
.el-avatar{
    position: absolute;
    right: 4%;
}
</style>