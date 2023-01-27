import Vue from 'vue';
import Vuex from 'vuex';
import signupModule from './signup/signupModule';
import loginModule from "./login/loginModule";
import cartModule from "./cart/cartModule";
import ProductModule from './product/productModule';
import placeOrderModule from "./placeOrder/placeOrderModule";
import searchModule from "./search/searchModule";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        signup: signupModule,
        login: loginModule,
        cart: cartModule,
        product: ProductModule,
        placeOrder: placeOrderModule,
        search: searchModule,
    }
})