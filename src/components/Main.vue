<template>
    <div class="wrapper"><h1>Książka kucharska</h1></div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

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

        refreshData() {
            this.$store.dispatch('getRecipesJSON');
            this.$store.dispatch('getRecipesIDJSON', 2);
            this.$store.dispatch('getRecipesByCategoryJSON');
            this.$store.dispatch('getCategoriesJSON');
            this.$store.dispatch('getCategoriesIDJSON', 3);
            //Dodanie kategorii do bazy poprawne
            // this.$store.dispatch('addCategory', 'łakocie');
            //Dodanie przepisu
            // this.$store.dispatch('addRecipes', {
            //     name: 'gofry2',
            //     ingredients: 'składniki do gofrów',
            //     execution: 'przepis na gofry',
            //     picture: 'zdjęcie',
            //     rating: 5,
            //     category_id: '16, 34',
            // });

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
        this.refreshData();
    },
    watch: {},
};
</script>

<style lang="scss" scoped></style>
