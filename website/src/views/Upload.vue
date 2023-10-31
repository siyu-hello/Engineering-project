<script setup>
import { reactive,ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
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
    ],
    notes:{required: true, message: '请输入项目简介', trigger: 'blur'}
}

const reset= () =>{
    FormRef.value.resetFields()
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
        }
        else{
            console.log(res)
            ElMessage.error('出错了！')
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
    <div class="container">
        <el-card shadow="never">
        <h2>发布项目</h2>
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
                <el-input v-model.number="form.money" />
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
                <el-input v-model.number="form.workload" />
            </el-form-item>
            <el-form-item label="备注"  prop="notes">
                <el-input 
                v-model="form.notes"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea" />
            </el-form-item>
            <el-button @click="reset()">重置</el-button>
            <el-button type="primary" @click="upload(FormRef)">发布</el-button>
        </el-form>
        </el-card>
    </div>
</template>

<style scoped>
.container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-card{
    width: 50%;
}
</style>

