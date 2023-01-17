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
        <div class="cartArea">
          <div class="cartContainer" v-for="(cart, index) in cart" :key="index">
            <div class="imageContainer">
              <img :src="cart.image" alt="" class="image" />
            </div>
            <div class="cartProductInfo">
              <h2 class="info">{{ cart.name }}</h2>
              <h2 class="info">{{ cart.price }}</h2>
              <div class="btns">
                <button class="valueBtns" @click="addQuantity(-1,cart.productId, cart.fixedPrice,cart.price,cart.quantity)">-</button>
                <div class="value">{{ cart.quantity + " " + "qty" }}</div>
                <button class="valueBtns" @click="addQuantity(+1,cart.productId, cart.fixedPrice,cart.price,cart.quantity)">+</button>
                <button @click="remove(cart._id)">remove</button>
                <button @click="placeOrder(cart._id)">place order</button>
              </div>
            </div>
          </div>
        </div>
        <div class="placeOrderForAll">
          <button class="orderAll">order all</button>
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
              </div>
              <button
                @click="
                  addToCart(
                    product.image,
                    product.name,
                    product.price,
                    product._id
                  )
                "
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
import { onUpdated } from "@vue/runtime-core";
export default {
  components: { Header },
  data() {
    return {
      cart: [],
      allProducts: [],
      productQuantity: 0,
    };
  },
  computed: {},
  created() {
    this.getAllProducts();
    this.getLogStatus();
    this.getCart();
  },
  methods: {
    async getAllProducts() {
      let response = await axios.get(
        "http://localhost:4000/api/product/product"
      );
      this.allProducts = response.data;
    },
    async addQuantity(value,id,fixedPrice,price,quantity) {
      console.log("printing id",id);
      if (value === +1) {
        if (quantity >= 0) {
         this.productQuantity +=value;
          console.log("quantity", this.productQuantity);
        let oldPrice = price;
        let oldQuantity = quantity;
        let newValues = {
          productId: id,
          price:fixedPrice * (oldQuantity+this.productQuantity),
          quantity: oldQuantity+this.productQuantity,
        };
        let update = await axios.patch(
          "http://localhost:4000/api/cart/update_cart",
          newValues
        );
        let updatedData = update.data;
        this.productQuantity=0;
        this.getCart();
          return;
        }
      }

      if (value === -1) {
       
        if (quantity >1) {
          this.productQuantity += quantity+value;
          console.log("quantity", this.productQuantity);
           let oldPrice = price;
        let oldQuantity = quantity;
        let newValues = {
          productId: id,
          price:fixedPrice *  (this.productQuantity),
          quantity: this.productQuantity,
        };
        let update = await axios.patch(
          "http://localhost:4000/api/cart/update_cart",
          newValues
        );
        let updatedData = update.data;
         this.productQuantity=0;
        this.getCart();
          return;
        }
      }
    },
    async addToCart(image_url, productName, productPrice, Id, user_id) {
      let id = { productId: Id };
      let cartItem = await axios.post(
        `http://localhost:4000/api/cart/get_product`,
        id
      );
      let data = cartItem.data;
      if (data.productId === Id) {
        let oldPrice = data.price;
        let oldQuantity = data.quantity;
        let newValues = {
          productId: Id,
          price: oldPrice + oldPrice *1,
          quantity: oldQuantity + 1,
        };
        let update = await axios.patch(
          "http://localhost:4000/api/cart/update_cart",
          newValues
        );
        let updatedData = update.data;
        this.getCart();
        return;
      }

      let post = {
        image: image_url,
        name: productName,
        price: productPrice * 1,
        fixedPrice:productPrice,
        productId: Id,
        quantity: 1,
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
    },
    async remove(product_id) {
      let post = { _id: product_id };
      let response = await axios.patch(
        "http://localhost:4000/api/cart/removeItems",
        post
      );
      let data = response.data;
      this.getCart();
    },
    placeOrder(item_id) {
      console.log("printing item id in cart", item_id);
      this.$store.dispatch("getCheckoutItems", item_id);
      if (this.logStatus) {
        this.$router.push({
          path: "/placeOrder",
        });
      } else {
        this.$router.push({
          path: "/login/cart",
        });
      }
    },
    getLogStatus() {
      let logStatus = JSON.parse(localStorage.getItem("store"));
      this.logStatus = logStatus.login.loginStatus;
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
.cartArea {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 83%;
  overflow-x: hidden;
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
.btn {
  display: flex;
  justify-content: space-evenly;
}
.quant {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 42%;
}
.value {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-family: helvetica;
  color: #ec6009;
}
.valueBtns {
  height: 100%;
  border: 1px solid;
}
.valueBtns:active {
  background: #ffde3ade;
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
.placeOrderForAll {
  display: flex;
  border: 1px solid;
  width: 21%;
  height: 6%;
  border-radius: 6px;
  justify-content: center;
  margin-top: 2%;
  overflow: hidden;
}
.orderAll {
  width: 100%;
  font-size: 18px;
  font-family: helvetica;
  border: none;
}
.orderAll:active {
  background: #ffde3ade;
}
</style>
