<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useorderInfo from '../pinia/order'
import router from '../router/router';
import { useRoute } from 'vue-router'

const user = ref(sessionStorage.getItem('username'))
const route = useRoute()
const projectname=ref(route.params.name)
const projectid=ref(route.params.id)
const orderInfo = useorderInfo()
const infoForm = reactive({ data: {} })
const FormVisible = ref(false)

onMounted(async () => {
    // 加载项目信息
    await getorder()
    // infoForm.data = orderForm.data[0]
    getFile()
})

const upload = ref()
const closeDialog = () =>{
    for (let key in filedata) {
        filedata[key] = ' ';
      }
      upload.value.clearFiles()
    FormVisible.value = false
}

// 添加签证计量单
const EMdata = reactive({
    "content":'',
    "record_id":''
})
const addEMconfirm= (id) =>{
    EMdata.record_id = id
    axios.post('/api/add/engine/measure/',EMdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加工作联系单
const WCdata = reactive({
    "content":'',
    "record_id":''
})
const addWCconfirm= (id) =>{
    WCdata.record_id = id
    axios.post('/api/add/work/contact/ ',WCdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

const filedata = reactive({
    name:'',
    record_id:'',
    file:'',
    mark:'0'
})

// 添加监理工作联系单
const SWCdata = reactive({
    "content":'',
    "why":'',
    "record_id":''
})
const addSWCconfirm= (id) =>{
    SWCdata.record_id = id
    axios.post('/api/add/swork/contact/ ',SWCdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加合同变更申请单
const CCdata = reactive({
    "why":'',
    "record_id":''
})
const addCCconfirm= (id) =>{
    CCdata.record_id = id
    axios.post('/api/add/change/contact/ ',CCdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加监理会议纪要
const SMdata = reactive({
    "place":'',
    "content":'',
    "agreedMatters":'',
    "hostName":'',
    "ownerName":'',
    "designName":'',
    "superName":'',
    "constructName":'',
    "record_id":''
})
const addSMconfirm= (id) =>{
    SMdata.record_id = id
    axios.post('/api/add/super/meeting/ ',SMdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加施工日志
const CLdata = reactive({
    "weather":'',
    "temperature":'',
    "group":'',
    "groupManage":'',
    "constructArea":'',
    "content":'',
    "result":'',
    "changePaper":'',
    "inspectionArea":'',
    "materialSituation":'',
    "materialTake":'',
    "handOverSituation":'',
    "machineSituation":'',
    "safe":'',
    "processMethod":'',
    "record_id":''
})
const addCLconfirm= (id) =>{
    CLdata.record_id = id
    axios.post('/api/add/construct/log/ ',CLdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加洽商记录
const DLdata = reactive({
    "title":'',
    "address":'',
    "host":'',
    "content":'',
    "result":'',
    "record_id":''
})
const addDLconfirm= (id) =>{
    DLdata.record_id = id
    axios.post('/api/add/deal/log/ ',DLdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加监理日志
const SLdata = reactive({
    "weather":'',
    "temperature":'',
    "group":'',
    "number":'',
    "constructArea":'',
    "content":'',
    "result":'',
    "equipmentInspection":'',
    "projectInspection":'',
    "sampling":'',
    "sitSuper":'',
    "superNotice":'',
    "record_id":''
})
const addSLconfirm= (id) =>{
    SLdata.record_id = id
    axios.post('/api/add/super/log/ ',SLdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加图纸会审记录
const DRdata = reactive({
    "place":'',
    "proName":'',
    "host":'',
    "recorder":'',
    "why":'',
    "picNumber":'',
    "content":'',
    "record_id":''
})
const addDRconfirm= (id) =>{
    DRdata.record_id = id
    axios.post('/api/add/drawing/review/ ',DRdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加设计变更
const FormVisible10 = ref(false)
const DCdata = reactive({
    "why":'',
    "picNumber":'',
    "content":'',
    "record_id":''
})
const addDCconfirm= (id) =>{
    DCdata.record_id = id
    axios.post('/api/add/design/change/',DCdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
            FormVisible10.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 审批
const opiniondata = reactive({
    info:'',
    record_id:'',
    picture:''
})
const FormVisible11 = ref(false)
const handleChange1 = (file)=>{opiniondata.picture = file.raw}
const uploadopinion = () =>{
    opiniondata.record_id = route.params.id
    const opData = new FormData();
    for (let[key,value] of Object.entries(opiniondata)) {
        opData.append(key, value)
    }
    console.log(opiniondata)
    axios.post('/api/create/opinion/',opData)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('审批成功')
            getorder()
            FormVisible11.value = false
            closeDialog1()
        }else{
            ElMessage.error('出错了')
        }
    })
}
const upload1 = ref()
const closeDialog1 = () =>{
    for (let key in opiniondata) {
        opiniondata[key] = ' ';
      }
      upload1.value.clearFiles()
    FormVisible11.value = false
}

//上传附件
const handleChange = (file) =>{filedata.file = file.raw;}
const uploadFile = () =>{
    filedata.record_id = route.params.id
    filedata.mark = "0"
    const Data = new FormData();
    for (let[key,value] of Object.entries(filedata)) {
        Data.append(key, value)
    }
    axios.post('/api/file/',Data)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('附件上传成功')
            getFile()
            FormVisible.value = false
            closeDialog()
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


// 获取所有工单
const orderForm = reactive({ data: [] }) 
const typeid = ref('')
const state = ref('')
var j = 0
const getorder = async() =>{
        try {
            let res = await axios.get('/api/record/')
            if (res.data.code === 0) {
                let data = res.data.data
                let valuableData = []
                j=0
                for(let i in data){
                    if(data[i].record_id==route.params.id){
                        valuableData.push(data[i])
                        j++
                    }
                }
                orderForm.data = valuableData
                infoForm.data = orderForm.data[0]
                typeid.value = infoForm.data.tableType_id
                state.value = infoForm.data.state
                getoporder()
                confirmdata()
            }
        } catch (err) {
            console.log(err)
        }
}

//判断工单是否为空
// const flag = (typeid.value=='1' && infoForm.data.EngineMeasure[0]!='')||(typeid.value=='2' && infoForm.data.WorkContact!='')||(typeid.value=='3' && infoForm.data.SWorkContact!='')||(typeid.value=='4' && infoForm.data.ChangContact!='')||(typeid.value=='5' && infoForm.data.SuperMeeting!='')||(typeid.value=='9' && infoForm.data.ConstructLog!='')||(typeid.value=='6' && infoForm.data.SuperLog!='')||(typeid.value=='7' && infoForm.data.DealLog!='')||(typeid.value=='10' && infoForm.data.DrawingReview!='')||(typeid.value=='8' && infoForm.data.DesignChange!='')
const flag = ref('false')
const EMlist = reactive({ data: [] })//签证计量单
const WClist = reactive({ data:[] })//工作联系单
const SWClist = reactive({ data: [] })//监理工作联系单
const CClist = reactive({ data: [] })//合同变更申请单
const SMlist = reactive({ data: [] })//监理会议纪要
const CLlist = reactive({ data: [] })//施工日志
const SLlist = reactive({ data: [] })//监理日志
const DLlist = reactive({ data: [] })//洽商记录
const DRlist = reactive({ data: [] })//图纸会审记录
const DClist = reactive({ data: [] })//设计变更
const confirmdata = () =>{
    if(typeid.value=='1' && infoForm.data.EngineMeasure!=''){
        EMlist.data = [{label:'内容：',value:infoForm.data.EngineMeasure[0].content}]
        flag.value=true
    }
    if(typeid.value=='2' && infoForm.data.WorkContact!=''){
        WClist.data = [{label:'内容：',value:infoForm.data.WorkContact[0].content}]
        flag.value=true
    }
    if(typeid.value=='3' && infoForm.data.SWorkContact!=''){
        SWClist.data = [
            {label:'联系事项：',value:infoForm.data.SWorkContact[0].content},
            {label:'事由：',value:infoForm.data.SWorkContact[0].why}
        ]
        flag.value=true
    }
    if(typeid.value=='4' && infoForm.data.ChangContact!=''){
        CClist.data = [{label:'原因：',value:infoForm.data.ChangContact[0].why}]
        flag.value=true
    }
    if(typeid.value=='5' && infoForm.data.SuperMeeting!=''){
        SMlist.data = [
            {label:'会议地点：',value:infoForm.data.SuperMeeting[0].place},
            {label:'主要议题：',value:infoForm.data.SuperMeeting[0].content},
            {label:'解决或议定事项：',value:infoForm.data.SuperMeeting[0].agreedMatters},
            {label:'主持人：',value:infoForm.data.SuperMeeting[0].hostName},
            {label:'建设单位人员：',value:infoForm.data.SuperMeeting[0].ownerName},
            {label:'设计单位人员：',value:infoForm.data.SuperMeeting[0].designName},
            {label:'监理单位人员：',value:infoForm.data.SuperMeeting[0].superName},
            {label:'施工单位人员：',value:infoForm.data.SuperMeeting[0].constructName}
        ]
        flag.value=true
    }
    if(typeid.value=='9' && infoForm.data.ConstructLog!=''){
        CLlist.data = [
            {label:'天气：',value:infoForm.data.ConstructLog[0].weather},
            {label:'最低及最高气温：',value:infoForm.data.ConstructLog[0].temperature},
            {label:'班组：',value:infoForm.data.ConstructLog[0].group},
            {label:'班组负责人：',value:infoForm.data.ConstructLog[0].groupManage},
            {label:'施工部位：',value:infoForm.data.ConstructLog[0].constructArea},
            {label:'施工内容：',value:infoForm.data.ConstructLog[0].content},
            {label:'质量情况：',value:infoForm.data.ConstructLog[0].result},
            {label:'设计变更交底：',value:infoForm.data.ConstructLog[0].changePaper},
            {label:'验收部位：',value:infoForm.data.ConstructLog[0].inspectionArea},
            {label:'材料使用情况：',value:infoForm.data.ConstructLog[0].materialSituation},
            {label:'材料留置：',value:infoForm.data.ConstructLog[0].materialTake},
            {label:'交接检查情况：',value:infoForm.data.ConstructLog[0].handOverSituation},
            {label:'机械使用情况：',value:infoForm.data.ConstructLog[0].machineSituation},
            {label:'安全：',value:infoForm.data.ConstructLog[0].safe},
            {label:'处理方法：',value:infoForm.data.ConstructLog[0].processMethod}
        ]
        flag.value=true
    }
    if(typeid.value=='6' && infoForm.data.SuperLog!=''){
        SLlist.data = [
            {label:'天气：',value:infoForm.data.SuperLog[0].weather},
            {label:'最低及最高气温：',value:infoForm.data.SuperLog[0].temperature},
            {label:'班组：',value:infoForm.data.SuperLog[0].group},
            {label:'施工人数：',value:infoForm.data.SuperLog[0].number},
            {label:'施工部位：',value:infoForm.data.SuperLog[0].constructArea},
            {label:'施工内容：',value:infoForm.data.SuperLog[0].content},
            {label:'质量检查情况：',value:infoForm.data.SuperLog[0].result},
            {label:'设备报验：',value:infoForm.data.SuperLog[0].equipmentInspection},
            {label:'工程报验：',value:infoForm.data.SuperLog[0].projectInspection},
            {label:'取样送检：',value:infoForm.data.SuperLog[0].sampling},
            {label:'旁站送检：',value:infoForm.data.SuperLog[0].sitSuper},
            {label:'监理通知：',value:infoForm.data.SuperLog[0].superNotice}
        ]
        flag.value=true
    }
    if(typeid.value=='7' && infoForm.data.DealLog!=''){
        DLlist.data = [
            {label:'洽商主题：',value:infoForm.data.DealLog[0].title},
            {label:'洽商地址：',value:infoForm.data.DealLog[0].address},
            {label:'洽商主持人：',value:infoForm.data.DealLog[0].host},
            {label:'洽商内容：',value:infoForm.data.DealLog[0].content},
            {label:'洽商结果：',value:infoForm.data.DealLog[0].result}
        ]
        flag.value=true
    }
    if(typeid.value=='10' && infoForm.data.DrawingReview!=''){
        DRlist.data = [
            {label:'地点：',value:infoForm.data.DrawingReview[0].place},
            {label:'专业名称：',value:infoForm.data.DrawingReview[0].proName},
            {label:'主持人：',value:infoForm.data.DrawingReview[0].host},
            {label:'记录人：',value:infoForm.data.DrawingReview[0].recorder},
            {label:'图纸问题：',value:infoForm.data.DrawingReview[0].why},
            {label:'图号：',value:infoForm.data.DrawingReview[0].picNumber},
            {label:'会审记录：',value:infoForm.data.DrawingReview[0].content}
        ]
        flag.value=true
    }
    if(typeid.value=='8' && infoForm.data.DesignChange!=''){
        DClist.data = [
            {label:'变更原因：',value:infoForm.data.DesignChange[0].why},
            {label:'图号：',value:infoForm.data.DesignChange[0].picNumber},
            {label:'洽商内容：',value:infoForm.data.DesignChange[0].content}
        ]
        flag.value=true
    }
}


// 获取当前工单的流转顺序
const oporder = ref('')
const step = reactive({data:[]})
const active = ref(0)
const nextrole = ref('')
const getoporder= () =>{
    axios.get('/api/table/type/')
    .then((res)=>{
        if(res.data.code==0){
            let data = res.data.data
            for(let i in data){
                if(data[i].tableType_id==typeid.value){
                    oporder.value = data[i].order
                }
            }
            //将数字转换为对应的含义
            step.data = []
            for(let i=0;i<oporder.value.length;i+=2){
                if(oporder.value[i]=='0'){
                    step.data.push({name:'开始',state:'start'})
                }else if(oporder.value[i]=='1'){
                    step.data.push({name:'建设单位',state:'ownerUnit'})
                }else if(oporder.value[i]=='2'){
                    step.data.push({name:'设计单位',state:'designUnit'})
                }else if(oporder.value[i]=='3'){
                    step.data.push({name:'监理单位',state:'superviseUnit'})
                }else if(oporder.value[i]=='4'){
                    step.data.push({name:'施工单位',state:'constructUnit'})
                }
            }
            //计算当前到哪一步
            for(let i in step.data){
                if(state.value==step.data[i].state){
                    active.value=++i
                    nextrole.value=step.data[i].state
                }
            }
        }
    })
}

// 判断是否有审批权限
const exam=()=>{
    let role = sessionStorage.getItem("is_type")
    if(role==nextrole.value || oporder.value=='0'){
        FormVisible11.value = true
    }else{
        ElMessage.error('暂无审批权限')
    }
}


</script>

<template>
    <div class="container">
        <el-card class="ordercard">
            <template #header>
                <div class="card-header">
                    <span>工单详情</span>
                    <div class="step" v-if="flag==true">
                        <el-steps v-if="oporder!='0'" :active="active" align-center finish-status="success">
                            <el-step v-for="item in step.data" :description="item.name" />
                        </el-steps>
                    </div>
                    <div class="btn" v-if="flag==true">
                    <el-button type="primary" class="button" @click="exam()">审批</el-button>
                    </div>
                    <div class="btn">
                    <el-button type="primary" class="button" @click="FormVisible = true">+上传附件</el-button>
                    </div>
                </div>
            </template>
            <div class="main">
                <div>项目名称：{{projectname}}</div>
                <!-- 十个文件 -->
                <div v-if="typeid=='1' && infoForm.data.EngineMeasure==''">签证计量单：
                    <el-card shadow="never" class="add">
                        <el-form :model="EMdata" label-width="auto">
                            <el-form-item label="内容：" prop="content">
                                <el-input type="textarea" autosize v-model="EMdata.content" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="addEMconfirm(infoForm.data.record_id)">确认</el-button>
                    </el-card>
                </div>
                <div width="80%" v-if="typeid=='1' && infoForm.data.EngineMeasure!=''">签证计量单：
                    <el-card shadow="never" class="qz">
                        <el-form label-width="auto">
                            <el-form-item v-for="item in EMlist.data" :label="item.label">
                                <el-input type="textarea" autosize disabled :placeholder="item.value" />
                            </el-form-item>
                        </el-form>
                    </el-card> 
                </div>

                <div v-if="typeid=='2' && infoForm.data.WorkContact==''">工作联系单：
                    <el-card shadow="never" class="add">
                        <el-form :model="WCdata" label-width="auto">
                            <el-form-item label="内容：" prop="content">
                                <el-input type="textarea" autosize v-model="WCdata.content" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="addWCconfirm(infoForm.data.record_id)">确认</el-button>
                    </el-card>
                </div>
                <div width="80%" v-if="typeid=='2' && infoForm.data.WorkContact!=''">工作联系单：
                    <el-card shadow="never" class="qz">
                        <el-form label-width="auto">
                            <el-form-item v-for="item in WClist.data" :label="item.label">
                                <el-input type="textarea" autosize disabled :placeholder="item.value" />
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>

                <div v-if="typeid=='3' && infoForm.data.SWorkContact==''">监理工作联系单：
                    <el-card shadow="never" class="add">
                        <el-form :model="SWCdata" label-width="auto">
                            <el-form-item label="联系事项：" prop="content">
                                <el-input type="textarea" autosize v-model="SWCdata.content" />
                            </el-form-item>
                            <el-form-item label="事由：" prop="why">
                                <el-input type="textarea" autosize v-model="SWCdata.why" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="addSWCconfirm(infoForm.data.record_id)">确认</el-button>
                    </el-card>
                </div>
                <div width="80%" v-if="typeid=='3' && infoForm.data.SWorkContact!=''">监理工作联系单：
                    <el-card shadow="never" class="qz"> 
                        <el-form label-width="auto">
                            <el-form-item v-for="item in SWClist.data" :label="item.label">
                                <el-input type="textarea" autosize disabled :placeholder="item.value" />
                            </el-form-item>
                        </el-form>
                    </el-card>    
                </div>

                <div v-if="typeid=='4' && infoForm.data.ChangContact==''">合同变更申请单：
                    <el-card shadow="never" class="add">
                        <el-form :model="CCdata" label-width="auto">
                            <el-form-item label="原因：" prop="why">
                                <el-input type="textarea" autosize v-model="CCdata.why" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="addCCconfirm(infoForm.data.record_id)">确认</el-button>
                    </el-card>
                </div>
                <div width="80%" v-if="typeid=='4' && infoForm.data.ChangContact!=''">合同变更申请单：
                    <el-card shadow="never" class="qz">
                        <el-form label-width="auto">
                            <el-form-item v-for="item in CClist.data" :label="item.label">
                                <el-input type="textarea" autosize disabled :placeholder="item.value" />
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>

                <div v-if="typeid=='5' && infoForm.data.SuperMeeting==''">监理会议纪要：
                    <el-card shadow="never" class="add">
                        <el-form :model="SMdata" label-width="auto">
                            <el-form-item label="会议地点：" prop="place">
                                <el-input type="textarea" autosize v-model="SMdata.place" />
                            </el-form-item>
                            <el-form-item label="主要议题：" prop="content">
                                <el-input type="textarea" autosize v-model="SMdata.content" />
                            </el-form-item>
                            <el-form-item label="解决或议定事项：" prop="agreedMatters">
                                <el-input type="textarea" autosize v-model="SMdata.agreedMatters" />
                            </el-form-item>
                            <el-form-item label="主持人：" prop="hostName">
                                <el-input type="textarea" autosize v-model="SMdata.hostName" />
                            </el-form-item>
                            <el-form-item label="建设单位人员：" prop="ownerName">
                                <el-input type="textarea" autosize v-model="SMdata.ownerName" />
                            </el-form-item>
                            <el-form-item label="设计单位人员：" prop="designName">
                                <el-input type="textarea" autosize v-model="SMdata.designName" />
                            </el-form-item>
                            <el-form-item label="监理单位人员：" prop="superName">
                                <el-input type="textarea" autosize v-model="SMdata.superName" />
                            </el-form-item>
                            <el-form-item label="施工单位人员：" prop="constructName">
                                <el-input type="textarea" autosize v-model="SMdata.constructName" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="addSMconfirm(infoForm.data.record_id)">确认</el-button>
                    </el-card>
                </div>
                <div width="80%" v-if="typeid=='5' && infoForm.data.SuperMeeting!=''">监理会议纪要：
                    <el-card shadow="never" class="qz">
                        <el-form label-width="auto">
                            <el-form-item v-for="item in SMlist.data" :label="item.label">
                                <el-input type="textarea" autosize disabled :placeholder="item.value" />
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>

                <div v-if="typeid=='9' && infoForm.data.ConstructLog==''">施工日志：
                    <el-card shadow="never" class="add">
                        <el-form :model="CLdata" label-width="auto">
                            <el-form-item label="天气：" prop="weather">
                                <el-input type="textarea" autosize v-model="CLdata.weather" />
                            </el-form-item>
                            <el-form-item label="最低及最高气温：" prop="temperature">
                                <el-input type="textarea" autosize v-model="CLdata.temperature" />
                            </el-form-item>
                            <el-form-item label="班组：" prop="group">
                                <el-input type="textarea" autosize v-model="CLdata.group" />
                            </el-form-item>
                            <el-form-item label="班组负责人：" prop="groupManage">
                                <el-input type="textarea" autosize v-model="CLdata.groupManage" />
                            </el-form-item>
                            <el-form-item label="施工部位：" prop="constructArea">
                                <el-input type="textarea" autosize v-model="CLdata.constructArea" />
                            </el-form-item>
                            <el-form-item label="施工内容：" prop="content">
                                <el-input type="textarea" autosize v-model="CLdata.content" />
                            </el-form-item>
                            <el-form-item label="质量情况：" prop="result">
                                <el-input type="textarea" autosize v-model="CLdata.result" />
                            </el-form-item>
                            <el-form-item label="设计变更交底：" prop="changePaper">
                                <el-input type="textarea" autosize v-model="CLdata.changePaper" />
                            </el-form-item>
                            <el-form-item label="验收部位：" prop="inspectionArea">
                                <el-input type="textarea" autosize v-model="CLdata.inspectionArea" />
                            </el-form-item>
                            <el-form-item label="材料使用情况：" prop="materialSituation">
                                <el-input type="textarea" autosize v-model="CLdata.materialSituation" />
                            </el-form-item>
                            <el-form-item label="材料留置：" prop="materialTake">
                                <el-input type="textarea" autosize v-model="CLdata.materialTake" />
                            </el-form-item>
                            <el-form-item label="交接检查情况：" prop="handOverSituation">
                                <el-input type="textarea" autosize v-model="CLdata.handOverSituation" />
                            </el-form-item>
                            <el-form-item label="机械使用情况：" prop="machineSituation">
                                <el-input type="textarea" autosize v-model="CLdata.machineSituation" />
                            </el-form-item>
                            <el-form-item label="安全：" prop="safe">
                                <el-input type="textarea" autosize v-model="CLdata.safe" />
                            </el-form-item>
                            <el-form-item label="处理方法：" prop="processMethod">
                                <el-input type="textarea" autosize v-model="CLdata.processMethod" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="addCLconfirm(infoForm.data.record_id)">确认</el-button>
                    </el-card>
                </div>
                <div v-if="typeid=='9' && infoForm.data.ConstructLog!=''">施工日志：
                    <el-card shadow="never" class="qz">
                        <el-form label-width="auto">
                            <el-form-item v-for="item in CLlist.data" :label="item.label">
                                <el-input type="textarea" autosize disabled :placeholder="item.value" />
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>

                <div v-if="typeid=='6' && infoForm.data.SuperLog==''">监理日志：
                    <el-card shadow="never" class="add">
                        <el-form :model="SLdata" label-width="auto">
                            <el-form-item label="天气：" prop="weather">
                                <el-input type="textarea" autosize v-model="SLdata.weather" />
                            </el-form-item>
                            <el-form-item label="最低及最高气温：" prop="temperature">
                                <el-input type="textarea" autosize v-model="SLdata.temperature" />
                            </el-form-item>
                            <el-form-item label="班组：" prop="group">
                                <el-input type="textarea" autosize v-model="SLdata.group" />
                            </el-form-item>
                            <el-form-item label="施工人数：" prop="number">
                                <el-input type="textarea" autosize v-model="SLdata.number" />
                            </el-form-item>
                            <el-form-item label="施工部位：" prop="constructArea">
                                <el-input type="textarea" autosize v-model="SLdata.constructArea" />
                            </el-form-item>
                            <el-form-item label="施工内容：" prop="content">
                                <el-input type="textarea" autosize v-model="SLdata.content" />
                            </el-form-item>
                            <el-form-item label="质量检查情况：" prop="result">
                                <el-input type="textarea" autosize v-model="SLdata.result" />
                            </el-form-item>
                            <el-form-item label="设备报验：" prop="equipmentInspection">
                                <el-input type="textarea" autosize v-model="SLdata.equipmentInspection" />
                            </el-form-item>
                            <el-form-item label="工程报验：" prop="projectInspection">
                                <el-input type="textarea" autosize v-model="SLdata.projectInspection" />
                            </el-form-item>
                            <el-form-item label="取样送检：" prop="sampling">
                                <el-input type="textarea" autosize v-model="SLdata.sampling" />
                            </el-form-item>
                            <el-form-item label="旁站送检：" prop="sitSuper">
                                <el-input type="textarea" autosize v-model="SLdata.sitSuper" />
                            </el-form-item>
                            <el-form-item label="监理通知：" prop="superNotice">
                                <el-input type="textarea" autosize v-model="SLdata.superNotice" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="addSLconfirm(infoForm.data.record_id)">确认</el-button>
                    </el-card>
                </div>
                <div width="80%" v-if="typeid=='6' && infoForm.data.SuperLog!=''">监理日志：
                    <el-card shadow="never" class="qz"> 
                        <el-form label-width="auto">
                            <el-form-item v-for="item in SLlist.data" :label="item.label">
                                <el-input type="textarea" autosize disabled :placeholder="item.value" />
                            </el-form-item>
                        </el-form>
                    </el-card>    
                </div>

                <div v-if="typeid=='7' && infoForm.data.DealLog==''">洽商记录：
                    <el-card shadow="never" class="add">
                        <el-form :model="DLdata" label-width="auto">
                            <el-form-item label="洽商主题：" prop="title">
                                <el-input type="textarea" autosize v-model="DLdata.title" />
                            </el-form-item>
                            <el-form-item label="洽商地址：" prop="address">
                                <el-input type="textarea" autosize v-model="DLdata.address" />
                            </el-form-item>
                            <el-form-item label="洽商主持人：" prop="host">
                                <el-input type="textarea" autosize v-model="DLdata.host" />
                            </el-form-item>
                            <el-form-item label="洽商内容：" prop="content">
                                <el-input type="textarea" autosize v-model="DLdata.content" />
                            </el-form-item>
                            <el-form-item label="洽商结果：" prop="result">
                                <el-input type="textarea" autosize v-model="DLdata.result" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="addDLconfirm(infoForm.data.record_id)">确认</el-button>
                    </el-card>
                </div>
                <div width="80%" v-if="typeid=='7' && infoForm.data.DealLog!=''">洽商记录：
                    <el-card shadow="never" class="qz">
                        <el-form label-width="auto">
                            <el-form-item v-for="item in DLlist.data" :label="item.label">
                                <el-input type="textarea" autosize disabled :placeholder="item.value" />
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>

                <div v-if="typeid=='10' && infoForm.data.DrawingReview==''">图纸会审记录：
                    <el-card shadow="never" class="add">
                        <el-form :model="DRdata" label-width="auto">
                            <el-form-item label="地点：" prop="place">
                                <el-input type="textarea" autosize v-model="DRdata.place" />
                            </el-form-item>
                            <el-form-item label="专业名称：" prop="proName">
                                <el-input type="textarea" autosize v-model="DRdata.proName" />
                            </el-form-item>
                            <el-form-item label="主持人：" prop="host">
                                <el-input type="textarea" autosize v-model="DRdata.host" />
                            </el-form-item>
                            <el-form-item label="记录人：" prop="recorder">
                                <el-input type="textarea" autosize v-model="DRdata.recorder" />
                            </el-form-item>
                            <el-form-item label="图纸问题：" prop="why">
                                <el-input type="textarea" autosize v-model="DRdata.why" />
                            </el-form-item>
                            <el-form-item label="图号：" prop="picNumber">
                                <el-input type="textarea" autosize v-model="DRdata.picNumber" />
                            </el-form-item>
                            <el-form-item label="会审记录：" prop="content">
                                <el-input type="textarea" autosize v-model="DRdata.content" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="addDRconfirm(infoForm.data.record_id)">确认</el-button>
                    </el-card>
                </div>
                <div width="80%" v-if="typeid=='10' && infoForm.data.DrawingReview!=''">图纸会审记录：
                    <el-card shadow="never" class="qz">
                        <el-form label-width="auto">
                            <el-form-item v-for="item in DRlist.data" :label="item.label">
                                <el-input type="textarea" autosize disabled :placeholder="item.value" />
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>

                <div v-if="typeid=='8' && infoForm.data.DesignChange==''">设计变更：
                    <el-card shadow="never" class="add">
                        <el-form :model="DCdata" label-width="auto">
                            <el-form-item label="变更原因：" prop="why">
                                <el-input type="textarea" autosize v-model="DCdata.why" />
                            </el-form-item>
                            <el-form-item label="图号：" prop="picNumber">
                                <el-input type="textarea" autosize v-model="DCdata.picNumber" />
                            </el-form-item>
                            <el-form-item label="洽商内容：" prop="content">
                                <el-input type="textarea" autosize v-model="DCdata.content" />
                            </el-form-item>
                        </el-form>
                        <el-button type="primary" @click="addDCconfirm(infoForm.data.record_id)">确认</el-button>
                    </el-card>
                </div>
                <div width="80%" v-if="typeid=='8' && infoForm.data.DesignChange!=''">设计变更：
                    <el-card shadow="never" class="qz">
                        <el-form label-width="auto">
                            <el-form-item v-for="item in DClist.data" :label="item.label">
                                <el-input type="textarea" autosize disabled :placeholder="item.value" />
                            </el-form-item>
                        </el-form>
                    </el-card>
                </div>

            </div>
            <el-descriptions :column="2" v-if="flag==true">
                <el-descriptions-item v-if="infoForm.data.ownerOp==''">建设单位意见：<span style="color: #F56C6C;">待审核..</span></el-descriptions-item>
                <el-descriptions-item v-else>建设单位意见：{{infoForm.data.ownerOp}}</el-descriptions-item>
                <el-descriptions-item v-if="infoForm.data.designOp==''">设计单位意见：<span style="color: #F56C6C;">待审核..</span></el-descriptions-item>
                <el-descriptions-item v-else>设计单位意见：{{infoForm.data.designOp}}</el-descriptions-item>
                <el-descriptions-item v-if="infoForm.data.superviseOp==''">监理单位意见：<span style="color: #F56C6C;">待审核..</span></el-descriptions-item>
                <el-descriptions-item v-else>监理单位意见：{{infoForm.data.superviseOp}}</el-descriptions-item>
                <el-descriptions-item v-if="infoForm.data.constructOp==''">施工单位意见：<span style="color: #F56C6C;">待审核..</span></el-descriptions-item>
                <el-descriptions-item v-else>施工单位意见：{{infoForm.data.constructOp}}</el-descriptions-item>
            </el-descriptions>
        </el-card>

        <!-- 审批 -->
        <el-dialog v-model="FormVisible11" title="工单审批" @close="closeDialog1">
            <el-form :model="opiniondata">
                <el-form-item label="意见：" prop="info">
                    <el-input v-model="opiniondata.info" />
                </el-form-item>
                <el-form-item label="附件：" prop="picture">
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
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible11 = false">取消</el-button>
                <el-button type="primary" @click="uploadopinion()">
                确认
                </el-button>
            </span>
            </template>
        </el-dialog>

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
                <el-table-column 
                prop="mark" 
                label="来源" 
                :width="150"
                :show-overflow-tooltip="true">
                    <template #default="scope">
                        <span v-if="scope.row.mark=='0'">电脑端</span>
                        <span v-else>手机端</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button size="small" @click="handledown(scope.row.path,scope.row.name)">下载</el-button>
                        <el-button v-if="user=='owner'" size="small" type="danger" @click="handleDelete(scope.row.file_id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 上传附件 -->
        <el-dialog v-model="FormVisible" title="上传附件" @close="closeDialog">
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
                <el-button @click="FormVisible = false">取消</el-button>
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
    margin-bottom: 50px;
}

.ordercard {
    width: 80%;
    margin: auto;
    overflow:auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
}
.card-body{
    word-wrap: break-word;
    text-align: left;
    white-space: pre-wrap;
    font-size: 15px;
}
.main{
    text-align: left;
    font-size: small;
}

.add{
    text-align: center;
}

.step{
    width:60%;
    font-size: smaller;
}
.el-table{
    margin: auto;
}
/* 表单 */
.qz {
    width: 95%;
/* margin: 20px auto; */
/* margin-left:100px */
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-all;
}
.liannxi {
    white-space:normal; word-break:break-all;overflow:hidden;
}
v-deep.kongbai {
    width: 200px;
}
:deep(.el-textarea__inner){
    overflow: hidden; /* 禁用滚动条 */
    resize: none; /* 禁止用户手动调整文本框的尺寸 */
}
</style>