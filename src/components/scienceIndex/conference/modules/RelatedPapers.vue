<template>
  <div>
    <div v-if="contentData.length === 0" class="sc-box-content no-data">暂无数据</div>
    <div v-else class="sc-reward" v-for="(item,index) in contentData" :key="index">
      <h3
        class="titleName"
        @click="paperSetPath(item.name,'paperdetails',item.paperId)"
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
          <Col span="12">
            <label>会议名称：</label>
            <span
            >{{item.conference.conferenceName?item.conference.conferenceName:'未知'}}</span>
          </Col>
          <Col span="12">
            <label>发布时间：</label>
            <span>{{item.publishDate?item.publishDate:'未知'}}</span>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <label>关键词：</label>
            <span v-for="(subItem,i) in item.keyWordData" :key="i">{{subItem.value + '；'}}</span>
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
      this.handleKeyWordData(this.contentData)
    }
  },
  created() {
    this.contentData = this.data;
  },
  mounted() {
    this.contentData = this.data;
  },
  methods: {
    handleKeyWordData(newVal) {
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
      console.log(this.contentData)
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
    handleDetails(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研人员（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
    // 会议跳转
    // conferenceSetpath(name, path, conferenceId) {
    //   let positionArr = this.$store.state.variable.position.slice(0, 2);
    //   positionArr.push({
    //     pathName: "会议（" + name + "）",
    //     routerName: "/"
    //   });
    //   this.$store.commit("setPosition", positionArr);
    //   this.$router.push({ path, query: { conferenceId } });
    // }
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
.conference {
  cursor: pointer;
}
.authorArr:hover,
.titleName:hover,
.conference:hover {
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

