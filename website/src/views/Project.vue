<script setup>
import axios from 'axios'
import { onMounted,reactive,ref } from 'vue';
import router from '../router/router';
import bus from '../utils/bus'
import { ElMessage } from 'element-plus'

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

const FormVisible = ref(false)

const formdata = reactive({
    name:'',
    content:'',
    place:'',
    workload:'',
    project_id:'',
    proType_id:'',
    notes:''
})

//创建子项目
const addrecord= () =>{
    axios.post('/api/sub/project/',formdata)
      .then((res)=>{
        if(res.data.code===0){
            ElMessage.success('子项目布成功！进入详情页查看')
            FormVisible.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
      })
}

//获取所有类型
const typeform = reactive({data:[]})
const getType = async() =>{
    try{
        let res = await axios.get('/api/table/type/')
        if(res.data.code===0){
            typeform.data=res.data.data
        }
    }catch(err){
        console.log(err)
    }
}

//获取所有项目
const projectform = reactive({data:[]})
const getProject = async() =>{
    try{
        let res = await axios.get('/api/project/')
        if(res.data.code===0){
            projectform.data=res.data.data
        }
    }catch(err){
        console.log(err)
    }
}

onMounted(()=>{
    getProject()
    getType()
})

const getDetail= (index,id) =>{
    bus.emit('projectinfo',projectform.data[index])
    router.push({name:'projectinfo',params:{id:id}})
}

</script>

<template>
    <div class="container">
        <el-card >
            <template #header>
                <div class="card-header">
                    <span>项目列表</span>
                    <el-button type="primary" class="button" @click="FormVisible = true">添加子项目</el-button>
                </div>
            </template>
            <el-table 
            :data="projectform.data" 
            style="width: 90%"
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

        <!-- 添加子项目 -->
        <el-dialog v-model="FormVisible" title="添加子项目">
            <el-form :model="formdata">
                <el-form-item label="项目名称:" prop="name">
                    <el-input v-model="formdata.name"/>
                </el-form-item>
                <el-form-item label="项目简介:" prop="content">
                    <el-input v-model="formdata.content" />
                </el-form-item>
                <el-form-item label="项目地点:" prop="place">
                    <el-input v-model="formdata.place" />
                </el-form-item>
                <el-form-item label="预计工作量:" prop="workload">
                    <el-input v-model.number="formdata.workload" />
                </el-form-item>
                <el-form-item label="所属项目" prop="project">
                    <el-select v-model="formdata.project_id" placeholder="请选择所属项目">
                        <el-option
                        v-for="item in projectform.data"
                        :label="item.name"
                        :value="item.project_id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目类型" prop="proType">
                    <el-select v-model="formdata.proType_id" placeholder="请选择所属项目">
                        <el-option
                        v-for="item in typeform.data"
                        :label="item.name"
                        :value="item.tableType_id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目备注" prop="notes">
                    <el-input 
                    v-model="formdata.notes"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible = false">取消</el-button>
                <el-button type="primary" @click="addrecord()">
                添加
                </el-button>
            </span>
            </template>
        </el-dialog>
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

