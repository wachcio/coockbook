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
            recipes: 'recipes/',
            recipesByCategory: 'recipes_by_category',
            categories: 'categories/',
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
        updateRecipesID(state, payload) {
            state.recipesID = payload;
        },
        updateRecipesByCategory(state, payload) {
            state.recipesByCategory = payload;
        },
        updateCategories(state, payload) {
            state.categories = payload;
        },
        updateCategoriesID(state, payload) {
            state.categoriesID = payload;
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
        getRecipesIDJSON(context, ID) {
            // context.commit("isLoadedChange", false);

            axios
                .get(
                    `${context.state.endpoints.baseAPIurl}${context.state.endpoints.recipes}${ID}`
                )
                .then((res) => context.commit('updateRecipesID', res.data));
        },
        getRecipesByCategoryJSON(context) {
            // context.commit("isLoadedChange", false);

            axios
                .get(
                    `${context.state.endpoints.baseAPIurl}${context.state.endpoints.recipesByCategory}`
                )
                .then((res) =>
                    context.commit('updateRecipesByCategory', res.data)
                );
        },
        getCategoriesJSON(context) {
            // context.commit("isLoadedChange", false);

            axios
                .get(
                    `${context.state.endpoints.baseAPIurl}${context.state.endpoints.categories}`
                )
                .then((res) => context.commit('updateCategories', res.data));
        },
        getCategoriesIDJSON(context, ID) {
            // context.commit("isLoadedChange", false);

            axios
                .get(
                    `${context.state.endpoints.baseAPIurl}${context.state.endpoints.categories}${ID}`
                )
                .then((res) => context.commit('updateCategoriesID', res.data));
        },
    },
});
