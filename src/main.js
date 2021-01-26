import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import axios from 'axios'

window.axios = Axios
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'
if (localStorage.getItem('bearerToken')) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('bearerToken')
}

window.user = null

if (localStorage.getItem('user')) {
    window.user = JSON.parse(localStorage.getItem('user'))
}

axios.interceptors.response.use(res => {
    if (res.status === 401) {
        this.$router.push('/login')
    }
    // Important: response interceptors **must** return the response.
    return res;
});

createApp(App).use(router).mount('#app')
