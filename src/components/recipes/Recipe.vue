<template>
    <div class="recipe_wrapper">
        <h2>{{ recipe.name }}</h2>
        <p v-html="recipe.description"></p>
        <Star :rating="recipe.rating" />
    </div>
</template>

<script>
import Star from './Rating.vue';

export default {
    name: 'Recipe',
    props: { recipe: Object },
    data() {
        return {};
    },
    components: { Star },
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
</style>
