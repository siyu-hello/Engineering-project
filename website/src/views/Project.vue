<script setup>
import axios from 'axios'
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

const FormVisible = ref(false)
const FormRef = ref(null)
const form = reactive({
    name:'',
    code:'',
    money:'',
    content:'',
    place:'',
    workload:'',
    notes:''
})

const rules = {
    name:{required: true, message: '请输入项目名', trigger: 'blur'},
    code:{required: true, message: '请输入项目编号', trigger: 'blur'},
    money:[
        { required: true,message: '请输入项目金额', trigger: 'blur'},
        { type:'number',message: '请输入数字'},
    ],
    content:{required: true, message: '请输入项目简介', trigger: 'blur'},
    place:{required: true, message: '请输入项目地点', trigger: 'blur'},
    workload:[
        {required: true, message: '请输入预计工作量', trigger: 'blur'},
        { type:'number',message: '请输入数字'},
    ]
}

const reset= () =>{
    FormRef.value.resetFields()
    form.notes = ''
}

const upload= () =>{
    if (!FormRef.value) return
    FormRef.value.validate((valid) => {
    if (valid) {
      axios.post('/api/project/',form)
      .then((res)=>{
        if(res.data.code===0){
            ElMessage.success('项目发布成功！进入项目页面查看')
            FormRef.value.resetFields()
            FormVisible.value = false
            getProject()
        }
        else{
            ElMessage.error('出错了！')
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

//获取所有项目
const projectform = reactive({data:[]})
const getProject = async() =>{
    try{
        let res = await axios.get('/api/project/')
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
                    <div class="btn">
                        <el-button type="primary" class="button" @click="FormVisible = true">+发布项目</el-button>
                    </div>
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
                <el-table-column fixed="right" label="操作"  width="150">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="getDetail(scope.$index, scope.row.project_id)">子项目信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 创建工单 -->
        <el-dialog v-model="FormVisible" title="发布项目">
            <el-form
                ref="FormRef"
                :model="form" 
                label-width="120px" 
                :rules="rules">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="form.name" />
                    </el-form-item>
                    <el-form-item label="项目编号"  prop="code">
                        <el-input v-model="form.code" />
                    </el-form-item>
                    <el-form-item label="项目金额"  prop="money">
                        <el-input v-model.number="form.money" placeholder="请输入数字" />
                    </el-form-item>
                    <el-form-item label="项目简介"  prop="content">
                        <el-input 
                        v-model="form.content"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        type="textarea" />
                    </el-form-item>
                    <el-form-item label="项目地点"  prop="place">
                        <el-input v-model="form.place" />
                    </el-form-item>
                    <el-form-item label="预估工作量"  prop="workload">
                        <el-input v-model.number="form.workload" placeholder="请输入数字" />
                    </el-form-item>
                    <el-form-item label="备注"  prop="notes">
                        <el-input 
                        v-model="form.notes"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        type="textarea" />
                    </el-form-item>
                </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible = false">取消</el-button>
                <el-button @click="reset()">重置</el-button>
                <el-button type="primary" @click="upload(FormRef)">
                发布
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
.btn{
    margin-right: 100px;
}
.el-table{
    margin: auto;
}
</style>