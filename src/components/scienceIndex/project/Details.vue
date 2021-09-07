<template>
  <div class="sc-details">
    <div class="con_div">
      <div class="title_div">
        <div class="tit_le_div">项目详情</div>
      </div>
      <div class="content_div">
        <div class="cont_div">
          <div class="headerName">
            <h3>{{projectInfoData.name}}</h3>
          </div>
          <div class="dataInfo">
            <p class="br">详细信息</p>
            <div class="list">
              <Row>
                <i-col span="8">
                  <label class="sc-title-lbl3">学科领域</label>
                  <span class="sc-title-sp3">{{projectInfoData.projectNature}}</span>
                </i-col>
                <i-col span="8">
                  <label class="sc-title-lbl3">项目类别</label>
                  <span class="sc-title-sp3">{{projectInfoData.type}}</span>
                </i-col>
                <i-col span="8">
                  <label class="sc-title-lbl3">批准年度</label>
                  <span class="sc-title-sp3">{{projectInfoData.year}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="8" v-if="projectInfoData.charge != undefined">
                  <label class="sc-title-lbl3">项目负责人</label>
                  <span class="sc-title-sp3 charge_personName" @click="handlePersonSetpath(projectInfoData.charge.personName,'/persondetails',projectInfoData.charge.personId)">{{projectInfoData.charge.personName}}</span>
                </i-col>
                <i-col span="8" v-if="projectInfoData.charge != undefined">
                  <label class="sc-title-lbl3">负责人职称</label>
                  <span class="sc-title-sp3">{{projectInfoData.charge.title}}</span>
                </i-col>
                <i-col span="8">
                  <label class="sc-title-lbl3">主要完成人</label>
                  <span class="sc-title-sp3">暂无</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="8">
                  <label class="sc-title-lbl3">依托单位</label>
                  <span class="sc-title-sp3 organName" v-for="(item,i) in projectInfoData.organization" :key="i" @click="handleOrgSetPath(item.organizationName,'/organdetails',item.organizationId)">{{item.organizationName}}</span>
                </i-col>
                <i-col span="8">
                  <label class="sc-title-lbl3">主要完成单位</label>
                  <span class="sc-title-sp3">暂无</span>
                </i-col>
                <i-col span="8">
                  <label class="sc-title-lbl3">项目经费</label>
                  <span class="sc-title-sp3">{{projectInfoData.applyForFunds + '（万元）'}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="8">
                  <label class="sc-title-lbl3">项目开始时间</label>
                  <span class="sc-title-sp3">{{startTimeData}}</span>
                </i-col>
                <i-col span="8">
                  <label class="sc-title-lbl3">项目结束时间</label>
                  <span class="sc-title-sp3">{{entTimeData}}</span>
                </i-col>
              </Row>
              <Row>
                <i-col span="24">
                  <label style="margin-right: 15px;">关键词</label>
                  <label
                    style="width: 0;text-align: left;font-weight: 400;"
                    v-for="(item,i) in projectInfoData.chineseKeywordData"
                    :key="i"
                  >{{item.value + '；'}}</label>
                </i-col>
              </Row>
            </div>
          </div>
          <div class="sc-box">
            <p class="br">人员机构关系图谱</p>
            <div class="sc-content">
              <ProjectPersonAndOrg :data="paperPersonAndOrgData" />
            </div>
          </div>
          <div class="projectAbs">
            <Row>
              <i-col span="24">
                <label>项目摘要(中文):</label>
                <span>{{projectInfoData.chineseAbstract}}</span>
              </i-col>
            </Row>
            <Row>
              <i-col span="24">
                <label>项目摘要(英文):</label>
                <span>{{projectInfoData.englishAbstract}}</span>
              </i-col>
            </Row>
          </div>
          <div class="sc-box" id="fruitProportion">
            <p class="br">成果占比图</p>
            <div class="sc-content">
              <FruitProportion :data="fruitProportionData" />
            </div>
          </div>
          <div class="projectList">
            <Tabs type="card" :animated="false" @on-click="handleTabChange">
              <TabPane v-if="fruitProportionData[0] != undefined" :label="'期刊论文' + '('+ fruitProportionData[0].count + ')'">
                <JournalPaper :loading="loading" :data="journalPaperData" />
              </TabPane>
              <TabPane v-if="fruitProportionData[1] != undefined" :label="'会议论文' + '('+ fruitProportionData[1].count + ')'">
                <ConfPaper :loading="loading" :data="confPaperData" />
              </TabPane>
              <TabPane v-if="fruitProportionData[3] != undefined" :label="'专著' + '('+ fruitProportionData[3].count + ')'">
                <MonographPaper :loading="loading" :data="monographPaperData" />
              </TabPane>
              <TabPane v-if="fruitProportionData[4] != undefined" :label="'奖励' + '('+ fruitProportionData[4].count + ')'">
                <RewardPaper :loading="loading" :data="rewardData" />
              </TabPane>
              <TabPane v-if="fruitProportionData[2] != undefined" :label="'专利' + '('+ fruitProportionData[2].count + ')'">
                <PatentPaper :loading="loading" :data="patentPaperData" />
              </TabPane>
            </Tabs>
            <div class="sc-page" v-if="!loading">
              <span>检索到{{total}}篇</span>
              <Page
                :total="total"
                @on-change="changePage"
                @on-page-size-change="changeSizePage"
                show-elevator
                show-sizer
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProjectPersonAndOrg from "./modules/ProjectPersonAndOrg"; // 人员机构关系图
import FruitProportion from "./modules/FruitProportion"; // 成果占比图

import JournalPaper from "./modules/tab/JournalPaper";
import ConfPaper from "./modules/tab/ConfPaper";
import MonographPaper from "./modules/tab/MonographPaper";
import RewardPaper from "./modules/tab/RewardPaper";
import PatentPaper from "./modules/tab/PatentPaper";

export default {
  name: "projectdetails",
  components: {
    ProjectPersonAndOrg,
    FruitProportion,

    JournalPaper,
    ConfPaper,
    MonographPaper,
    RewardPaper,
    PatentPaper
  },
  data() {
    return {
      markTab: 0,
      mark: 0,
      limit: 10,
      skip: 0,
      total: 0,
      projectId: "",
      projectInfoData: [],
      startTimeData: "", // 开始时间截取后
      entTimeData: "", // 结束时间截取后
      paperPersonAndOrgData: {},
      personName: "",
      fruitProportionData: [],

      journalPaperData: [],
      confPaperData: [],
      monographPaperData: [],
      rewardData: [],
      patentPaperData: [],
      loading: true
    };
  },
  created() {
    this.projectId = this.$route.query.projectId;
    this.getProjectPersonAndOrg();
  },
  mounted() {
    this.getProjectInfo();
    this.getProjectPersonAndOrg();
    this.handleFruitProportion();
    this.handleJournalPaper();
  },
  methods: {
    // 获取项目详细信息
    getProjectInfo() {
      var id = this.projectId;
      this.$axios
        .get("/basic/project", { params: { projectId: id } })
        .then(res => {
          if (res.data.code == 200) {
            this.projectInfoData = res.data.data.content;

            this.personName = this.projectInfoData.charge.personName;

            // 关键词处理
            let chineseKeywordData = [];
            let chineseKeyword = this.projectInfoData.chineseKeyword;
            let englishKeyword = this.projectInfoData.englishKeyword;
            for (var j = 0; j < chineseKeyword.length; j++) {
              let temp = {};
              temp = {
                value: chineseKeyword[j]
              };
              chineseKeywordData.push(temp);
            }
            for (var k = 0; k < englishKeyword.length; k++) {
              let obj = {};
              obj = {
                value: englishKeyword[k]
              };
              chineseKeywordData.push(obj);
            }
            this.projectInfoData.chineseKeywordData = chineseKeywordData;

            // 时间处理
            this.startTimeData = this.projectInfoData.startTime.slice(0, 10);
            this.entTimeData = this.projectInfoData.entTime.slice(0, 10);
          }
        });
    },
    // 人员机构关系图
    getProjectPersonAndOrg() {
      var id = this.projectId;
      //   var id = "8bf585cb40a54fe2a62b36ab222505f8";
      var data = {
        projectId: id,
        limit: this.limit
      };
      this.$axios
        .post("/project/projectPersonAndOrg", this.$qs.stringify(data))
        .then(res => {
          let data = res.data.data.content;
          let links = res.data.data.content.links;

          let nodesData = [];
          data.nodes.forEach(item => {
            if (item.type === "person") {
              if (item.index == "1") {
                nodesData.push({
                  category: "项目负责人",
                  id: item.id,
                  name: item.name,
                  itemStyle: {
                    color: "#91c7ae"
                  }
                });
              } else {
                nodesData.push({
                  category: "主要完成人",
                  id: item.id,
                  name: item.name,
                  itemStyle: {
                    color: "#ffa500"
                  }
                });
              }
            } else if (item.type === "org") {
              if (item.index == "1") {
                nodesData.push({
                  category: "依托单位",
                  id: item.id,
                  name: item.name,
                  itemStyle: {
                    color: "#ff69b4"
                  }
                });
              } else {
                nodesData.push({
                  category: "项目合作单位",
                  id: item.id,
                  name: item.name,
                  itemStyle: {
                    color: "#6dadd1"
                  }
                });
              }
            }
          });
          nodesData.push({
            category: "项目名称",
            name: this.projectInfoData.name,
            id: this.projectId,
            itemStyle: {
              color: "#ed2424"
            }
          });

          let categories = [
            {
              name: "项目名称"
            },
            {
              name: "依托单位"
            },
            {
              name: "项目合作单位"
            },
            {
              name: "项目负责人"
            },
            {
              name: "主要完成人"
            }
          ];

          this.paperPersonAndOrgData = {
            categories,
            data: nodesData,
            links
          };
        });
    },
    // 成果占比图
    handleFruitProportion() {
      var id = this.projectId;
      var data = {
        projectId: id
      };
      this.$axios
        .post("/project/fruitProportion", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.fruitProportionData = res.data.data.content;
          }
        });
    },
    // 成果产出列表
    markTabChange(key) {
      let mark = key ? key : this.markTab;
      switch (mark) {
        case 0:
          this.handleJournalPaper();
          break;
        case 1:
          this.handleConfPaper();
          break;
        case 2:
          this.handleMonographPaper();
          break;
        case 3:
          this.handleReward();
          break;
        case 4:
          this.handlePatentPaper();
        default:
          break;
      }
    },
    // tab 点击时请求接口
    handleTabChange(key) {
      this.markTab = key;
      this.offset = 0;
      this.limit = 10;
      this.current = 1;
      this.markTabChange(key);
    },
    // tab切换页数
    changePage(event) {
      this.skip = event - 1;
      this.markTabChange();
    },
    changeSizePage(event) {
      this.limit = event;
      this.markTabChange();
    },

    // 期刊论文
    handleJournalPaper() {
      this.loading = true;
      var data = {
        limit: this.limit,
        skip: this.skip,
        projectId: this.projectId,
        type: "journalPaper"
      };
      this.$axios
        .post("/project/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.journalPaperData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count;
          }
        });
    },
    //会议论文
    handleConfPaper() {
      this.loading = true;
      var data = {
        limit: this.limit,
        skip: this.skip,
        projectId: this.projectId,
        type: "confPaper"
      };
      this.$axios
        .post("/project/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.confPaperData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count;
          }
        });
    },
    // 著作
    handleMonographPaper() {
      this.loading = true;
      var data = {
        limit: this.limit,
        skip: this.skip,
        projectId: this.projectId,
        type: "monograph"
      };
      this.$axios
        .post("/project/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.monographPaperData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count;
          }
        });
    },
    // 奖励
    handleReward() {
      this.loading = true;
      var data = {
        limit: this.limit,
        skip: this.skip,
        projectId: this.projectId,
        type: "reward"
      };
      this.$axios
        .post("/project/fruitList", this.$qs.stringify(data))
        .then(res => {
          console.log(res)
          if (res.data.code == 200) {
            this.loading = false;
            this.rewardData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count;
          }
        });
    },
    // 专利
    handlePatentPaper() {
      this.loading = true;
      var data = {
        limit: this.limit,
        skip: this.skip,
        projectId: this.projectId,
        type: "patent"
      };
      this.$axios
        .post("/project/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.patentPaperData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count;
          }
        });
    },
    // 相关人员条状详情页
    handlePersonSetpath(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研人员" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
    // 相关机构跳转
    // 机构跳转
    handleOrgSetPath(name, path, id, mark) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);

      positionArr.push({
        pathName: "个人画像（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId: id } });
    }
  }
};
</script>

<style lang="scss" scope>
@import "../../../style/public.scss";
.projectList {
      margin-bottom: 50px;
}
.charge_personName,.organName{
  cursor: pointer;
}
.charge_personName:hover,.organName:hover {
  color:#1843A3;
  text-decoration: underline;
}
</style>