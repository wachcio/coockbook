<template>
    <div class="recipe_details">
        <div v-if="recipe">
            <H1 class="recipe_details__name">{{ recipe.name }}</H1>
            <p class="recipe_details__description">
                {{ recipe.description }}
            </p>
            <p class="recipe_details__ingredients">
                {{ recipe.ingredients }}
            </p>
            <p class="recipe_details__execution">
                {{ recipe.execution }}
            </p>
            <p class="recipe_details__categories">
                {{ getCategories }}
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
        getCategories() {
            return this.recipe.categories
                .map((category) => {
                    return category.category_name;
                })
                .join(', ');
        },
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

@mixin paragraphTitle {
    display: block;
    position: relative;
    width: 100%;
    text-transform: uppercase;
    font-size: 1.5em;
    top: -0.5em;
    left: 0;
    text-align: center;
    margin: 0.5em 0;
    border-bottom: darken($color: $primaryColor, $amount: 30) 2px solid;
}

.recipe_details {
    width: 95%;
    // min-height: 85vh;

    padding: 15px;

    border-radius: 21px;
    background: #ffd024;
    box-shadow: inset 7px 7px 15px #ebbf21, inset -7px -7px 15px #ffe127;

    p {
        padding-top: 2em;
        text-align: justify;

        &::first-letter {
            text-transform: uppercase;
        }
    }
    &__name {
        text-align: center;

        &::first-letter {
            text-transform: uppercase;
        }
    }
    // &__description {
    //     &::before {
    //         content: 'Opis';
    //         @include paragraphTitle;
    //     }
    // }
    &__ingredients {
        &::before {
            content: 'Składniki';
            @include paragraphTitle;
        }
    }
    &__execution {
        &::before {
            content: 'Wykonanie';
            @include paragraphTitle;
        }
    }
    &__categories {
        &::before {
            content: 'Kategorie';
            @include paragraphTitle;
        }
    }
    &__rating {
        position: relative;
        bottom: auto;
        padding: 2em 0 1em 0;
    }
}
</style>
