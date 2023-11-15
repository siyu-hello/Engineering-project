import axios from 'axios'

const service = axios.create({
    baseURL: import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_VUE_APP_BASE_API : import.meta.env.VITE_VUE_APP_BASE_URL, // api 的 base_url
    timeout: 5000 // request timeout
})

export default service