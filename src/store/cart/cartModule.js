import axios from 'axios';
export default {
    state: {
        checkoutItems: []
    },
    getters: {},
    mutations: {
        loadCartItems(state, payload) {
            state.checkoutItems = payload;
        }
    },
    actions: {
        getCheckoutItems(context, payload) {
            context.commit("loadCartItems", payload);
        }
    }
}