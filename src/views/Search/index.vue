<script>
import deviceLog from "./pages/DeviceLog/index";
import passogDevice from "./pages/PassLogDevice/index";
import passLogPerson from "./pages/PassLogPerson/index";
export default {
  name: "search",
  components: {
    deviceLog,
    passogDevice,
    passLogPerson
  },
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      activeName: "first",
      loading: true
    };
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
