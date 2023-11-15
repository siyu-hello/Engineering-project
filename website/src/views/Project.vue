<script setup>
import axios from 'axios'
import service from "../utils/request";
import { onMounted,reactive,ref } from 'vue';
import router from '../router/router';
import bus from '../utils/bus'
import { ElMessage } from 'element-plus'
import useProjectInfo from '../pinia/project'

const projectInfo = useProjectInfo()
const projecttotal = ref()

const formInfo = [{
        prop:'code',
        label:'编号',
        width:'90'
    },{
        prop:'name',
        label:'名称',
        width:'150'
    },{
        prop:'money',
        label:'金额',
        width:'80'
    },{
        prop:'ownerUnit',
        label:'建设单位',
        width:'150'
    },{
        prop:'content',
        label:'简介',
        width:'180'
    },{
        prop:'place',
        label:'地点', 
        width:'150'
    },{
        prop:'workload',
        label:'预估工作量',
        width:'100'
    },{
        prop:'notes',
        label:'备注',
        width:'180'
    },
]

//获取所有项目
const projectform = reactive({data:[]})
const getProject = async() =>{
    try{
        let res = await service.get('/project/')
        if(res.data.code===0){
            projectform.data=res.data.data
            projectInfo.data = res.data.data
            projecttotal.value = res.data.data.length
        }
    }catch(err){
        console.log(err)
    }
}

onMounted(()=>{
    getProject()
})

const getDetail= (index,id) =>{
    projectInfo.index=index
    bus.emit('projectinfo',projectform.data[index])
    router.push({name:'projectinfo',params:{id:id,index:index}})
}

</script>

<template>
    <div class="container">
        <el-card >
            <template #header>
                <div class="card-header">
                    <span>项目列表</span>
                </div>
            </template>
            <el-table 
            :data="projectform.data" 
            style="width: 95%"
            :header-cell-style="{ textAlign: 'center' }"
            :cell-style="{ textAlign: 'center' }">
                <el-table-column 
                v-for="item in formInfo" 
                :prop="item.prop" 
                :label="item.label" 
                :width="item.width"
                :show-overflow-tooltip="true" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="getDetail(scope.$index, scope.row.project_id)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<style scoped>
.container{
    width: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-table{
    margin: auto;
}
</style>