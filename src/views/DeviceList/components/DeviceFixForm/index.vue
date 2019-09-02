<script>
import machinesmap from "../../components/MachinesMap/index";
export default {
  name: "deviceFixForm",
  components: {
    machinesmap
  },
  props: {
    deviceDetail: Object
  },
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      show: false,
      currentStep: 0,
      loading: false,
      form: {
        deviceId: this.deviceDetail.data.id,
        status: "維修",
        RegistrationTime: "",
        note: "",
        name: "",
        phone: "",
        email: "",
        organization: ""
      }
    };
  },
  computed: {
    emailTest() {
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
        this.form.email
      );
    }
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
  watch: {
    currentStep(val) {
      if (val == 0) {
        this.form.note = "";
        this.form.name = "";
        this.form.phone = "";
        this.form.email = "";
        this.form.organization = "";
      }
    }
  },
  methods: {
    getCurrentTime() {
      var CT = new Date();
      var yyyy = CT.getFullYear(); //年
      var MM = ("0" + (CT.getMonth() + 1).toString()).substr(-2);
      var dd = ("0" + CT.getDate().toString()).substr(-2);
      var HH = ("0" + CT.getHours().toString()).substr(-2);
      var mm = ("0" + CT.getMinutes().toString()).substr(-2);
      var ss = ("0" + CT.getSeconds().toString()).substr(-2);
      var FCT =
        yyyy + "-" + MM + "-" + dd + "T" + HH + ":" + mm + ":" + ss + "+08:00";
      this.form.RegistrationTime = FCT;
    },
    sendFixForm() {
      this.loading = true;
      this.getCurrentTime();
      const form = new FormData();
      form.append("DeviceId", this.form.deviceId);
      form.append("Status", this.form.status);
      form.append("RegistrationTime", this.form.RegistrationTime);
      form.append("Note", this.form.note);
      form.append("Name", this.form.name);
      form.append("Phone", this.form.phone);
      form.append("Email", this.form.email);
      form.append("Organization", this.form.organization);

      let URL = this.apiUrl + "api/Maintenances";
      this.axios.post(URL, form).then(response => {
        this.currentStep = 0;
        this.loading = false;
        this.show = false;
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
