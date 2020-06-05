import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import 'es6-promise/auto';
import routes from './routes/routes.js';
import store from './store/store.js';
import axios from 'axios';
import VueMarkdown from 'vue-markdown';

import VuejsDialog from 'vuejs-dialog';
// eslint-disable-next-line no-unused-vars
import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components

// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSearch,
    faStar,
    faUtensils,
    faHamburger,
    faPizzaSlice,
    faPlus,
    faPen,
    faTrash,
    faArrowLeft,
    faCheck,
    faReply,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faSearch);
library.add(faStar);
library.add(faUtensils);
library.add(faHamburger);
library.add(faPizzaSlice);
library.add(faPlus);
library.add(faPen);
library.add(faTrash);
library.add(faArrowLeft);
library.add(faCheck);
library.add(faReply);

const router = new VueRouter({
    // mode: 'history',
    routes,
});
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        //need to login
        if (!store.getters.isAdmin) {
            next({
                name: 'home',
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

Vue.component('vue-markdown', VueMarkdown);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(VueRouter);
Vue.use(VuejsDialog, {
    okText: 'Usuń',
    cancelText: 'Anuluj',
});

Vue.config.productionTip = false;

new Vue({
    store,
    created() {
        const userInfo = localStorage.getItem('user');
        if (userInfo) {
            const userData = JSON.parse(userInfo);
            this.$store.commit('setUserData', userData);
        }
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.status === 401) {
                    this.$store.dispatch('logout');
                }
                return Promise.reject(error);
            }
        );
    },
    router,
    components: {
        VueMarkdown,
    },
    render: (h) => h(App),
}).$mount('#app');
