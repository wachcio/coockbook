<template>
    <div v-if="isLoaded" class="recipes__list">
        <RecipeCard
            v-for="(recipe, index) in filtersData"
            :key="index"
            :recipe="recipe"
            class="recipes__item"
        >
        </RecipeCard>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import RecipeCard from './RecipeCard.vue';
// import RecipeDetails from "./RecipeDetails.vue"

export default {
    name: 'RecipesList',
    props: { filtersData: Array },
    data() {
        return {};
    },
    components: { RecipeCard },
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
@import './../../style/main.scss';

.recipes__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 200px;
    grid-gap: 1.5em;
    margin: 1em;

    @media (max-width: 1100px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
}

.recipes__item {
    // background-color: rgb(255, 216, 41);
    background: $primaryColor;
    // background: linear-gradient(
    //     135deg,
    //     rgba(255, 216, 41, 1) 0%,
    //     rgba(246, 221, 109, 1) 100%
    // );
    background: linear-gradient(
        135deg,
        $primaryColor 0%,
        lighten($primaryColor, 25) 50%,
        $primaryColor 100%
    );
    padding: 0.8em;
    border-radius: 20px;
    transition: 0.2s;
    transform: translate(0, 0);
    box-shadow: 10px 10px 19px -8px rgba(0, 0, 0, 0.36);
    max-width: 400px;

    &:hover {
        box-shadow: 13px 13px 19px -8px rgba(0, 0, 0, 0.6);
        transform: translate(-3px, -3px);
        cursor: pointer;
    }
}
a {
    color: black;
    text-decoration: none;
}
</style>
