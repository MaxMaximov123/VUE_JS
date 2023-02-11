import MainPage from '@/pages/MainPage';
import {createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: '/stocks/:country/:page',
        name: 'Main',
        component: MainPage
    },
    /* {
        path: '/stock',
        name: 'Main',
        component: MainPage
    } */
]

const router = createRouter(
    {
        routes,
        history: createWebHistory()
    }
)

export default router;