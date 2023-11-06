<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { HomeFilled,Upload,Setting,Tickets } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '../router/router';
const activeindex = ref(location.pathname)
const dialogVisible = ref(false)
const type = sessionStorage.getItem('username')

const outLogin = () =>{
    axios.delete('/api/logout/')
    .then((res)=>{
        if(res.data.code===0){
            sessionStorage.clear()
            document.cookie = ''
            ElMessage.success('退出登录成功！')
            router.push('/login')
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}
</script>

<template>
    <div class="container">
        <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        :default-active= "activeindex"
        text-color="#fff"
        :router="true"
       >
       <el-menu-item index="/index">
          <el-icon><HomeFilled /></el-icon>
          <span>平台首页</span>
        </el-menu-item>
        <el-menu-item v-if="type=='owner'" index="/project">
          <el-icon><Tickets /></el-icon>
          <span>项目列表</span>
        </el-menu-item>
        <el-menu-item v-if="type=='owner'" index="/upload">
          <el-icon><Upload /></el-icon>
          <span>发布项目</span>
        </el-menu-item>
        <el-menu-item index="/record">
          <el-icon><Tickets /></el-icon>
          <span>我的项目</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <el-icon><Setting /></el-icon>
          <span>设置</span>
        </el-menu-item>
      </el-menu>
      <div class="outLogin" @click="dialogVisible=true">
        <p>
            退出>>
        </p>
      </div>

      <el-dialog
        class="dialog"
        v-model="dialogVisible"
        title="提示"
        width="30%"
        align-center
      >
        <span>确定退出吗？</span>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="outLogin()">
            确定
            </el-button>
        </span>
        </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.container{
    background-color: #545c64;
    width: 100%;
    height: 100%;
    color: #fff;
    position: relative;
}
.el-avatar{
    margin-top: 20px;
}
.el-menu{
  font-size: 10px;
    border:0!important;
}
.outLogin{
    width: 100%;
    font-size: 14px;
    cursor: pointer;
    border-top: solid .5px #ffd04b;
    position: absolute;
    bottom: 0;
}
.outLogin :hover{
    color: #ffd04b;
}
</style>