<template>
  <div>
    <div v-if="contentData.length === 0" class="sc-box-content no-data border-bottom">暂无数据</div>
    <div v-else class="sc-reward" v-for="item in contentData">
      <h3>{{item.title}}</h3>
      <div class="sc-div">
        <p>作者：{{item.author}}</p>
        <p>会议年度：{{item.year}}</p>
      </div>
    </div>
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

<style lang="scss" scoped>
.sc-reward {
  .sc-div {
    display: flex;
    flex-wrap: wrap;
    p {
      min-width: 340px;
      //   margin-top: 10px;
    }
  }
}
</style>

