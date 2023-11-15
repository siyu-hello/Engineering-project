<script setup>
import service from "../utils/request";
import { onMounted,reactive,ref } from 'vue';
import router from '../router/router';
import bus from '../utils/bus'
import { ElMessage } from 'element-plus'
import userecordInfo from '../pinia/record'

const recordInfo = userecordInfo()

const formInfo = [
    {
        prop:'name',
        label:'名称',
        width:'200'
    },{
        prop:'content',
        label:'内容',
        width:'200'
    },{
        prop:'place',
        label:'地点',
        width:'200'
    },{
        prop:'workload',
        label:'预估工作量',
        width:'150'
    },
    {
        prop:'notes',
        label:'备注',
        width:'180'
    },
]

const FormVisible = ref(false)

const formdata = reactive({
    subPro_id:'',
    tableType_id:'',
    notes:''
})

//创建子项目

const createConfirm = ()=>{
    console.log(formdata)
    service.post('/record/',formdata)
      .then((res)=>{
        if(res.data.code===0){
            ElMessage.success('工单创建成功')
            FormVisible.value = false
            getRecord()
        }
        else{
            ElMessage.error('出错了！')
        }
      })
}

//清空
const closeDialog = () =>{
    for (let key in formdata) {
        formdata[key] = ' ';
      }

    FormVisible.value = false
}

//获取所有类型
const typeform = reactive({data:[]})
const getType = async() =>{
    try{
        let res = await service.get('/table/type/')
        if(res.data.code===0){
            typeform.data=res.data.data
        }
    }catch(err){
        console.log(err)
    }
}

//获取所有子项目
const recordform = reactive({data:[]})
const getRecord = async() =>{
    try{
        let res = await service.get('/sub/project/')
        if(res.data.code===0){
            recordform.data=res.data.data
            recordInfo.data = res.data.data
        }
    }catch(err){
        console.log(err)
    }
}

//获取子项目的相关附件


onMounted(()=>{
    getRecord()
    getType()
})

const getDetail= (index,id) =>{
    recordInfo.index = index
    bus.emit('recordinfo',recordform.data[index])
    router.push({name:'recordinfo',params:{id:id,index:index}})
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
            :data="recordform.data" 
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
                        <el-button type="primary" size="small" @click="getDetail(scope.$index, scope.row.subPro_id)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 添加子项目 -->
        <el-dialog v-model="FormVisible" title="创建工单" @close="closeDialog">
            <el-form :model="formdata">
                <el-form-item label="类型" prop="tableType_id">
                    <el-select v-model="formdata.tableType_id" placeholder="请选择所属项目">
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
                <el-button type="primary" @click="createConfirm()">
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