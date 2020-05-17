<template>
    <router-link
        :to="{
            name: 'recipeDetail',
            params: { slug: getSlug, recipe: recipe },
        }"
        class="recipe_wrapper"
    >
        <h2>{{ recipe.name }}</h2>
        <p v-html="recipe.description"></p>
        <StarRating :rating="recipe.rating" />
        <font-awesome-icon class="utensils" icon="utensils" size="lg" />
        <font-awesome-icon class="pizza_slice" icon="pizza-slice" size="lg" />
    </router-link>
</template>

<script>
import StarRating from './StarRating.vue';
let slug = require('slug');

export default {
    name: 'Recipe',
    props: { recipe: Object },
    data() {
        return {};
    },
    components: { StarRating },
    methods: {},
    computed: {
        getSlug() {
            return slug(this.recipe.name);
        },
    },
    created() {},
    watch: {},
};
</script>

<style lang="scss" scoped>
@import './../../style/main.scss';
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
