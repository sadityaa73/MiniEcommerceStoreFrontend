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
    <div class="homeDeals">
      <div class="deals">
        <div class="productImg">
          <img src="" alt="product" class="product" />
        </div>
        <h6 class="productInfo_name">name</h6>
        <h6 class="productInfo_price">price and discount</h6>
        <!-- <h6 class="productInfo_rating">rating</h6> -->
      </div>
    </div>
    <div class="groceryDeals">
      <div class="deals">
        <div class="productImg">
          <img src="" alt="product" class="product" />
        </div>
        <h6 class="productInfo_name">name</h6>
        <h6 class="productInfo_price">price and discount</h6>
        <!-- <h6 class="productInfo_rating">rating</h6> -->
      </div>
    </div>
    <div class="studyDeals">
      <div class="deals">
        <div class="productImg">
          <img src="" alt="product" class="product" />
        </div>
        <h6 class="productInfo_name">name</h6>
        <h6 class="productInfo_price">price and discount</h6>
        <!-- <h6 class="productInfo_rating">rating</h6> -->
      </div>
    </div>
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
  border: 1px solid black;
  width: 98%;
  height: 100vh;
  margin: 1%;
  overflow: auto;
}
.OcassionalDeals {
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
}
.homeDeals {
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
}
.groceryDeals {
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
}
.studyDeals {
  width: 100%;
  height: 35%;
  display: flex;
  align-items: center;
}

.deals {
  display: flex;
  flex-direction: column;
  /* border: 1px solid black; */
  width: 22%;
  height: 95%;
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
