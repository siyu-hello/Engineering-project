<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios'
import { useRoute } from 'vue-router'
import useProjectInfo from '../pinia/project'
import { ElMessage } from 'element-plus'
import { Download } from '@element-plus/icons-vue'

const route = useRoute()
const projectInfo = useProjectInfo()
const infoForm = reactive({ data: {} })
const recordForm = reactive({ data: [] }) 
const projectid = route.params.id

var j = 0


//添加单位
const formdata = reactive({
    invite:'',
    success:'',
    contract:'',
    subPro_id:'',
    company_id:''
})


const handleChange1 = (file) =>{formdata.invite = file.raw}
const handleChange2 = (file) =>{formdata.success = file.raw}
const handleChange3 = (file) =>{formdata.contract = file.raw}

//创建子项目
const FormVisible1 = ref(false)
const recorddata = reactive({
    name:'',
    content:'',
    place:'',
    workload:'',
    project_id:'',
    proType_id:'',
    surveyUnit:'',
    surveyUnit_u:'',
    notes:''
})
const addrecord= () =>{
    recorddata.project_id = route.params.id
    axios.post('/api/sub/project/',recorddata)
      .then((res)=>{
        if(res.data.code===0){
            ElMessage.success('创建成功！')
            FormVisible1.value = false
            getRecord()
        }
        else{
            ElMessage.error('出错了！')
        }
      })
}

const title = ref('')
const FormVisible = ref(false)
const companylist = reactive({data:[]})
var  k = 0
const addUnit= (text,type,id) =>{
    FormVisible.value = true
    title.value = text
    formdata.subPro_id = id
    //获取相关单位
    axios.get('/api/company/info/')
    .then((res)=>{
        if(res.data.code==0){
            let data = res.data.data
            k = 0;
            for(let i in data){
                if(data[i].is_type==type){
                    companylist.data[k]=data[i]
                    k++
                }
            }
        }
    })


}

const addconfirm = () =>{
    const Data = new FormData();
    for (let[key,value] of Object.entries(formdata)) {
        Data.append(key, value)
    }
    //上传各单位
    if(title.value=='添加设计单位'){
        axios.post('/api/add/design/',Data)
        .then(async (res)=>{
            if(res.data.code==0){
                ElMessage.success('添加成功！')
                await getRecord()
                let index = sessionStorage.getItem('index')
                recorddetail.data = recordForm.data[index]
                FormVisible.value = false
                closeDialog()
            }
            else{
                ElMessage.error('出错了！')
            }
        })
    }
    else if(title.value=='添加监理单位'){
        axios.post('/api/add/super/',Data)
        .then(async (res)=>{
            if(res.data.code==0){
                ElMessage.success('添加成功！')
                await getRecord()
                let index = sessionStorage.getItem('index')
                recorddetail.data = recordForm.data[index]
                FormVisible.value = false
                closeDialog()
            }
            else{
                ElMessage.error('出错了！')
            }
        })
    }
    else if(title.value=='添加施工单位'){
        axios.post('/api/add/construct/',Data)
        .then(async (res)=>{
            if(res.data.code==0){
                ElMessage.success('添加成功！')
                await getRecord()
                let index = sessionStorage.getItem('index')
                recorddetail.data = recordForm.data[index]
                FormVisible.value = false
                closeDialog()
            }
            else{
                ElMessage.error('出错了！')
            }
        })
    }
}

//清空
const upload1 = ref()
const upload2 = ref()
const upload3 = ref()
const closeDialog = () =>{
    for (let key in formdata) {
        formdata[key] = ' ';
      }
    upload1.value.clearFiles()
    upload2.value.clearFiles()
    upload3.value.clearFiles()
    FormVisible.value = false
}
const closeDialog1 = () =>{
    for (let key in recorddata) {
        recorddata[key] = ' ';
      }

    FormVisible1.value = false
}

