<template>
  <div class="LandinContainer">
    <Header />
    <product />
  </div>
</template>
<script>
import Header from "../HeaderComponent/Header.vue";
import product from "../productPage/product.vue";
export default {
  name: "Landing",
  components: { Header, product },
  data() {
    return {};
  },
};
</script>
<style scoped>
.LandinContainer {
  width: 100%;
  height: 100vh;
  background: #d6dcec;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
