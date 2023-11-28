<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { User,Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '../router/router';

const getGurrentTime = () => {
      let yy = new Date().getFullYear();
      let mm = (new Date().getMonth() + 1) < 10 ? '0' + (new Date().getMonth()+1) : (new Date().getMonth()+1);
      let dd = (new Date().getDate()) < 10 ? '0' + (new Date().getDate()) : (new Date().getDate());
      let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      return  yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss;
}

const checkusername = (rules,value,callback) =>{
    if(value === ''){
        callback(new Error('请输入用户名'))
    }
}
const checkpassword = (rules,value,callback) =>{
    if(value === ''){
        callback(new Error('请输入密码'))
    }
}

const ruleForm = reactive({
    username:'',
    password:''
})

const rules = {
    username:{validator:checkusername,trigger:'blur'},
    password:{validator:checkpassword,trigger:'blur'}
}

const login=()=>{
    axios.post('/api/login/',ruleForm)
    .then((res)=>{
        if(res.data.code === 0){
            sessionStorage.setItem("sessionid",res.data.data.sessionid)
            sessionStorage.setItem("username",res.data.data.username)
            sessionStorage.setItem("is_type",res.data.data.is_type)
            let username = res.data.data.username
            if(username=='owner'){
                sessionStorage.setItem("usercompany","建设单位")
            }else if(username=='design'){
                sessionStorage.setItem("usercompany","设计单位")
            }else if(username=='construct'){
                sessionStorage.setItem("usercompany","施工单位")
            }else{
                sessionStorage.setItem("usercompany","监理单位")
            }
            let logintime = getGurrentTime()
            sessionStorage.setItem("logintime",logintime)

            ElMessage.success('登录成功，欢迎！')
            router.push('/homepage');
        }
        else{
            ElMessage.error('账户名或密码错误！')
        }
    })
}
</script>

<template>
    <div class="container">
        <el-card 
        class="card"
        :body-style="{ padding: '0px' }">
            <h2>财政投资全过程实时管控平台</h2>
            <el-form 
            ref="FormRef"
            :model="ruleForm"
            :rules="rules"
            status-icon>
                <el-form-item prop="username">
                    <el-input 
                    v-model="ruleForm.username"
                    size="large"
                    placeholder="请输入用户名"
                    :prefix-icon="User">
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input 
                    :show-password="true"
                    v-model="ruleForm.password"
                    size="large"
                    placeholder="请输入密码"
                    :prefix-icon="Lock">
                    </el-input>
                </el-form-item>
                <el-form-item lable="username">
                    <el-button type="primary" @click="login()">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<style scoped>
.container{
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(244, 245, 245);
}
.card{
    width: 350px;
    line-height: 60px;
}
.el-button{
    margin: auto;
}
</style>
