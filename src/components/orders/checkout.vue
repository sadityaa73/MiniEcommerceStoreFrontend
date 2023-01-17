<template>
  <div class="mainContainer">
    <Header />
    <div class="innerContainer" v-if="checkoutComponent">
      <div class="allproducts">
        <div class="cartContainer" v-for="(item, index) in cart" :key="index">
          <div class="imageContainer">
            <img :src="item.image" alt="" class="image" />
          </div>
          <div class="cartProductInfo">
            <h2 class="info">{{ item.name }}</h2>
            <h2 class="info">{{ item.price }}</h2>
            <div class="btns">
              <button
                class="valueBtns"
                @click="
                  addQuantity(
                    -1,
                    item.productId,
                    item.fixedPrice,
                    item.price,
                    item.quantity
                  )
                "
              >
                -
              </button>
              <div class="value">{{ item.quantity + " " + "qty" }}</div>
              <button
                class="valueBtns"
                @click="
                  addQuantity(
                    +1,
                    item.productId,
                    item.fixedPrice,
                    item.price,
                    item.quantity
                  )
                "
              >
                +
              </button>
              <button @click="remove(item._id)">remove</button>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout">
        <div class="checkBtn">
          <button class="btn" @click="checkout">checkout</button>
        </div>
        <div class="amount">
          <h6 class="totalAmount">{{ totalAmount }}</h6>
        </div>
      </div>
    </div>
    <addAddress v-if="addressComponent" @showComponent="getdata($event)" />
    <makePayment v-if="makePaymentComponent" />
  </div>
</template>
<script>
import axios from "axios";
import Header from "../HeaderComponent/Header.vue";
import addAddress from "./addAddress.vue";
import makePayment from "./makePayment.vue";
export default {
  name: "checkout",
  components: { Header, addAddress, makePayment },
  data() {
    return {
      visible: false,
      checkoutComponent: true,
      addressComponent: false,
      makePaymentComponent: false,
      cart: [],
      productQuantity: 0,
      totalAmount: 0,
    };
  },
  created() {
    this.getCartItems();
  },
  methods: {
    async addQuantity(value, id, fixedPrice, price, quantity) {
      console.log("printing id", id);
      if (value === +1) {
        if (quantity >= 0) {
          this.productQuantity += value;
          console.log("quantity", this.productQuantity);
          let oldPrice = price;
          let oldQuantity = quantity;
          let newValues = {
            productId: id,
            price: fixedPrice * (oldQuantity + this.productQuantity),
            quantity: oldQuantity + this.productQuantity,
          };
          let update = await axios.patch(
            "http://localhost:4000/api/cart/update_cart",
            newValues
          );
          let updatedData = update.data;
          this.productQuantity = 0;
          this.getCartItems();
          return;
        }
      }

      if (value === -1) {
        if (quantity > 1) {
          this.productQuantity += quantity + value;
          console.log("quantity", this.productQuantity);
          let oldPrice = price;
          let oldQuantity = quantity;
          let newValues = {
            productId: id,
            price: fixedPrice * this.productQuantity,
            quantity: this.productQuantity,
          };
          let update = await axios.patch(
            "http://localhost:4000/api/cart/update_cart",
            newValues
          );
          let updatedData = update.data;
          this.productQuantity = 0;
          this.getCartItems();
          return;
        }
      }
    },
    async remove(product_id) {
      let post = { _id: product_id };
      let response = await axios.patch(
        "http://localhost:4000/api/cart/removeItems",
        post
      );
      let data = response.data;
      this.getCartItems();
    },
    checkout() {
      this.addressComponent = true;
      this.checkoutComponent = false;
    },
    getdata(event) {
      this.makePaymentComponent = event;
      this.addressComponent = false;
    },
    async getCartItems() {
      let response = await axios.get("http://localhost:4000/api/cart/cart");
      this.cart = response.data;
      this.getTotalAmount();
    },
    getTotalAmount() {
      let total = 0;
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].price;
      }
      this.totalAmount = total;
    },
  },
};
</script>
<style scoped>
.mainContainer {
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #d6dcec;
}
.innerContainer {
  width: 98%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.cartContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 97% !important;
  height: 31%;
  margin-top: 2%;
  border-radius: 6px;
  box-shadow: 0px 4px 5px 3px #0000007d;
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
.allproducts {
  border: 1px solid;
  border-radius: 5px;
  width: 70%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 1%;
  background: whitesmoke;
}
.checkout {
  border: 1px solid;
  width: 70%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.checkBtn {
  border: 1px solid;
  width: 70%;
  height: 43%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-family: helvetica;
}
.btn:active {
  background: #ffde3ade;
}
.amount {
  width: 22%;
  border: 1px solid;
  height: 55%;
  border-radius: 5px;
  background: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
}
.totalAmount {
  font-size: 15px;
  font-family: helvetica;
}
</style>
