import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import TalentIndex from '../views/talents/IndexPage.vue';
import TalentView from '../views/talents/ViewPage.vue';

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
            path: '/talents',
            name: 'talents',
            component: TalentIndex,
        },
        {
            path: '/talents/:slug',
            name: 'talent-view',
            component: TalentView,
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
        {
            path: '/events',
            name: 'events',
            component: () => import('../views/events/IndexPage.vue'),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // Always scroll to top
        return { top: 0 };

        // Optional: For smooth scrolling
        // return {
        //   top: 0,
        //   behavior: 'smooth'
        // }
    },
});

export default router;
