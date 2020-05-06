<template>
    <div>
        <h2>{{ recipe.name }}</h2>
        <p v-html="recipe.description"></p>
        <!-- <p v-html="recipe.execution"></p> -->
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
h2 {
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
}
</style>
