<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios'
import { ElMessage } from 'element-plus'
import useorderInfo from '../pinia/order'
import router from '../router/router';
import { useRoute } from 'vue-router'

const user = ref(sessionStorage.getItem('username'))
const route = useRoute()
const projectnname=ref(route.params.projectnname)
console.log(projectnname.value)
const projectid=ref(route.params.id)
console.log(projectid.value)
const orderInfo = useorderInfo()
const infoForm = reactive({ data: {} })
const FormVisible = ref(false)

const FormVisibleEM = ref(false)
const FormVisibleWC = ref(false)
const FormVisibleSWC = ref(false)
const FormVisibleCC = ref(false)
const FormVisibleSM = ref(false)
const FormVisibleCL = ref(false)
const FormVisibleSL = ref(false)
const FormVisibleDL = ref(false)
const FormVisibleDR = ref(false)
const FormVisibleDC = ref(false)


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
const FormVisible1 = ref(false)
const EMdata = reactive({
    "content":'',
    "record_id":''
})
const addEngineMeasure= (id) =>{
    EMdata.record_id = id
    FormVisible1.value = true
}
const addEMconfirm= () =>{
    axios.post('/api/add/engine/measure/',EMdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
            FormVisible1.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加工作联系单
const FormVisible2 = ref(false)
const WCdata = reactive({
    "content":'',
    "record_id":''
})
const addWorkContact= (id) =>{
    WCdata.record_id = id
    FormVisible2.value = true
}
const addWCconfirm= () =>{
    axios.post('/api/add/work/contact/ ',WCdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
            FormVisible2.value = false
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
const FormVisible3 = ref(false)
const SWCdata = reactive({
    "content":'',
    "why":'',
    "record_id":''
})
const addSWorkContact= (id) =>{
    SWCdata.record_id = id
    FormVisible3.value = true
}
const addSWCconfirm= () =>{
    axios.post('/api/add/swork/contact/ ',SWCdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
            FormVisible3.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加合同变更申请单
const FormVisible4 = ref(false)
const CCdata = reactive({
    "why":'',
    "record_id":''
})
const addChangContact= (id) =>{
    CCdata.record_id = id
    FormVisible4.value = true
}
const addCCconfirm= () =>{
    axios.post('/api/add/change/contact/ ',CCdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
            FormVisible4.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加监理会议纪要
const FormVisible5 = ref(false)
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
const addSuperMeeting= (id) =>{
    SMdata.record_id = id
    FormVisible5.value = true
}
const addSMconfirm= () =>{
    axios.post('/api/add/super/meeting/ ',SMdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
            FormVisible5.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加施工日志
const FormVisible6 = ref(false)
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
const addConstructLog= (id) =>{
    CLdata.record_id = id
    FormVisible6.value = true
}
const addCLconfirm= () =>{
    axios.post('/api/add/construct/log/ ',CLdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
            FormVisible6.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加洽商记录
const FormVisible8 = ref(false)
const DLdata = reactive({
    "title":'',
    "address":'',
    "host":'',
    "content":'',
    "result":'',
    "record_id":''
})
const addDealLog= (id) =>{
    DLdata.record_id = id
    FormVisible8.value = true
}
const addDLconfirm= () =>{
    axios.post('/api/add/deal/log/ ',DLdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
            FormVisible8.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加监理日志
const FormVisible7 = ref(false)
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
const addSuperLog= (id) =>{
    SLdata.record_id = id
    FormVisible7.value = true
}
const addSLconfirm= () =>{
    axios.post('/api/add/super/log/ ',SLdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
            FormVisible7.value = false
        }
        else{
            ElMessage.error('出错了！')
        }
    })
}

// 添加图纸会审记录
const FormVisible9 = ref(false)
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
const addDrawingReview= (id) =>{
    DRdata.record_id = id
    FormVisible9.value = true
}
const addDRconfirm= () =>{
    axios.post('/api/add/drawing/review/ ',DRdata)
    .then((res)=>{
        if(res.data.code==0){
            ElMessage.success('添加成功')
            getorder()
            FormVisible9.value = false
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
const addDesignChange= (id) =>{
    DCdata.record_id = id
    FormVisible10.value = true
}
const addDCconfirm= () =>{
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
            }
        } catch (err) {
            console.log(err)
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
                    console.log(nextrole.value)
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
                    <div class="step">
                        <el-steps v-if="oporder!='0'" :active="active" align-center finish-status="success">
                            <el-step v-for="item in step.data" :description="item.name" />
                        </el-steps>
                    </div>
                    <div class="btn">
                    <el-button type="primary" class="button" @click="exam()">审批</el-button>
                    </div>
                    <div class="btn">
                    <el-button type="primary" class="button" @click="FormVisible = true">+上传附件</el-button>
                    </div>
                </div>
            </template>
            <el-descriptions :column="2">
                <el-descriptions-item>工单名称：{{infoForm.data.name}}</el-descriptions-item>
                <el-descriptions-item>工单状态：{{infoForm.data.state}}</el-descriptions-item>
                <!-- 十个文件 -->
                <el-descriptions-item v-if="typeid=='1' && infoForm.data.EngineMeasure==''">签证计量单：<el-button type="danger" plain size="small" @click="addEngineMeasure(infoForm.data.record_id)" >+添加</el-button></el-descriptions-item>
                <el-descriptions-item width="80%" v-if="typeid=='1' && infoForm.data.EngineMeasure!=''">签证计量单：
                   <el-card shadow="never" class="qz">
                    <div class="liannxi">签证内容：{{infoForm.data.EngineMeasure[0].content}}</div>
                    
                    <!-- <el-descriptions :column="1">
                    <el-descriptions-item label="签证内容:">{{infoForm.data.EngineMeasure[0].content}}</el-descriptions-item>
            </el-descriptions> --></el-card> 
                
                </el-descriptions-item>

                <el-descriptions-item v-if="typeid=='2' && infoForm.data.WorkContact==''">工作联系单：<el-button type="danger" plain size="small" @click="addWorkContact(infoForm.data.record_id)" >+添加</el-button></el-descriptions-item>
                <el-descriptions-item width="80%" v-if="typeid=='2' && infoForm.data.WorkContact!=''">工作联系单：
                <el-card shadow="never" class="qz">
                    <div class="liannxi">联系事项：{{infoForm.data.WorkContact[0].content }}</div>
                    <!-- <el-descriptions :column="1">
                        
                                    <el-descriptions-item style="overflow: auto;" label="联系事项:"></el-descriptions-item>
                            </el-descriptions> -->
                </el-card>
                </el-descriptions-item>

                <el-descriptions-item v-if="typeid=='3' && infoForm.data.SWorkContact==''">监理工作联系单：<el-button type="danger" plain size="small" @click="addSWorkContact(infoForm.data.record_id)" >+添加</el-button></el-descriptions-item>
                <el-descriptions-item width="80%" v-if="typeid=='3' && infoForm.data.SWorkContact!=''">监理工作联系单：
                <el-card shadow="never" class="qz"> 
                   
                    <div class="liannxi" >联系事项：{{infoForm.data.SWorkContact[0].content}}</div>
                    <div class="liannxi">事由：{{infoForm.data.SWorkContact[0].why}}</div>
           
                </el-card>    
                
                </el-descriptions-item>

                <el-descriptions-item v-if="typeid=='4' && infoForm.data.ChangContact==''">合同变更申请单：<el-button type="danger" plain size="small" @click="addChangContact(infoForm.data.record_id)" >+添加</el-button></el-descriptions-item>
                <el-descriptions-item width="80%" v-if="typeid=='4' && infoForm.data.ChangContact!=''">合同变更申请单：
                    <el-card shadow="never" class="qz">
                  
                    <div class="liannxi" >原因：{{infoForm.data.ChangContact[0].why}}</div>

                </el-card>
                </el-descriptions-item>

                <el-descriptions-item v-if="typeid=='5' && infoForm.data.SuperMeeting==''">监理会议纪要：<el-button type="danger" plain size="small" @click="addSuperMeeting(infoForm.data.record_id)" >+添加</el-button></el-descriptions-item>
                <el-descriptions-item width="80%" v-if="typeid=='5' && infoForm.data.SuperMeeting!=''">监理会议纪要：
                    <el-card shadow="never" class="qz">
                        
                    <div class="liannxi">会议地点:{{infoForm.data.SuperMeeting[0].place}}</div>
                    <div class="liannxi">主要议题:{{infoForm.data.SuperMeeting[0].content}}</div>
                    <div class="liannxi">解决或议定事项:{{infoForm.data.SuperMeeting[0].agreedMatters}}</div>
                    <div class="liannxi">主持人:{{infoForm.data.SuperMeeting[0].hostName}}</div>
                    <div class="liannxi">建设单位人员:{{infoForm.data.SuperMeeting[0].ownerName}}</div>
                    <div class="liannxi">设计单位人员:{{infoForm.data.SuperMeeting[0].designName}}</div>
                    <div class="liannxi">监理单位人员:{{infoForm.data.SuperMeeting[0].superName}}</div>
                    <div class="liannxi">施工单位人员:{{infoForm.data.SuperMeeting[0].constructName}}</div>
           
                    </el-card>

                </el-descriptions-item>

                <el-descriptions-item v-if="typeid=='9' && infoForm.data.ConstructLog==''">施工日志：<el-button type="danger" plain size="small" @click="addConstructLog(infoForm.data.record_id)" >+添加</el-button></el-descriptions-item>
                <el-descriptions-item v-if="typeid=='9' && infoForm.data.ConstructLog!=''">施工日志：
<el-card shadow="never" class="qz">
                    <div class="liannxi">天气:{{infoForm.data.ConstructLog[0].weather}}</div>
                    <div class="liannxi">最低及最高气温:{{infoForm.data.ConstructLog[0].temperature}}</div>
                    <div class="liannxi">班组:{{infoForm.data.ConstructLog[0].group}}</div>
                    <div class="liannxi">班组负责人:{{infoForm.data.ConstructLog[0].groupManage}}</div>
                    <div class="liannxi">施工部位:{{infoForm.data.ConstructLog[0].constructArea}}</div>
                    <div class="liannxi">施工内容:{{infoForm.data.ConstructLog[0].content}}</div>
                    <div class="liannxi">质量情况:{{infoForm.data.ConstructLog[0].result}}</div>
                    <div class="liannxi">设计变更交底:{{infoForm.data.ConstructLog[0].changePaper}}</div>
                    <div class="liannxi">验收部位:{{infoForm.data.ConstructLog[0].inspectionArea}}</div>
                    <div class="liannxi">材料使用情况:{{infoForm.data.ConstructLog[0].materialSituation}}</div>
                    <div class="liannxi">材料留置:{{infoForm.data.ConstructLog[0].materialTake}}</div>
                    <div class="liannxi">交接检查情况:{{infoForm.data.ConstructLog[0].handOverSituation}}</div>
                    <div class="liannxi">机械使用情况:{{infoForm.data.ConstructLog[0].machineSituation}}</div>
                    <div class="liannxi">安全:{{infoForm.data.ConstructLog[0].safe}}</div>
                    <div class="liannxi">处理方法:{{infoForm.data.ConstructLog[0].processMethod}}</div>
</el-card>
                </el-descriptions-item>

                <el-descriptions-item v-if="typeid=='6' && infoForm.data.SuperLog==''">监理日志：<el-button type="danger" plain size="small" @click="addSuperLog(infoForm.data.record_id)" >+添加</el-button></el-descriptions-item>
                <el-descriptions-item width="80%" v-if="typeid=='6' && infoForm.data.SuperLog!=''">监理日志：
                    <el-card shadow="never" class="qz"> 
                    
                    <div  class="liannxi">天气:{{infoForm.data.SuperLog[0].weather}}</div>
                    <div  class="liannxi">最低及最高气温:{{infoForm.data.SuperLog[0].temperature}}</div>
                    <div  class="liannxi">班组:{{infoForm.data.SuperLog[0].group}}</div>
                    <div  class="liannxi">施工人数:{{infoForm.data.SuperLog[0].number}}</div>
                    <div  class="liannxi">施工部位:{{infoForm.data.SuperLog[0].constructArea}}</div>
                    <div  class="liannxi">施工内容:{{infoForm.data.SuperLog[0].content}}</div>
                    <div  class="liannxi">质量检查情况:{{infoForm.data.SuperLog[0].result}}</div>
                    <div  class="liannxi">设备报验:{{infoForm.data.SuperLog[0].equipmentInspection}}</div>
                    <div  class="liannxi">工程报验:{{infoForm.data.SuperLog[0].projectInspection}}</div>
                    <div  class="liannxi">取样送检:{{infoForm.data.SuperLog[0].sampling}}</div>
                    <div  class="liannxi">旁站监理:{{infoForm.data.SuperLog[0].sitSuper}}</div>
                    <div  class="liannxi">监理通知:{{infoForm.data.SuperLog[0].superNotice}}</div>
          
                </el-card>    
                
                </el-descriptions-item>

                <el-descriptions-item v-if="typeid=='7' && infoForm.data.DealLog==''">洽商记录：<el-button type="danger" plain size="small" @click="addDealLog(infoForm.data.record_id)" >+添加</el-button></el-descriptions-item>
                <el-descriptions-item width="80%" v-if="typeid=='7' && infoForm.data.DealLog!=''">洽商记录：<el-card shadow="never" class="qz">
                   
                    <div class="liannxi">洽商主题:{{infoForm.data.DealLog[0].title}}</div>
                    <div class="liannxi">洽商地址:{{infoForm.data.DealLog[0].address}}</div>
                    <div class="liannxi">洽商主持人:{{infoForm.data.DealLog[0].host}}</div>
                    <div class="liannxi">洽商内容:{{infoForm.data.DealLog[0].content}}</div>
                    <div class="liannxi">洽商结果:{{infoForm.data.DealLog[0].result}}</div>

                </el-card>
                </el-descriptions-item>

                <el-descriptions-item v-if="typeid=='10' && infoForm.data.DrawingReview==''">图纸会审记录：<el-button type="danger" plain size="small" @click="addDrawingReview(infoForm.data.record_id)" >+添加</el-button></el-descriptions-item>
                <el-descriptions-item width="80%" v-if="typeid=='10' && infoForm.data.DrawingReview!=''">图纸会审记录：
                    <el-card shadow="never" class="qz">
                  
                    <div class="liannxi">地点:{{infoForm.data.DrawingReview[0].place}}</div>
                    <div class="liannxi">专业名称:{{infoForm.data.DrawingReview[0].proName}}</div>
                    <div class="liannxi">主持人:{{infoForm.data.DrawingReview[0].host}}</div>
                    <div class="liannxi">记录人:{{infoForm.data.DrawingReview[0].recorder}}</div>
                    <div class="liannxi">图纸问题:{{infoForm.data.DrawingReview[0].why}}</div>
                    <div class="liannxi">图号:{{infoForm.data.DrawingReview[0].picNumber}}</div>
                    <div class="liannxi">会审记录:{{infoForm.data.DrawingReview[0].content}}</div>
          
                </el-card>
                </el-descriptions-item>

                <el-descriptions-item v-if="typeid=='8' && infoForm.data.DesignChange==''">设计变更：<el-button type="danger" plain size="small" @click="addDesignChange(infoForm.data.record_id)" >+添加</el-button></el-descriptions-item>
                <el-descriptions-item width="80%" v-if="typeid=='8' && infoForm.data.DesignChange!=''">设计变更：
                    <el-card shadow="never" class="qz">
                       
                    <div class="liannxi">变更原因:{{infoForm.data.DesignChange[0].why}}</div>
                    <div class="liannxi">图号:{{infoForm.data.DesignChange[0].picNumber}}</div>
                    <div class="liannxi">洽商内容:{{infoForm.data.DesignChange[0].content}}</div>
          

                    </el-card>
                
                </el-descriptions-item>
            <el-descriptions-item>  </el-descriptions-item>
                <!--  -->
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

        <!-- 签证计量单 -->
        <div v-if="FormVisibleEM" title="签证计量单">
           
        </div>
        <!-- 工作联系单 -->
        <el-dialog v-model="FormVisibleWC" title="工作联系单">
           
        </el-dialog>
        <!-- 监理工作联系单 -->
        <el-dialog v-model="FormVisibleSWC" title="监理工作联系单">
           
        </el-dialog>
        <!-- 合同变更申请单 -->
        <el-dialog v-model="FormVisibleCC" title="合同变更申请单">
           
        </el-dialog>
        <!-- 监理会议纪要 -->
        <el-dialog v-model="FormVisibleSM" title="监理会议纪要">
            
        </el-dialog>
        <!-- 施工日志 -->
        <el-dialog v-model="FormVisibleCL" title="施工日志">
          
        </el-dialog>
        <!-- 监理日志 -->
        <el-dialog v-model="FormVisibleSL" title="监理日志">
            
        </el-dialog>
        <!-- 洽商记录 -->
        <el-dialog v-model="FormVisibleDL" title="洽商记录">
           
        </el-dialog>
        <!-- 图纸会审记录 -->
        <el-dialog v-model="FormVisibleDR" title="图纸会审记录">
           
        </el-dialog>
        <!-- 设计变更 -->
        <el-dialog v-model="FormVisibleDC" title="设计变更">
           
        </el-dialog>


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

        <!-- 添加签证计量单 -->
        <el-dialog v-model="FormVisible1" title="添加签证计量单">
            <el-form :model="EMdata">
                <el-form-item label="内容：" prop="content">
                    <el-input v-model="EMdata.content" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible1 = false">取消</el-button>
                <el-button type="primary" @click="addEMconfirm()">确认</el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 添加工作联系单 -->
        <el-dialog v-model="FormVisible2" title="添加工作联系单">
            <el-form :model="WCdata">
                <el-form-item label="内容：" prop="content">
                    <el-input v-model="WCdata.content" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible2 = false">取消</el-button>
                <el-button type="primary" @click="addWCconfirm()">确认</el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 添加监理工作联系单 -->
        <el-dialog v-model="FormVisible3" title="添加监理工作联系单">
            <el-form :model="SWCdata">
                <el-form-item label="联系事项：" prop="content">
                    <el-input v-model="SWCdata.content" />
                </el-form-item>
                <el-form-item label="事由：" prop="why">
                    <el-input v-model="SWCdata.why" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible3 = false">取消</el-button>
                <el-button type="primary" @click="addSWCconfirm()">确认</el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 添加合同变更申请单 -->
        <el-dialog v-model="FormVisible4" title="添加合同变更申请单">
            <el-form :model="CCdata">
                <el-form-item label="原因：" prop="why">
                    <el-input v-model="CCdata.why" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible4 = false">取消</el-button>
                <el-button type="primary" @click="addCCconfirm()">确认</el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 添加监理会议纪要 -->
        <el-dialog v-model="FormVisible5" title="添加监理会议纪要">
            <el-form :model="SMdata">
                <el-form-item label="会议地点：" prop="place">
                    <el-input v-model="SMdata.place" />
                </el-form-item>
                <el-form-item label="主要议题：" prop="content">
                    <el-input v-model="SMdata.content" />
                </el-form-item>
                <el-form-item label="解决或议定事项：" prop="agreedMatters">
                    <el-input v-model="SMdata.agreedMatters" />
                </el-form-item>
                <el-form-item label="主持人：" prop="hostName">
                    <el-input v-model="SMdata.hostName" />
                </el-form-item>
                <el-form-item label="建设单位人员：" prop="ownerName">
                    <el-input v-model="SMdata.ownerName" />
                </el-form-item>
                <el-form-item label="设计单位人员：" prop="designName">
                    <el-input v-model="SMdata.designName" />
                </el-form-item>
                <el-form-item label="监理单位人员：" prop="superName">
                    <el-input v-model="SMdata.superName" />
                </el-form-item>
                <el-form-item label="施工单位人员：" prop="constructName">
                    <el-input v-model="SMdata.constructName" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible5 = false">取消</el-button>
                <el-button type="primary" @click="addSMconfirm()">确认</el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 添加施工日志 -->
        <el-dialog v-model="FormVisible6" title="添加施工日志">
            <el-form :model="CLdata">
                <el-form-item label="天气：" prop="weather">
                    <el-input v-model="CLdata.weather" />
                </el-form-item>
                <el-form-item label="最低及最高气温：" prop="temperature">
                    <el-input v-model="CLdata.temperature" />
                </el-form-item>
                <el-form-item label="班组：" prop="group">
                    <el-input v-model="CLdata.group" />
                </el-form-item>
                <el-form-item label="班组负责人：" prop="groupManage">
                    <el-input v-model="CLdata.groupManage" />
                </el-form-item>
                <el-form-item label="施工部位：" prop="constructArea">
                    <el-input v-model="CLdata.constructArea" />
                </el-form-item>
                <el-form-item label="施工内容：" prop="content">
                    <el-input v-model="CLdata.content" />
                </el-form-item>
                <el-form-item label="质量情况：" prop="result">
                    <el-input v-model="CLdata.result" />
                </el-form-item>
                <el-form-item label="设计变更交底：" prop="changePaper">
                    <el-input v-model="CLdata.changePaper" />
                </el-form-item>
                <el-form-item label="验收部位：" prop="inspectionArea">
                    <el-input v-model="CLdata.inspectionArea" />
                </el-form-item>
                <el-form-item label="材料使用情况：" prop="materialSituation">
                    <el-input v-model="CLdata.materialSituation" />
                </el-form-item>
                <el-form-item label="材料留置：" prop="materialTake">
                    <el-input v-model="CLdata.materialTake" />
                </el-form-item>
                <el-form-item label="交接检查情况：" prop="handOverSituation">
                    <el-input v-model="CLdata.handOverSituation" />
                </el-form-item>
                <el-form-item label="机械使用情况：" prop="machineSituation">
                    <el-input v-model="CLdata.machineSituation" />
                </el-form-item>
                <el-form-item label="安全：" prop="safe">
                    <el-input v-model="CLdata.safe" />
                </el-form-item>
                <el-form-item label="处理方法：" prop="processMethod">
                    <el-input v-model="CLdata.processMethod" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible6 = false">取消</el-button>
                <el-button type="primary" @click="addCLconfirm()">确认</el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 添加监理日志 -->
        <el-dialog v-model="FormVisible7" title="添加监理日志">
            <el-form :model="SLdata">
                <el-form-item label="天气：" prop="weather">
                    <el-input v-model="SLdata.weather" />
                </el-form-item>
                <el-form-item label="最低及最高气温：" prop="temperature">
                    <el-input v-model="SLdata.temperature" />
                </el-form-item>
                <el-form-item label="班组：" prop="group">
                    <el-input v-model="SLdata.group" />
                </el-form-item>
                <el-form-item label="施工人数：" prop="number">
                    <el-input v-model="SLdata.number" />
                </el-form-item>
                <el-form-item label="施工部位：" prop="constructArea">
                    <el-input v-model="SLdata.constructArea" />
                </el-form-item>
                <el-form-item label="施工内容：" prop="content">
                    <el-input v-model="SLdata.content" />
                </el-form-item>
                <el-form-item label="质量检查情况：" prop="result">
                    <el-input v-model="SLdata.result" />
                </el-form-item>
                <el-form-item label="设备报验：" prop="equipmentInspection">
                    <el-input v-model="SLdata.equipmentInspection" />
                </el-form-item>
                <el-form-item label="工程报验：" prop="projectInspection">
                    <el-input v-model="SLdata.projectInspection" />
                </el-form-item>
                <el-form-item label="取样送检：" prop="sampling">
                    <el-input v-model="SLdata.sampling" />
                </el-form-item>
                <el-form-item label="旁站送检：" prop="sitSuper">
                    <el-input v-model="SLdata.sitSuper" />
                </el-form-item>
                <el-form-item label="监理通知：" prop="superNotice">
                    <el-input v-model="SLdata.superNotice" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible7 = false">取消</el-button>
                <el-button type="primary" @click="addSLconfirm()">确认</el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 添加洽商记录 -->
        <el-dialog v-model="FormVisible8" title="添加洽商记录">
            <el-form :model="DLdata">
                <el-form-item label="洽商主题：" prop="title">
                    <el-input v-model="DLdata.title" />
                </el-form-item>
                <el-form-item label="洽商地址：" prop="address">
                    <el-input v-model="DLdata.address" />
                </el-form-item>
                <el-form-item label="洽商主持人：" prop="host">
                    <el-input v-model="DLdata.host" />
                </el-form-item>
                <el-form-item label="洽商内容：" prop="content">
                    <el-input v-model="DLdata.content" />
                </el-form-item>
                <el-form-item label="洽商结果：" prop="result">
                    <el-input v-model="DLdata.result" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible8 = false">取消</el-button>
                <el-button type="primary" @click="addDLconfirm()">确认</el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 添加图纸会审记录 -->
        <el-dialog v-model="FormVisible9" title="添加图纸会审记录">
            <el-form :model="DRdata">
                <el-form-item label="地点：" prop="place">
                    <el-input v-model="DRdata.place" />
                </el-form-item>
                <el-form-item label="专业名称：" prop="proName">
                    <el-input v-model="DRdata.proName" />
                </el-form-item>
                <el-form-item label="主持人：" prop="host">
                    <el-input v-model="DRdata.host" />
                </el-form-item>
                <el-form-item label="记录人：" prop="recorder">
                    <el-input v-model="DRdata.recorder" />
                </el-form-item>
                <el-form-item label="图纸问题：" prop="why">
                    <el-input v-model="DRdata.why" />
                </el-form-item>
                <el-form-item label="图号：" prop="picNumber">
                    <el-input v-model="DRdata.picNumber" />
                </el-form-item>
                <el-form-item label="会审记录：" prop="content">
                    <el-input v-model="DRdata.content" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible9 = false">取消</el-button>
                <el-button type="primary" @click="addDRconfirm()">确认</el-button>
            </span>
            </template>
        </el-dialog>

        <!-- 添加设计变更 -->
        <el-dialog v-model="FormVisible10" title="添加设计变更">
            <el-form :model="DCdata">
                <el-form-item label="变更原因：" prop="why">
                    <el-input v-model="DCdata.why" />
                </el-form-item>
                <el-form-item label="图号：" prop="picNumber">
                    <el-input v-model="DCdata.picNumber" />
                </el-form-item>
                <el-form-item label="洽商内容：" prop="content">
                    <el-input v-model="DCdata.content" />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="FormVisible10 = false">取消</el-button>
                <el-button type="primary" @click="addDCconfirm()">确认</el-button>
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
margin: 20px auto;
margin-left:100px
}
.liannxi {
    white-space:normal; word-break:break-all;overflow:hidden;
}
v-deep.kongbai {
    width: 200px;
}
</style>