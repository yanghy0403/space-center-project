<template>
  <div>
    <div v-if="contentData.length === 0" class="sc-box-content no-data border-bottom">暂无数据</div>
    <div v-else class="sc-reward" v-for="item in contentData">
      <h3>{{item.title?item.title:'未知'}}</h3>
      <div class="sc-div">
        <p>作者：{{item.rewardType?item.rewardType:'未知'}}</p>
        <p>ISBN：{{item.issuedBy?item.issuedBy:'未知'}}</p>
        <p>作者机构：{{item.country?item.country:'未知'}}</p>
        <p>出版年：{{item.date?item.date:'未知'}}</p>
        <p>出版社：<a :href="item.source" target="_blank">{{item.source?item.source:'未知'}}</a></p>
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

