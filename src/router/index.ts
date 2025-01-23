import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ModelIndex from '../views/models/IndexPage.vue';
import ModelView from '../views/models/ViewPage.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        // Models
        {
            path: '/models',
            name: 'models',
            component: ModelIndex,
        },
        {
            path: '/models/:id',
            name: 'model-view',
            component: ModelView,
            props: true,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
    ],
});

export default router;
