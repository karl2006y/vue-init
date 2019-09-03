<script>
export default {
  name: "fix",
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      loading: true,
      deviceIsNotFixedList: [],
      currentTouch: {},
      show: false,
      maintenance: {
        time: new Date(),
        name: ""
      }
    };
  },
  created() {
    this.getDeviceIsNotFixedList();
  },
  filters: {
    timeFormat(val) {
      return new Date(val).toLocaleString();
    }
  },
  methods: {
    fixedHandler(item) {
      console.log(item);
      this.currentTouch = item;
      this.show = true;
    },
    sendFixDataHandler() {
      this.loading = true;
      var CT = new Date(this.maintenance.time);
      var yyyy = CT.getFullYear(); //年
      var MM = ("0" + (CT.getMonth() + 1).toString()).substr(-2);
      var dd = ("0" + CT.getDate().toString()).substr(-2);
      var HH = ("0" + CT.getHours().toString()).substr(-2);
      var mm = ("0" + CT.getMinutes().toString()).substr(-2);
      var ss = ("0" + CT.getSeconds().toString()).substr(-2);
      var FCT =
        yyyy + "-" + MM + "-" + dd + "T" + HH + ":" + mm + ":" + ss + "+08:00";

      const form = new FormData();
      form.append("MaintenanceTime", FCT);
      form.append("MaintenanceName", this.maintenance.name);
      let URL = this.apiUrl + "api/Maintenances/Check/" + this.currentTouch.id;
      this.axios.put(URL, form).then(response => {
        this.$router.go(0);
      });
    },
    getDeviceIsNotFixedList() {
      const URL = this.apiUrl + "api/Maintenances";
      this.axios.get(URL).then(response => {
        this.deviceIsNotFixedList = response.data;
        this.loading = false;
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
