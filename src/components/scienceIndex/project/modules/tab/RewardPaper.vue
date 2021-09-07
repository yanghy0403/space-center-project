<template>
  <div>
    <div v-if="!loading">
      <div class="sc-reward" v-for="(item,index) in contentData" :key="index">
        <div>
          <h3 class="titleName">{{item.name?item.name:'未知'}}</h3>
          <div class="sc-div">
            <Row>
              <Col span="12">
                <label>奖励等级：</label>
                <span>{{item.awardClass?item.awardClass:'未知'}}</span>
              </Col>
              <Col span="12">
                <label>奖励类型：</label>
                <span>{{item.awardType?item.awardType:'未知'}}</span>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
    <div class="loading-height" v-if="loading">
      <Spin fix>
        <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
        <div>正在加载中. . .</div>
      </Spin>
    </div>
    <div v-if="!loading&&contentData.length==0" class="sc-box-content no-data border-bottom">暂无数据</div>
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
  props: ["data", "loading"],
  watch: {
    data(newVal, oldVal) {
      this.contentData = newVal;
    },
    loading(news) {
      this.loading = news;
    }
  },
  mounted() {
    this.contentData = this.data;
  },
  methods: {
    handleDetails(personId) {
      this.$emit("handle-details", personId);
    }
  }
};
</script>

<style lang="scss" scoped>
.no-data {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
.titleName {
  color: #1843a3;
  cursor: pointer;
}
</style>

