<template>
    <div class="category__item">
        {{ category.category_name }}
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
export default {
    name: 'CategoriesItem',
    props: { category: Object },
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
        isLoaded() {
            if (this.categories.length) return true;
            else return false;
        },
    },
    created() {},
    watch: {},
};
</script>

<style lang="scss" scoped></style>
