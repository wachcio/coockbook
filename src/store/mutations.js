import axios from 'axios';
export default {
    // mutations: {
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
    getRecipesByCategoryID(state, payload) {
        state.recipesByCategoryID = payload;
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
    // addCategory(state, payload) {
    //     state.operationStatus = payload;
    // },

    // addRecipes(state, payload) {
    //     state.operationStatus = payload;
    // },
    // updateCategory(state, payload) {
    //     state.categories = { ...state.categories, payload };
    // },

    // updateRecipes(state, payload) {
    //     state.recipes = { ...state.recipes, payload };
    // },
    addOperationStatus(state, payload) {
        state.operationStatus = { ...payload };
        return state.operationStatus;
    },
    setUserData(state, userData) {
        state.user = userData;
        localStorage.setItem('user', JSON.stringify(userData));
        axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
    },

    clearUserData() {
        localStorage.removeItem('user');
        location.reload();
    },
};
