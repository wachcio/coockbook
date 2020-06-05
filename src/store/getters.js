import _ from 'lodash';

export default {
    isLogged: (state) => !!state.user,
    isAdmin: (state) => {
        if (_.has(state.user, 'user')) {
            return !!state.user.user.is_admin;
        }
        return false;
    },
};
