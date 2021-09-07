<template>
  <div>
    <div v-if="!loading">
      <div class="sc-reward" v-for="(item,index) in contentData" :key="index">
        <h3
          class="paperName"
          @click="paperSetPath(item.name?item.name:'未知','/criteriondetails',item.criterionId)"
        >{{item.name?item.name:'未知'}}</h3>
        <div class="sc-div">
          <Row>
            <i-col span="24">
              <label>起草人：</label>
              <span>{{item.author}}</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <label>发布机构：</label>
              <span>{{item.publishOrg.organizationName?item.publishOrg.organizationName:'未知'}}</span>
            </i-col>
            <i-col span="12">
              <label>标准编号：</label>
              <span>{{item.criterionNo?item.criterionNo:'未知'}}</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <label>标准类型：</label>
              <span>{{item.criterionType?item.criterionType:'未知'}}</span>
            </i-col>
            <i-col span="12">
              <label>发布日期：</label>
              <span>{{item.publishDate?item.publishDate:'未知'}}</span>
            </i-col>
          </Row>
          <Row class="abstract">
            <i-col span="24">
              <label>起草单位：</label>
              <span
                class="draftOrg"
                @click="draftOrgSetPath(subItem.organizationName,'/organdetails',subItem.organizationId)"
                v-for="(subItem,i) in item.draftOrg"
                :key="i"
              >{{subItem.organizationName}}</span>
            </i-col>
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
      keyword: ""
    };
  },
  props: ["data","loading"],
  watch: {
    data(newVal, oldVal) {
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
    this.handleChinese();
  },
  methods: {
    handleChinese() {
      for (var i = 0; i < this.contentData.length; i++) {
        this.keyword = this.contentData[i].keyword.toString();
      }
    },
    // 标准跳转
    paperSetPath(name, path, criterionId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "标准（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { criterionId } });
    },
    // 单位跳转
    draftOrgSetPath(name, path, organizationId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研机构（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { organizationId } });
    }
  }
};
</script>

<style lang="scss" scoped>
.sc-reward {
  width: 100%;
  .sc-div {
    width: 100%;
    label,
    span {
      font-size: 12px;
    }
  }
}
.no-data {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}
.paperName {
  cursor: pointer;
  width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #1843a3;
}
.draftOrg {
  width: 100%;
  margin-right: 10px;
  cursor: pointer;
}
.draftOrg:hover {
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

