<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { User,Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import router from '../router/router';

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
            <h2>登 录</h2>
            <el-form 
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
                    v-model="ruleForm.password"
                    size="large"
                    placeholder="请输入密码"
                    :prefix-icon="Lock">
                    </el-input>
                </el-form-item>
                <el-form-item lable="username">
                    <el-button type="primary" @click="login()">Submit</el-button>
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
}
.card{
    width: 300px;
    line-height: 60px;
}
.el-button{
    margin: auto;
}
</style>
