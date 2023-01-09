<template>
  <div class="mainContainer">
    <Header />
    <div class="innerContainer">
      <div class="cart">
        <div class="head">
          <img src="../../assets/carts.png" alt="cart" class="cartIcon" />
          <h2 class="cartText">cart</h2>
        </div>
        <div class="itemsNotFound" v-if="cart.length === 0">
          <div class="icon">
            <img src="../../assets/basket.png" alt="" class="itemNotFound" />
          </div>
          <h2 class="itemsnotfound">
            Your cart is empty please add some items here !!
          </h2>
        </div>
        <div class="cartContainer" v-for="(cart, index) in cart" :key="index">
          <div class="imageContainer">
            <img :src="cart.image" alt="" class="image" />
          </div>
          <div class="cartProductInfo">
            <h2 class="info">{{ cart.name }}</h2>
            <h2 class="info">{{ cart.price }}</h2>
            <div class="btns">
              <button @click="remove(cart._id)">remove</button>
              <button>place order</button>
            </div>
          </div>
        </div>
      </div>
      <div class="otherProducts">
        <div
          class="ProductContainer"
          v-for="(product, index) in allProducts"
          :key="index"
        >
          <div class="imageContainer">
            <img :src="product.image" alt="" class="image" />
          </div>
          <div class="cartProductInfo">
            <h2 class="info">{{ product.name }}</h2>
            <h2 class="info">{{ product.price }}</h2>
            <div class="btns">
              <button
                @click="addToCart(product.image, product.name, product.price)"
              >
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Header from "../HeaderComponent/Header.vue";
export default {
  components: { Header },
  data() {
    return {
      cart: [],
      allProducts: [],
    };
  },
  created() {
    this.getAllProducts();
    this.getCart();
  },
  methods: {
    async getAllProducts() {
      let response = await axios.get(
        "http://localhost:4000/api/product/product"
      );
      this.allProducts = response.data;
    },
    async addToCart(image_url, productName, productPrice, user_id) {
      let post = {
        image: image_url,
        name: productName,
        price: productPrice,
        userId: user_id ? user_id : "",
      };
      let response = await axios.post(
        "http://localhost:4000/api/cart/cart",
        post
      );
      this.getCart();
    },
    async getCart() {
      let response = await axios.get("http://localhost:4000/api/cart/cart");
      this.cart = response.data;
      console.log("printing cart details", this.cart);
    },
    async remove(product_id) {
      console.log("printing product id", product_id);
      let post = { _id: product_id };
      let response = await axios.patch(
        "http://localhost:4000/api/cart/removeItems",
        post
      );
      let data = response.data;
      this.getCart();
    },
  },
};
</script>
<style scoped>
.mainContainer {
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #d6dcec;
}
.innerContainer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 92vh;
}
.cart {
  border: 1px solid;
  width: 60% !important;
  height: 93%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background: whitesmoke;
  overflow-x: hidden;
}
.head {
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 8%;
}
.cartIcon {
  width: 7%;
  height: 90%;
}
.cartContainer {
  display: flex;
  border: 1px solid;
  width: 97% !important;
  height: 25%;
  margin-top: 2%;
  border-radius: 6px;
}
.imageContainer {
  border: 1px solid;
  width: 35%;
  height: 88%;
  margin: 2%;
}
.image {
  width: 100%;
  height: 100%;
}
.cartProductInfo {
  border: 1px solid red;
  width: 63%;
  height: 88%;
  margin: 2%;
}
.info {
  margin: 0px;
  font-family: helvetica;
  font-size: 20px;
}
.btns {
  margin-top: 6%;
  display: flex;

  justify-content: space-evenly;
}
.icon {
  width: 29%;
}
.itemsNotFound {
  width: 97%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: helvetica;
}
.itemNotFound {
  width: 100%;
  height: 100%;
}

.otherProducts {
  border: 1px solid;
  width: 35%;
  height: 93%;
  border-radius: 5px;
  background: whitesmoke;
  overflow-x: hidden;
  overflow-y: auto;
}
.ProductContainer {
  display: flex;
  width: 97% !important;
  height: 16%;
  margin-top: 2%;
  margin-left: 1%;
  border-radius: 6px;
  box-shadow: 0px 4px 5px 3px #0000007d;
}
</style>
