<template>
    <div>
        <h2>{{ recipe.name }}</h2>
        <p v-html="recipe.ingredients"></p>
        <!-- <p v-html="recipe.execution"></p> -->
    </div>
</template>

<script>
export default {
    name: 'Recipe',
    props: { recipe: Object },
    data() {
        return {};
    },
    components: {},
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
