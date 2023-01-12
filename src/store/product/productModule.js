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
            state.allProducts.push(payload);
        },
        loadOcassionalDeals(state, payload) {
            state.OcassionalDeals.push(payload);
        },
        loadHomeDeals(state, payload) {
            state.homeDeals.push(payload);
        },
        loadGroceryDeals(state, payload) {
            state.groceryDeals.push(payload);
        },
        loadStudyDeals(state, payload) {
            state.studyDeals.push(payload);
        }
    },
    actions: {
        async getAllProducts(context) {
            let response = await axios.get("http://localhost:4000/api/product/product");
            context.commit('loadAllProducts', response.data);
        },
        async OcassionalDeals(context) {
            let response = await axios.get(`http://localhost:4000/api/product/product/OcassionalDeals`);
            context.commit("loadOcassionalDeals", response);
        },
        async homeDeals(context) {
            let response = await axios.get(`http://localhost:4000/api/product/product/homeDeals`)
            context.commit("loadHomeDeals", response);
        },
        async groceryDeals(context) {
            let response = await axios.get(`http://localhost:4000/api/product/product/groceryDeals`)
            context.commit("loadGroceryDeals", response);
        },
        async studyDeals(context) {
            let response = await axios.get(`http://localhost:4000/api/product/product/studyDeals`)
            context.commit("loadStudyDeals", response);
        }
    }
}