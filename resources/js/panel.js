import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import router from './routes.js'
import App from './components/App.vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import store from './plugins/store'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.min.css';

window.Vue = require('vue')
Vue.prototype.$http = axios

Vue.use(BootstrapVue)
Vue.use(Loading)


const app = new Vue({
    store,
    el: '#app',
    router,
    render: h => h(App)
});

export default app;
