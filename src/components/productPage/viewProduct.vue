<template>
  <div class="mainConatiner">
    <Header />
    <div class="innerContainer">
      <div
        class="productContainer"
        v-for="(viewProduct, index) in viewProduct"
        :key="index"
      >
        <div class="productImage">
          <img :src="viewProduct.image" alt="productImage" class="product" />
        </div>
        <div class="productDiscription">
          <p class="infoname">{{ viewProduct.name }}</p>
          <P class="infoprice">{{ viewProduct.price }}</P>
        </div>
        <div class="btn">
          <div class="btnContainer">
            <button class="buyButton">Buy Now</button>
          </div>
          <div class="btnContainer">
            <button
              class="buyButton"
              @click="
                addToCart(
                  viewProduct.image,
                  viewProduct.name,
                  viewProduct.price,
                  viewProduct._id
                )
              "
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div class="offers"></div>
      <div class="cart">
        <div class="head">
          <img src="../../assets/carts.png" alt="cart" class="cartIcon" />
          <h2 class="cartText">cart</h2>
        </div>
        <div class="itemsNotFound" v-if="cart.length === 0">
          <h2 class="itemsnotfound">
            Your cart is empty please add some items here !!
          </h2>
        </div>
        <div class="cartContainer" v-for="(cart, index) in cart" :key="index">
          <div class="imageContainer">
            <img :src="cart.image" alt="items" class="image" />
          </div>
          <div class="cartProductInfo">
            <h2 class="infoname">{{ cart.name }}</h2>
            <h2 class="infoprice">
              {{ cart.price }}
            </h2>
            <div class="btns">
              <button
                class="valueBtns"
                @click="
                  addQuantity(
                    -1,
                    cart.productId,
                    cart.fixedPrice,
                    cart.price,
                    cart.quantity
                  )
                "
              >
                -
              </button>
              <div class="value">{{ cart.quantity + " " + "qty" }}</div>
              <button
                class="valueBtns"
                @click="
                  addQuantity(
                    +1,
                    cart.productId,
                    cart.fixedPrice,
                    cart.price,
                    cart.quantity
                  )
                "
              >
                +
              </button>
              <button class="orderPlace" @click="placeOrder(cart.productId)">
                place order
              </button>
              <button class="remove" @click="remove(cart._id)">
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
    </div>
    <div class="otherProducts">
      <div
        class="OcassionalDeals"
        v-for="(otherProducts, index) in otherProduct"
        :key="index"
        @click="viewProducts(otherProducts._id)"
      >
        <div class="deals">
          <div class="productImg">
            <img :src="otherProducts.image" alt="product" class="product" />
          </div>
          <h6 class="productInfo_name">{{ otherProducts.name }}</h6>
          <h6 class="productInfo_price">{{ otherProducts.price }}</h6>
          <!-- <h6 class="productInfo_rating">rating</h6> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../HeaderComponent/Header.vue";
import axios from "axios";
export default {
  components: { Header },
  data() {
    return {
      viewProduct: [],
      otherProduct: [],
      cart: [],
      productQuantity: 0,
      logStatus: "",
    };
  },
  created() {
    this.getProductInfo();
    this.getCart();
    this.getLogingStatus();
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
          this.getCart();
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
          this.getCart();
          return;
        }
      }
    },
    async getProductInfo() {
      let product_id = this.$route.params.id;
      let response = await axios.get(
        `http://localhost:4000/api/product/products/${product_id}`
      );
      this.viewProduct = response.data;
      console.log("printing viewProductDeatil", this.viewProduct);
      let filter = "OcassionalDeals";
      let response2 = await axios.get(
        `http://localhost:4000/api/product/product/${filter}`
      );
      this.otherProduct = response2.data;
    },
    viewProducts(id) {
      this.$router.push({ path: `/viewProduct/${id}` });
      this.getProductInfo();
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
          price: oldPrice + oldPrice * 1,
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
        fixedPrice: productPrice,
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
    placeOrder(id) {
      if (this.logStatus) {
        this.$router.push({ path: `/placeOrder/${id}` });
      } else {
        this.$router.push({ path: `/login/viewProduct` });
      }
    },
    getLogingStatus() {
      let storage = JSON.parse(localStorage.getItem("store"));
      this.logStatus = storage.login.loginStatus;
    },
  },
};
</script>
<style scoped>
.mainConatiner {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background: #d6dcec;
  height: 100vh;
}
.innerContainer {
  width: 98%;
  height: 64vh;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.productContainer {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34%;
  height: 55vh;
  margin-top: 2%;
  border-radius: 9px;
  background: whitesmoke;
}
.product {
  width: 97%;
  height: 97%;
  border-radius: 5px;
}
.productImage {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4%;
  width: 93%;
  height: 67%;
  border-radius: 8px;
}
.productDiscription {
  border: 1px solid;
  width: 90%;
}
.btn {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  height: 17%;
  margin: 2%;
}
.btnContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 80%;
}
.buyButton {
  width: 78%;
  height: 80%;
  border-radius: 5px;
  font-size: 15px;
  font-family: Helvetica;
  transition: all 0.3s linear;
}
.buyButton:hover {
  background: blue;
  color: black;
  width: 80%;
  height: 85%;
}
.buyButton:active {
  background: #ffde3ade;
  color: black;
}
.offers {
  width: 30%;
  height: 55vh;
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background: whitesmoke;
}
.head {
  border: 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 97%;
  height: 14%;
}
.itemsNotFound {
  width: 97%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: helvetica;
}
.cartIcon {
  width: 15%;
  height: 90%;
}
.cartText {
  font-size: 35px;
  font-family: helvetica;
  margin-left: 3%;
}
.cart {
  width: 30%;
  height: 55vh;
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background: whitesmoke;
  overflow-x: hidden;
  overflow-y: auto;
}
.cartContainer {
  display: flex;
  border: 1px solid;
  width: 97%;
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
.infoname {
  margin: 0px;
  font-size: 17px;
  font-family: helvetica;
}
.infoprice {
  margin: 0px;
  font-size: 17px;
  font-family: helvetica;
}
.btns {
  display: flex;
  justify-content: space-evenly;
  height: 30%;
  margin-top: 3%;
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
.orderPlace {
  display: flex;
  justify-content: center;
  align-items: center;
}
.remove {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
}
.removeIcon {
  width: 100%;
  height: 100%;
}
.otherProducts {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 98%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}
.OcassionalDeals {
  width: 95%;
  height: 91%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.deals {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid black; */
  width: 95%;
  height: 85%;
  align-items: center;
  background: whitesmoke;
  margin: 1%;
  border-radius: 4px;
  box-shadow: 0px 0px 8px 1px black;
}
.productImg {
  border: 1px solid;
  width: 85%;
  height: 67%;
  margin: 2%;
}
.productInfo_name {
  margin: 0px;
  font-size: 12px;
  font-family: helvetica;
}
.productInfo_price {
  margin: 0px;
  font-size: 12px;
  font-family: helvetica;
}
.productInfo_rating {
  margin: 0px;
  font-size: 20px;
  font-family: helvetica;
}
</style>
