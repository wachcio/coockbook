<template>
    <div class="container">
        <h1>Książka kucharska</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Main',
    props: {},
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
.container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
h1 {
    text-align: center;
    margin: 1em 0;
}
</style>
