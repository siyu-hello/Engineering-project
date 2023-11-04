<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios'
import { useRoute } from 'vue-router'
import userecordInfo from '../pinia/record'
import { ElMessage } from 'element-plus'


const route = useRoute()
const recordInfo = userecordInfo()
const infoForm = reactive({ data: {} })

const FormVisible1 = ref(false)
const FormVisible2 = ref(false)

const formdata = reactive({
    subPro_id:'',
    tableType_id:'',
    notes:''
})

const filedata = reactive({
    name:'',
    record_id:'',
    file:''
})

//创建工单

const createConfirm = ()=>{
    formdata.subPro_id = route.params.id
    axios.post('/api/record/',formdata)
      .then((res)=>{
        if(res.data.code===0){
            ElMessage.success('工单创建成功')
            getorder()
            FormVisible1.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
      })
}

//上传附件
const handleChange = (file) =>{filedata.file = file.raw;}
const uploadFile = () =>{
    filedata.record_id = route.params.id
    const Data = new FormData();
    for (let[key,value] of Object.entries(filedata)) {
        Data.append(key, value)
    }
    axios.post('/api/file/',Data)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('附件上传成功')
            getFile()
            FormVisible2.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 下载附件
const handledown = (url,fileName) =>{
    axios.get(`/api/media/${url}`, {
        responseType: 'blob', // 设置响应类型为 Blob，以便处理文件
    }).then(
        res => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(res.data);
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        },
        err=>{
        console.log(err)
         }
    )
}

// 删除附件
const handleDelete = (id) =>{
    console.log(id)
    axios.delete('/api/file/',{data:{"file_id":id}})
    .then((res)=>{
        console.log(res)
        if(res.data.code==0){
            ElMessage.success('删除成功')
            getFile()
        }
        else{
            ElMessage.error('出错了！')
        }
    })
    .catch((err)=>{console.log(err)})
}

//清空
const closeDialog1 = () =>{
    for (let key in formdata) {
        formdata[key] = ' ';
      }

    FormVisible1.value = false
}
const closeDialog2 = () =>{
    for (let key in filedata) {
        filedata[key] = ' ';
      }

    FormVisible2.value = false
}


const getinfo = async () => {
    // pinia刷新时不会保留数据，需要重新获取
    if (recordInfo.data.length === 0) {
        try {
            let res = await axios.get('/api/sub/project/')
            if (res.data.code === 0) {
                recordInfo.data = res.data.data
            }
        } catch (err) {
            console.log(err)
        }
    }
}

//获取所有的工单
const orderForm = reactive({ data: [] }) 
var j = 0
const getorder = () =>{
    axios.get('/api/record/')
    .then((res)=>{
        if(res.data.code==0){
            let data = res.data.data
            j=0
            for(let i in data){
                if(data[i].project_id==route.params.id){
                    orderForm.data[j]=data[i]
                    j++
                }
            }
        }
    })
}

// 获取所有的附件
const filelist = reactive({data:[]})
const getFile = () =>{
    axios.post('/api/seek/file/',{
        "record_id":route.params.id
    })
    .then((res)=>{
        if(res.data.code == 0){
            filelist.data = res.data.data
        }
        console.log(filelist.data)
    })
}

const list = [
    {
        prop:'name',
        label:'名称',
        width:'400'
    },
    {
        prop:'company',
        label:'单位',
        width:'200'
    }
]

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

// 生命周期中监听
onMounted(async () => {
    // 加载项目信息
    await getinfo()
    infoForm.data = recordInfo.data[route.params.index]
    console.log(infoForm.data)
    getType()
    getFile()
    getorder()
})


</script>

<template>
    <div class="container">
        <el-card class="projectcard">
            <template #header>
                <div class="card-header">
                    <span>项目详情</span>
                    <div class="btn">
                    <el-button type="primary" class="button" @click="FormVisible1 = true">+创建工单</el-button>
                    <el-button type="primary" class="button" @click="FormVisible2 = true">+上传附件</el-button>
                    </div>
                </div>
            </template>
            <el-descriptions class="description" :column="1">
                <el-descriptions-item label="项目名称:">{{ infoForm.data.name }}</el-descriptions-item>
                <el-descriptions-item label="项目内容:">{{ infoForm.data.content }}</el-descriptions-item>
                <el-descriptions-item label="项目地点:">{{ infoForm.data.place }}</el-descriptions-item>
                <el-descriptions-item label="预估工作量:">{{ infoForm.data.workload }}</el-descriptions-item>
                <el-descriptions-item label="建设单位:">{{ infoForm.data.ownerUnit }}</el-descriptions-item>
                <el-descriptions-item label="设计单位:">{{ infoForm.data.designUnit }}</el-descriptions-item>
                <el-descriptions-item label="监理单位:">{{ infoForm.data.superviseUnit }}</el-descriptions-item>
                <el-descriptions-item label="施工单位:">{{ infoForm.data.constructUnit }}</el-descriptions-item>
                <el-descriptions-item label="勘察单位:">{{ infoForm.data.surveyUnit }}</el-descriptions-item>
                <el-descriptions-item label="项目备注:">{{ infoForm.data.notes }}</el-descriptions-item>
            </el-descriptions>
        </el-card>

        <!-- 附件列表 -->
        <div class="file">
            <h2>附件列表</h2>
            <el-empty v-if="filelist.data==''" :image-size="100" />
            <el-table v-else :data="filelist.data" style="width: 80%" :header-cell-style="{ textAlign: 'center' }" :cell-style="{ textAlign: 'center' }">
                <el-table-column 
                v-for="item in list" 
                :prop="item.prop" 
                :label="item.label" 
                :width="item.width"
                :show-overflow-tooltip="true" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handledown(scope.row.path,scope.row.name)">下载</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row.file_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <!--工单列表 -->
        <div class="order">
            <h2>工单列表</h2>
            <el-empty v-if="orderForm.data==''" :image-size="100" />
            <el-timeline v-else>
                <el-timeline-item v-for="(item,index) in orderForm.data" center  placement="top">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>{{ item.name }}</span>
                        </div>
                    </template>
                    <el-descriptions class="description" :column="1">
                        <el-descriptions-item label="工单名称:">{{ item.name }}</el-descriptions-item>
                        <el-descriptions-item label="工单状态:">{{ item.state }}</el-descriptions-item>
                        <el-descriptions-item label="建设单位意见:">{{ item.ownerOp }}</el-descriptions-item>
                        <el-descriptions-item label="设计单位意见:">{{ item.designOp }}</el-descriptions-item>
                        <el-descriptions-item label="施工单位意见:">{{ item.constructOp }}</el-descriptions-item>
                        <el-descriptions-item label="监理意见:">{{ item.superviseOp }}</el-descriptions-item>
                        <el-descriptions-item label="工单备注:">{{ item.notes }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>



         <!-- 创建工单 -->
         <el-dialog v-model="FormVisible1" title="创建工单" @close="closeDialog1">
            <el-form :model="formdata">
                <el-form-item label="类型" prop="tableType_id">
                    <el-select v-model="formdata.tableType_id" placeholder="请选择表类型">
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
                <el-button @click="FormVisible1 = false">取消</el-button>
                <el-button type="primary" @click="createConfirm()">
                添加
                </el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 上传附件 -->
        <el-dialog v-model="FormVisible2" title="上传附件" @close="closeDialog2">
            <el-form :model="filedata">
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="filedata.name" />
                </el-form-item>
                <el-form-item label="附件：" prop="file">
                    <el-upload
                    ref="upload"
                    :limit="1"
                    :on-change="handleChange"
                    :auto-upload="false">
                        <template #trigger>
                            <el-button type="primary">选择文件</el-button>
                        </template>
                    </el-upload>
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible2 = false">取消</el-button>
                <el-button type="primary" @click="uploadFile()">
                确认
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
}

.projectcard {
    width: 80%;
    margin: auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
}


.description {
    word-wrap: break-word;
    text-align: left;
    white-space: pre-wrap;
}

.order{
    width: 90%;
    margin: auto;
}
.order .el-card{
    width: 94%;
    text-align: left;
}
.el-table{
    margin: auto;
}
</style>

