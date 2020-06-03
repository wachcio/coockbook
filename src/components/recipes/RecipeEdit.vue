<template>
    <div class="recipe_details">
        <div v-if="recipe">
            <Editor
                class="recipe_details__name"
                initialEditType="wysiwyg"
                height="100px"
                :options="editorOptionsTitle"
                :initialValue="recipe.name"
                ref="editorName"
            ></Editor>

            <Editor
                class="recipe_details__description"
                initialEditType="wysiwyg"
                height="150px"
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
                <RecipeCategoriesChackbox
                    :recipe="recipe"
                    @selectedCategories="selectedCategories"
                />
            </div>
            <StarRating
                class="recipe_details__rating"
                :toChange="true"
                :rating="editorsValue.rating"
                @setRating="setRating"
            />
            <div class="recipe_details__btn">
                <div class="recipe_details__btn_save" @click="sendData()">
                    Zapisz
                </div>
                <div class="recipe_details__btn_cancel" @click="cancelHandle()">
                    Anuluj
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

import RecipeCategoriesChackbox from './RecipeCategoriesCheckbox.vue';
import StarRating from './StarRating.vue';

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
            editorOptionsTitle: { toolbarItems: [] },
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
    components: { Editor, RecipeCategoriesChackbox, StarRating },
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
        selectedCategories(data) {
            // console.log('data', data);

            this.editorsValue.categories = data;
        },
        setRating(data) {
            // console.log('data', data);

            this.editorsValue.rating = data;
            this.$forceUpdate();
        },
        async sendData() {
            const obj = {
                name: this.$refs.editorName.invoke('getMarkdown').toLowerCase(),
                description: this.$refs.editorDescription.invoke('getMarkdown'),
                ingredients: this.$refs.editorIngredients.invoke('getMarkdown'),
                execution: this.$refs.editorExecution.invoke('getMarkdown'),
                picture: '',
                rating: this.editorsValue.rating,
                category_id: this.editorsValue.categories.join(', '),
                ID: this.recipe.ID,
            };
            // console.log(obj);

            await this.$store.dispatch('updateRecipes', obj);

            console.log(this.operationStatus.statusCode);

            this.$store.dispatch('getRecipesJSON');
            this.$store.dispatch('getRecipesByCategoryJSON');
            if (this.operationStatus.type != 'error') {
                this.$router.push({ name: 'home' });
            }
        },
        cancelHandle() {
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
            'operationStatus',
        ]),
        ...mapGetters([]),
        getCategories() {
            return this.recipe.categories
                .map((category) => {
                    return category.category_name;
                })
                .join(', ');
        },
        getCategoriesID() {
            return this.recipe.categories.map((category) => {
                return parseInt(category.ID);
            });
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
@import './../../style/recipes/recipes.scss';
h2 {
    text-align: center;
}
</style>
