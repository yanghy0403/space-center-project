<template>
  <div>
    <div v-if="!loading">
      <div class="sc-reward" v-for="(item,index) in contentData" :key="index">
        <h3
          class="titleName"
          @click="paperSetPath(item.name,'/patentdetails',item.patentId)"
        >{{item.name?item.name:'未知'}}</h3>
        <div class="sc-div">
          <Row>
            <Col span="24">
              <label>发明人：</label>
              <span
                class="authorArr"
                @click.stop="handleDetails(subItem.personName,'persondetails',subItem.personId)"
                v-for="(subItem,i) in item.invent"
                :key="i"
              >{{subItem.personName?subItem.personName:'未知'}}</span>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <label>专著权人：</label>
              <span
                class="patentee"
                @click="patenteeSetpath(item.patentee.organizationName,'/organdetails',item.patentee.organizationId)"
              >{{item.patentee.organizationName?item.patentee.organizationName:'未知'}}</span>
            </Col>
            <Col span="12">
              <label>申请日：</label>
              <span>{{item.applyDate?item.applyDate:'未知'}}</span>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <label>关键词：</label>
              <span>{{item.keywords?item.keywords:'未知'}}</span>
            </Col>
          </Row>
          <Row>
            <Col span="24" class="abstract">
              <label>摘要：</label>
              <span>{{item.abstract?item.abstract:'未知'}}</span>
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
      contentData: []
    };
  },
  props: ["data","loading"],
  watch: {
    data(newVal) {
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
    // 专利跳转
    paperSetPath(name, path, patentId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "专利（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { patentId } });
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
    patenteeSetpath(name, path, orgId) {
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
.patentee {
  cursor: pointer;
}
.authorArr:hover,
.titleName:hover,
.patentee:hover {
  color: #1843a3;
  text-decoration: underline;
}
.abstract {
  overflow: hidden;
  text-overflow: ellipsis; //文本溢出显示省略号
  display: -webkit-box;
  -webkit-line-clamp: 3; //第几行开始省略
  -webkit-box-orient: vertical;
  // width:130px;
}
</style>

