<script>
import machinesmap from "./components/MachinesMap/index";
import devicemaintenances from "./components/DeviceMaintenances/index";
import devicefixform from "./components/DeviceFixForm/index";
import editdevice from "./components/EditDevice/index";
import adddevice from "./components/addDevice/index";
export default {
  name: "deviceList",
  components: {
    machinesmap,
    devicemaintenances,
    devicefixform,
    editdevice,
    adddevice
  },
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      mList: [],
      search: {
        show: false,
        text: ""
      },
      addDevice: {
        show: false
      },
      deviceDetail: {
        data: {},
        show: false
      }
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
    }
  },
  created() {
    this.getDevices();
    if (this.$route.name.indexOf("單台顯示") != -1) {
      const URL = this.apiUrl + "api/Devices/" + this.$route.params.id;
      this.axios.get(URL).then(response => {
        this.deviceDetail.data = response.data;
        this.deviceDetail.show = true;
      });
    }
  },
  watch: {
    "search.show"(val) {
      if (val) {
        setTimeout(() => {
          this.$refs.keywordInput.focus();
        }, 200);
      } else {
        this.search.text = "";
      }
    }
  },
  methods: {
    deleteDevice() {
      this.$confirm("此操作將永久刪除該設備，是否繼續？", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "danger"
      })
        .then(() => {
          const URL = this.apiUrl + "api/Devices/" + this.deviceDetail.data.id;
          console.log(URL);

          this.axios.delete(URL).then(response => {
            this.$message({
              type: "success",
              message: "刪除成功!"
            });
            setTimeout(() => {
              this.$router.go(0);
            }, 500);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    closeDetailDialogHandler(done) {
      document.querySelector("#actionFlexInDetail").style.flexDirection = "row";
      done();
      if (this.$route.name != "資訊列表") {
        this.$router.push({ name: "資訊列表" });
      }
    },
    rowClickHandler(item) {
      this.deviceDetail.show = true;
      this.deviceDetail.data = item;
    },
    searchKeywordHandler(item) {
      let aObj = JSON.parse(JSON.stringify(item));
      aObj.createdTime = new Date(aObj.createdTime)
        .toLocaleString()
        .replace(/:/g, "!!");
      const searchData = JSON.stringify(aObj)
        .replace(/,/g, "")
        .replace(/"/g, "")
        .replace(/:/g, "")
        .replace(/!!/g, ":");
      return searchData.indexOf(this.search.text) != -1;
    },
    getDevices() {
      const URL = this.apiUrl + "api/Devices";
      this.axios.get(URL).then(response => {
        this.mList = response.data;
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
<style lang="css" src="./style.css" ></style>
