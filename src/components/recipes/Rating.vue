<template>
    <div class="star_wrapper">
        <font-awesome-icon
            v-for="(starClass, index) in 5"
            :key="`star_${index}`"
            :class="ratingArray[index]"
            icon="star"
            size="lg"
        />
    </div>
</template>

<script>
export default {
    name: 'Rating',
    props: {
        rating: Number,
    },
    data() {
        return {
            ratingArray: [],
        };
    },
    components: {},
    methods: {},
    computed: {},
    created() {},
    mounted() {
        for (let i = 0; i < 5; i++) {
            if (i < this.rating) {
                this.ratingArray.push('star star__active');
            } else {
                this.ratingArray.push('star');
            }
        }
    },
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
