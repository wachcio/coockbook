<template>
    <router-link
        :to="{ name: 'recipeDetail', params: { recipe: recipe } }"
        class="recipe_wrapper"
    >
        <h2>{{ recipe.name }}</h2>
        <p v-html="recipe.description"></p>
        <StarRecipeCard :rating="recipe.rating" />
        <font-awesome-icon class="utensils" icon="utensils" size="lg" />
        <font-awesome-icon class="pizza_slice" icon="pizza-slice" size="lg" />
    </router-link>
</template>

<script>
import StarRecipeCard from './StarRecipeCard.vue';

export default {
    name: 'Recipe',
    props: { recipe: Object },
    data() {
        return {};
    },
    components: { StarRecipeCard },
    methods: {},
    computed: {},
    created() {},
    watch: {},
};
</script>

<style lang="scss" scoped>
.racipe_wrapper {
}
h2 {
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 0.5em;
    text-shadow: 1px 2px 1px rgba(0, 0, 0, 0.25);
}
.utensils,
.pizza_slice {
    position: absolute;
    font-size: 2em;
    bottom: 15px;
}
.pizza_slice {
    right: 15px;
}
.utensils {
    left: 15px;
}
</style>
