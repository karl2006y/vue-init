<script>
export default {
  name: "passLogDevice",
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      loading: true,
      DeviceList: [],
      startLogTime: "",
      endLogTime: "",
      chooseDevice: "",
      DeviceLogList: []
    };
  },
  created() {
    this.getDeviceList();
  },
  filters: {
    DeviceType(val) {
      if (val == "cardReader") {
        return "讀卡機";
      } else if (val == "button") {
        return "緊急按鈕";
      } else if (val == "camera") {
        return "人臉辨識";
      } else {
        return "錯誤";
      }
    },
    DeviceStatus(val) {
      if (val == "success") {
        return "驗證成功";
      } else if (val == "danger") {
        return "驗證失敗";
      } else {
        return "錯誤";
      }
    },
    timeFormat(val) {
      return new Date(val).toLocaleString();
    }
  },
  methods: {
    fomatTime(time) {
      var CT = new Date(time);
      var yyyy = CT.getFullYear(); //年
      var MM = ("0" + (CT.getMonth() + 1).toString()).substr(-2);
      var dd = ("0" + CT.getDate().toString()).substr(-2);
      var HH = ("0" + CT.getHours().toString()).substr(-2);
      var mm = ("0" + CT.getMinutes().toString()).substr(-2);
      var ss = ("0" + CT.getSeconds().toString()).substr(-2);
      var FCT =
        yyyy + "-" + MM + "-" + dd + "T" + HH + ":" + mm + ":" + ss + "+08:00";
      return FCT;
    },
    getDeviceList() {
      this.loading = true;
      const URL = this.apiUrl + "api/Devices";
      let type = "";
      this.axios.get(URL).then(response => {
        response.data.forEach(item => {
          if (item.type == "cardReader") {
            type = "讀卡機";
          } else if (item.type == "button") {
            type = "緊急按鈕";
          } else if (item.type == "camera") {
            type = "人臉辨識";
          } else {
            type = "錯誤";
          }
          this.DeviceList.push({
            value: item.id,
            label: item.mId + "-" + type
          });
        });
        this.loading = false;
      });
    },
    getDeviceLog() {
      this.loading = true;
      const form = new FormData();
      form.append("DeviceId", this.chooseDevice);
      form.append("Start", this.fomatTime(this.startLogTime));
      form.append("End", this.fomatTime(this.endLogTime));
      const URL = this.apiUrl + "api/PassLogs/Device";
      this.axios.post(URL, form).then(response => {
        if (response.data.status == "too many") {
          this.DeviceLogList = "too many";
        } else if (response.data.length == 0) {
          this.DeviceLogList = "no";
        } else {
          this.DeviceLogList = response.data;
        }
        this.loading = false;
      });
    },
    tableRowClassName({ row, rowIndex }) {
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
<style lang="css" src="./style.css" scoped></style>
