<template>
    <div id="app">
        <Main />
    </div>
</template>

<script>
import Main from './components/Main.vue';

export default {
    name: 'App',
    components: {
        Main,
    },
};
</script>

<style lang="scss">
@import './style/main.scss';
@import './style/vuejsDialog/vuejsDialogCustom.scss';
</style>
