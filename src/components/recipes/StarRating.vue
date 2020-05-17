<template>
    <div class="star_wrapper">
        <template v-if="toChange == false">
            <font-awesome-icon
                v-for="(starClass, index) in 5"
                :key="`star_${index}`"
                :class="ratingArray[index]"
                icon="star"
                size="lg"
            />
        </template>
        <template v-else>
            <font-awesome-icon
                v-for="(starClass, index) in 5"
                :key="`star_${index}`"
                :class="ratingArray[index]"
                icon="star"
                size="lg"
                @click="changeRating(index)"
            />
        </template>
    </div>
</template>

<script>
export default {
    name: 'StarRecipeCard',
    props: {
        rating: {
            type: Number,
            required: true,
        },
        toChange: Boolean,
    },
    data() {
        return {
            ratingArray: [],
        };
    },
    components: {},
    methods: {
        changeRating(stars) {
            console.log(stars);
        },
    },
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
