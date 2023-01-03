<template>
  <div class="loginContainer">
    <div class="inputContainer">
      <div class="box">02</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  components: {},
  data() {
    return {};
  },
  methods: {
    check() {
      var showPassword = document.getElementById("password");
      if (showPassword.type === "password") {
        showPassword.type = "text";
      } else {
        showPassword.type = "password";
      }
    },
  },
};
</script>
<style scoped>
.loginContainer {
  display: flex;
  height: 50%;
  width: 50%;
  justify-content: center;
}
.inputContainer {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 12px;
  width: 60%;
  justify-content: center;
  align-items: center;
}
.inputCred {
  width: 70%;
  height: 10%;
  border-radius: 5px;

  margin-bottom: 14px;
}
.inputCred:hover {
  border-top: 2px solid blue;
  border-bottom: 2px solid blue;
  border-left: 2px solid blue;
  border-right: 2px solid blue;
  box-shadow: 4px 15px 28px 4px #191616a3;
}
.check {
  color: black;
  margin-bottom: 40px;
  font-size: 13px;
  font-family: helvetica;
}
.loginBtnContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 27%;
  height: 9%;
  border-radius: 5px;
  z-index: 1;
}
.login {
  width: 95%;
  height: 93%;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.mobileScreen {
  display: none;
}
@media (max-width: 743px) {
  .mobileScreen {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 12px;
    width: 90%;
    justify-content: center;
    align-items: center;
  }
}
@media (max-width: 472px) {
  .mobileScreen {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 12px;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .check {
    color: black;
    margin-bottom: 40px;
    font-size: 13px;
    font-family: helvetica;
  }
}
.box {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  width: 50%;
  height: 50%;
  overflow: hidden;
  border-radius: 10px;
}
.box h2 {
  position: relative;
  z-index: 10;
}

.box::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid;
  background-image: linear-gradient(red, green);
  animation: rotate-7df64ad4 2s linear infinite;
  border-radius: 20px;
}
.box::after {
  position: absolute;
  content: "";
  background: red;
  border-radius: 10px;
  inset: 4px;
  border-radius: 10px;
}
</style>
