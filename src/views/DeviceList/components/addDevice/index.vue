<script>
export default {
  name: "addDevice",

  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      show: false,
      currentStep: 0,
      loading: false,
      deviceDetail: {
        data: {
          yearsOfDeviceLife: 50,
          daysOfCycle: 180,
          mapId: 1,
          mId: "",
          macAddress: "",
          type: "cardReader",
          createdTime: new Date(),
          vendor: "",
          vendorContact: "",
          vendorPhone: "",
          full: "",
          x: 0,
          y: 0,
          status: "success"
        }
      },
      mapsList: [],
      map: {
        w: 0,
        h: 0,
        el: []
      },
      addMap: {
        show: undefined,
        name: "",
        Image: "",
        mode: "新增"
      }
    };
  },
  computed: {
    canSend() {
      return (
        this.deviceDetail.data.mId.length != 0 &&
        this.deviceDetail.data.macAddress.length != 0 &&
        this.deviceDetail.data.type.length != 0 &&
        this.deviceDetail.data.vendor.length != 0 &&
        this.deviceDetail.data.vendorContact.length != 0 &&
        this.deviceDetail.data.vendorPhone.length != 0 &&
        this.deviceDetail.data.full.length != 0
      );
    },
    mapImg() {
      const mapId = this.deviceDetail.data.mapId;
      for (let i = 0; i < this.mapsList.length; i++) {
        if (this.mapsList[i].id == mapId) {
          return this.mapsList[i];
        }
      }
    },
    mapImgUrl() {
      const mapId = this.deviceDetail.data.mapId;
      for (let i = 0; i < this.mapsList.length; i++) {
        if (this.mapsList[i].id == mapId) {
          return this.apiUrl + this.mapsList[i].imagePath;
        }
      }
    },
    mapXY() {
      return {
        x:
          "calc(" +
          ((this.map.w * this.deviceDetail.data.x) / 100).toString() +
          "px - 0.4vw)",
        y:
          "calc(" +
          ((this.map.h * this.deviceDetail.data.y) / 100).toString() +
          "px - 1vw)"
      };
    }
  },
  created() {
    this.getMapsList();
  },
  filters: {
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
  watch: {
    show(val) {
      if (val) {
        this.addMap.show = undefined;
        this.addMap.mode = "新增";
        this.addMap.name = "";
        this.addMap.Image = "";
        this.deviceDetail.data = {
          yearsOfDeviceLife: 50,
          daysOfCycle: 180,
          mapId: 1,
          mId: "",
          macAddress: "",
          type: "cardReader",
          createdTime: new Date(),
          vendor: "",
          vendorContact: "",
          vendorPhone: "",
          full: "",
          x: 0,
          y: 0,
          status: "success"
        };
      }
    },
    "addMap.show"(val) {
      if (val) {
        this.$nextTick(() => {
          // this.$refs.mapUpload.$el.children[0].className = "";
        });
      }
    }
  },
  methods: {
    uploadMap(val) {
      let self = this;
      var reader = new FileReader();
      var file = val.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        self.addMap.Image = this.result;
      };
    },
    editMap() {
      this.loading = true;
      const form = new FormData();
      form.append("name", this.addMap.name);
      form.append("Image", this.$refs.mapUpload.files[0]);
      let URL = this.apiUrl + "api/Maps/" + this.mapImg.id;
      this.axios.put(URL, form).then(response => {
        if (response.data.status == "update success") {
          this.getMapsList();
          this.addMap.Image = "";
          this.addMap.name = "";
          this.addMap.show = false;
          this.loading = false;
        }
        console.log();
      });
    },
    postMap() {
      this.loading = true;
      const form = new FormData();
      form.append("name", this.addMap.name);
      form.append("Image", this.$refs.mapUpload.files[0]);
      let URL = this.apiUrl + "api/Maps";
      this.axios.post(URL, form).then(response => {
        if (response.data.status == "upload success") {
          this.getMapsList();
          this.addMap.Image = "";
          this.addMap.name = "";
          this.addMap.show = false;
          this.loading = false;
        }
        console.log();
      });
    },
    getMapImgWH(val) {
      this.map.el = val.path;
      this.map.w = val.path[1].offsetWidth;
      this.map.h = val.path[1].offsetHeight;
    },
    getClickXY(val) {
      this.deviceDetail.data.x = (val.offsetX / this.map.w) * 100;
      this.deviceDetail.data.y = (val.offsetY / this.map.h) * 100;
    },
    getMapsList() {
      const URL = this.apiUrl + "api/Maps";
      this.axios.get(URL).then(response => {
        this.mapsList = response.data;
      });
    },
    sendAddForm() {
      this.loading = true;
      const form = new FormData();
      var CT = new Date(this.deviceDetail.data.createdTime);
      var yyyy = CT.getFullYear(); //年
      var MM = ("0" + (CT.getMonth() + 1).toString()).substr(-2);
      var dd = ("0" + CT.getDate().toString()).substr(-2);
      var HH = ("0" + CT.getHours().toString()).substr(-2);
      var mm = ("0" + CT.getMinutes().toString()).substr(-2);
      var ss = ("0" + CT.getSeconds().toString()).substr(-2);
      var FCT =
        yyyy + "-" + MM + "-" + dd + "T" + HH + ":" + mm + ":" + ss + "+08:00";

      form.append("MapId", this.mapImg.id);
      form.append("MId", this.deviceDetail.data.mId);
      form.append("MacAddress", this.deviceDetail.data.macAddress);
      form.append("Type", this.deviceDetail.data.type);
      form.append("CreatedTime", FCT);
      form.append(
        "YearsOfDeviceLife",
        this.deviceDetail.data.yearsOfDeviceLife
      );
      // form.append("Status", this.deviceDetail.data.status);
      form.append("DaysOfCycle", this.deviceDetail.data.daysOfCycle);
      // form.append("Note", this.deviceDetail.data.note);
      form.append("X", this.deviceDetail.data.x);
      form.append("Y", this.deviceDetail.data.y);
      form.append("Full", this.deviceDetail.data.full);
      form.append("Vendor", this.deviceDetail.data.vendor);
      form.append("VendorContact", this.deviceDetail.data.vendorContact);
      form.append("VendorPhone", this.deviceDetail.data.vendorPhone);
      let URL = this.apiUrl + "api/Devices";
      this.axios.post(URL, form).then(response => {
        this.$router.go(0);
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
