<script setup>
import { onMounted, ref,reactive } from 'vue'
import axios from 'axios'
import * as echarts from 'echarts';

const usercompany = ref(sessionStorage.getItem("usercompany"))
const username = ref(sessionStorage.getItem("username"))
const logintime = ref(sessionStorage.getItem("logintime"))
const subprototal = ref()
const recordtotal = ref()


const initecharts1 = () =>{
    var myChart = echarts.init(document.getElementById('subpro'));
    // 绘制图表
    myChart.setOption({
        title: {
            text: subprototal.value,
            subtext:'我的项目',
            left: 'center',
            top: 'center'
        },
        series: [
            {
            type: 'pie',
            avoidLabelOverlap: false,
            label:{
                show:false
            },
            labelLine: {
                show: false
            },
            data: [
                {value:0},
                {value:0},
                {value:0},
                {
                value: subprototal.value,
                name: '我的项目总量'
                }
            ],
            radius: ['55%', '70%']
            }
        ]
    });
}

const initecharts2 = () =>{
    var myChart = echarts.init(document.getElementById('record'));
    // 绘制图表
    myChart.setOption({
        title: {
            text: recordtotal.value,
            subtext:'工单',
            left: 'center',
            top: 'center'
        },
        series: [
            {
            type: 'pie',
            avoidLabelOverlap: false,
            label:{
                show:false
            },
            labelLine: {
                show: false
            },
            data: [
                {
                value: recordtotal.value,
                name: '工单总量'
                }
            ],
            radius: ['55%', '70%']
            }
        ]
    });
}

const config1 = reactive({
    header:["项目名称","项目内容"],
    data: [],
    align: ['center'],
    oddRowBGC:'#fafafa',
    evenRowBGC:'#e9e9eb',
    headerBGC:'#d9ecff'
})
const config2 = reactive({
    header:["工单名称","工单状态"],
    data: [],
    align: ['center'],
    oddRowBGC:'#e9e9eb',
    evenRowBGC:'#fafafa',
    headerBGC:'#d9ecff'
})


const getorder = () =>{
    axios.get('/api/record/')
    .then((res)=>{
        if(res.data.code==0){
            let data = res.data.data
            for(let i in data){
                config2.data.push([data[i].name,'<span style="color:#F56C6C;">'+data[i].state+'</span>'])
            }
            recordtotal.value = data.length
        }
    })
}


const getRecord = async() =>{
    try{
        let res = await axios.get('/api/sub/project/')
        if(res.data.code===0){
            let data = res.data.data
            for(let i in data){
                    config1.data.push([data[i].name,data[i].content])
                }
                subprototal.value = data.length
            }
        }
    catch(err){
        console.log(err)
    }
}

onMounted(()=>{
    getRecord()
    getorder()
    setTimeout(() => {
        initecharts1()
        initecharts2()
    }, 800)
})
</script>

<template>
    <div class="container">
        <!-- 用户信息 -->
        <div class="userinfo">
            <el-card class="cardone">
                <div class="topbox">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="130"/>
                    <div class="username">
                        <h2>{{ username }}</h2>
                        <p>{{ usercompany }}</p>
                    </div>
                </div>
                <div class="buttombox">
                    <p>登陆时间：{{ logintime }}</p>
                    <p>欢迎进入平台！</p>
                </div>
            </el-card>
        </div>

        <!-- echarts -->
        <div class="echarts">
            <el-card class="echartscard">
                <div id="subpro"></div>
                <div id="record"></div>
            </el-card>
        </div>

        <!-- 我的项目 -->
        <div class="subprolist">
            <el-card class="subprocard">
                <template #header>
                    <div class="card-header">
                        <span>我的项目</span>
                    </div>
                </template>
                <dv-scroll-board :config="config1" style="width:100%;height:250px;color: black;" />
            </el-card>
        </div>

        <!-- 工单 -->
        <div class="recordlist">
            <el-card class="recordcard">
                <template #header>
                    <div class="card-header">
                        <span>工单列表</span>
                    </div>
                </template>
                <dv-scroll-board :config="config2" style="width:100%;height:250px;color: black;" />
            </el-card>
        </div>
    </div>
</template>

<style scoped>
.container{
    width: 85%;
    height: 90%;
    margin: auto;
    display: flex;
    margin-top: 2%;
    position: relative;
}
.cardone{
    width: 42%;
    height: 42%;
    position: absolute;
    left: 0;
}
.topbox{
    display: flex;
    padding: 20px;
}
.username{
    margin-left: 8%;
    padding: 18px;
}
.username h2{
    font-size: 30px;
    margin: 0;
    padding: 0;
}
.username p{
    margin-top: 8px;
    font-weight: lighter;
    color: gray;
}
.buttombox{
    border-top: gray solid .2px;
}
.buttombox p{
    font-size: 12px;
    font-weight: lighter;
    color: rgb(97, 97, 97);
}

.echarts{
    width: 56%;
    height: 42%;
    background-color: antiquewhite;
    position: absolute;
    right: 0;
}
.echartscard{
    display: flex;
    text-align: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
#subpro,
#record{
    display: inline-block;
    width: 220px;
    height: 220px;
}
#record{
    margin-left: 10px;
}

.subprolist{
    width: 49%;
    height: 56%;
    position: absolute;
    left: 0;
    bottom: 0;
}
.recordlist{
    width: 49%;
    height: 56%;
    position: absolute;
    right: 0;
    bottom: 0;
}

</style>