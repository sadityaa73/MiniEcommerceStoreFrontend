<template>
  <div class="mainContainer">
    <div class="inputContainer">
      <div class="allproducts">
        <div class="cartContainer">
          <div class="imageContainer">
            <img src="" alt="" class="image" />
          </div>
          <div class="cartProductInfo">
            <h2 class="info">name</h2>
            <h2 class="info">price</h2>
            <div class="btns">
              <button @click="remove()">remove</button>
            </div>
          </div>
        </div>
      </div>
      <div class="currentAddressContainer">
        <div class="head">Current Address</div>
        <div class="currentAddress">
          <h6>current Address</h6>
        </div>
      </div>
      <div class="checkout">
        <div class="checkBtn">
          <button class="btn">make payment</button>
        </div>
        <div class="amount">
          <h6 class="totalAmount">amount</h6>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped>
.mainContainer {
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #d6dcec;
}
.inputContainer {
  width: 60%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  background: whitesmoke;
  box-shadow: 0px 4px 5px 3px #0000007d;
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
.currentAddressContainer {
  border: 1px solid;
  width: 70%;
  height: 20%;
  margin-top: 2%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.head {
  border: 1px solid;
  border-radius: 5px;
  width: 100%;
  background: #cff9e3;
  box-shadow: 0px 5px 10px 0px #000000bd;
}
.currentAddress {
  border: 1px solid;
  width: 85%;
  height: 66%;
  margin-top: 2%;
}
.checkout {
  border: 1px solid;
  width: 70%;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 7%;
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
