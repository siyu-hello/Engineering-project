<script setup>
import { onMounted, reactive, ref } from 'vue';
import service from "../utils/request";
import { useRoute, useRouter } from 'vue-router'
import userecordInfo from '../pinia/record'
import { ElMessage } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import useorderInfo from '../pinia/order'
// import router from '../router/router';

const orderInfo = useorderInfo()


const route = useRoute()
const router = useRouter()
const recordInfo = userecordInfo()
const infoForm = reactive({ data: {} })


const FormVisible1 = ref(false)

const formdata = reactive({
    subPro_id:'',
    notes:''
})


//创建工单

const createConfirm = ()=>{
    formdata.subPro_id = route.params.id
    service.post('/record/',formdata)
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


//清空
const closeDialog1 = () =>{
    for (let key in formdata) {
        formdata[key] = ' ';
      }

    FormVisible1.value = false
}


const getinfo = async () => {
    // pinia刷新时不会保留数据，需要重新获取
    if (recordInfo.data.length === 0) {
        try {
            let res = await service.get('/sub/project/')
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
    service.get('/record/')
    .then((res)=>{
        if(res.data.code==0){
            let data = res.data.data
            j=0
            for(let i in data){
                if(data[i].project_id==route.params.id){
                    orderForm.data[j]=data[i]
                    orderInfo.data[j]=data[i]
                    j++
                }
            }
        }
    })
}

// 生命周期中监听
onMounted(async () => {
    // 加载项目信息
    await getinfo()
    infoForm.data = recordInfo.data[route.params.index]
    getorder()
})

const getDetail= (index,id) =>{
    router.push({name:'orderinfo',params:{id:id}})
    // router.push({path:'/orderInfo',params:{id:id}})
}

</script>

<template>
    <div class="container">
        <el-card class="projectcard">
            <template #header>
                <div class="card-header">
                    <span>项目详情</span>
                    <div class="btn">
                    <el-button type="primary" class="button" @click="FormVisible1 = true">+创建工单</el-button>
                    <!-- <el-button type="primary" class="button" @click="FormVisible2 = true">+上传附件</el-button> -->
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


        <!-- 工单列表 -->
        <div class="order">
            <h2>工单列表</h2>
            <el-empty v-if="orderForm.data==''" :image-size="100" />
            <el-table v-else :data="orderForm.data" style="width: 80%">
                <el-table-column label="工单名称" :show-overflow-tooltip="true" prop="name" :width="200" />
                <el-table-column label="工单状态" prop="state" :width="100">
                    <template #default="scope">
                        <el-tag
                        :type="scope.row.tag === 'start' ? '' : 'success'"
                        disable-transitions
                        >{{ scope.row.state }}</el-tag
                        >
                    </template>
                </el-table-column>
                <el-table-column label="建设单位意见" prop="ownerOp" :width="150">
                    <template #default="scope">
                        <div v-if="scope.row.ownerOp==''" style="display: flex; align-items: center">
                            <el-icon color="#F56C6C"><Timer /></el-icon>
                            <span style="margin-left: 10px;color: #F56C6C;">待审核</span>
                        </div>
                        <div v-else style="display: flex; align-items: center">
                            <span>{{ scope.row.ownerOp }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="设计单位意见" prop="designOp" :width="150">
                    <template #default="scope">
                        <div v-if="scope.row.designOp==''" style="display: flex; align-items: center">
                            <el-icon color="#F56C6C"><Timer /></el-icon>
                            <span style="margin-left: 10px;color: #F56C6C;">待审核</span>
                        </div>
                        <div v-else style="display: flex; align-items: center">
                            <span>{{ scope.row.designOp }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="施工单位意见" prop="constructOp" :width="150">
                    <template #default="scope">
                        <div v-if="scope.row.constructOp==''" style="display: flex; align-items: center">
                            <el-icon color="#F56C6C"><Timer /></el-icon>
                            <span style="margin-left: 10px;color: #F56C6C;">待审核</span>
                        </div>
                        <div v-else style="display: flex; align-items: center">
                            <span>{{ scope.row.constructOp }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="监理意见" prop="superviseOp"  :width="150">
                    <template #default="scope">
                        <div v-if="scope.row.superviseOp==''" style="display: flex; align-items: center">
                            <el-icon color="#F56C6C"><Timer /></el-icon>
                            <span style="margin-left: 10px;color: #F56C6C;">待审核</span>
                        </div>
                        <div v-else style="display: flex; align-items: center">
                            <span>{{ scope.row.superviseOp }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="primary" size="small" @click="getDetail(scope.$index,scope.row.record_id)">展开更多</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>


         <!-- 创建工单 -->
         <el-dialog v-model="FormVisible1" title="创建工单" @close="closeDialog1">
            <el-form :model="formdata">
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
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    margin-bottom: 50px;
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

.el-table{
    margin: auto;
}
</style>

