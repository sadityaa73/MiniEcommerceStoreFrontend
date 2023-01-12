import axios from "axios";
export default {
    state: {
        userLogin: [],
    },
    getters: {
        getLocalStorage(state) {
            return JSON.parse(state.localStorage);
        }
    },
    mutations: {

        setLocalStorage(state, payload) {
            state.localStorage.setItem("user", payload);
        },
        initialiseStore(state) {
            // Check if the ID exists
            if (localStorage.getItem('store')) {

            }
        }
    },
    actions: {
        setLocalStorage(context, payload) {
            context.commit('setLocalStorage', payload);
        }
    }
}