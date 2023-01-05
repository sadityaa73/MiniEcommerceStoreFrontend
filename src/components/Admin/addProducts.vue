<template>
  <div class="loginContainer">
    <Header />
    <div class="dynamicContainer">
      <div class="inputContainer">
        <input
          type="text"
          class="inputBox"
          placeholder="name of product"
          v-model="name"
        />
        <input
          type="text"
          class="inputBox"
          placeholder="price of product"
          v-model="price"
        />
        <input
          type="text"
          class="inputBox"
          placeholder="category"
          v-model="category"
        />
        <input
          type="file"
          class=""
          placeholder="image of product"
          @change="onSelect"
        />
        <div class="buttonContainer" @click="addproduct">
          <button class="login">add product</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Header from "../HeaderComponent/Header.vue";
export default {
  name: "login",
  components: { Header },
  data() {
    return {
      name: "",
      price: "",
      category: "",
      image: "",
    };
  },
  methods: {
    showPassword() {
      var pass = document.getElementById("password");
      if (pass.type === "password") {
        pass.type = "text";
      } else {
        pass.type = "password";
      }
    },
    onSelect(e) {
      let select = e.target.files[0];
      this.image = select;
    },
    async addproduct() {
      let form = new FormData();
      form.append("name", this.name);
      form.append("price", this.price);
      form.append("category", this.category);
      form.append("file", this.image);

      let response = await axios.post(
        "http://localhost:4000/api/product/product",
        form
      );
      let data = response.data;
    },
  },
};
</script>
<style scoped>
.loginContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #d6dcec;
}
.dynamicContainer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid; */
  width: 40%;
  height: 50%;
  border-radius: 20px;
  margin-top: 10%;
  overflow: hidden;
}
.dynamicContainer::before {
  content: "";
  border: 1px dotted;
  position: absolute;
  width: 0%;
  height: 444px;
  background-image: linear-gradient(red, green);
}
.dynamicContainer:hover::before {
  content: "";
  border: 1px dotted;
  position: absolute;
  width: 40%;
  height: 250%;
  background-image: linear-gradient(red, green);
  animation: rotate 3.5s linear infinite;
  box-shadow: 0px 14px 36px 11px grey;
}
.dynamicContainer:hover {
  box-shadow: 0px 14px 36px 11px grey;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.inputContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 98%;
  z-index: 10;
  height: 98%;
  border-radius: 20px;
  background: whitesmoke;
}
.inputBox {
  width: 70%;
  height: 10%;
  border-radius: 5px;
  margin-bottom: 3%;
  border: 1px solid black;
}
.inputBox:hover {
  box-shadow: 0px 3px 4px 1px #dfa93d;
  border: none;
}
.buttonContainer {
  width: 35%;
  height: 11%;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3%;
  overflow: hidden;
}
.login {
  width: 70%;
  height: 70%;
  border-radius: 5px;
  transition: all 0.2s linear;
  border: 1px solid black;
  font-size: 16px;
  font-family: helvetica;
}
.login:hover {
  width: 95%;
  height: 95%;
  color: black;
  font-size: 18px;
  font-family: helvetica;
  background: #ffde3ade;
  border: none;
  box-shadow: 0px 12px 29px 0px grey;
}
.login:active {
  color: white;
  background: green;
  transition: all -1s linear;
}
.formLink {
  display: flex;
  justify-content: space-around;
  width: 60%;
  font-size: 16px;
  font-family: helvetica;
  margin-top: 1%;
}
.forms {
  margin: 0px;
}
</style>
