<template>
    <div class="container">
        <h1>Książka kucharska</h1>
        <RecipeList />
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import RecipeList from './recipes/RecipesList.vue';

export default {
    name: 'Main',
    props: {},
    data() {
        return {
            newRecipes: {
                name: 'dżem śliwkowy',
                ingredients: 'składniki',
                execution: 'wykonanie',
                picture: 'obraz',
                rating: 'ocena',
                category_id: '1,2,3',
            },
            newCategory: 'przetwory',
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
}
h1 {
    text-align: center;
    margin: 1em 0;
}
</style>
