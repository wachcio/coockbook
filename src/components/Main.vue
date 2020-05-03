<template>
    <div class="wrapper"><h1>Książka kucharska</h1></div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
    name: 'Main',
    props: {},
    data() {
        return {};
    },
    components: {},
    methods: {
        ...mapMutations(['updateRecipes', 'updateCategiories']),
        ...mapActions(['getRecipesJSON', 'getCategoriesJSON']),

        refreshData() {
            this.$store.dispatch('getRecipesJSON');
            this.$store.dispatch('getCategoriesJSON');
        },
    },
    computed: {
        ...mapState(['endpoints', 'recipes', 'showInfo']),
        ...mapGetters([]),
    },
    created() {
        this.refreshData();
    },
    watch: {},
};
</script>

<style lang="scss" scoped></style>
