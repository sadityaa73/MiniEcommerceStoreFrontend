<template>
  <div class="mainContainer">
    <reset />
  </div>
</template>
<script>
import reset from "../userAuth/reset.vue";

export default {
  name: "Home",
  components: {
    reset,
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
