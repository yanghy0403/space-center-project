<template>
  <div>
    <div v-if="!loading">
      <div class="sc-reward" v-for="(item,index) in contentData" :key="index">
        <h3
          class="paperName"
          @click="paperSetPath(item.name?item.name:'未知','/paperdetails',item.paperId)"
        >{{item.name?item.name:'未知'}}</h3>
        <div class="sc-div">
          <Row class="authorArr">
            <i-col span="24">
              <label>作者：</label>
              <span
                @click="authorSetpath(subItem.personName,'/persondetails',subItem.personId)"
              >{{item.invent?item.invent:'未知'}}</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="24">
              <label>作者机构：</label>
              <span
                v-for="subItem in item.organizationAuthor"
                :key="subItem.organizationId"
              >{{subItem.organizationName?subItem.organizationName:'未知'}}</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <label>出版时间：</label>
              <span>{{item.publishDate?item.publishDate:'未知'}}</span>
            </i-col>
            <i-col span="12">
              <label>出版社：</label>
              <span>{{publisher == 'null'?'未知':publisher}}</span>
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
  props: ["data", "loading"],
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
      console.log(this.contentData);
      for (var i = 0; i < this.contentData.length; i++) {
        if (this.contentData[i].keyword == "") {
          this.keyword = this.contentData[i].keyword.toString();
        } else {
          this.keyword = "未知";
        }
      }
    },
    // 论文跳转
    paperSetPath(name, path, paperId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "论文（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { paperId } });
    },
    // 作者跳转
    authorSetpath(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研人员" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
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
.authorArr {
  width: 100%;
  margin-right: 10px;
  cursor: pointer;
}
.authorArr:hover {
  color: #1843a3;
  text-decoration: underline;
}
</style>

