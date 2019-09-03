<script>
export default {
  name: "passLogPerson",
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      loading: true,
      staffList: [],
      startLogTime: "",
      endLogTime: "",
      chooseStaff: "",
      staffLogList: []
    };
  },
  created() {
    this.getStaffList();
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
    },
    deviceStatus(val) {
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
    getStaffList() {
      this.loading = true;
      const URL = this.apiUrl + "api/Staffs";
      this.axios.get(URL).then(response => {
        response.data.forEach(item => {
          this.staffList.push({
            value: item.id,
            label: item.department + "-" + item.name
          });
        });
        this.loading = false;
      });
    },
    getStaffLog() {
      this.loading = true;
      const form = new FormData();
      form.append("StaffId", this.chooseStaff);
      form.append("Start", this.fomatTime(this.startLogTime));
      form.append("End", this.fomatTime(this.endLogTime));
      const URL = this.apiUrl + "api/PassLogs/Staff";
      this.axios.post(URL, form).then(response => {
        if (response.data.status == "too many") {
          this.staffLogList = "too many";
        } else if (response.data.length == 0) {
          this.staffLogList = "no";
        } else {
          this.staffLogList = response.data;
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
