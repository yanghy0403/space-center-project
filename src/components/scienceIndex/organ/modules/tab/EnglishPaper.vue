<template>
  <div>
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
                @click="authorSetpath(subItem.personName,'/persondetails',subItem.personId)"
              >{{subItem.personName?subItem.personName:'未知'}}</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="12">
              <label>期刊：</label>
              <span class="journal" @click="handleJournalSetpath(item.journal.journalName,'/journaldetails',item.journal.journalId)">{{item.journal.journalName == ''?'未知':item.journal.journalName}}</span>
            </i-col>
            <i-col span="12">
              <label>发表时间：</label>
              <span>{{item.publishDate?item.publishDate:'未知'}}</span>
            </i-col>
          </Row>
          <Row>
            <i-col span="24">
              <label>关键词：</label>
              <span class="keyWords" v-for="(subItem,i) in item.keyWordData" :key="i">{{subItem.value}}</span>
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
      this.handleChinese(this.contentData);
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
     handleChinese(newVal) {
      this.contentData = newVal;
      for (let i = 0; i < this.contentData.length; i++) {
        let keyWordData = [];
        let keyword = this.contentData[i].keyword;
        for (let j = 0; j < keyword.length; j++) {
          let temp = {};
          temp = {
            value: keyword[j]
          };
          keyWordData.push(temp);
        }
        this.contentData[i].keyWordData = keyWordData;
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
  },
  // 期刊跳转
    handleJournalSetpath(name,path,journalId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "期刊（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { journalId } });
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
  text-decoration: #1843a3;
}
.abstract {
  overflow: hidden;
  text-overflow: ellipsis; //文本溢出显示省略号
  display: -webkit-box;
  -webkit-line-clamp: 3; //第几行开始省略
  -webkit-box-orient: vertical;
  // width:130px;
}
.keyWords {
  margin-right: 10px;
}
</style>

