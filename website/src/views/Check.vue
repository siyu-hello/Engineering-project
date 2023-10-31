<script setup>
import axios from 'axios'
const getinfo= () =>{
    axios.get('/api/company/info/')
    .then((res)=>{console.log(res)})
}
</script>

<template>
    <div class="container">
        <el-button @click="getinfo">1</el-button>
    </div>
</template>

<style scoped>
</style>

