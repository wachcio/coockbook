<template>
    <div>
        <div class="categories_modifications">
            <p>{{ category.category_name }}</p>
            <div class="categories_modifications__btn">
                <router-link
                    :to="{
                        name: 'categoriesEdit',
                        params: { slug: getSlug, categories: categories },
                    }"
                >
                    <font-awesome-icon
                        class="categories_modifications__btn--edit"
                        icon="pen"
                        size="lg"
                    />
                </router-link>
                <div class="categories_modifications__btn--delete">
                    <font-awesome-icon
                        icon="trash"
                        size="lg"
                        @click="deleteCategories()"
                    />
                </div>
            </div>
        </div>
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

<style lang="scss" scoped>
@import './../../style/main.scss';
.categories_modifications {
    // position: relative;
    // top: -1.1em;
    // display: inline-block;
    // right: 0.2em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: auto;
    text-align: right;
    // color: lighten($color: $primaryColor, $amount: 10);
    &__btn {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: auto;
        margin-left: 1em;
        align-items: center;
        &--delete {
            margin-left: 0.2em;
            color: red;
            opacity: 0.2;
            transition: 0.2s opacity;

            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
        &--edit {
            margin-left: 0.2em;
            color: darkgreen;
            opacity: 0.2;
            transition: 0.2s opacity;

            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
    }
}
</style>
