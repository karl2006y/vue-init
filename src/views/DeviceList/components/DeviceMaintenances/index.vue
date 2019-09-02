<script>
export default {
  name: "deviceMaintenances",
  props: {
    id: Number
  },
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      maintenancesList: []
    };
  },
  methods: {
    getDeviceMaintenances() {
      const URL = this.apiUrl + "api/Maintenances/" + this.id;
      this.axios.get(URL).then(response => {
        console.log(response.data);
        document.querySelector("#actionFlexInDetail").style.flexDirection =
          "column";
        if (response.data == "undefined") {
          this.maintenancesList = "無保養/維修紀錄";
        } else {
          this.maintenancesList = response.data;
        }
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
