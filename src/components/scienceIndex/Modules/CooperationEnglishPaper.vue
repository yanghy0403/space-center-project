<template>
  <div>
    <!-- <div v-if="contentData.length === 0" class="sc-box-content no-data">暂无数据</div> -->
    <div v-if="!loading">
      <div class="sc-reward" v-for="(item,index) in contentData" :key="index">
        <h3
          class="paperName"
          @click="paperSetPath(item.name?item.name:'未知','/paperdetails',item.paperId)"
        >{{item.name?item.name:'未知'}}</h3>
        <div class="sc-div">
          <Row>
            <i-col span="24">
              <label>作者：</label>
              <span
                class="authorArr"
                v-for="subItem in item.author"
                :key="subItem.personId"
                @click="authorSetpath(subItem.personId)"
              >{{subItem.personName?subItem.personName:'未知'}}</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <label>期刊：</label>
              <span>{{item.journal == ''?'未知':item.journal}}</span>
            </i-col>
            <i-col span="12">
              <label>发表时间：</label>
              <span>{{item.publishDate?item.publishDate:'未知'}}</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="24">
              <label>关键词：</label>
              <span>{{keyword == ''?'未知':keyword}}</span>
            </i-col>
          </Row>
          <Row class="abstract">
            <i-col span="24">
              <label>摘要：</label>
              <span>{{item.abstract?item.abstract:'未知'}}</span>
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
      this.handleChinese();
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
  },
  methods: {
    handleChinese() {
      for (var i = 0; i < this.contentData.length; i++) {
        this.keyword = this.contentData[i].keyword.toString();
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
    authorSetpath(personId) {
      this.$emit("handle-details", personId);
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
.abstract {
  overflow: hidden;
  text-overflow: ellipsis; //文本溢出显示省略号
  display: -webkit-box;
  -webkit-line-clamp: 3; //第几行开始省略
  -webkit-box-orient: vertical;
  // width:130px;
}
</style>

