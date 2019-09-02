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
    weight: String,
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
        const imgwidth =
          this.$refs.pic.$el.clientWidth == 0
            ? Number(this.weight.replace("px", ""))
            : this.$refs.pic.$el.clientWidth;
        this.fixedXY = {
          x:
            (this.address.x * 0.01 * imgwidth - this.pointSize / 2).toString() +
            "px",
          y:
            (
              ((this.address.y * 0.01 * imgwidth) / this.$refs.pic.imageWidth) *
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
