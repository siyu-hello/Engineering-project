<script setup>
import { RouterView } from "vue-router";
import Nav from "../components/Nav.vue"
</script>

<template>
    <div class="container">
        <el-container>
            <el-aside>
                <Nav />
            </el-aside>
            <el-main>
                <RouterView></RouterView>
            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
.el-container{
    height: 100vh;
    width: 100vw;
}
.el-aside{
    width: 8%;
    height: 100%;
}
.el-main{
    background-color: #fafafa;
}
</style>

