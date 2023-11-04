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


const handleChange1 = (file) =>{formdata.invite = file.raw;}
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
            console.log(companylist.data)
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
        .then((res)=>{
            if(res.data.code==0){
                ElMessage.success('添加成功！')
                getRecord()
                FormVisible.value = false
            }
            else{
                ElMessage.error('出错了！')
            }
        })
    }
    else if(title.value=='添加监理单位'){
        axios.post('/api/add/super/',Data)
        .then((res)=>{
            if(res.data.code==0){
                ElMessage.success('添加成功！')
                getRecord()
                FormVisible.value = false
                console.log(Data.get('company_id'))
            }
            else{
                ElMessage.error('出错了！')
            }
        })
    }
    else if(title.value=='添加施工单位'){
        axios.post('/api/add/construct/',Data)
        .then((res)=>{
            if(res.data.code==0){
                ElMessage.success('添加成功！')
                getRecord()
                FormVisible.value = false
            }
            else{
                ElMessage.error('出错了！')
            }
        })
    }
}

//清空
const closeDialog = () =>{
    for (let key in formdata) {
        formdata[key] = ' ';
      }

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
            console.log(recordForm.data)
        }
    } catch (err) {
        console.log(err)
    }
}

// 下载文件
const downloadFile=(url)=> {
    axios.get(`/api/media/${url}`, {
        responseType: 'blob', // 设置响应类型为 Blob，以便处理文件
    }).then(
        res => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(res.data);
        link.href = url;
        link.download = '文件';
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
                <el-descriptions-item label="项目简介:">{{ infoForm.data.constant }}</el-descriptions-item>
                <el-descriptions-item label="项目备注:">{{ infoForm.data.notes }}</el-descriptions-item>
            </el-descriptions>
        </el-card>

        <!-- 子项目列表 -->
        <div class="record">
            <el-timeline>
                <el-timeline-item v-for="(item,index) in recordForm.data" center  placement="top">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>{{ item.name }}</span>
                        </div>
                    </template>
                    <el-descriptions class="description" :column="1">
                        <el-descriptions-item label="项目内容:">{{ item.content }}</el-descriptions-item>
                        <el-descriptions-item label="项目地点:">{{ item.place }}</el-descriptions-item>
                        <el-descriptions-item label="预估工作量:">{{ item.workload }}</el-descriptions-item>
                        <el-descriptions-item label="建设单位:">{{ item.ownerUnit }}</el-descriptions-item>
                        <el-descriptions-item  v-if="item.designUnit==''" label="设计单位:">
                            <el-button type="primary" link @click="addUnit('添加设计单位','designUnit',item.subPro_id)">+添加</el-button>     
                        </el-descriptions-item>
                        <el-descriptions-item v-if="item.designUnit!=''"  label="设计单位:">{{ item.designUnit }}</el-descriptions-item>
                        <el-descriptions-item  v-if="item.designUnit!=''" label="设计招标文件:">
                            <el-button link type="primary" :icon="Download" @click="downloadFile(item.designInvite)">下载</el-button>
                        </el-descriptions-item>
                        <el-descriptions-item  v-if="item.designUnit!=''" label="设计中标文件:">
                            <el-button link type="primary" :icon="Download" @click="downloadFile(item.designSuccess)">下载</el-button>
                        </el-descriptions-item>
                        <el-descriptions-item  v-if="item.designUnit!=''" label="设计合同文件:">
                            <el-button link type="primary" :icon="Download" @click="downloadFile(item.designContract)">下载</el-button>
                        </el-descriptions-item>

                        <el-descriptions-item  v-if="item.superviseUnit==''" label="监理单位:">
                            <el-button type="primary" link @click="addUnit('添加监理单位','superviseUnit',item.subPro_id)">+添加</el-button>     
                        </el-descriptions-item>
                        <el-descriptions-item  v-if="item.superviseUnit!=''" label="监理单位:">{{ item.superviseUnit }}</el-descriptions-item>
                        <el-descriptions-item  v-if="item.superviseUnit!=''" label="监理招标文件:">
                            <el-button link type="primary" :icon="Download" @click="downloadFile(item.superInvite)">下载</el-button>
                        </el-descriptions-item>
                        <el-descriptions-item  v-if="item.superviseUnit!=''" label="监理中标文件:">
                            <el-button link type="primary" :icon="Download" @click="downloadFile(item.superSuccess)">下载</el-button>
                        </el-descriptions-item>
                        <el-descriptions-item  v-if="item.superviseUnit!=''" label="监理合同文件:">
                            <el-button link type="primary" :icon="Download" @click="downloadFile(item.superContract)">下载</el-button>
                        </el-descriptions-item>

                        <el-descriptions-item  v-if="item.constructUnit==''" label="施工单位:">
                            <el-button type="primary" link @click="addUnit('添加施工单位','constructUnit',item.subPro_id)">+添加</el-button>     
                        </el-descriptions-item>
                        <el-descriptions-item  v-if="item.constructUnit!=''" label="施工单位:">{{ item.constructUnit }}</el-descriptions-item>
                        <el-descriptions-item  v-if="item.constructUnit!=''" label="施工招标文件:">
                            <el-button link type="primary" :icon="Download" @click="downloadFile(item.constructInvite)">下载</el-button>
                        </el-descriptions-item>
                        <el-descriptions-item  v-if="item.constructUnit!=''" label="施工中标文件:">
                            <el-button link type="primary" :icon="Download" @click="downloadFile(item.constructSuccess)">下载</el-button>
                        </el-descriptions-item>
                        <el-descriptions-item  v-if="item.constructUnit!=''" label="施工合同文件:">
                            <el-button link type="primary" :icon="Download" @click="downloadFile(item.constructContract)">下载</el-button>
                        </el-descriptions-item>

                        <el-descriptions-item label="勘测单位:">{{ item.surveyUnit }}</el-descriptions-item>
                        <el-descriptions-item label="项目备注:">{{ item.notes }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>

        <!-- 添加相关单位 -->
        <el-dialog v-model="FormVisible" :title="title" @close="closeDialog">
            <el-form :model="formdata">
                <el-form-item label="招标文件:" prop="invite">
                    <el-upload
                    ref="upload"
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
                    ref="upload"
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
                    ref="upload"
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
                    <el-select v-model="recorddata.proType_id" placeholder="请选择所属项目">
                        <el-option
                        v-for="item in typeform.data"
                        :label="item.name"
                        :value="item.tableType_id"/>
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

.record{
    width: 90%;
    margin: auto;
}
.record .el-card{
    width: 94%;
    text-align: left;
}
</style>

