<template>
  <div class="loginContainer">
    <Header />
    <div class="dynamicContainer">
      <div class="inputContainer">
        <div class="cross" @click="close">
          <img src="../../assets/close.png" alt="close" class="close" />
        </div>
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

        <span class="spanClass"
          ><input type="checkBox" class="checkBox" @click="showPassword" />
          ShowPassword</span
        >
        <div class="buttonContainer">
          <button class="login" @click="reset">reset</button>
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
      username: "",
      password: "",
      matchPassword: "",
    };
  },
  methods: {
    showPassword() {
      var pass = document.getElementById("password");
      var newPass = document.getElementById("newPassword");
      if (pass.type === "password" || newPass.type === "password") {
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
    async reset() {
      if (this.password === this.matchPassword) {
        let username = this.username;
        let post = {
          password: this.password,
        };
        let response = await axios.patch(
          `http://localhost:4000/api/signup/reset/${username}`,
          post
        );
        let data = response.data;
        this.$router.push({ path: "/login" });
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
.cross {
  margin-bottom: 3%;
}
.close {
  width: 4%;
  position: absolute;
  margin-left: 41%;
  z-index: 11;
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
.spanClass {
  margin-top: 4%;
}
@media (max-width: 719px) {
  .buttonContainer {
    width: 45%;
    height: 11%;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
    overflow: hidden;
  }
}
@media (max-width: 401px) {
  .buttonContainer {
    width: 55%;
    height: 11%;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
    overflow: hidden;
  }
}
</style>
