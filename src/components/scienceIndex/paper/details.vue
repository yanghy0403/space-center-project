<template>
  <div class="sc-details">
    <div class="sc-left">
      <div class="title_div">
        <div class="tit_le_div">论文详情</div>
      </div>
      <div class="content_div">
        <div class="headerName">
          <h3>{{paperInfo.name}}</h3>
        </div>
        <div class="dataInfo">
          <p class="br">详细信息</p>
          <div class="sc-le-top">
            <ul class="paperInfoData" style="width: 780px;">
              <li>
                <label>作者：</label>
                <span
                  class="authorName"
                  v-for="item in paperInfo.author"
                  :key="item.personId"
                  @click.stop="setPathPerson(item.personName?item.personName:'未知','/persondetails',item.personId)"
                >{{item.personName}}</span>
              </li>
              <li>
                <label>机构：</label>
                <span
                  class="organizationName"
                  v-for="item in paperInfo.organization"
                  :key="item.organizationId"
                  @click.stop="setPathOrg(item.organizationName?item.organizationName:'未知','/organdetails',item.organizationId)"
                >{{item.organizationName}}</span>
              </li>
              <li>
                <label>发表时间：</label>
                <span>{{paperInfo.year == 'null'?'未知':paperInfo.year}}</span>
              </li>
              <li v-if="paperInfo.type == 'journal'">
                <label>期刊：</label>
                <span
                  class="journal"
                  @click="handleJournalSetpath(paperInfo.journal.journalName,'/journaldetails',paperInfo.journal.journalId)"
                >{{journalName}}</span>
              </li>
              <li v-if="paperInfo.type == 'conference'">
                <label>会议：</label>
                <span
                  class="journal"
                  @click="handleConferenceSetpath(paperInfo.conference.conferenceName,'/conferencedetails',paperInfo.conference.conferenceName)"
                >{{paperInfo.conference.conferenceName}}</span>
              </li>
              <li>
                <label>学科领域：</label>
                <span
                  class="rankName"
                  v-for="(subItem,i) in paperInfo.subject"
                  :key="i"
                >{{subItem.rankName}}</span>
              </li>
              <li>
                <label>资助项目：</label>
                <span class="projectName" v-for="(item,i) in paperProjectData" :key="i" @click="handleProjectSetpath(item.name,'/projectdetails',item.projectId)">{{item.name}}</span>
              </li>
              <li>
                <label>关键词：</label>
                <span
                  class="keyword"
                  v-for="(item,i) in paperInfo.keywordData"
                  :key="i"
                >{{item.value + '；'}}</span>
              </li>
              <li>
                <label>摘要：</label>
                <span>{{paperInfo.abstract == 'null'?'未知':paperInfo.abstract}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="sc-box">
        <p class="br">参考引证图谱</p>
        <div class="sc-content">
          <PCitation :data="PaperCitation" />
        </div>
      </div>
      <Tabs type="card" :animated="false" @on-click="handleTabChange">
        <Tab-pane label="参考文献">
          <Reference :data="ReferenceData" @handle-details="handleDetails" />
        </Tab-pane>
        <Tab-pane label="引证文献">
          <Citation :data="CitationData" @handle-details="handleDetails" />
        </Tab-pane>
      </Tabs>
      <div class="sc-page" v-if="pageShow">
        <Page
          :total="total"
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
          show-total
        />
      </div>
    </div>
    <div class="sc-right">
      <div class="sc-box"  v-if="paperInfo.type == 'journal'">
        <p class="br">来源期刊</p>
        <div class="sc-content">
          <div class="sourceJournal">
            <img v-if="paperInfo.journalJpg" :src="paperInfo.journalJpg" alt />
            <img v-else src="../../../assets/images/journal_img.png" alt />
            <p>
              期刊名称:
              <span>{{journalName?"《" + journalName + "》":'未知'}}</span>
            </p>
            <p>
              年卷期:
              <span>{{paperInfo.year}}&nbsp;&nbsp;{{paperInfo.issue}}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-if="paperInfo.type == 'conference'">
      </div>
      <div class="sc-box">
        <p class="br">被引用趋势图图</p>
        <div class="sc-box-content">
          <PaperCitedNum :data="paperRefToYearData" />
        </div>
      </div>
      <div class="sc-box">
        <p class="br">论文人员机构关系图谱</p>
        <div class="sc-box-content">
          <PaperPersonAndOrg :data="paperPersonAndOrgData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 参考引证图谱
import PCitation from "./modules/PCitation";
// 论文被引用趋势图
import PaperCitedNum from "./modules/PaperCitedNum";
// 参考文献
import Reference from "./modules/tab/Reference";
// 引证文献
import Citation from "./modules/tab/Citation";
// 论文人员机构关系图
import PaperPersonAndOrg from "./modules/PaperPersonAndOrg";
// 小图标
import paper from "../../../assets/icon/Journal.png";
import organ1 from "../../../assets/icon/organ1.png";
import person2 from "../../../assets/icon/person2.png";
import person1 from "../../../assets/icon/person1.png";

export default {
  name: "paperDetails",
  components: {
    PCitation,
    PaperCitedNum,
    Reference,
    Citation,
    PaperPersonAndOrg
  },
  data: () => ({
    paperId: "",
    paperInfo: [],
    keywordArr: "",
    journalName: "",
    paperRefToYearData: [],
    limit: 10,
    PaperCitation: [],
    ReferenceData: [],
    CitationData: [],
    paperProjectData:[],
    paperPersonAndOrgData: {},
    limit: 10,
    skip: 0,
    total: 0,
    pageShow: true,
    markTab: 0,
    mark: 0
  }),
  created() {
    this.paperId = this.$route.query.paperId;
  },
  mounted() {
    this.getpaperinfo(); // 获取论文详情信息
    this.getPaperRefToYear(); // 论文被引用量
    this.getPaperCitation(); // 参考引证图谱
    this.getPaperPersonAndOrg(); // 论文人员机构关系图

    this.getConsultPaperList();
    this.handlePaperProject();
    // this.getCitationPaperList();
  },
  methods: {
    // 论文跳转
    handleDetails(id) {
      this.paperId = id;
      this.getpaperinfo(); // 获取论文详情信息
      this.getPaperRefToYear(); // 论文被引用量
      this.getPaperCitation(); // 参考引证图谱
      this.getPaperPersonAndOrg(); // 论文人员机构关系图
      //this.getCitationPaperList();
      this.getConsultPaperList();
      this.handlePaperProject();
    },
    // 获取论文详情信息
    getpaperinfo() {
      var id = this.paperId;
      this.$axios.get("/basic/paper", { params: { paperId: id } }).then(res => {
        this.paperInfo = res.data.data.content;
        this.journalName = this.paperInfo.journal.journalName;

        var keywordData = [];
        for (var i = 0; i < this.paperInfo.keyword.length; i++) {
          var temp = {};
          temp = {
            value: this.paperInfo.keyword[i]
          };
          keywordData.push(temp);
          this.paperInfo.keywordData = keywordData;
        }
      });
    },
    // 资助项目
    handlePaperProject() {
      var id = this.paperId;
        this.$axios.get("/paper/project",{ params: { paperId: id } }).then(res => {
          if(res.data.code == 200) {
            this.paperProjectData = res.data.data.content;
          }
        })
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
    // 机构跳转
    setPathOrg(name, path, id, mark) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      if (mark) {
        positionArr.push({
          pathName: "个人画像（" + name + "）",
          routerName: "/"
        });
      } else {
        positionArr.push({
          pathName: "机构画像（" + name + "）",
          routerName: "/"
        });
      }
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId: id } });
    },
    // 期刊跳转
    handleJournalSetpath(name, path, journalId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "期刊（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { journalId } });
    },
    // 会议
    handleConferenceSetpath(name, path, conferenceId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "会议（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { conferenceId } });
    },
    handleProjectSetpath(name,path,projectId) {
        let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "项目（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { projectId } });
    },
    // 关系引证图谱
    getPaperCitation() {
      // var id = "88ec75d19cac43c391a56c02622f62c9";
      var id = this.paperId;
      var data = {
        limit: this.limit,
        paperId: id
      };
      this.$axios
        .post("/paper/paperCitation", this.$qs.stringify(data))
        .then(res => {
          this.PaperCitation = res.data.data.content;
        });
    },
    // 论文被应用量
    getPaperRefToYear() {
      var id = this.paperId,
        year = "2019";
      var data = {
        paperId: id,
        year: year
      };
      this.$axios
        .post("/paper/paperRefToYear", this.$qs.stringify(data))
        .then(res => {
          this.paperRefToYearData = res.data.data.content;
        });
    },
    // 参考文献列表
    getConsultPaperList() {
      var data = {
        paperId: this.paperId,
        type: "consult",
        limit: this.limit,
        skip: this.skip
      };
      this.$axios
        .post("/paper/paperList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.ReferenceData = res.data.data.content.result;
            this.total = res.data.data.content.total;
          }
        });
    },
    // 引证文献
    getCitationPaperList() {
      var data = {
        paperId: this.paperId,
        type: "citation",
        limit: this.limit,
        skip: this.skip
      };
      this.$axios
        .post("/paper/paperList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.CitationData = res.data.data.content.result;
            this.total = res.data.data.content.total;
          }
        });
    },

    // 分页
    markTabChange(key) {
      let mark = key ? key : this.markTab;
      switch (mark) {
        case 0:
          this.getConsultPaperList();
          this.pageShow = true;
          break;
        case 1:
          this.getCitationPaperList();
          this.pageShow = true;
          break;
        default:
          break;
      }
    },
    handleTabChange(key) {
      this.markTab = key;
      this.skip = 0;
      this.limit = 10;
      this.current = 1;
      this.markTabChange(key);
    },
    changePage(event) {
      this.skip = event - 1;
      this.markTabChange();
    },
    changeSizePage(event) {
      this.limit = event;
      this.markTabChange();
    },
    // 论文人员机构关系
    getPaperPersonAndOrg() {
      var id = this.paperId;
      var data = {
        paperId: id,
        limit: this.limit
      };
      this.$axios
        .post("/paper/paperPersonAndOrg", this.$qs.stringify(data))
        .then(res => {
          let data = res.data.data.content;
          let links = res.data.data.content.links;
          let nodesData = [];

          data.nodes.forEach(item => {
            if (item.type === "person") {
              if (item.index == "1") {
                nodesData.push({
                  category: "第一作者",
                  id: item.id,
                  name: item.name,
                  index: item.index,
                  symbol: "image://" + person1
                });
              } else {
                nodesData.push({
                  category: "作者",
                  id: item.id,
                  name: item.name,
                  index: item.index,
                  symbol: "image://" + person2
                });
              }
            } else if (item.type === "org") {
              nodesData.push({
                category: "机构",
                id: item.id,
                name: item.name,
                symbol: "image://" + organ1
              });
            }
          });

          nodesData.push({
            category: "论文名称",
            name: this.paperInfo.chineseTitle,
            id: this.paperId,
            symbol: "image://" + paper,
            label: {
              show: false
            }
          });

          let categories = [
            {
              name: "论文名称",
              icon: "image://" + paper
            },
            {
              name: "作者",
              icon: "image://" + person2
            },
            {
              name: "机构",
              icon: "image://" + organ1
            },
            {
              name: "第一作者",
              icon: "image://" + person1
            }
          ];

          this.paperPersonAndOrgData = {
            categories,
            data: nodesData,
            links
          };
          console.log(this.paperPersonAndOrgData);
        });
    }
  }
};
</script>

