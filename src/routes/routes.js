import Home from './../components/Home.vue';
import RecipeDetail from './../components/recipes/RecipeDetails.vue';
export default [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/recipeDetail',
        name: 'recipeDetail',
        component: RecipeDetail,
    },
];
