import axios from 'axios';

const errorResponse = (e) => {
    // console.log(e.response);
    return {
        statusCode: e.response.status,
        type: 'error',
        msgPL: e.response.data.msgPL,
        msgEN: e.response.data.msgEN,
        // mySQLErrorNumber: e.response.data.msg.errorInfo[0],
        // mySQLErrorMsg: e.response.data.msg.errorInfo[2],
    };
};
const okResponse = (e) => {
    // console.log(e);

    return {
        statusCode: 200,
        type: 'success',
        msgPL: e.data.msgPL,
        msgEN: e.data.msgEN,
    };
};

export default {
    // actions: {
    // Akcje są asynhroniczne np do JSON-a
    // akcje wywołujemy za pomocą dispatch z innych komponentów
    getRecipesJSON(context) {
        return axios
            .get(`${context.state.endpoints.recipes}`)

            .then((res) => context.commit('getRecipes', res.data))
            .catch((e) => context.commit('getRecipes', errorResponse(e)));
    },
    getRecipesIDJSON(context, ID) {
        return (
            axios
                .get(`${context.state.endpoints.recipesID}${ID}`)
                // .then((res) => context.commit('getResponse', res.config))
                .then((res) => context.commit('getRecipesID', res.data))
                .catch((e) => context.commit('getRecipesID', errorResponse(e)))
        );
    },
    getRecipesByCategoryJSON(context) {
        return axios
            .get(`${context.state.endpoints.recipesByCategory}`)
            .then((res) => context.commit('getRecipesByCategory', res.data))
            .catch((e) =>
                context.commit('getRecipesByCategory', errorResponse(e))
            );
    },
    getRecipesByCategoryIDJSON(context, ID) {
        // context.commit("isLoadedChange", false);

        // axios
        //     .get(`${context.state.endpoints.recipesByCategoryID}${ID}`)
        //     .then((res) => context.commit('getRecipesByCategoryID', res.data));

        let result = {};

        context.state.recipesByCategory.map((o) => {
            return o[0].ID == ID ? (result = o[1]) : undefined;
        });

        if (Object.keys(result).length !== 0) {
            result.map((o) => {
                const id = o.recipes_id;

                context.state.recipes.map((o2) => {
                    o2.ID == id ? (o.categories = o2.categories) : null;
                });
            });
            context.commit('getRecipesByCategoryID', result);
        } else {
            context.commit('getRecipesByCategoryID', {});
        }
    },
    getCategoriesJSON(context) {
        return axios
            .get(`${context.state.endpoints.categories}`)
            .then((res) => context.commit('getCategories', res.data))
            .catch((e) => context.commit('getCategories', errorResponse(e)));
    },
    getCategoriesIDJSON(context, ID) {
        return axios
            .get(`${context.state.endpoints.categoriesID}${ID}`)
            .then((res) => context.commit('getCategoriesID', res.data))
            .catch((e) => context.commit('getCategoriesID', errorResponse(e)));
    },

    addCategory(context, name) {
        return axios
            .post(`${context.state.endpoints.categories}`, {
                category_name: name,
            })
            .then((res) => {
                context.commit('addOperationStatus', okResponse(res));
                return res;
            })
            .catch((e) => {
                context.commit('addOperationStatus', errorResponse(e));
            });
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
            .then((res) => {
                context.commit('addOperationStatus', okResponse(res));
                return res;
            })
            .catch((e) => {
                context.commit('addOperationStatus', errorResponse(e));
            });
    },
    updateCategory(context, data) {
        return axios
            .put(`${context.state.endpoints.categoriesID}${data.ID}`, {
                category_name: data.category_name,
            })
            .then((res) => {
                context.commit('addOperationStatus', okResponse(res));
                return res;
            })
            .catch((e) => {
                context.commit('addOperationStatus', errorResponse(e));
            });
    },
    updateRecipes(context, recipes) {
        return axios
            .put(`${context.state.endpoints.recipesID}${recipes.ID}`, {
                name: recipes.name,
                description: recipes.description,
                ingredients: recipes.ingredients,
                execution: recipes.execution,
                picture: recipes.picture,
                rating: recipes.rating,
                category_id: recipes.category_id,
            })
            .then((res) => {
                context.commit('addOperationStatus', okResponse(res));
                return res;
            })
            .catch((e) => {
                context.commit('addOperationStatus', errorResponse(e));
                return e;
            });
    },
    deleteRecipes(context, ID) {
        return axios
            .delete(`${context.state.endpoints.recipesID}${ID}`)
            .then((res) => {
                context.commit('addOperationStatus', okResponse(res));
                return res;
            })
            .catch((e) => {
                context.commit('addOperationStatus', errorResponse(e));
            });
    },
    deleteCategory(context, ID) {
        return axios
            .delete(`${context.state.endpoints.categoriesID}${ID}`)
            .then((res) => {
                context.commit('addOperationStatus', okResponse(res));
                return res;
            })
            .catch((e) => {
                context.commit('addOperationStatus', errorResponse(e));
            });
    },
    // },
};
