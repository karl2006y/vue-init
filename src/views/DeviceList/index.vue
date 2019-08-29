<script>
import machinesmap from "./components/MachinesMap/index";
export default {
  name: "deviceList",
  components: {
    machinesmap
  },
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      mList: []
    };
  },
  filters: {
    deviceType(val) {
      if (val == "cardReader") {
        return "讀卡機";
      } else if (val == "button") {
        return "緊急按鈕";
      } else if (val == "camera") {
        return "人臉辨識";
      } else {
        return "錯誤";
      }
    }
  },
  created() {
    this.getDevices();
  },
  methods: {
    getDevices() {
      const URL = this.apiUrl + "api/Devices";
      this.axios.get(URL).then(response => {
        this.mList = response.data;
      });
    },
    tableRowClassName({ row, rowIndex }) {
      console.log(row);
      if (row.status == "success") {
        return "";
      } else {
        return row.status + "-row";
      }
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" ></style>
