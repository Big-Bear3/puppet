import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Puppet from '../views/Puppet.vue';
import Page from '../views/Page.vue';
import Animal from '../views/Animal.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Puppet',
        component: Puppet
    },
    {
        path: '/animal',
        name: 'Animal',
        component: Animal
    },
    {
        path: '/page',
        name: 'Page',
        component: Page
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
