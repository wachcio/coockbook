import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import 'es6-promise/auto';
import routes from './components/routes/routes.js';
import store from './components/store/store';

const router = new VueRouter({
    // model: 'history',
    routes,
});

Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({ store, router, render: (h) => h(App) }).$mount('#app');
