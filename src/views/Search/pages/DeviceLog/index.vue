<script>
export default {
  name: "deviceLog",
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      loading: "first",
      devicesList: [],
      chooseDevice: "",
      deviceLog: [],
      deviceLogTime: "",
      successPercentInLogs: 0,
      warningPercentInLogs: 0,
      dangerPercentInLogs: 0,
      deviceLastDayLog: {}
    };
  },
  created() {
    this.getDevices();
  },
  watch: {
    deviceLogTime(val) {
      this.deviceLog = [];
      if (val != "") {
        this.getDeviceLog();
      }
    },
    chooseDevice() {
      this.deviceLog = [];
      if (val != "") {
        this.getDeviceLog();
      }
    }
  },
  filters: {
    deviceStatussColor(val) {
      if (val == "success") {
        return "#67c23a";
      } else if (val == "warning") {
        return "#dbb400";
      } else if (val == "danger") {
        return "#fd5354";
      } else {
        return "";
      }
    },
    deviceTypeIcon(val) {
      if (val == "cardReader") {
        return "el-icon-bank-card";
      } else if (val == "button") {
        return "el-icon-thumb";
      } else if (val == "camera") {
        return "el-icon-video-camera-solid";
      } else {
        return "錯誤";
      }
    },
    deviceStatus(val) {
      if (val == "success") {
        return "正常運作";
      } else if (val == "warning") {
        return "待維修/保養";
      } else if (val == "danger") {
        return "設備異常";
      } else {
        return "錯誤";
      }
    },
    timeFormat(val) {
      return new Date(val).toLocaleString();
    }
  },
  computed: {
    statusTimePercent() {
      let deviceLogs = this.deviceLog.sort(
        (a, b) =>
          new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime()
      );
      const len = deviceLogs.length;
      let logs = [];

      logs.push({
        long:
          new Date(deviceLogs[0].createdTime).getTime() -
          new Date(new Date(this.deviceLogTime).toLocaleDateString()).getTime(),
        status: this.deviceLastDayLog.status
      });

      for (let i = 0; i < len - 1; i++) {
        deviceLogs[i].long =
          new Date(deviceLogs[i + 1].createdTime).getTime() -
          new Date(deviceLogs[i].createdTime).getTime();
        logs.push(deviceLogs[i]);
      }
      deviceLogs[len - 1].long =
        new Date(new Date(this.deviceLogTime).toLocaleDateString()).getTime() -
        new Date(deviceLogs[len - 1].createdTime).getTime() +
        24 * 60 * 60 * 1000;
      logs.push(deviceLogs[len - 1]);

      return logs;
    }
  },
  methods: {
    statusPercentInLogs(itemStatus) {
      let num = 0;
      let all = 0;
      this.statusTimePercent.forEach(item => {
        all += Number(item.long);
        if (item.status == itemStatus) {
          num += Number(item.long);
        }
      });
      return Math.round((num / all) * 100);
    },

    getDevices() {
      this.devicesList = [];
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
          this.devicesList.push({
            value: item.id,
            label: item.mId + "-" + type
          });
        });
      });
    },
    getDeviceLog() {
      this.successPercentInLogs = 0;
      this.warningPercentInLogs = 0;
      this.dangerPercentInLogs = 0;
      this.deviceLog = [];
      this.loading = true;
      const URL = this.apiUrl + "api/DeviceLogs/" + this.chooseDevice;
      this.axios.get(URL).then(response => {
        response.data.forEach(item => {
          if (
            new Date(item.createdTime).toLocaleDateString() ==
            new Date(
              new Date(this.deviceLogTime).getTime() - 24 * 60 * 60 * 1000
            ).toLocaleDateString()
          ) {
            this.deviceLog.push(item);
          }
        });
        let deviceLogs = this.deviceLog.sort(
          (a, b) =>
            new Date(a.createdTime).getTime() -
            new Date(b.createdTime).getTime()
        );
        this.deviceLog = [];
        if (deviceLogs.length != 0) {
          this.deviceLastDayLog = deviceLogs[deviceLogs.length - 1];
        }
        response.data.forEach(item => {
          if (
            new Date(item.createdTime).toLocaleDateString() ==
            new Date(this.deviceLogTime).toLocaleDateString()
          ) {
            this.deviceLog.push(item);
          }
        });
        if (this.deviceLog.length != 0) {
          setTimeout(() => {
            this.successPercentInLogs = this.statusPercentInLogs("success");
            this.warningPercentInLogs = this.statusPercentInLogs("warning");
            this.dangerPercentInLogs = this.statusPercentInLogs("danger");
          }, 100);
        }

        this.loading = false;
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
