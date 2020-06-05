<template>
    <div class="recipe_details">
        <h2>Dodaj przepis</h2>
        <Editor
            class="recipe_details__name"
            initialEditType="wysiwyg"
            height="100px"
            :options="editorOptionsTitle"
            ref="editorName"
        ></Editor>

        <Editor
            class="recipe_details__description"
            initialEditType="wysiwyg"
            height="150px"
            :options="editorOptions"
            ref="editorDescription"
        >
        </Editor>
        <Editor
            class="recipe_details__ingredients"
            initialEditType="wysiwyg"
            :options="editorOptions"
            ref="editorIngredients"
        >
        </Editor>
        <Editor
            class="recipe_details__execution"
            initialEditType="wysiwyg"
            :options="editorOptions"
            ref="editorExecution"
        >
        </Editor>
        <div class="recipe_details__categories">
            <RecipeCategoriesChackbox
                :recipe="{ categories: [] }"
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
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

import RecipeCategoriesChackbox from './RecipeCategoriesCheckbox.vue';
import StarRating from './StarRating.vue';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/vue-editor';

// import _ from 'lodash';
export default {
    name: 'RecipeAdd',
    props: {},
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
            };
            // console.log(obj);

            await this.$store.dispatch('addRecipes', obj);

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
        refreshData(type = 'all') {
            if (type == 'recipes' || type == 'all') {
                this.$store.dispatch('getRecipesJSON');
                // this.$store.dispatch('getRecipesIDJSON', 2);
                this.$store.dispatch('getRecipesByCategoryJSON');
            }
            if (type == 'categories' || type == 'all') {
                this.$store.dispatch('getCategoriesJSON');
                // this.$store.dispatch('getCategoriesIDJSON', 3);
            } else this.refreshData();
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
            'user',
        ]),
        ...mapGetters([]),
        // getCategories() {
        //     return this.recipe.categories
        //         .map((category) => {
        //             return category.category_name;
        //         })
        //         .join(', ');
        // },
        // getCategoriesID() {
        //     return this.recipe.categories.map((category) => {
        //         return parseInt(category.ID);
        //     });
        // },
    },
    created() {
        if (!this.categories) this.refreshData();
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
@import './../../style/main.scss';
@import './../../style/recipes/recipes.scss';
</style>
