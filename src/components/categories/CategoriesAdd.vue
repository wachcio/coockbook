<template>
    <div class="category_wrapper">
        <h2>Podaj nazwę kategorii</h2>
        <div class="category_add">
            <input
                class="category_add__input"
                type="text"
                name="category_add"
                id="category_add"
                v-model="inputText"
                @keyup.enter="addCategory()"
            />
            <div class="category_add__btn">
                <font-awesome-icon
                    class="category_add__btn--ok"
                    icon="check"
                    size="lg"
                    @click="addCategory()"
                />
                <router-link
                    :to="{
                        name: 'categoriesList',
                    }"
                    class="category_add__btn--cancel"
                    exact
                >
                    <font-awesome-icon
                        icon="reply"
                        size="lg"
                        class="category_add__btn--cancel"
                    />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
export default {
    name: 'CategoriesAdd',
    props: {},
    data() {
        return { inputText: '' };
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
        async addCategory() {
            await this.$store.dispatch('addCategory', this.inputText);

            await this.$store.dispatch('getCategoriesJSON');

            if (this.operationStatus.type != 'error') {
                await this.$router.push({ name: 'categoriesList' });
            }
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
    },
    created() {},
    watch: {},
};
</script>

<style lang="scss" scoped>
@import './../../style/main.scss';
.category_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
        margin-bottom: 1em;
    }
}
.category_add {
    // position: relative;
    // top: -1.1em;
    // display: inline-block;
    // right: 0.2em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 75vw;
    text-align: right;
    // color: lighten($color: $primaryColor, $amount: 10);
    &__btn {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: auto;
        margin-left: 1em;
        align-items: center;

        &--ok {
            margin-left: 0.2em;
            color: darkgreen;
            opacity: 0.5;
            transition: 0.2s opacity;
            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
        &--cancel {
            margin-left: 0.2em;
            color: red;
            opacity: 0.5;
            transition: 0.2s opacity;
            &:hover {
                opacity: 1;
                cursor: pointer;
            }
        }
    }
    &__input,
    &__input:focus,
    &__input:active {
        font-size: 1em;
        background: transparent;
        border: none;
        border-bottom: 2px darken($color: $primaryColor, $amount: 20) solid;
        width: auto;
        outline: none;
    }
}
</style>
