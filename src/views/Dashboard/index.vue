<script>
export default {
  name: "dashboard",
  data() {
    return {
      token: ""
    };
  },
  methods: {
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
