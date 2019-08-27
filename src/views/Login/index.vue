<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        username: "admin@test.com",
        password: {
          text: "Aa3345678?1",
          show: false
        }
      },
      rememberAccount: false,
      token: "",
      loginStatus: "",
      loginLoading: false
    };
  },
  created() {
    this.getToken("https://www.ibunny.com.tw/api/XsrfToken").then(res => {
      this.token = res;
    });
  },
  watch: {
    loginStatus(val) {
      if (val == "登入成功") {
        if (this.$route.query.next != undefined) {
          this.$router.push({ name: decodeURI(this.$route.query.next) });
        } else {
          this.$router.push({ name: "控制面板" });
        }
      } else if (val == "登入失敗") {
        this.loginLoading = false;
      }
    }
  },
  methods: {
    getToken(URL) {
      return new Promise((resolve, reject) => {
        this.axios.get(URL).then(response => {
          resolve(response.data.token);
        });
      });
    },
    login() {
      this.loginLoading = true;
      this.loginStatus = "";
      const form = new FormData();
      form.append("Input.Email", this.form.username);
      form.append("Input.Password", this.form.password.text);
      form.append("__RequestVerificationToken", this.token);
      form.append("Input.RememberMe", false);
      let URL = "https://www.ibunny.com.tw/Identity/Account/Login";
      this.axios.post(URL, form).then(response => {
        this.axios.get(URL).then(response => {
          if (response.data.indexOf("Hello") == -1) {
            this.loginStatus = "登入失敗";
          } else if (response.data.indexOf("Hello") != -1) {
            this.loginStatus = "登入成功";
          }
        });
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
