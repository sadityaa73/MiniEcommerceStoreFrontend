<template>
  <div class="mainContainer">
    <login />
  </div>
</template>
<script>
import login from "../userAuth/login.vue";

export default {
  name: "Home",
  components: {
    login,
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.mainContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
</style>
