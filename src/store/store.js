import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import _ from 'lodash';

// axios.defaults.baseURL = 'https://cookbookapi.wachcio.pl/';
axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    common: {
        Authorization: '',
        // 'X-CSRF-TOKEN': '',
    },
    // 'X-CSRF-TOKEN': 'meta[name="csrf-token"]'.attr('content'),
};

Vue.use(Vuex);

import state from './state.js';
import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default new Vuex.Store({
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
});
