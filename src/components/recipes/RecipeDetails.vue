<template>
    <div class="recipe_details">
        <div v-if="recipe">
            <H1 class="recipe_details__name">{{ recipe.name }}</H1>
            <div class="recipe_details__modifications">
                <router-link
                    :to="{
                        name: 'recipeEdit',
                        params: { slug: getSlug, recipe: recipe },
                    }"
                >
                    <font-awesome-icon
                        class="recipe_details__modifications--edit"
                        icon="pen"
                        size="lg"
                    />
                </router-link>
                <font-awesome-icon
                    class="recipe_details__modifications--delete"
                    icon="trash"
                    size="lg"
                    @click="deleteRecipe()"
                />
            </div>
            <p class="recipe_details__description">
                <vue-markdown> {{ recipe.description }}</vue-markdown>
            </p>
            <p class="recipe_details__ingredients">
                <vue-markdown class="test">
                    {{ recipe.ingredients }}</vue-markdown
                >
            </p>
            <p class="recipe_details__execution">
                <vue-markdown> {{ recipe.execution }}</vue-markdown>
            </p>
            <p class="recipe_details__categories">
                <vue-markdown> {{ getCategories }}</vue-markdown>
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
import StarRating from './StarRating';

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
        deleteRecipe() {
            this.$store.dispatch('deleteRecipes', this.recipe.ID);
            this.$store.dispatch('getRecipesJSON');
            this.$store.dispatch('getRecipesByCategoryJSON');
            this.$router.push({ name: 'home' });
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
        getSlug() {
            return slug(this.recipe.name);
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

@mixin paragraphTitle($title) {
    &::before {
        content: $title;

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
}

.recipe_details {
    width: 95%;
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
    &__modifications {
        position: relative;
        top: -1.7em;
        right: 0.5em;
        width: auto;
        text-align: right;
        color: lighten($color: $primaryColor, $amount: 10);

        &--delete {
            margin-left: 0.2em;
            color: red;
            opacity: 0.2;
            transition: 0.2s opacity;

            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
        &--edit {
            margin-left: 0.2em;
            color: darkgreen;
            opacity: 0.2;
            transition: 0.2s opacity;

            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
    }

    &__ingredients {
        @include paragraphTitle('Składniki');
    }
    &__execution {
        @include paragraphTitle('Wykonanie');
    }

    &__categories {
        @include paragraphTitle('Kategorie');
    }
    &__rating {
        position: relative;
        bottom: auto;
        padding: 2em 0 1em 0;
    }
}
li {
    margin-left: 2em;
}
</style>
