<template>
  <div class="productContainer">
    <div class="banners">
      <img src="../../assets/banner1.jpg" alt="" class="ban" />
    </div>

    <div class="OcassionalDeals">
      <div
        class="deals"
        v-for="(OcassionalDeals, index) in OcassionalDeals"
        :key="index"
        @click="viewProduct(OcassionalDeals._id)"
      >
        <div class="productImg">
          <img :src="OcassionalDeals.image" alt="product" class="product" />
        </div>
        <h6 class="productInfo_name">{{ OcassionalDeals.name }}</h6>
        <h6 class="productInfo_price">
          <span
            ><img
              src="../../assets/rupee.png"
              alt="rupee"
              class="rupeeIcon"
            />{{ OcassionalDeals.price }}</span
          >
        </h6>
        <!-- <h6 class="productInfo_rating">rating</h6> -->
      </div>
    </div>
    <div class="homeDeals">
      <div
        class="deals"
        v-for="(homeDeals, index) in homeDeals"
        :key="index"
        @click="viewProduct(homeDeals._id)"
      >
        <div class="productImg">
          <img :src="homeDeals.image" alt="product" class="product" />
        </div>
        <h6 class="productInfo_name">{{ homeDeals.name }}</h6>
        <h6 class="productInfo_price">
          <span
            ><img
              src="../../assets/rupee.png"
              alt="rupee"
              class="rupeeIcon"
            />{{ homeDeals.price }}</span
          >
        </h6>
        <!-- <h6 class="productInfo_rating">rating</h6> -->
      </div>
    </div>
    <div class="groceryDeals">
      <div
        class="deals"
        v-for="(groceryDeals, index) in groceryDeals"
        :key="index"
        @click="viewProduct(groceryDeals._id)"
      >
        <div class="productImg">
          <img :src="groceryDeals.image" alt="product" class="product" />
        </div>
        <h6 class="productInfo_name">{{ groceryDeals.name }}</h6>
        <h6 class="productInfo_price">
          <span
            ><img
              src="../../assets/rupee.png"
              alt="rupee"
              class="rupeeIcon"
            />{{ groceryDeals.price }}</span
          >
        </h6>
        <!-- <h6 class="productInfo_rating">rating</h6> -->
      </div>
    </div>
    <div class="studyDeals">
      <div
        class="deals"
        v-for="(studyDeals, index) in studyDeals"
        :key="index"
        @click="viewProduct(studyDeals._id)"
      >
        <div class="productImg">
          <img :src="studyDeals.image" alt="product" class="product" />
        </div>
        <h6 class="productInfo_name">{{ studyDeals.name }}</h6>
        <h6 class="productInfo_price">
          <span
            ><img
              src="../../assets/rupee.png"
              alt="rupee"
              class="rupeeIcon"
            />{{ studyDeals.price }}</span
          >
        </h6>
        <!-- <h6 class="productInfo_rating">rating</h6> -->
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  name: "product",
  components: {},
  data() {
    return {
      OcassionalDeals: [],
      homeDeals: [],
      groceryDeals: [],
      studyDeals: [],
      searchResult: "",
    };
  },
  computed: { ...mapGetters(["getStatus"]) },
  created() {
    this.getProducts();
    this.getsearchResult();
  },
  methods: {
    async getProducts() {
      let OcassionalDeals = "OcassionalDeals";
      let homeDeals = "homeDeals";
      let groceryDeals = "groceryDeals";
      let studyDeals = "studyDeals";
      let firstResponse = await axios.get(
        `http://localhost:4000/api/product/product/${OcassionalDeals}`
      );
      this.OcassionalDeals = firstResponse.data;
      let secondResponse = await axios.get(
        `http://localhost:4000/api/product/product/${homeDeals}`
      );
      this.homeDeals = secondResponse.data;
      let thirdResponse = await axios.get(
        `http://localhost:4000/api/product/product/${groceryDeals}`
      );
      this.groceryDeals = thirdResponse.data;
      let fourthResponse = await axios.get(
        `http://localhost:4000/api/product/product/${studyDeals}`
      );
      this.studyDeals = fourthResponse.data;
    },
    viewProduct(id) {
      console.log(`printing id ${id}`);
      this.$router.push({ path: `/viewProduct/${id}` });
    },
    getsearchResult() {
      let storage = JSON.parse(localStorage.getItem("store"));
      this.searchResult = storage.search.searchResponse;
      console.log("localStorage", this.searchResult);
    },
  },
};
</script>
<style scoped>
.mainContainer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background: #d6dcec;
}
.productContainer {
  border: 1px solid black;
  width: 98%;
  height: 100vh;
  margin: 1%;
  overflow-y: auto;
  overflow-x: hidden;
}

.banners {
  border: 1px solid;
  width: 100%;
  height: 30%;
}
.ban {
  width: 100%;
}
.product {
  width: 100%;
  height: 100%;
}
span {
  display: flex;
  justify-content: center;
  align-items: center;
}
.rupeeIcon {
  width: 10%;
}
.OcassionalDeals {
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: auto;
  overflow-y: hidden;
}
.searchDeals {
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: auto;
  overflow-y: hidden;
}
.homeDeals {
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: auto;
  overflow-y: hidden;
}
.groceryDeals {
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: auto;
  overflow-y: hidden;
}
.studyDeals {
  width: 100%;
  height: 35%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-x: auto;
  overflow-y: hidden;
}

.deals {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid black; */
  width: 22%;
  height: 90%;
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
  font-size: 15px;
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
