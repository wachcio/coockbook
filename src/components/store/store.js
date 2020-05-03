import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';
// import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        baseAPIurl: 'http://cookbookapi.wachcio.pl/',
    },

    getters: {
        // szablon funkcji
        //    funkcja(message) {
        //   return state.message;
        //    }
        // winSpeedIndex(state) {
        //    return _.findIndex(state.sensorsCurrent, {
        //       sensorName: "Prędkość wiatru km/h"
        //    });
        // }
    },
    mutations: {
        // Mutacje synhroniczne
        // W komponencie do zmiany w state będzie służyła funkcja w methods
        // update(e,type) {
        //     this.$store.commit("update", {
        //         message: e.target.value
        //     })
        // }
        // updateSensorsCurrent(state, payload) {
        //   state.sensorsCurrent = payload;
        //   const indexSpeed = _.findIndex(state.sensorsCurrent, {
        //     sensorName: "Prędkość wiatru km/h"
        //   });
    },
    actions: {
        // Akcje są asynhroniczne np do JSON-a
        // akcje wywołujemy za pomocą dispatch z innych komponentów
        // getCurrentJSON(context) {
        //   context.commit("isLoadedChange", false);
        //   axios
        //     .get(context.state.endpoints.endpointCurrent)
        //     .then(res => context.commit("updateSensorsCurrent", res.data));
        // }
    },
});
