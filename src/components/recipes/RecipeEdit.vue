<template>
    <div class="recipe_details">
        <div v-if="recipe">
            <Editor
                class="recipe_details__name"
                initialEditType="wysiwyg"
                height="100px"
                :options="editorOptions"
                :initialValue="recipe.name"
                ref="editorName"
            ></Editor>

            <Editor
                class="recipe_details__description"
                initialEditType="wysiwyg"
                height="100px"
                :initialValue="recipe.description"
                :options="editorOptions"
                ref="editorDescription"
            >
            </Editor>
            <Editor
                class="recipe_details__ingredients"
                initialEditType="wysiwyg"
                :initialValue="recipe.ingredients"
                :options="editorOptions"
                ref="editorIngredients"
            >
            </Editor>
            <Editor
                class="recipe_details__execution"
                initialEditType="wysiwyg"
                :initialValue="recipe.execution"
                :options="editorOptions"
                ref="editorExecution"
            >
            </Editor>
            <div class="recipe_details__categories">
                <RecipeCategoriesChackbox :recipe="recipe" />
            </div>

            <div class="recipe_details__btn">
                <div class="recipe_details__btn_save" @click="getMarkdown()">
                    Zapisz
                </div>
                <div class="recipe_details__btn_cancel">Anuluj</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

import RecipeCategoriesChackbox from './RecipeCategoriesCheckbox.vue';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/vue-editor';

let slug = require('slug');
import _ from 'lodash';
export default {
    name: 'RecipeEdit',
    props: {
        recipe: Object,
    },
    data() {
        return {
            editorOptions: {
                language: 'pl-PL',
                toolbarItems: [
                    'heading',
                    'bold',
                    'italic',
                    'strike',
                    'divider',
                    'ul',
                    'ol',
                    'indent',
                    'outdent',
                    'divider',
                    'table',
                    'link',
                ],
            },
            editorsValue: {
                name: '',
                description: '',
                execution: '',
                ingredients: '',
                picture: '',
                rating: 0,
                categories: [],
            },
        };
    },
    components: { Editor, RecipeCategoriesChackbox },
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
        getMarkdown() {
            // Aktualizacja przepisu
            // this.$store.dispatch('updateRecipes', {
            //     name: 'gofry5',
            //     ingredients: 'składniki do gofrów',
            //     execution: 'przepis na gofry',
            //     picture: 'zdjęcie',
            //     rating: 4,
            //     category_id: '16, 34, 2',
            //     ID: 44,
            // });

            let obj = {
                name: this.$refs.editorName.invoke('getMarkdown'),
                ingredients: this.$refs.editorIngredients.invoke('getMarkdown'),
                execution: this.$refs.editorExecution.invoke('getMarkdown'),
                picture: '',
                rating: this.recipe.rating,
                category_id: '16, 34, 2',
                ID: this.recipe.ID,
            };

            console.log(obj);
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
    mounted() {
        this.checkRecipe();
        // this.editorsValue.name = this.recipe.name;
        // this.editorsValue.description = this.recipe.description;
        // this.editorsValue.execution = this.recipe.execution;
        // this.editorsValue.ingredients = this.recipe.ingredients;
        // this.editorsValue.rating = this.recipe.rating;
        // this.editorsValue.picture = this.recipe.picture;
        this.editorsValue = { ...this.recipe };
    },
    watch: {
        recipe: function() {
            this.editorsValue = { ...this.recipe };
        },
        recipes: function() {
            this.checkRecipe();
            this.editorsValue = { ...this.recipe };
            // this.editorsValue.name = this.recipe.name;
            // this.editorsValue.description = this.recipe.description;
            // this.editorsValue.execution = this.recipe.execution;
            // this.editorsValue.ingredients = this.recipe.ingredients;
            // this.editorsValue.rating = this.recipe.rating;
            // this.editorsValue.picture = this.recipe.picture;
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../../style/main.scss';

@mixin paragraphTitle($title) {
    margin-top: 4em;
    &::before {
        content: $title;

        display: block;
        position: relative;
        width: 100%;
        text-transform: uppercase;
        font-size: 1.5em;
        top: 0em;
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
        @include paragraphTitle('Tytuł');
    }
    &__description {
        @include paragraphTitle('Opis');
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

    &__btn {
        display: flex;
        justify-content: space-around;
        padding-top: 1em;
        padding-bottom: 3em;
    }
    &__btn_save,
    &__btn_cancel {
        display: inline;
        color: white;
        border-radius: 6px;
        background: linear-gradient(145deg, #008900, #007300);
        box-shadow: 3px 3px 7px #007c00, -3px -3px 7px #008400;
        padding: 0.3em;

        &:hover {
            cursor: pointer;
        }
    }
    &__btn_cancel {
        border-radius: 6px;
        background: linear-gradient(145deg, #ff0000, #e60000);
        box-shadow: 3px 3px 7px #f70000, -3px -3px 7px #ff0000;
    }
}
li {
    margin-left: 2em;
}
</style>
