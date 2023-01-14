export default {
    state: {
        loginStatus: ""
    },
    getters: {
        getStatus(state) {
            return state.loginStatus;
        }
    },
    mutations: {
        setloginStatus(state, payload) {
            state.loginStatus = payload;
        },
        takeInitialSnap(state) {
            if (localStorage.getItem('store')) {
                // Replace the state object with the stored item
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
        }
    },
    actions: {
        getLoginStatus(context, payload) {
            context.commit("setloginStatus", payload);
        }
    }
}