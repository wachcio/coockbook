<template>
    <div>
        <div
            v-if="editMode == false"
            class="categories_modifications"
            @dblclick="editMode = true"
        >
            <p>{{ category.category_name }}</p>
            <div
                v-if="isLogged && isAdmin"
                class="categories_modifications__btn"
            >
                <font-awesome-icon
                    class="categories_modifications__btn--edit"
                    icon="pen"
                    size="lg"
                    @click="editMode = true"
                />
                <div
                    v-if="isLogged && isAdmin"
                    class="categories_modifications__btn--delete"
                >
                    <font-awesome-icon
                        icon="trash"
                        size="lg"
                        @click="deleteCategory()"
                    />
                </div>
            </div>
        </div>
        <div v-else class="categories_modifications" @blur="onBlur($event)">
            <input
                class="categories_modifications__input"
                type="text"
                :name="`category_${category.category_name}`"
                :id="`category_${category.category_name}`"
                v-model="inputText"
                @keyup.enter="
                    inputText != category.category_name
                        ? updateCategories()
                        : (editMode = false)
                "
            />
            <div class="categories_modifications__btn">
                <font-awesome-icon
                    class="categories_modifications__btn--ok"
                    icon="check"
                    size="lg"
                    @click="
                        inputText != category.category_name
                            ? updateCategories()
                            : (editMode = false)
                    "
                />
                <div class="categories_modifications__btn--back">
                    <font-awesome-icon
                        icon="reply"
                        size="lg"
                        @click="editMode = false"
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
        return {
            editMode: false,
            inputText: '',
        };
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
        onBlur(e) {
            console.log('blur: ', e);
        },
        async updateCategories() {
            await this.$store.dispatch('updateCategory', {
                ID: this.category.ID,
                category_name: this.inputText,
            });

            this.$store.dispatch('getCategoriesJSON');
            // this.$router.push({ name: 'home' });
            this.editMode = false;
        },
        async deleteCategory() {
            this.$dialog
                .confirm(
                    `Czy na pewno chcesz usunąć '${this.category.category_name}'? Pamiętaj, że mogą do niej należeć już jakieś przepisy.`
                )
                .then(async () => {
                    await this.$store.dispatch(
                        'deleteCategory',
                        this.category.ID
                    );
                    console.log(this.operationStatus.statusCode);

                    this.$store.dispatch('getCategoriesJSON');
                })
                .catch(function() {
                    console.log('Clicked on cancel');
                });
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
        ...mapGetters(['isLogged', 'isAdmin']),
        isLoaded() {
            if (this.categories.length) return true;
            else return false;
        },
    },
    created() {},
    mounted() {
        this.inputText = this.category.category_name;
    },
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
        &--ok {
            margin-left: 0.2em;
            color: darkgreen;
            transition: 0.2s opacity;
            &:hover {
                cursor: pointer;
            }
        }

        &--back {
            margin-left: 0.2em;
            color: red;
            transition: 0.2s opacity;

            &:hover {
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
