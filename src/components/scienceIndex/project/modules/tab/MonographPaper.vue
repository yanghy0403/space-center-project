<template>
  <div>
    <div v-if="!loading">
      <div class="sc-reward" v-for="(item,i) in contentData" :key="i">
        <h3
          class="titleName"
          @click="monographSetpath(item.name,'/monographdetails',item.monographId)"
        >{{item.name?item.name:'未知'}}</h3>
        <div class="sc-div">
          <Row>
            <Col span="24">
              <label>作者：</label>
              <span
                class="authorArr"
                v-for="subItem in item.author"
                :key="subItem.personId"
                @click.stop="handleDetails(subItem.personName,'persondetails',subItem.personId)"
              >{{subItem.personName?subItem.personName:'未知'}}</span>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <label>作者机构：</label>
              <span
                v-for="subItem in item.organizationAuthor"
                :key="subItem.organizationId"
                @click="organSetpath(item.patentee.organizationName,'/organdetails',item.patentee.organizationId)"
              >{{subItem.organizationName?subItem.organizationName:'未知'}}</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <label>出版时间：</label>
              <span>{{item.publishDate?item.publishDate:'未知'}}</span>
            </Col>
            <Col span="12">
              <label>出版社：</label>
              <span>{{publisher}}</span>
            </Col>
          </Row>
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
      contentData: [],
      publisher: ""
    };
  },
  props: ["data", "loading"],
  watch: {
    data(newVal) {
      this.contentData = newVal;
    },
    loading(news) {
      this.loading = news;
    }
  },
  created() {
    this.contentData = this.data;
  },
  mounted() {
    this.contentData = this.data;
    this.handleMonograph();
  },
  methods: {
    handleMonograph() {
      for (var i = 0; i < this.contentData.length; i++) {
        let publisherData = this.contentData[i].publisher.toString();
        if (publisherData !== "null") {
          this.publisher = publisherData;
        } else {
          this.publisher = "未知";
        }
      }
    },
    // 专著跳转
    monographSetpath(name, path, monographId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "专著（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { monographId } });
    },
    // 作者跳转
    handleDetails(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研人员（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
    // 专著权人跳转
    organSetpath(name, path, orgId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研机构（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId } });
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
.authorArr {
  margin-right: 10px;
  cursor: pointer;
}
.authorArr:hover,
.titleName:hover {
  color: #1843a3;
  text-decoration: underline;
}
</style>

