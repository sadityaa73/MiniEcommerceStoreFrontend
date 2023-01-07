<template>
  <div class="cart">
    <div class="cartContainer">
      <div class="imageContainer">
        <img src="" alt="" class="image" />
      </div>
      <div class="cartProductInfo">
        <h2 class="info">name</h2>
        <h2 class="info">price</h2>
        <div class="btns">
          <button>remove</button>
          <button>place order</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
.cart {
  border: 1px solid;
  width: 30% !important;
  height: 68%;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background: whitesmoke;
}
.cartContainer {
  display: flex;
  border: 1px solid;
  width: 97% !important;
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
.info {
  margin: 0px;
}
.btns {
  margin-top: 6%;
  display: flex;

  justify-content: space-evenly;
}
</style>
