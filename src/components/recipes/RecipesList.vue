<template>
    <div v-if="isLoaded" class="recipes__list">
        <Recipe
            v-for="(recipe, index) in recipes"
            :key="index"
            :recipe="recipe"
            class="recipes__item"
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

<style lang="scss" scoped>
.recipes__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 200px;
    grid-gap: 1.5em;
    margin: 1em;
}

.recipes__item {
    background-color: rgb(255, 216, 41);
    padding: 0.7em;
    border-radius: 20px;
    transition: 0.2s;
    transform: translate(0, 0);
    box-shadow: 10px 10px 19px -8px rgba(0, 0, 0, 0.36);

    &:hover {
        box-shadow: 13px 13px 19px -8px rgba(0, 0, 0, 0.6);
        transform: translate(-3px, -3px);
        cursor: pointer;
    }
}
</style>