//查询子项目
const getRecord = async () => {
    try {
        let res = await axios.get('/api/sub/project/')
        if (res.data.code === 0) {
            let data = res.data.data
            j = 0;
            recordForm.data = []
            for(let i in data){
                if(data[i].project_id==projectid){
                    recordForm.data[j]=data[i]
                    j++
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}

// 查看各子项目详情
const recorddetail = reactive({data:{}})
const FormVisible2 = ref(false)
const getDetail= (index) =>{
    sessionStorage.setItem("index",index)
    recorddetail.data = recordForm.data[index]
    FormVisible2.value = true
}

// 下载文件
const downloadFile=(url)=> {
    var str = url
    axios.get(`/api/media/${url}`, {
        responseType: 'blob', // 设置响应类型为 Blob，以便处理文件
    }).then(
        res => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(res.data);
        link.href = url;
        var obj=str.lastIndexOf("/")
        link.download = str.substr(obj+1);
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

const getinfo = async () => {
    // pinia刷新时不会保留数据，需要重新获取
    if (projectInfo.data.length === 0) {
        try {
            let res = await axios.get('/api/project/')
            if (res.data.code === 0) {
                projectInfo.data = res.data.data
            }
        } catch (err) {
            console.log(err)
        }
    }
}
//获取所有类型
const typeform = reactive({data:[]})
const getType = async() =>{
    try{
        let res = await axios.get('/api/project/type/')
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
    infoForm.data = projectInfo.data[route.params.index]
    // 加载子项目
    getRecord()
    getType()
})

</script>

<template>
    <div class="container">
        <el-card class="projectcard">
            <template #header>
                <div class="card-header">
                    <span>项目详情</span>
                    <el-button type="primary" class="button" @click="FormVisible1 = true">添加子项目</el-button>
                </div>
            </template>
            <el-descriptions class="description" :column="1">
                <el-descriptions-item label="项目名称:">{{ infoForm.data.name }}</el-descriptions-item>
                <el-descriptions-item label="项目编号:">{{ infoForm.data.code }}</el-descriptions-item>
                <el-descriptions-item label="项目金额:">{{ infoForm.data.money }}</el-descriptions-item>
                <el-descriptions-item label="预估工作量:">{{ infoForm.data.workload }}</el-descriptions-item>
                <el-descriptions-item label="建设单位:">{{ infoForm.data.ownerUnit }}</el-descriptions-item>
                <el-descriptions-item label="项目地点:">{{ infoForm.data.place }}</el-descriptions-item>
                <el-descriptions-item label="项目简介:">{{ infoForm.data.content }}</el-descriptions-item>
                <el-descriptions-item label="项目备注:">{{ infoForm.data.notes }}</el-descriptions-item>
            </el-descriptions>
        </el-card>

        <!-- 子项目列表 -->
        <div class="record">
            <h2>子项目列表</h2>
            <el-empty v-if="recordForm.data==''" :image-size="100" />
            <el-table v-else :data="recordForm.data" style="width: 100%" :show-overflow-tooltip="true">
                <el-table-column label="项目名称" prop="name" />
                <el-table-column label="项目内容" prop="content" />
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="getDetail(scope.$index)">展开更多</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <!-- 各子项目详情 -->
        <el-dialog v-model="FormVisible2" title="项目详情" style="min-width:550px;">
            <el-descriptions
                direction="vertical"
                :column="4"
                style="width: 95%;margin-left: 5%;min-width:400px;max-width: 95%;"
                border
            >
                <el-descriptions-item label="项目名称">{{ recorddetail.data.name }}</el-descriptions-item>
                <el-descriptions-item label="预估内容" :span="2">{{ recorddetail.data.content }}</el-descriptions-item>
                <el-descriptions-item label="项目地点">{{ recorddetail.data.place }}</el-descriptions-item>
                <el-descriptions-item label="预估工作量">{{ recorddetail.data.workload }}</el-descriptions-item>
                <el-descriptions-item label="建设单位" :span="3">{{ recorddetail.data.ownerUnit }}</el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.designUnit==''" label="设计单位">
                    <el-button type="danger" plain size="small" @click="addUnit('添加设计单位','designUnit',recorddetail.data.subPro_id)" >+添加</el-button>
                </el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.designUnit!=''" label="设计单位">{{ recorddetail.data.designUnit }}</el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.designUnit!=''" label="设计招标文件">
                    <el-button type="primary" plain size="small" :icon="Download" @click="downloadFile(recorddetail.data.designInvite)">下载</el-button>
                </el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.designUnit!=''" label="设计中标文件">
                    <el-button type="primary" plain size="small" :icon="Download" @click="downloadFile(recorddetail.data.designSuccess)">下载</el-button>
                </el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.designUnit!=''" label="设计合同">
                    <el-button type="primary" plain size="small" :icon="Download" @click="downloadFile(recorddetail.data.designContract)">下载</el-button>
                </el-descriptions-item>


                <el-descriptions-item v-if="recorddetail.data.superviseUnit==''" label="监理单位">
                    <el-button type="danger" plain size="small" @click="addUnit('添加监理单位','superviseUnit',recorddetail.data.subPro_id)" >+添加</el-button>
                </el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.superviseUnit!=''" label="监理单位">{{ recorddetail.data.superviseUnit }}</el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.superviseUnit!=''" label="监理招标文件">
                    <el-button type="primary" plain size="small" :icon="Download" @click="downloadFile(recorddetail.data.superInvite)">下载</el-button>
                </el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.superviseUnit!=''" label="监理中标文件">
                    <el-button type="primary" plain size="small" :icon="Download" @click="downloadFile(recorddetail.data.superSuccess)">下载</el-button>
                </el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.superviseUnit!=''" label="监理合同">
                    <el-button type="primary" plain size="small" :icon="Download" @click="downloadFile(recorddetail.data.superContract)">下载</el-button>
                </el-descriptions-item>


                <el-descriptions-item v-if="recorddetail.data.constructUnit==''" label="施工单位">
                    <el-button type="danger" plain size="small" @click="addUnit('添加施工单位','constructUnit',recorddetail.data.subPro_id)" >+添加</el-button>
                </el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.constructUnit!=''" label="施工单位">{{ recorddetail.data.constructUnit }}</el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.constructUnit!=''" label="施工招标文件">
                    <el-button type="primary" plain size="small" :icon="Download" @click="downloadFile(recorddetail.data.constructInvite)">下载</el-button>
                </el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.constructUnit!=''" label="施工中标文件">
                    <el-button type="primary" plain size="small" :icon="Download" @click="downloadFile(recorddetail.data.constructSuccess)">下载</el-button>
                </el-descriptions-item>
                <el-descriptions-item v-if="recorddetail.data.constructUnit!=''" label="施工合同">
                    <el-button type="primary" plain size="small" :icon="Download" @click="downloadFile(recorddetail.data.constructContract)">下载</el-button>
                </el-descriptions-item>

                <el-descriptions-item label="勘察单位">{{recorddetail.data.surveyUnit }}</el-descriptions-item>
                <el-descriptions-item label="备注">{{ recorddetail.data.notes }}</el-descriptions-item>
            </el-descriptions>
        </el-dialog>

        <!-- 添加相关单位 -->
        <el-dialog v-model="FormVisible" :title="title" @close="closeDialog">
            <el-form :model="formdata">
                <el-form-item label="招标文件:" prop="invite">
                    <el-upload
                    ref="upload1"
                    :limit="1"
                    :on-change="handleChange1"
                    :auto-upload="false">
                        <template #trigger>
                            <el-button type="primary">选择文件</el-button>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="中标文件:" prop="success">
                    <el-upload
                    ref="upload2"
                    :limit="1"
                    :on-change="handleChange2"
                    :auto-upload="false">
                        <template #trigger>
                            <el-button type="primary">选择文件</el-button>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="合同文件:" prop="contract">
                    <el-upload
                    ref="upload3"
                    :limit="1"
                    :on-change="handleChange3"
                    :auto-upload="false">
                        <template #trigger>
                            <el-button type="primary">选择文件</el-button>
                        </template>
                    </el-upload>
                </el-form-item>
                <el-form-item label="选择单位:" prop="company">
                    <el-select v-model="formdata.company_id" placeholder="请选择相关单位">
                        <el-option
                        v-for="item in companylist.data"
                        :label="item.name"
                        :value="item.company_id"/>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible = false">取消</el-button>
                <el-button type="primary" @click="addconfirm()">
                添加
                </el-button>
            </span>
            </template> 
        </el-dialog>

        <!-- 添加子项目 -->
        <el-dialog v-model="FormVisible1" title="添加子项目" @close="closeDialog1">
            <el-form :model="recorddata">
                <el-form-item label="项目名称:" prop="name">
                    <el-input v-model="recorddata.name"/>
                </el-form-item>
                <el-form-item label="项目简介:" prop="content">
                    <el-input v-model="recorddata.content" />
                </el-form-item>
                <el-form-item label="项目地点:" prop="place">
                    <el-input v-model="recorddata.place" />
                </el-form-item>
                <el-form-item label="预计工作量:" prop="workload">
                    <el-input v-model.number="recorddata.workload" />
                </el-form-item>
                <el-form-item label="项目类型" prop="proType">
                    <el-select v-model="recorddata.proType_id" placeholder="请选择项目类型">
                        <el-option
                        v-for="item in typeform.data"
                        :label="item.name"
                        :value="item.proType_id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="勘测单位:" prop="surveyUnit">
                    <el-input v-model="recorddata.surveyUnit" />
                </el-form-item>
                <el-form-item label="勘测单位负责人:" prop="surveyUnit_u">
                    <el-input v-model="recorddata.surveyUnit_u" />
                </el-form-item>
                <el-form-item label="项目备注" prop="notes">
                    <el-input 
                    v-model="recorddata.notes"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    type="textarea" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible1 = false">取消</el-button>
                <el-button type="primary" @click="addrecord()">
                添加
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
    word-break: break-all;
}

.record{
    width: 80%;
    margin: auto;
}
.record .el-card{
    width: 94%;
    text-align: left;
}
</style>

