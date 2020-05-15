import Home from './../components/Home.vue';
import RecipeDetail from './../components/recipes/RecipeDetails.vue';
import RecipeEdit from './../components/recipes/RecipeEdit.vue';
export default [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/recipe/:slug',
        name: 'recipeDetail',
        component: RecipeDetail,
        props: true,
    },
    {
        path: '/recipe/edit/:slug',
        name: 'recipeEdit',
        component: RecipeEdit,
        props: true,
    },
];
