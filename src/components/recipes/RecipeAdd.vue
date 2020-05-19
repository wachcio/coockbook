<template>
    <div class="recipe_details">
        <h2>Dodaj przepis</h2>
        <Editor
            class="recipe_details__name"
            initialEditType="wysiwyg"
            height="100px"
            :options="editorOptions"
            ref="editorName"
        ></Editor>

        <Editor
            class="recipe_details__description"
            initialEditType="wysiwyg"
            height="100px"
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
            @setRating="0"
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
                name: this.$refs.editorName.invoke('getMarkdown'),
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
            this.$router.push({ name: 'home' });
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

h2 {
    text-align: center;
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
