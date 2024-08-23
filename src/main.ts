import 'uno.css';
import './assets/styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { setupRouter } from './router';
import { setupI18n } from './locales';
import { createHead } from '@unhead/vue';

const app = createApp(App);
const head = createHead();

app.use(head);
app.use(createPinia());
// 多语言
setupI18n(app);
// 配置路由
setupRouter(app);
app.mount('#app');
