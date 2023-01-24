<template>
  <div class="mainContainer">
    <Header />
    <div class="innerContainer" v-if="checkoutComponent">
      <div class="allproducts">
        <div class="itemsNotFound" v-if="cart.length === 0">
          <div class="icon">
            <img src="../../assets/basket.png" alt="" class="itemNotFound" />
          </div>
          <h2 class="itemsnotfound">
            Your cart is empty please add some items here !!
          </h2>
        </div>
        <div class="cartContainer" v-for="(item, index) in cart" :key="index">
          <div class="imageContainer">
            <img :src="item.image" alt="" class="image" />
          </div>
          <div class="cartProductInfo">
            <h2 class="info">{{ item.name }}</h2>
            <h2 class="rupee"><img
              src="../../assets/rupee.png"
              alt="rupee"
              class="rupeeIcon2"
            />{{ item.price }}</span
          ></h2>
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
              <button class="remove" @click="remove(item._id)">
                <img
                  src="../../assets/delete.png"
                  alt="remove"
                  class="removeIcon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout">
        <div class="checkBtn">
          <button class="btn" @click="checkout">checkout</button>
        </div>
        <div class="amount">
          <h6 class="totalAmount"><img
              src="../../assets/rupee.png"
              alt="rupee"
              class="rupeeIcon"
            />{{ totalAmount }}</span
          ></h6>
        </div>
      </div>
    </div>
    <addAddress
      v-if="addressComponent"
      @users="getUsers($event)"
      @showComponent="getdata($event)"
    />
    <makePayment
      v-if="makePaymentComponent"
      :address="userAddress"
      :cartItems="cart"
    />
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
      userAddress: "",
    };
  },
  created() {
    this.getCartItems();
    console.log("printing produtId in placeOrder", this.$route.params);
  },
  methods: {
    async addQuantity(value, id, fixedPrice, price, quantity) {
      if (value === +1) {
        if (quantity >= 0) {
          this.productQuantity += value;
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
      let data = [];
      if (this.$route.params.id != undefined) {
        let post = {
          productId: this.$route.params.id,
        };
        let response = await axios.post(
          "http://localhost:4000/api/cart/get_product",
          post
        );
        if (response.data != "") {
          data.push(response.data);
        }
        this.cart = data;
      }
      if (this.$route.params.id === undefined) {
        let response = await axios.get("http://localhost:4000/api/cart/cart");
        this.cart = response.data;
      }

      console.log("printing getCart response", this.cart);
      if (this.cart.length === 0) {
        this.$router.push({
          path: "/",
        });
      }
      this.getTotalAmount();
    },
    getTotalAmount() {
      let total = 0;
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].price;
      }
      this.totalAmount = total;
    },
    getUsers(event) {
      this.userAddress = event;
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
.icon {
  width: 21%;
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
  font-size: 15px;
}
.rupee{
  display: flex;
    justify-content: center;
    font-size: 15px;
    align-items: center;
    }
.rupeeIcon2 {
  width:   7%;
}
.btns {
  margin-top: 2%;
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
.remove {
  width: 7%;
}
.removeIcon {
  width: 100%;
  height: 100%;
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
span {
  display: flex;
  justify-content: center;
  align-items: center;
}
.rupeeIcon {
  width:   14%;
}
.totalAmount {
  font-size: 15px;
  font-family: helvetica;
  display: flex;
    justify-content: center;
}
</style>
