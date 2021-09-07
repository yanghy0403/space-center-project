<template>
  <div @click="handleIframe" class="login-layout" :style="winHeight+'px'">
    <iframe
      src="http://159.226.22.222/cas/login"
      ref="dome"
      frameborder="0"
      style="height:100%; width: 100%;"
    ></iframe>
  </div>
</template>
<script>
import { log } from "util";
export default {
  name: "sc-warp",
  data: () => ({
  }),
  props: ["query", "data", "typeArr", "mark"],
  computed: {
    additional() {
      return this.$store.state.achieve.addData; //监听附加数据
    }
  },
  watch: {},
  created() {
    this.addData = this.$store.state.achieve.addData;
    console.log(this.data);
  },
  mounted() {},
  methods: {
    handleIframe() {
      // console.log("asda");
      console.log(this.$refs.dome);
    }
  }
};
</script>

<style lang="scss" scoped>
.login-layout {
  z-index: 10000;
  height: 650px;
  width: 100%;
}
</style>