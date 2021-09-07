<template>
  <div>
    <div v-if="!loading">
      <div class="sc-reward" v-for="(item,i) in contentData" :key="i+'j'">
        <h3
          @click.stop="setPathPaper(item.name?item.name:'未知','/paperdetails',item.paperId)"
        >{{item.name?item.name:'未知'}}</h3>
        <div class="sc-div">
          <p class="charge">
            作者:
            <span
              class="author"
              v-for="subItem in item.author"
              :key="subItem.personId"
              @click.stop="setPathPerson(subItem.personName?subItem.personName:'未知','/persondetails',subItem.personId)"
            >{{subItem.personName?subItem.personName:'未知'}}</span>
          </p>
          <p>期刊: {{item.journal.journalName?item.journal.journalName:'未知'}}</p>
          <p>发表时间: {{item.publishDate == 'null'?'未知':item.publishDate}}</p>
          <p>
            <label>关键词：</label>
            <span v-for="(subItem,i) in item.keyWordData" :key="i">{{subItem.value + '；'}}</span>
          </p>
          <p>摘要: {{item.abstract == 'null'?'未知':item.abstract}}</p>
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
    data(newVal) {
      this.contentData = newVal;
      this.handleData(this.data);
    },
    loading(news) {
      this.loading = news;
    }
  },
  mounted() {
    this.contentData = this.data;
  },
  methods: {
    // handleDetails(personId) {
    //   this.$emit("handle-details", personId);
    // },
    handleData(newVal) {
      this.data = newVal;
      for (let i = 0; i < this.data.length; i++) {
        let keyWordData = [];
        let keyword = this.data[i].keyword;
        for (let j = 0; j < keyword.length; j++) {
          let temp = {};
          temp = {
            value: keyword[j]
          };
          keyWordData.push(temp);
        }
        this.data[i].keyWordData = keyWordData;
        this.contentData = this.data
      }
    },
    // 作者跳转
    setPathPerson(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "个人画像（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
    // 论文跳转
    setPathPaper(name, path, paperId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "论文（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { paperId } });
    }
  }
};
</script>

<style lang="scss" scoped>
.sc-reward {
  .sc-div {
    display: flex;
    flex-wrap: wrap;
    p {
      min-width: 330px;

      margin-right: 20px;
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
h3 {
  cursor: pointer;
  color: #1843a3 !important;
}
.charge .author {
  cursor: pointer;
  font-size: 12px;
  margin-right: 10px;
}
.charge .author:hover {
  color: #1843a3;
}
</style>

