<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    // console.log(this.$router.history.current);
    // console.log(this.$route);
    // this.$router.beforeEach((to, from, next) => {
    //   console.log("from", from);
    //   console.log("to", to);
    //   next();
    // });
  }
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
}
</style>
