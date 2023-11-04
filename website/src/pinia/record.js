import { defineStore } from "pinia";


const recordInfo = defineStore('recordInfo', {
    state: ()=>{
        return {
            data: []
        }
    }
})

export default recordInfo