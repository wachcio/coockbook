<template>
    <div class="star_wrapper">
        <font-awesome-icon class="star star__active" icon="star" size="lg" />
        <font-awesome-icon class="star" icon="star" size="lg" />
        <font-awesome-icon class="star" icon="star" size="lg" />
        <font-awesome-icon class="star" icon="star" size="lg" />
        <font-awesome-icon class="star" icon="star" size="lg" />
    </div>
</template>

<script>
export default {
    name: 'Rating',
    props: {
        rating: Number,
    },
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
.star_wrapper {
    position: absolute;
    width: 100%;
    bottom: 1em;
    left: 0;
    text-align: center;
}

.star {
    font-size: 1em;
    color: lighten(rgb(255, 216, 41), 30%);
    margin: 0 4px;

    &__active {
        color: rgb(11, 180, 5);
    }
}
</style>
