<template>
  <div class="payment-container">
    <Header />
    <div class="form-container">
      <div id="form-element">
        <label for="name">Name</label>
        <input
          type="text"
          placeholder="name"
          v-model="name"
          class="input-box"
        />
      </div>
      <div id="form-element">
        <label for="email">Email</label>
        <input
          type="text"
          placeholder="email"
          v-model="email"
          class="input-box"
        />
      </div>
      <div id="form-element">
        <label for="city">City</label>
        <input
          type="text"
          placeholder="city"
          v-model="city"
          class="input-box"
        />
      </div>
      <div id="form-element">
        <label for="state">State</label>
        <input
          type="text"
          placeholder="state"
          v-model="state"
          class="input-box"
        />
      </div>
      <div id="form-element">
        <label for="address">Address</label>
        <input
          type="text"
          placeholder="address"
          v-model="address"
          class="input-box"
        />
      </div>
      <div id="form-element">
        <label for="zip">Zip</label>
        <input type="text" placeholder="zip" v-model="zip" class="input-box" />
      </div>
      <div id="form-element">
        <label for="card">Card</label>
        <div id="card-elements" class="card"></div>
      </div>
      <div class="btn-container">
        <button class="btn" @click="submit">
          {{ "Pay" + " " + displayAmount }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Header from "../HeaderComponent/Header.vue";
export default {
  name: "payment",
  components: { Header },
  data() {
    return {
      publicKey: process.env.VUE_APP_PUBLIC_KEY,
      stripe: null,
      elements: null,
      name: "",
      email: "",
      city: "",
      state: "",
      address: "",
      zip: "",
      cart: [],
      displayAmount: "",
      totalAmount: "",
    };
  },
  created() {
    const local_storage = JSON.parse(localStorage.getItem("store"));
    console.log("printing loaclStorage", local_storage);
    this.cart = local_storage.cart.checkoutItems;
    this.getTotalAmount();
  },
  mounted() {
    debugger;
    this.stripe = Stripe(process.env.VUE_APP_PUBLIC_KEY);
    this.elements = this.stripe.elements();
    const elements = this.elements.create("card");
    elements.mount("#card-elements");
  },
  methods: {
    async submit() {
      debugger;
      const billingDetails = {
        name: this.name,
        email: this.email,
        address: {
          city: this.city,
          line1: this.address,
          state: this.state,
          postal_code: this.zip,
        },
      };
      const cardElement = this.elements.getElement("card");
      let post = {
        amount: this.totalAmount,
      };
      try {
        let response = await axios.post(
          "http://localhost:4000/api/payment/checkout_payment",
          post
        );
        let secret = response.data;
        let client_secret = secret.clientSecret;

        //createing a payment request:

        const paymentRequest = await this.stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: billingDetails,
        });
        //creating confirm Payment request:

        const confirmpayment = await this.stripe.confirmCardPayment(
          client_secret,
          {
            payment_method: paymentRequest.paymentMethod.id,
          }
        );
        if (confirmpayment) {
          this.orderPlaced();
          //creating sucess route
          this.$router.push({
            path: "/order",
          });
        }
      } catch (err) {
        console.log("printing error", err);
      }
    },
    getTotalAmount() {
      debugger;
      let total = 0;
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].price;
      }
      this.displayAmount = total;
      this.totalAmount = Math.round(total.toFixed(2) * 100);
      // this.displayAmount = Number.parseFloat(this.totalAmount);
      console.log("printing amount ", typeof this.totalAmount);
    },
    async orderPlaced() {
      let post = {};
      for (let i = 0; i < this.cart.length; i++) {
        post = {
          image: this.cart[i].image,
          product: this.cart[i].name,
          quantity: this.cart[i].quantity,
          price: this.cart[i].price,
        };
        let response = await axios.post(
          "http://localhost:4000/api/placeOrder/placeOrder",
          post
        );
      }
    },
  },
};
</script>
<style scoped>
.payment-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid;
  width: 100%;
  height: 100vh;
}
.form-container {
  border: 1px solid;
  margin-top: 3%;
  border-radius: 5px;
  width: 55%;
  height: 81%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
#form-element {
  border: 1px solid;
  width: 70%;
  height: 8%;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
}
.input-box {
  width: 95%;
  height: 39%;
  border: none;
  background: whitesmoke;
  text-align: center;
}
.btn-container {
  width: 33%;
  height: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-top: 3%;
}
.btn {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid;
  font-size: 18px;
  font-family: helvetica;
}
.btn:active {
  background: #ffde3ade;
}
#card-elements {
  width: 95%;
  height: 39%;
  border: none;
  background: whitesmoke;
  text-align: center;
}
</style>
