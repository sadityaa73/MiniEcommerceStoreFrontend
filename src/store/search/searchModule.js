export default {
    state: {
        searched: "",
        searchResponse: []
    },
    getters: {
        getSearchResult(state) {
            return state.searchResponse;
        }
    },
    mutations: {
        loadSearchResponse(state, payload) {
            debugger;
            state.searchResponse = payload;
        }
    },
    actions: {
        getSearchResponse(context, payload) {
            debugger;
            context.commit("loadSearchResponse", payload);
        }
    }
}