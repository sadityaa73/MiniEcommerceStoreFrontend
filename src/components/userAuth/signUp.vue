<template>
  <div class="loginContainer">
    <Header />
    <div class="dynamicContainer">
      <div class="inputContainer">
        <div class="cross" @click="close">
          <img src="../../assets/close.png" alt="close" class="close" />
        </div>
        <div class="innerInput">
          <input
            type="text"
            class="inputBox"
            placeholder="Firstname"
            v-model="firstname"
          />
          <input
            type="text"
            class="inputBox"
            placeholder="Lastname"
            v-model="lastname"
          />
          <input
            type="text"
            class="inputBox"
            placeholder="Mobile"
            v-model="mobile"
          />
          <!-- <input type="text" class="inputBox" placeholder="Address" /> -->
          <input
            type="text"
            class="inputBox"
            placeholder="username"
            v-model="username"
          />
          <input
            type="password"
            class="inputBox"
            id="password"
            placeholder="password"
            v-model="password"
          />

          <input
            type="password"
            class="inputBox"
            id="newPassword"
            placeholder="Re-Enter Password"
            v-model="matchPassword"
          />
        </div>
        <span
          ><input type="checkBox" class="checkBox" @click="showPassword" />
          ShowPassword</span
        >
        <div class="buttonContainer">
          <button class="login" @click="signup">signup</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../HeaderComponent/Header.vue";
import axios from "axios";
export default {
  name: "login",
  components: { Header },
  data() {
    return {
      firstname: "",
      lastname: "",
      mobile: "",
      username: "",
      passowrd: "",
      matchPassword: "",
    };
  },
  methods: {
    showPassword() {
      var pass = document.getElementById("password");
      var newPass = document.getElementById("newPassword");
      if (pass.type === "password" || newPass === "password") {
        pass.type = "text";
        newPass.type = "text";
      } else {
        pass.type = "password";
        newPass.type = "password";
      }
    },
    close() {
      this.$router.push({ path: "/login" });
    },
    async signup() {
      if (this.password === this.matchPassword) {
        let post = {
          firstname: this.firstname,
          lastname: this.lastname,
          mobile: this.mobile,
          username: this.username,
          password: this.password,
        };
        let response = await axios.post(
          "http://localhost:4000/api/signup/signup",
          post
        );
        this.$router.push({
          path: "/login",
        });
      } else {
        return;
      }
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
.close {
  width: 3%;
  position: absolute;
  margin-left: 38.5%;
}
.dynamicContainer {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid; */
  width: 45%;
  height: 71%;
  border-radius: 20px;
  margin-top: 5%;
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
.innerInput {
  width: 90%;
  height: 81%;
  overflow: auto;
}
.inputBox {
  width: 85%;
  height: 10%;
  border-radius: 5px;
  margin-top: 3%;
  border: 1px solid black;
}
.inputBox:hover {
  box-shadow: 0px 3px 4px 1px #dfa93d;
  border: none;
}
.buttonContainer {
  width: 25%;
  height: 11%;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
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
