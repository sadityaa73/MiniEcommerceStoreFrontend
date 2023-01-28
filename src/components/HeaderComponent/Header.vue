<template>
  <div class="header">
    <div class="items1" @click="home">
      <img src="" alt="logo" class="logo" />
    </div>
    <div class="items2">
      <div class="searchImage">
        <img
          src="../../assets/categories.png"
          alt="search"
          class="searchIcon"
        />
      </div>
      <div class="search">
        <input
          type="search"
          placeholder="search"
          class="searchInput"
          v-model="searchText"
        />
        <div class="searchResponse" v-if="searchResult.length > 0 && text != 0">
          <ul
            class="serachResult"
            v-for="(response, index) in searchResponse"
            :key="index"
          >
            <li>{{ response.name }}</li>
            <hr />
          </ul>
        </div>
      </div>
    </div>
    <div class="items3" @click="dropdown">
      <div class="signIn">
        <img src="../../assets/signin.png" alt="signIn" class="signInImage" />
      </div>
      <div class="dropdown" v-if="active">
        <ul class="menu">
          <li class="list" v-if="logStatus" @click="logout">logout</li>
          <li class="list" v-if="!logStatus" @click="login">login</li>
          <li class="list">settings</li>
        </ul>
      </div>
    </div>
    <div class="items4" @click="orders">
      <div class="orders">
        <img src="../../assets/orders.png" alt="orders" class="ordersImage" />
      </div>
    </div>
    <div class="items5" @click="cart">
      <div class="cart">
        <img src="../../assets/cart.png" alt="carts" class="cartsImage" />
      </div>
    </div>
    <div class="items6" @click="admin">
      <div class="admin">
        <img src="../../assets/admin.png" alt="admin" class="adminImage" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Header",
  components: {},
  data() {
    return {
      active: false,
      logStatus: false,
      searchText: "",
      searchResult: "",
      text: "",
      searchResponse: "",
    };
  },
  watch: {
    searchText(newVal, oldVal) {
      this.text = newVal;
      this.getResultByFilter(this.searchResult);
    },
  },
  created() {
    this.getDataFromLocalStorage();
    this.loadAllProductToTheStore();
  },
  methods: {
    getDataFromLocalStorage() {
      let loaclStorage = JSON.parse(localStorage.getItem("store"));
      this.logStatus = loaclStorage.login.loginStatus;
    },
    loadAllProductToTheStore() {
      this.$store.dispatch("getAllProducts");
      let getAllProducts = JSON.parse(localStorage.getItem("store"));
      this.searchResult = getAllProducts.product.allProducts;
    },
    dropdown() {
      this.active = !this.active;
    },
    login() {
      this.$router.push({
        path: "/login",
      });
    },
    logout() {
      this.$store.dispatch("getLoginStatus", false);
      this.$router.push({ path: "/" }).catch((err) => {});
    },
    home() {
      this.$router
        .push({
          path: "/",
        })
        .catch((err) => {});
    },
    admin() {
      this.$router.push({
        path: "/adminstrator",
      });
    },
    cart() {
      this.$router.push({
        path: "/cart",
      });
    },
    orders() {
      this.$router.push({
        path: "/order",
      });
    },
    getResultByFilter(array) {
      let result = array.filter((array) => array.name.includes(this.text));
      this.searchResponse = result;
    },
  },
};
</script>
<style scoped>
.header {
  justify-content: space-evenly;
  display: flex;
  align-items: center;
  border: 1px solid black;
  position: sticky;
  width: 98%;
  height: 7%;
  background: #ffde3ade;
  border-radius: 6px;
}
.items2 {
  border: 1px solid;
  width: 45%;
  height: 80%;
  display: flex;
  justify-content: space-evenly;
  background: whitesmoke;
  border-radius: 5px;
  align-items: center;
}
.items2:hover {
  border: none;
  box-shadow: 0px 4px 21px 3px black;
}
.search {
  border: 1px solid red;
  width: 84%;
  height: 85%;
  overflow: hidden;
}
.searchInput {
  width: 100%;
  height: 100%;
  border: none;
}
.searchResponse {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border: none;
  height: auto;
  max-height: 295px;
  width: 37%;
  margin-top: 1%;
  background: #f5f5f5b5;
  border-radius: 3px;
  box-shadow: 0px 0px 10px 0px grey;
  overflow: auto;
}
.serachResult {
  list-style: none;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 95%;
  font-size: 20px;
  font-family: helvetica;
}
hr {
  border: 1px solid;
  width: 100%;
}
.searchIcon {
  width: 80%;
  height: 100%;
}
.searchImage {
  width: 8%;
  height: 84%;
  border: 1px solid;
  /* border-radius: 0px 4px 0px 0px; */
  background-color: whitesmoke;
}
.items3 {
  border: 1px solid;
  width: 4%;
  height: 80%;
  display: flex;
  justify-content: space-evenly;
  background: whitesmoke;
  border-radius: 5px;
  align-items: center;
}
.items3:hover {
  border: none;
  box-shadow: 0px 4px 21px 3px black;
}
.signIn {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background-color: whitesmoke;
}
.signInImage {
  width: 80%;
  height: 100%;
}
.dropdown {
  position: absolute;
  top: 81%;
  background: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 14%;
}
.menu {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  width: 95%;
}
.list {
  font-size: 22px;
  font-family: helvetica;
  margin: 3%;
  width: 95%;
}
.list:hover {
  background: #ffde3ade;
}
.list:active {
  background: #2ede6cde;
}
.items4 {
  border: 1px solid;
  width: 4%;
  height: 80%;
  display: flex;
  justify-content: space-evenly;
  background: whitesmoke;
  border-radius: 5px;
  align-items: center;
}
.items4:hover {
  border: none;
  box-shadow: 0px 4px 21px 3px black;
}
.orders {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background-color: whitesmoke;
}
.ordersImage {
  width: 80%;
  height: 100%;
}
.items5 {
  border: 1px solid;
  width: 4%;
  height: 80%;
  display: flex;
  justify-content: space-evenly;
  background: whitesmoke;
  border-radius: 5px;
  align-items: center;
}
.items5:hover {
  border: none;
  box-shadow: 0px 4px 21px 3px black;
}
.cart {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background-color: whitesmoke;
}
.cartsImage {
  width: 80%;
  height: 100%;
}
.items6 {
  border: 1px solid;
  width: 4%;
  height: 80%;
  display: flex;
  justify-content: space-evenly;
  background: whitesmoke;
  border-radius: 5px;
  align-items: center;
}
.items6:hover {
  border: none;
  box-shadow: 0px 4px 21px 3px black;
}
.admin {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  background-color: whitesmoke;
}
.adminImage {
  width: 80%;
  height: 100%;
}
@media (max-width: 667px) {
  .dropdown {
    position: absolute;
    top: 81%;
    background: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    width: 18%;
  }
}
@media (max-width: 667px) {
  .dropdown {
    position: absolute;
    top: 81%;
    background: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    width: 25%;
  }
}
</style>
