<script setup>
import { onMounted,reactive,ref } from 'vue';
import bus from '../utils/bus'
import axios from 'axios'

const infoForm = reactive({data:{}})
const recordForm = reactive({data:[]})


//查询子项目
const getRecord = async() =>{
    try{
        let res = await axios.get('/api/sub/project/')
        if(res.data.code===0){
            recordForm.data=res.data.data
        }
    }catch(err){
        console.log(err)
    }
}

const getinfo = () => {
    bus.off('projectinfo')
    bus.on('projectinfo', (form) => {
        infoForm.data ={...form}
        console.log(form)
        console.log(infoForm.data)
  })
}

// 生命周期中监听
onMounted(()=>{
    getinfo()
    getRecord()
})

</script>

<template>
    <div class="container">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <span>项目详情</span>
                        <el-button v-if="username=='owner'" type="primary" class="button" @click="FormVisible = true">添加子项目</el-button>
                    </div>
                </template>
                <el-descriptions class="description" column="1">
                    <el-descriptions-item label="项目名称:">{{ infoForm.data.name }}</el-descriptions-item>
                    <el-descriptions-item label="项目编号:">{{ infoForm.data.code }}</el-descriptions-item>
                    <el-descriptions-item label="项目金额:">{{ infoForm.data.money }}</el-descriptions-item>
                    <el-descriptions-item label="预估工作量:">{{ infoForm.data.workload }}</el-descriptions-item>
                    <el-descriptions-item label="建设单位名称:">{{ infoForm.data.ownerUnit }}</el-descriptions-item>
                    <el-descriptions-item label="项目地点:">{{ infoForm.data.place }}</el-descriptions-item>
                    <el-descriptions-item label="项目简介:">{{ infoForm.data.constant }}</el-descriptions-item>
                    <el-descriptions-item label="项目备注:">{{ infoForm.data.notes }}</el-descriptions-item>
                </el-descriptions>
            </el-card>
        <div class="record">

        </div>
    </div>
</template>

<style scoped>
.container{
    width: 100%;
}
.el-card{
    width: 80%;
    margin: auto;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.description{
    word-wrap: break-word;
    text-align: left;
    white-space:pre-wrap; 
}
</style>

