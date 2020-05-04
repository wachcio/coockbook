import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import _ from 'lodash';

axios.defaults.baseURL = 'https://cookbookapi.wachcio.pl/';
// axios.defaults.baseURL = 'http://localhost:8000/';
axios.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    // 'X-CSRF-TOKEN': 'meta[name="csrf-token"]'.attr('content'),
};

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        endpoints: {
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

        getRecipes(state, payload) {
            state.recipes = payload;
        },
        getRecipesID(state, payload) {
            state.recipesID = payload;
        },
        getRecipesByCategory(state, payload) {
            state.recipesByCategory = payload;
        },
        getCategories(state, payload) {
            state.categories = payload;
        },
        getCategoriesID(state, payload) {
            state.categoriesID = payload;
        },
        getResponse(state, payload) {
            console.log(payload);
        },
        addCategory(state, payload) {
            state.categories = { ...state.categories, payload };
        },

        addRecipes(state, payload) {
            state.recipes = { ...state.recipes, payload };
        },
        updateCategory(state, payload) {
            state.categories = { ...state.categories, payload };
        },

        updateRecipes(state, payload) {
            state.recipes = { ...state.recipes, payload };
        },
    },
    actions: {
        // Akcje są asynhroniczne np do JSON-a
        // akcje wywołujemy za pomocą dispatch z innych komponentów
        getRecipesJSON(context) {
            // context.commit("isLoadedChange", false);

            axios
                .get(`${context.state.endpoints.recipes}`)

                .then((res) => context.commit('getRecipes', res.data));
        },
        getRecipesIDJSON(context, ID) {
            // context.commit("isLoadedChange", false);

            axios
                .get(`${context.state.endpoints.recipesID}${ID}`)
                // .then((res) => context.commit('getResponse', res.config))
                .then((res) => context.commit('getRecipesID', res.data));
        },
        getRecipesByCategoryJSON(context) {
            // context.commit("isLoadedChange", false);

            axios
                .get(`${context.state.endpoints.recipesByCategory}`)
                .then((res) =>
                    context.commit('getRecipesByCategory', res.data)
                );
        },
        getCategoriesJSON(context) {
            // context.commit("isLoadedChange", false);

            axios
                .get(`${context.state.endpoints.categories}`)
                .then((res) => context.commit('getCategories', res.data));
        },
        getCategoriesIDJSON(context, ID) {
            // context.commit("isLoadedChange", false);

            axios
                .get(`${context.state.endpoints.categoriesID}${ID}`)
                .then((res) => context.commit('getCategoriesID', res.data));
        },
        //add routes
        addCategory(context, name) {
            axios
                .post(`${context.state.endpoints.categories}`, {
                    category_name: name,
                })
                .then(() => context.commit('addCategory', name));
        },
        addRecipes(context, recipes) {
            axios
                .post(`${context.state.endpoints.recipes}`, {
                    name: recipes.name,
                    ingredients: recipes.ingredients,
                    execution: recipes.execution,
                    picture: recipes.picture,
                    rating: recipes.rating,
                    category_id: recipes.category_id,
                })
                .then(() => context.commit('addRecipes', recipes));
        },
        updateCategory(context, data) {
            axios
                .put(`${context.state.endpoints.categoriesID}${data.ID}`, {
                    category_name: data.category_name,
                })
                .then(() =>
                    context.commit('updateCategory', data.category_name)
                );
        },
        updateRecipes(context, recipes) {
            axios
                .put(`${context.state.endpoints.recipesID}${recipes.ID}`, {
                    name: recipes.name,
                    ingredients: recipes.ingredients,
                    execution: recipes.execution,
                    picture: recipes.picture,
                    rating: recipes.rating,
                    category_id: recipes.category_id,
                })
                .then(() => context.commit('updateRecipes', recipes));
        },
        deleteRecipes(context, ID) {
            // context.commit("isLoadedChange", false);

            axios.delete(`${context.state.endpoints.recipesID}${ID}`);
            // .then((res) => context.commit('deleteRecipes', res.data));
        },
        deleteCategory(context, ID) {
            // context.commit("isLoadedChange", false);

            axios.delete(`${context.state.endpoints.categoriesID}${ID}`);
            // .then((res) => context.commit('deleteCategory', res.data));
        },
    },
});
