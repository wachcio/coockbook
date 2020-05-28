import Home from './../components/Home.vue';
import RecipeDetail from './../components/recipes/RecipeDetails.vue';
import RecipeEdit from './../components/recipes/RecipeEdit.vue';
import RecipeAdd from './../components/recipes/RecipeAdd.vue';
import CategoriesList from './../components/recipes/CategoriesList.vue';
import CategoriesEdit from './../components/recipes/CategoriesEdit.vue';
import CategoriesAdd from './../components/recipes/CategoriesAdd.vue';
export default [
    {
        path: '/',
        name: 'home',
        component: Home,
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
        name: 'categories_list',
        component: CategoriesList,
        props: true,
    },
    {
        path: '/categories/add',
        name: 'categories_add',
        component: CategoriesAdd,
        props: true,
    },
    {
        path: '/categories/edit/:slug',
        name: 'categories_edit',
        component: CategoriesEdit,
        props: true,
    },
];
