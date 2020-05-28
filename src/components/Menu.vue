<template>
    <div class="menu">
        <font-awesome-icon
            icon="arrow-left"
            size="lg"
            @click="hasHistory() ? $router.go(-1) : $router.push('/')"
            class="history_back"
            title="Cofnij"
        />

        <router-link
            :to="{
                name: 'recipeAdd',
            }"
            class="recipe_add"
            exact
        >
            <font-awesome-icon icon="plus" size="lg" class="recipe_add__icon" />
            Dodaj przepis
        </router-link>
        <router-link
            :to="{
                name: 'categoriesList',
            }"
            class="categories_list"
            exact
        >
            Kategorie
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Menu',
    props: {},
    data() {
        return {};
    },
    components: {},
    methods: {
        hasHistory() {
            return window.history?.length > 2;
        },
    },
    computed: {},
    created() {},
    watch: {},
};
</script>

<style lang="scss" scoped>
@import './../style/main.scss';
.recipe_add,
.history_back,
.categories_list {
    position: absolute;
    top: 1em;
    right: 1em;
    text-decoration: none;
    color: $fontColor;

    &__icon {
        color: green;
    }
}
.categories_list {
    top: 2.2em;
}
.history_back {
    right: auto;
    left: 1em;
    color: $fontColor;
    cursor: pointer;
}
</style>
