<script>
export default {
  name: "addStaff",
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      loading: false,
      show: false,
      staffData: {
        name: "",
        number: "",
        department: "",
        cardNumber: "",
        faceImagePath: ""
      }
    };
  },
  methods: {
    uploadFaceImg(item) {
      let self = this;
      var reader = new FileReader();
      var file = item.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        self.staffData.faceImagePath = this.result;
      };
    },
    sendAddForm() {
      this.loading = true;
      const form = new FormData();
      form.append("Name", this.staffData.name);
      form.append("Department", this.staffData.department);
      form.append("Number", this.staffData.number);
      form.append("CardNumber", this.staffData.cardNumber);

      if (this.staffData.faceImagePath.indexOf("base64") != -1) {
        form.append("FaceImage", this.$refs.Upload.files[0]);
      }
      let URL = this.apiUrl + "api/Staffs/";
      console.log(URL);

      this.axios.post(URL, form).then(response => {
        if (response.data.status == "upload success") {
          this.$router.go(0);
          this.show = false;
          this.loading = false;
        }
        console.log();
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
