import axios from 'axios';

export default {
    // actions: {
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
            .then((res) => context.commit('getRecipesByCategory', res.data));
    },
    getRecipesByCategoryIDJSON(context, ID) {
        // context.commit("isLoadedChange", false);

        axios
            .get(`${context.state.endpoints.recipesByCategoryID}${ID}`)
            .then((res) => context.commit('getRecipesByCategoryID', res.data));
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

    addCategory(context, name) {
        return axios
            .post(`${context.state.endpoints.categories}`, {
                category_name: name,
            })
            .then((res) =>
                context.commit('addCategory', {
                    statusCode: 200,
                    type: 'success',
                    msg: res.statusText,
                })
            )
            .catch((e) =>
                context.commit('addCategory', {
                    statusCode: e.response.status,
                    type: 'error',
                    msg: e.response.data.error,
                    mySQLErrorNumber: e.response.data.msg.errorInfo[0],
                    mySQLErrorMsg: e.response.data.msg.errorInfo[2],
                })
            );
    },
    addRecipes(context, recipes) {
        return axios
            .post(`${context.state.endpoints.recipes}`, {
                name: recipes.name,
                description: recipes.description,
                ingredients: recipes.ingredients,
                execution: recipes.execution,
                picture: recipes.picture,
                rating: recipes.rating,
                category_id: recipes.category_id,
            })
            .then((res) =>
                context.commit('addRecipes', {
                    statusCode: 200,
                    type: 'success',
                    msg: res.statusText,
                })
            )
            .catch((e) =>
                context.commit('addRecipes', {
                    statusCode: e.response.status,
                    type: 'error',
                    msg: e.response.data.error,
                    mySQLErrorNumber: e.response.data.msg.errorInfo[0],
                    mySQLErrorMsg: e.response.data.msg.errorInfo[2],
                })
            );
    },
    updateCategory(context, data) {
        axios
            .put(`${context.state.endpoints.categoriesID}${data.ID}`, {
                category_name: data.category_name,
            })
            .then(() => context.commit('updateCategory', data.category_name));
    },
    updateRecipes(context, recipes) {
        axios
            .put(`${context.state.endpoints.recipesID}${recipes.ID}`, {
                name: recipes.name,
                description: recipes.description,
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
    // },
};
