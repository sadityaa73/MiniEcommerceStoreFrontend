<template>
  <div class="mainContainer">
    <div class="inputContainer">
      <div class="currentAddressContainer">
        <div class="head">Current Address</div>
        <div class="currentAddress">
          <h6>current Address</h6>
          <div class="newAdd" v-if="newAdd">
            <input
              type="text"
              class="newAddress"
              placeholder="enter new address"
              v-model="newAddress"
            />
            <button @click="save">save</button>
          </div>
        </div>
        <div class="btnContainer">
          <button class="change" @click="change">change</button>
          <button class="save" @click="next">next</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "addAddress",
  components: {},
  data() {
    return {
      newAdd: false,
    };
  },
  methods: {
    remove() {},
    change() {
      this.newAdd = true;
    },
    save() {
      this.newAdd = false;
    },
    next() {
      this.$emit("showComponent", true);
    },
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
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: whitesmoke;
  box-shadow: 0px 4px 5px 3px #0000007d;
}
.currentAddressContainer {
  border: 1px solid;
  width: 70%;
  height: 50%;
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
  height: 50%;
  margin-top: 2%;
}
.newAdd {
  display: flex;
  justify-content: space-evenly;
}
.newAddress {
  width: 70%;
}
.btnContainer {
  width: 70%;
  margin-top: 2%;
  height: 18%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.change {
  width: 25%;
  height: 69%;
  border-radius: 5px;
  border: 1px solid;
  font-size: 15px;
  font-family: helvetica;
  transition: all 0.6s linear;
}
.change:hover {
  width: 28%;
  height: 75%;
  background: #ffde3ade;
  box-shadow: 0px 5px 10px 0px #000000bd;
}
.save {
  width: 25%;
  height: 69%;
  border-radius: 5px;
  border: 1px solid;
  font-size: 15px;
  font-family: helvetica;
  transition: all 0.6s linear;
}
.save:hover {
  width: 28%;
  height: 75%;
  background: #ffde3ade;
  box-shadow: 0px 5px 10px 0px #000000bd;
}
</style>
