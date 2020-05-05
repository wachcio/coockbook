<template>
    <div v-if="isLoaded">
        <Recipe
            v-for="(recipe, index) in recipes"
            :key="index"
            :recipe="recipe"
        />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Recipe from './Recipe.vue';
export default {
    name: 'RecipesList',
    props: {},
    data() {
        return {};
    },
    components: { Recipe },
    methods: {
        ...mapMutations([
            'updateRecipes',
            'updateRecipesID',
            'updateRecipesByCategory',
            'updateCategiories',
            'updateCategioriesID',
        ]),
        ...mapActions([
            'getRecipesJSON',
            'getRecipesIDJSON',
            'getRecipesByCategoryJSON',
            'getCategoriesJSON',
            'getCategoriesIDJSON',
        ]),
    },
    computed: {
        ...mapState([
            'endpoints',
            'recipes',
            'recipesID',
            'recipesByCategory',
            'categories',
            'categoriesID',
        ]),
        ...mapGetters([]),
        isLoaded() {
            if (this.recipes.length) return true;
            else return false;
        },
    },
    created() {},
    watch: {},
};
</script>

<style lang="scss" scoped></style>
