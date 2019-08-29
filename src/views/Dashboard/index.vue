<script>
import machinesmap from "./components/MachinesMap/index";
export default {
  name: "dashboard",
  components: {
    machinesmap
  },
  data() {
    return {
      apiUrl: this.GLOBAL.apiUrl,
      token: "",
      mList: {},
      logsList: {
        ready: [],
        showed: []
      },
      buttonBeTouchList: [],
      mapShow: {
        show: false,
        item: {}
      },
      logsCheckList: ["danger"],
      statusList: ["warning", "danger"]
    };
  },
  computed: {
    showLogList() {
      return this.logsList.showed.reverse();
      // return this.logsList.showed.sort((a, b) => b.id - a.id);
    }
  },
  created() {
    this.getDevices();
    this.getPassLogs("true");
  },
  mounted() {
    document.querySelector(".el-collapse").style.border = "0px";
  },
  methods: {
    checkButtonInbuttonBeTouchList(item) {
      for (var i = 0; i < this.buttonBeTouchList.length; i++) {
        if (this.buttonBeTouchList[i].id == item.id) {
          return true;
        }
      }

      return false;
    },
    buttonBeTouch(item) {
      var self = this;
      this.$notify.error({
        title: item.mId + "緊急按鈕(" + item.id + ")",
        dangerouslyUseHTMLString: true,
        message:
          '<audio autoplay loop preload><source src="notify.mp3" type="audio/mpeg"></audio>',

        position: "top-left",
        duration: 0,
        onClick: val => {
          this.mapShow.item = item;
          // const id = Number(val.title.split("(")[1].split(")")[0]);
          // for (var i = 0; i < this.buttonBeTouchList.length; i++) {
          //   if (this.buttonBeTouchList[i].id == id) {
          //     this.mapShow.item = this.buttonBeTouchList[i];
          //   }
          // }
          this.mapShow.show = true;
        },
        onClose: val => {
          const id = Number(val.title.split("(")[1].split(")")[0]);
          this.axios
            .put(this.apiUrl + "api/Devices/Status/" + id)
            .then(response => {
              for (var i = 0; i < this.buttonBeTouchList.length; i++) {
                if (this.buttonBeTouchList[i].id == id) {
                  setTimeout(i => {
                    this.buttonBeTouchList.splice(i, 1);
                  }, 1000);
                }
              }
            });
        }
      });
    },

    getPassLogs(val) {
      // console.log("getPassLogs!");
      if (this.logsList.showed.length >= 100) {
        this.logsList.showed.splice(1, 99);
      }
      let URL = "";
      if (val === "true") {
        URL = this.apiUrl + "api/PassLogs";
      } else {
        URL = this.apiUrl + "api/PassLogs/" + val;
      }
      // console.log(URL);
      if (this.logsList.ready.length == 0) {
        this.axios.get(URL).then(response => {
          this.logsList.ready = response.data;
          // console.log("getlog", response.data);
          if (this.logsList.ready.length == 1) {
            var self = this;
            setTimeout((self = this) => {
              this.getPassLogs(this.logsList.ready[0].id);
            }, 1000);
          } else {
            this.getPassLogs(this.logsList.ready[0].id);
          }
        });
      } else {
        if (this.logsList.showed.length == 0) {
          this.logsList.showed.push(this.logsList.ready[0]);
          this.logsList.ready.splice(0, 1);
        } else {
          const lastId = this.logsList.showed[this.logsList.showed.length - 1]
            .id;
          const newId = this.logsList.ready[0].id;
          if (lastId != newId) {
            this.logsList.showed.push(this.logsList.ready[0]);
            this.logsList.ready.splice(0, 1);
          } else {
            this.logsList.ready.splice(0, 1);
          }
        }

        var self = this;
        setTimeout((self = this) => {
          const len = self.logsList.showed.length;
          if (this.logsList.showed.length != 0) {
            self.getPassLogs(self.logsList.showed[len - 1].id - 1);
          } else {
            self.getPassLogs();
          }
        }, 1);
      }
    },
    getDevices() {
      const URL = this.apiUrl + "api/Devices";
      this.axios.get(URL).then(response => {
        this.mList = response.data;
        this.mList.forEach(item => {
          if (
            item.status == "danger" &&
            item.note == "觸發緊急按鈕" &&
            !this.checkButtonInbuttonBeTouchList(item)
          ) {
            this.buttonBeTouch(item);
            this.buttonBeTouchList.push(item);
          }
        });
      });

      setInterval(() => {
        this.axios.get(URL).then(response => {
          this.mList = response.data;
        });
        this.mList.forEach(item => {
          if (
            item.status == "danger" &&
            item.note == "觸發緊急按鈕" &&
            !this.checkButtonInbuttonBeTouchList(item)
          ) {
            this.buttonBeTouch(item);
            this.buttonBeTouchList.push(item);
          }
        });
        // console.log("getDevices!");
      }, 1000);
    },
    getToken(URL) {
      return new Promise((resolve, reject) => {
        this.axios.get(URL).then(response => {
          resolve(response.data.token);
        });
      });
    },
    logout() {
      const form = new FormData();
      this.getToken("https://www.ibunny.com.tw/api/XsrfToken").then(res => {
        this.token = res;
        form.append("__RequestVerificationToken", this.token);
        this.axios
          .post("https://www.ibunny.com.tw/Identity/Account/Logout", form)
          .then(response => {
            this.$router.push({ name: "登入" });
          });
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
