<template>
    <div class="recipe_details">
        <div v-if="recipe">
            <H1 class="recipe_details__name">{{ recipe.name }}</H1>
            <p class="recipe_details__description">
                Opis: {{ recipe.description }}
            </p>
            <p class="recipe_details__ingredients">
                Składniki: {{ recipe.ingredients }}
            </p>
            <p class="recipe_details__execution">
                Wykonanie: {{ recipe.execution }}
            </p>
            <StarRating
                class="recipe_details__rating"
                :rating="recipe.rating"
            />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import StarRating from './StarRecipeCard';
let slug = require('slug');
import _ from 'lodash';
export default {
    name: 'RecipeDetails',
    props: {
        recipe: Object,
    },
    data() {
        return {};
    },
    components: { StarRating },
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
        checkRecipe() {
            if (!this.recipe) {
                let index = null;
                index = _.findIndex(this.recipes, (o) => {
                    return slug(o.name) == this.$route.params.slug;
                });
                this.recipe = this.recipes[index];
            }
        },
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
    },
    created() {
        this.checkRecipe();
    },
    watch: {
        recipes: function() {
            this.checkRecipe();
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../../style/main.scss';

.recipe_details {
    width: 95%;
    min-height: 85vh;

    padding: 15px;

    border-radius: 21px;
    background: #ffd024;
    box-shadow: inset 7px 7px 15px #ebbf21, inset -7px -7px 15px #ffe127;

    &__name {
        text-align: center;

        &::first-letter {
            text-transform: uppercase;
        }
    }
    &__rating {
        bottom: auto;
        padding-top: 2em;
    }
}
</style>
