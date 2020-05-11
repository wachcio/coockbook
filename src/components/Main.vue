<template>
    <div class="container">
        <h1>Książka kucharska</h1>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
export default {
    name: 'Main',
    props: {},
    data() {
        return {};
    },
    components: {},
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
</style>
