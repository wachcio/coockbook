<template>
    <transition name="fade">
        <div v-if="messageVisible" :class="messageInfo.messageClass">
            {{ messageInfo.messageText }}
        </div>
    </transition>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
    name: 'Message',
    props: {},
    data() {
        return {
            messageVisible: false,
        };
    },
    components: {},
    methods: {
        ...mapMutations([
            'updateRecipes',
            'updateRecipesID',
            'updateRecipesByCategory',
            'updateCategiories',
            'updateCategioriesID',
        ]),
        ...mapActions([
            'getRecipesJSON',
            'getRecipesIDJSON',
            'getRecipesByCategoryJSON',
            'getCategoriesJSON',
            'getCategoriesIDJSON',
        ]),
    },
    computed: {
        ...mapState([
            'endpoints',
            'recipes',
            'recipesID',
            'recipesByCategory',
            'categories',
            'categoriesID',
            'operationStatus',
            'user',
        ]),
        ...mapGetters([]),
        messageInfo() {
            // console.log(this.operationStatus);

            if (
                this.operationStatus.statusCode <= 300 ||
                Object.keys(this.operationStatus).length === 0
            )
                return {
                    messageType: 'ok',
                    messageText: this.operationStatus.msgPL,
                    messageClass: 'message',
                };
            return {
                messageType: 'error',
                messageText: this.operationStatus.msgPL,
                messageClass: 'message message__error',
            };
        },
    },
    created() {},
    watch: {
        operationStatus() {
            // console.log('watch');

            this.messageVisible = true;
            setTimeout(() => {
                this.messageVisible = false;
            }, 3000);
        },
    },
};
</script>

<style lang="scss" scoped>
.message {
    position: fixed;
    width: 100%;
    font-size: 1.2em;
    line-height: 2.5em;
    height: 2.5em;
    top: 0;
    left: 0;
    background-color: green;
    color: white;
    text-align: center;
    z-index: 1000;

    &__error {
        background-color: red;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
