import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import login from "../components/userAuth/login.vue";
import signUp from "../components/userAuth/signUp.vue";
import reset from "../components/userAuth/reset.vue";
import adminstrator from "../components/Admin/adminstrator.vue";
import addProducts from "../components/Admin/addProducts.vue";
import viewProduct from "../components/productPage/viewProduct.vue";
import cart from "../components/cart/cart.vue";
import order from "../components/orders/order.vue"
import checkout from "../components/orders/checkout.vue"
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: signUp
    },
    {
        path: '/reset',
        name: 'reset',
        component: reset
    },
    {
        path: '/adminstrator',
        name: 'adminstrator',
        component: adminstrator
    },
    {
        path: '/addproducts',
        name: 'addProducts',
        component: addProducts
    },
    {
        path: `/viewProduct/:id`,
        name: 'viewProduct',
        component: viewProduct
    },
    {
        path: `/cart`,
        name: 'cart',
        component: cart
    },
    {
        path: `/order`,
        name: 'order',
        component: order
    },
    {
        path: `/placeOrder`,
        name: 'checkout',
        component: checkout
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router