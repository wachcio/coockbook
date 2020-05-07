import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import 'es6-promise/auto';
import routes from './routes/routes.js';
import store from './store/store.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSearch,
    faStar,
    faUtensils,
    faHamburger,
    faPizzaSlice,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSearch);
library.add(faStar);
library.add(faUtensils);
library.add(faHamburger);
library.add(faPizzaSlice);

const router = new VueRouter({
    // model: 'history',
    routes,
});

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({ store, router, render: (h) => h(App) }).$mount('#app');
