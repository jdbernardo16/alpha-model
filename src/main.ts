import './assets/main.css';

import { createApp } from 'vue';
import { createHead } from '@vueuse/head'; // Import createHead
import App from './App.vue';
import router from './router';

const app = createApp(App);
const head = createHead(); // Create head instance

app.use(router);
app.use(head); // Use head plugin

app.mount('#app');
