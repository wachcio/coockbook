import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        endpoints: {
            // baseAPIurl: 'http://cookbookapi.wachcio.pl/',
            baseAPIurl: 'http://localhost:8000/',
            recipes: 'recipes',
            recipesID: 'recipes/',
            recipesByCategory: 'recipes_by_category',
            categories: 'categories',
            categoriesID: 'categories/',
        },
        recipes: {},
        recipesID: {},
        recipesByCategory: {},
        categories: {},
        categoriesID: {},
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

        updateRecipes(state, payload) {
            state.recipes = payload;
        },
        updateCategories(state, payload) {
            state.categories = payload;
        },
    },
    actions: {
        // Akcje są asynhroniczne np do JSON-a
        // akcje wywołujemy za pomocą dispatch z innych komponentów
        getRecipesJSON(context) {
            // context.commit("isLoadedChange", false);

            axios
                .get(
                    `${context.state.endpoints.baseAPIurl}${context.state.endpoints.recipes}`
                )
                .then((res) => context.commit('updateRecipes', res.data));
        },
        getCategoriesJSON(context) {
            // context.commit("isLoadedChange", false);

            axios
                .get(
                    `${context.state.endpoints.baseAPIurl}${context.state.endpoints.categories}`
                )
                .then((res) => context.commit('updateCategories', res.data));
        },
    },
});
