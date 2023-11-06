<script setup>
import { RouterView } from "vue-router"
import Nav from "../components/Nav.vue"
import Top from "../components/Top.vue"
</script>

<template>
    <div class="container">
        <el-container class="bigbox">
            <el-aside>
                <Nav/>
            </el-aside>
            <el-container class="smallbox">
                <el-header>
                    <top />
                </el-header>
                <el-main>
                    <RouterView></RouterView>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.container{
    margin: auto;
}
.bigbox{
    height: 100vh;
    width: 100vw;
}
.el-header{
    padding: 0;
}
.el-aside{
    width: 10%;
    height: 100%;
}
.el-main{
    padding: 0;
    background-color: #fafafa;
}
</style>

