<script>
export default {
  name: "machinesMap",
  props: {
    picUrl: String,
    status: String,
    address: {
      x: Number,
      y: Number
    },
    weight: Number,
    pointSize: Number
  },
  data() {
    return {
      fixedXY: {}
    };
  },
  mounted() {
    this.$watch(
      () => {
        return this.$refs.pic.imageHeight;
      },
      val => {
        this.fixedXYHandler();
      }
    );
  },
  updated() {
    this.$watch(
      () => {
        return this.$refs.pic.imageHeight;
      },
      val => {
        this.fixedXYHandler();
      }
    );
  },
  methods: {
    fixedXYHandler() {
      if (this.$refs.pic == undefined) {
        this.fixedXY = { x: "-5px", y: "-5px" };
      } else {
        this.fixedXY = {
          x:
            (
              this.address.x * 0.01 * this.weight -
              this.pointSize / 2
            ).toString() + "px",
          y:
            (
              ((this.address.y * 0.01 * this.weight) /
                this.$refs.pic.imageWidth) *
                this.$refs.pic.imageHeight -
              this.pointSize / 2
            ).toString() + "px"
        };
      }
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="css" src="./style.css" scoped></style>
