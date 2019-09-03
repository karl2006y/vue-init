<script>
export default {
  name: "staffPermission",
  props: {
    staffInfo: Object
  },
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      loading: false,
      show: false,
      devices: {
        choosedList: [],
        allList: []
      }
    };
  },
  created() {
    this.getDevices();
    this.getChoosedList();
  },
  methods: {
    getDevices() {
      this.devices.allList = [];
      const URL = this.apiUrl + "api/Devices";
      this.axios.get(URL).then(response => {
        let type = "";
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
          this.devices.allList.push({
            key: item.id,
            label: item.mId + "-" + type,
            disabled: false
          });
        });
        this.loading = false;
      });
    },
    getChoosedList() {
      this.devices.choosedList = [];
      const URL = this.apiUrl + "api/StaffPermissions/" + this.staffInfo.id;
      this.axios.get(URL).then(response => {
        response.data.forEach(item => {
          this.devices.choosedList.push(item.deviceId);
        });
        this.loading = false;
      });
    },
    sendPermissionForm() {
      this.loading = true;
      const form = new FormData();
      form.append("StaffId", this.staffInfo.id);
      for (let i = 0; i < this.devices.choosedList.length; i++) {
        form.append("DeviceIdList[" + i + "]", this.devices.choosedList[i]);
      }
      if (this.devices.choosedList.length == 0) {
        form.append("DeviceIdList[0]", "0");
      }
      let URL = this.apiUrl + "api/StaffPermissions";
      this.axios.post(URL, form).then(response => {
        if (response.data.status == "add success") {
          this.$message({
            message: "授權成功",
            type: "success"
          });
          this.getDevices();
        }
        console.log();
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
