<template>
    <div v-if="categories.length && recipes.length && recipesByCategory.length">
        <form action="">
            <span>
                <input
                    type="text"
                    v-model="filters.searchText"
                    class="search"
                />
                <font-awesome-icon
                    class="search__magnifier"
                    icon="search"
                    size="lg"
                />
            </span>
            <select
                name="categories"
                v-model="filters.category"
                @change="getCategoryIDFromCategotiesArray()"
            >
                <option selected value="all">wszystkie</option>
                <option v-for="(category, index) in categories" :key="index">{{
                    category.category_name
                }}</option>
            </select>
        </form>
        <RecipeList :filtersData="filtersData" />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import RecipeList from './recipes/RecipesList.vue';
import _ from 'lodash';

export default {
    name: 'Home',
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
                categoryID: -1,
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
        getCategoryIDFromCategotiesArray() {
            if (this.filters.category == 'all') {
                this.filters.categoryID = -1;
            } else {
                this.filters.categoryID = _.find(this.categories, {
                    category_name: this.filters.category,
                }).ID;
                this.$store.dispatch(
                    'getRecipesByCategoryIDJSON',
                    this.filters.categoryID
                );
            }
        },
    },
    computed: {
        ...mapState([
            'endpoints',
            'recipes',
            'recipesID',
            'recipesByCategory',
            'recipesByCategoryID',
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

            if (this.filters.categoryID == -1) {
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
            } else {
                //wyszukiwanie jeśli zaznaczono kategorię

                return _.sortBy(
                    _.filter(this.recipesByCategoryID, (o) => {
                        let result =
                            String(o.name).search(searchRegEx) &&
                            String(o.description).search(searchRegEx) &&
                            String(o.ingredients).search(searchRegEx) &&
                            String(o.execution).search(searchRegEx);
                        return result == 0 ? true : false;
                    }),
                    'name'
                );
            }
        },
    },
    created() {
        this.refreshData('aaa');
    },
    watch: {},
};
</script>

<style lang="scss" scoped>
h1 {
    text-align: center;
    margin: 1em 0;
}
form {
    flex-direction: column;
}
span {
    flex-direction: row;
}
form,
span {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}
.search,
select {
    margin: 0 1em;
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
select {
    margin: 1em 0 0 0;
    display: inline-block;
    height: 1.5em;
}
</style>