<style lang="scss" scope>
@import "../../../style/details.scss";
.sc-details .sc-left div.sc-le-top ul {
  width: auto;
  h2 {
    font-size: 15px;
  }
}
.sc-details .sc-left .sc-le-top ul li label {
  font-weight: bold;
}
.sc-details .sc-left .sc-le-top ul li span {
  margin-left: 10px;
}
.sc-details .sc-left {
  margin-bottom: 30px;
}
.headerName {
  margin-left: 10px;
}
.projecttype {
  display: flex;
  width: 100%;
  line-height: 30px;
  height: 30px;
  border: 1px solid #ddd;
  cursor: pointer;
}
.projecttype li {
  width: 20%;
  text-align: center;
  border-right: 1px solid #ddd;
}
.projecttype li:last-child {
  border-right: none;
}
.projecttype li.active {
  background: #57a3f3;
}
.authorName,
.organizationName,
.journal,.projectName {
  cursor: pointer;
  margin-right: 10px;
}
.rankName {
  margin-right: 10px;
}
.authorName:hover,
.organizationName:hover,
.journal:hover,.projectName:hover {
  color: #1843a3;
  text-decoration: underline;
}

.sourceJournal {
  width: 100%;
  overflow: hidden;
  img {
    width: 25%;
    float: left;
    border: 1px solid #ccc;
  }
  p {
    color: #000;
    margin-left: 100px;
  }
}
</style>