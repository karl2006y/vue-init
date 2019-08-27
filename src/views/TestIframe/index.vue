<script>
export default {
  name: "testIframe",
  data() {
    return {
      token: "",
      tag: "",
      loginStatus: ""
    };
  },
  created() {
    const tokenGeted = this.getToken(
      "https://www.ibunny.com.tw/Identity/Account/Login"
    );
    console.log(tokenGeted);
  },
  methods: {
    getToken(URL) {
      return new Promise((resolve, reject) => {
        this.axios.get(URL).then(response => {
          this.token = response.data
            .split(
              '<input name="__RequestVerificationToken" type="hidden" value="'
            )[1]
            .split('"')[0];
          // if (first) {
          //   this.login();
          // }
          resolve(this.token);
        });
      });
    },

    login() {
      console.log("Login");
      const form = new FormData();
      form.append("Input.Email", "admin@test.com");
      form.append("Input.Password", "Aa3345678?");
      form.append("__RequestVerificationToken", this.token);
      form.append("Input.RememberMe", false);
      let URL = "https://www.ibunny.com.tw/Identity/Account/Login";
      this.axios.post(URL, form).then(response => {
        console.log("res", response);
        if (response.data.indexOf("Invalid login attempt.") != -1) {
          this.loginStatus = "登入失敗";
        } else if (response.data.indexOf("Hello") != -1) {
          this.loginStatus = "登入成功";
          // this.postObj();
          this.getJson();
          setTimeout(() => {
            this.getToken("https://www.ibunny.com.tw/Maps1/Edit/1");
          }, 5000);
        }
      });
    },
    getJson() {
      let URL = "https://www.ibunny.com.tw/api/maps";
      this.axios.get(URL).then(response => {
        console.log("getJson", response.data);
      });
    },
    postObj() {
      const form = new FormData();
      form.append("MapId", "1");
      form.append("MId", "Aa3345678?");
      form.append("MacAddress", "54-B2-03-10-5C-58");
      form.append("CreatedTime", "2019-08-15T07:26:43+08:00");
      form.append("YearsOfDeviceLife", 5);
      form.append("Status", "Aa3345678?");
      form.append("DaysOfCycle", 90);
      form.append("Note", "Aa3345678?");
      form.append("Member", "Aa3345678?");
      form.append("X", 100);
      form.append("Y", 100);
      form.append("Full", "Aa3345678?");
      form.append("__RequestVerificationToken", this.token);
      let URL = "https://www.ibunny.com.tw/api/Devices";
      this.axios.post(URL, form).then(response => {
        console.log("postObj", response.data);
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
