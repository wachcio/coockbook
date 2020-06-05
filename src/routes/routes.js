import Home from './../components/Home.vue';
import Login from './../components/Login.vue';
import RecipeDetail from './../components/recipes/RecipeDetails.vue';
import RecipeEdit from './../components/recipes/RecipeEdit.vue';
import RecipeAdd from './../components/recipes/RecipeAdd.vue';
import CategoriesList from './../components/categories/CategoriesList.vue';
import CategoriesEdit from './../components/categories/CategoriesEdit.vue';
import CategoriesAdd from './../components/categories/CategoriesAdd.vue';
export default [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/recipe/add',
        name: 'recipeAdd',
        component: RecipeAdd,
        props: true,
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
    {
        path: '/categories',
        name: 'categoriesList',
        component: CategoriesList,
        props: true,
    },
    {
        path: '/categories/add',
        name: 'categoriesAdd',
        component: CategoriesAdd,
        props: true,
    },
    {
        path: '/categories/edit/:slug',
        name: 'categoriesEdit',
        component: CategoriesEdit,
        props: true,
    },
];
