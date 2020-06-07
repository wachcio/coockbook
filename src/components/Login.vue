<template>
    <div class="login_wrapper">
        <h1 class="login__title">Zaloguj się</h1>
        <form @submit.prevent="login" class="login__form">
            <input
                class="login__input login__email"
                type="email"
                name="email"
                v-model="email"
                placeholder="email"
            />
            <input
                class="login__input login__password"
                type="password"
                name="password"
                v-model="password"
                placeholder="password"
            />
            <button class="login__btn" type="submit">
                <font-awesome-icon
                    class="login__btn--ok"
                    icon="check"
                    size="lg"
                />
            </button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },

    methods: {
        login() {
            this.$store
                .dispatch('login', {
                    email: this.email,
                    password: this.password,
                })
                .then(() => {
                    this.$router.push({ name: 'home' });
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
@import './../style/main.scss';
.login_wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login {
    &__title {
    }
    &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__input,
    &__input:focus,
    &__input:active {
        font-size: 1em;
        background: transparent;
        border: none;
        border-bottom: 2px darken($color: $primaryColor, $amount: 20) solid;
        width: auto;
        outline: none;
        margin: 1em 0;
    }
    &__btn {
        display: flex;
        justify-content: space-around;
        padding: 1em;

        border: none;
        background: transparent;

        &--ok {
            display: inline;
            color: white;
            border-radius: 6px;
            background: linear-gradient(145deg, #008900, #007300);
            box-shadow: 3px 3px 7px #007c00, -3px -3px 7px #008400;
            padding: 0.3em;
            transform: scale(1);
            transition: 0.2s transform;

            &:hover {
                cursor: pointer;
                transform: scale(1.2);
            }
        }
    }
}
</style>
