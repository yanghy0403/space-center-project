<template>
  <div>
    <div v-if="contentData.length === 0" class="sc-box-content no-data border-bottom">暂无数据</div>
    <div v-else class="sc-reward" v-for="item in contentData">
      <h3>{{item.title?item.title:'未知'}}</h3>
      <div class="sc-div">
        <p>标准编号：{{item.rewardType?item.rewardType:'未知'}}</p>
        <p>制定者：{{item.issuedBy?item.issuedBy:'未知'}}</p>
        <p>参与制定机构：{{item.country?item.country:'未知'}}</p>
        <p>发布机构：{{item.date?item.date:'未知'}}</p>
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
      min-width: 245px;
    //   margin-top: 10px;
    }
  }
}
</style>

