import axios from "axios";
export default {
    state: {
        allProducts: [],
        OcassionalDeals: [],
        homeDeals: [],
        groceryDeals: [],
        studyDeals: [],
    },
    getters: {
        allProducts(state) {
            return state.allProducts;
        }
    },
    mutations: {
        loadAllProducts(state, payload) {
            state.allProducts = payload;
        },

    },
    actions: {
        async getAllProducts(context) {
            let response = await axios.get("http://localhost:4000/api/product/product");
            context.commit('loadAllProducts', response.data);
        },
    }
}