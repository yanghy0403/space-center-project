<template>
  <div class="TakeOffice">
    <p v-for="(item,i) in contentData" :key="i+'a'">{{item.content}}</p>
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
.TakeOffice {
  font-weight: 400;
//    text-indent:2em;
}
</style>

