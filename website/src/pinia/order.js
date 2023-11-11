import { defineStore } from "pinia";


const orderInfo = defineStore('orderInfo', {
    state: ()=>{
        return {
            data: []
        }
    }
})

export default orderInfo