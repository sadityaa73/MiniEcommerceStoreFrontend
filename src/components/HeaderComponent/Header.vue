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
        <input type="search" placeholder="search" class="searchInput" />
      </div>
      <div class="searchImage">
        <img src="../../assets/search.png" alt="search" class="searchIcon" />
      </div>
    </div>
    <div class="items3" @click="login">
      <div class="signIn">
        <img src="../../assets/signin.png" alt="signIn" class="signInImage" />
      </div>
    </div>
    <div class="items4">
      <div class="orders">
        <img src="../../assets/orders.png" alt="orders" class="ordersImage" />
      </div>
    </div>
    <div class="items5">
      <div class="cart">
        <img src="../../assets/cart.png" alt="carts" class="cartsImage" />
      </div>
    </div>
    <div class="items6">
      <div class="admin">
        <img src="../../assets/admin.png" alt="admin" class="adminImage" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  components: {},
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.push({
        path: "/login",
      });
    },
    home() {
      this.$router.push({
        path: "/",
      });
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
</style>
