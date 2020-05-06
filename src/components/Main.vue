<template>
    <div class="container">
        <h1>Książka kucharska</h1>
        <span>
            <input type="text" v-model="filters.searchText" class="search"/>
            <font-awesome-icon class="search__magnifier" icon="search" size="lg"
        /></span>
        <RecipeList :filtersData="filtersData" />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import RecipeList from './recipes/RecipesList.vue';
import _ from 'lodash';

export default {
    name: 'Main',
    props: {},
    data() {
        return {
            newRecipes: {
                name: 'dżem śliwkowy',
                description: 'mały opis potrawy',
                ingredients: 'składniki',
                execution: 'wykonanie',
                picture: 'obraz',
                rating: 'ocena',
                category_id: '1,2,3',
            },
            newCategory: 'przetwory',
            filters: {
                searchText: '',
                category: 'all',
            },
        };
    },
    components: { RecipeList },
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

        // Aktualizacja kategorii do bazy poprawne
        // this.$store.dispatch('updateCategory', {
        //     category_name: 'łakocie2',
        //     ID: 34,
        // });
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
        //usuwanie kategorii
        // this.$store.dispatch('deleteRecipes', 42);
        //usuwanie przepisu
        // this.$store.dispatch('deleteCategory', 16);
        addCategory() {
            //Dodanie kategorii do bazy poprawne
            this.$store.dispatch('addCategory', {
                category_name: this.newCategory,
            });
            this.refreshData('recipes');
        },
        addRecipes() {
            this.$store.dispatch('addRecipes', this.newRecipes);
            this.refreshData('categories');
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
        filtersData() {
            // let result;
            const regexStr =
                '(?=.*' +
                this.filters.searchText.split(/,|\s/).join(')(?=.*') +
                ')';
            const searchRegEx = new RegExp(regexStr, 'gi');

            return _.sortBy(
                _.filter(this.recipes, (o) => {
                    let result =
                        String(o.name).search(searchRegEx) &&
                        String(o.description).search(searchRegEx) &&
                        String(o.ingredients).search(searchRegEx) &&
                        String(o.execution).search(searchRegEx);
                    return result == 0 ? true : false;
                }),
                'name'
            );
        },
    },
    created() {
        this.refreshData('aaa');
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
h1 {
    text-align: center;
    margin: 1em 0;
}
span {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
}
.search {
    margin: 1em;
    background-color: rgb(255, 216, 41);
    border: none;
    border-radius: 10px;
    font-size: 1.2em;
    line-height: 1.6em;
    width: 80%;
    max-width: 300px;
    text-align: center;
    transition: 0.2s;
    box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.36);

    &:hover,
    &:focus {
        box-shadow: 0px 0px 12px 1px rgba(0, 0, 0, 0.6);
    }

    &__magnifier {
        transform: translateX(-45px);
        color: gray;
        transition: 0.2s color;
    }
    &:focus + &__magnifier,
    &:hover + &__magnifier {
        color: darken(gray, 20%);
    }
}
</style>
