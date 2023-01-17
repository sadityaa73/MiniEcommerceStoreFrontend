import axios from "axios"
export default {
    state: {
        usersAddress: "",
        username: ""
    },
    getters: {
        users(state) {
            debugger;
            return state.usersAddress;
        }
    },
    mutations: {
        loadUsers(state, payload) {
            debugger;
            state.usersAddress = payload.address;
            state.username = payload.username;
        }
    },
    actions: {
        async getUsers(context, payload) {
            debugger;
            let username = payload
            let response = await axios.get(`http://localhost:4000/api/signup/get_user/${username}`);
            context.commit("loadUsers", response.data);
        }
    }
}