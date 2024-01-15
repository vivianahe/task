import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./components/Task/Task.vue";
import Add from "./components/Task/Add.vue";
import Edit from "./components/Task/Edit.vue";

Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/add', name: 'add', component: Add },
        { path: '/edit/:id', name: 'edit', component: Edit },
    ]
});
export default router;

