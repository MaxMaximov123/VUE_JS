import MainPage from '@/pages/MainPage';
import WebSocket from '@/pages/WebSocket'
import {createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: '/stocks/:country/:page',
        name: 'Main',
        component: MainPage
    },
    {
        path: '/socket',
        name: 'Socket',
        component: WebSocket
    }
]

const router = createRouter(
    {
        routes,
        history: createWebHistory()
    }
)

export default router;