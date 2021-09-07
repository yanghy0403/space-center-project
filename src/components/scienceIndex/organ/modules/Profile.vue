<template>
  <div class="personalProfile">
      <p>{{data}}</p>
  </div>
</template>

<script>
export default {
  name: "foot",
  data() {
    return {
      contentData: []
    };
  },
  props: ["data"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
    }
  },
  mounted() {
    this.contentData = this.data;
  }
};
</script>

<style lang="scss">
.personalProfile {
 font-weight: 300;
 text-indent:2em;
}
</style>

