import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Puppet from '../views/Puppet.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Puppet',
        component: Puppet
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
