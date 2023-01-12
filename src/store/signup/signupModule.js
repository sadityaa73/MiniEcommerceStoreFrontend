import axios from "axios"
export default {
    state: {
        users: []
    },
    getters: {
        gettingUser(state, getters) {
            debugger;
            return state.users.length > 0 ? true : false;
        }
    },
    mutations: {
        loadUsers(state, payload) {
            debugger;
            state.users.push(payload)
        }
    },
    actions: {
        async getUsers(context) {
            debugger;
            let response = await axios.get("http://localhost:4000/api/signup/signup");
            context.commit("loadUsers", response);
        }
    }
}