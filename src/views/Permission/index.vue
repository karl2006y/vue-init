<script>
import addstaff from "./components/AddStaff/index";
import staffpermission from "./components/StaffPermission/index";
export default {
  name: "permission",
  components: {
    addstaff,
    staffpermission
  },

  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      loading: true,
      search: {
        show: false,
        text: ""
      },
      staffsList: [],
      editForm: {
        data: {},
        show: false
      }
    };
  },
  created() {
    this.getStaffsList();
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
    },
    "editForm.show"(val) {
      if (!val) {
        this.$router.go(0);
      }
    }
  },
  methods: {
    deleteStaffHandler(item) {
      this.$confirm("此操作將永久刪除該人員的資料, 是否繼續?", "提示", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "danger"
      })
        .then(() => {
          const URL = this.apiUrl + "api/Staffs/" + item.id;
          console.log(URL);

          this.axios.delete(URL).then(response => {
            this.$message({
              type: "sPuccess",
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
            message: "已取消删除"
          });
        });
    },
    uploadFaceImg(item) {
      let self = this;
      var reader = new FileReader();
      var file = item.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        self.editForm.data.faceImagePath = this.result;
      };
    },
    searchKeywordHandler(item) {
      let aObj = JSON.parse(JSON.stringify(item));
      aObj.faceImagePath = "";
      const searchData = JSON.stringify(aObj)
        .replace(/,/g, "")
        .replace(/"/g, "")
        .replace(/:/g, "")
        .replace(/!!/g, ":");
      return searchData.indexOf(this.search.text) != -1;
    },
    getStaffsList() {
      const URL = this.apiUrl + "api/Staffs";
      this.axios.get(URL).then(response => {
        this.staffsList = response.data;
        this.loading = false;
      });
    },
    editHandler(item) {
      console.log(item);
      this.editForm.data = item;
      this.editForm.show = true;
    },
    sendEditForm() {
      this.loading = true;
      const form = new FormData();
      form.append("Name", this.editForm.data.name);
      form.append("Department", this.editForm.data.department);
      form.append("Number", this.editForm.data.number);
      form.append("CardNumber", this.editForm.data.cardNumber);

      if (this.editForm.data.faceImagePath.indexOf("base64") != -1) {
        form.append("FaceImage", this.$refs.Upload.files[0]);
      }
      let URL = this.apiUrl + "api/Staffs/" + this.editForm.data.id;
      console.log(URL);

      this.axios.put(URL, form).then(response => {
        if (response.data.status == "update success") {
          this.getStaffsList();
          this.editForm.show = false;
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
