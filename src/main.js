import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import 'es6-promise/auto';
import routes from './routes/routes.js';
import store from './store/store.js';
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

const router = new VueRouter({
    mode: 'history',
    routes,
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
    router,
    components: {
        VueMarkdown,
    },
    render: (h) => h(App),
}).$mount('#app');
