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
                :class="`${ratingArray[index]} star__to_change`"
                icon="star"
                size="lg"
                @click="changeRating(index + 1)"
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
        async changeRating(stars) {
            // console.log(stars);
            await this.$emit('setRating', stars);
            this.drawStars();
            // this.$forceUpdate();
        },
        drawStars() {
            this.ratingArray = [];
            for (let i = 0; i < 5; i++) {
                if (i < this.rating) {
                    this.ratingArray.push('star star__selected');
                } else {
                    this.ratingArray.push('star');
                }
            }
        },
    },
    computed: {},
    created() {},
    mounted() {
        // console.log(this.rating);

        this.drawStars();
    },

    watch: {
        rating(newValue) {
            this.changeRating(newValue);
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../../style/main.scss';
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
    transform: scale(1);
    transition: transform 0.3s;

    &__selected {
        color: rgb(11, 180, 5);
    }
    &__to_change {
        :hover {
            cursor: pointer;
            transform-origin: 50% 50%;
            transform: scale(1.5);
        }
    }
}
</style>
