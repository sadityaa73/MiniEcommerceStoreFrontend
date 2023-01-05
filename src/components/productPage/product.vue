<template>
  <div class="productContainer">
    <div class="OcassionalDeals">
      <div class="deals">
        <div class="productImg">
          <img src="" alt="product" class="product" />
        </div>
        <h6 class="productInfo_name">name</h6>
        <h6 class="productInfo_price">price and discount</h6>
        <!-- <h6 class="productInfo_rating">rating</h6> -->
      </div>
    </div>
    <div class="homeDeals"></div>
    <div class="groceryDeals"></div>
    <div class="studyDeals"></div>
  </div>
</template>
<script>
export default {
  name: "product",
  components: {},
  data() {
    return {};
  },
};
</script>
<style scoped>
.productContainer {
  justify-content: center;
  display: flex;
  border: 1px solid black;
  width: 98%;
  height: 100vh;
  margin: 1%;
}
.OcassionalDeals {
  width: 100%;
  border: 1px solid green;
  height: 35%;
  display: flex;
  align-items: center;
}
.deals {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 22%;
  height: 100%;
  align-items: center;
}
.productImg {
  border: 1px solid;
  width: 85%;
  height: 67%;
}
.productInfo_name {
  margin: 0px;
  font-size: 20px;
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
