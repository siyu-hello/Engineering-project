import { defineStore } from "pinia";


const projectInfo = defineStore('projectInfo', {
    state: ()=>{
        return {
            data: []
        }
    }
})

export default projectInfo