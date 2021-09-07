<template>
  <div>
    <div class="sc-details">
      <div class="sc-left">
        <div class="sc-le-top">
          <img class="img2" :src="orgData.picture" alt />
          <ul>
            <li>
              <img style="width: 14px;" src="../../../assets/images/04.png" alt />
              <label>机构名称：</label>
              <span>{{orgData.name}}</span>
            </li>
            <li>
              <img src="../../../assets/images/07.png" alt />
              <label>通讯地址：</label>
              <span>{{orgData.address == 'null'?'未知':orgData.address}}</span>
            </li>
            <li>
              <img src="../../../assets/images/08.png" alt />
              <label>联系电话：</label>
              <span>{{orgData.contact == 'null'?'未知':orgData.contact}}</span>
            </li>

            <li>
              <img src="../../../assets/images/09.png" alt />
              <label>网址：</label>
              <span>{{orgData.url == 'null'?'未知':orgData.url}}</span>
            </li>

            <li>
              <img src="../../../assets/images/10.png" alt />
              <label>上级主管单位：</label>
              <span
                v-for="subItem in orgData.parentOrganization"
                :key="subItem.organizationId"
              >{{subItem.organizationName == 'null'?'未知':subItem.organizationName}}</span>
            </li>
            <li>
              <p>
                <span>机构人数：{{orgData.personNum}}人</span>
              </p>
            </li>
          </ul>
        </div>

        <div class="sc-ri-box" v-if="orgData.intro">
          <div class="sc-box-top">
            <span class="active">机构简介</span>
          </div>
          <div class="sc-box-content">
            <p style="text-indent:2em;font-size:12px;">{{orgData.intro}}</p>
          </div>
        </div>
        <div class="sc-ri-box" v-if="orgData.OrgAcademicianData">
          <div class="sc-box-top">
            <span @click="handleChange(1)" :class="[change===1?'active':'']">院士</span>
            <span @click="handleChange(2)" :class="[change===2?'active':'']">重要人才计划</span>
          </div>
          <div class="sc-box-content">
            <div v-if="temp == 1">
              <OrgPerson :data="OrgAcademicianData" :change="change===1" :mark="orgId" />
            </div>
            <div v-if="temp !== 1">
              <TalentPlan :data="outstandingListData" :change="change===2" :mark="orgId" />
            </div>
          </div>
        </div>
        <div class="sc-ri-box" v-if="columnarData.status">
          <div class="sc-box-top">
            <span class="active">研究兴趣流图</span>
          </div>
          <div class="sc-box-content">
            <Columnar :data="columnarData" />
          </div>
        </div>
        <div class="sc-ri-box" v-if="achievementsContent.status">
          <div class="sc-box-top">
            <span class="active">学术成果图谱</span>
          </div>
          <div class="sc-box-content">
            <River :data="achievementsContent" />
          </div>
        </div>
        <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">历年研究兴趣图谱</span>
          </div>
          <div class="sc-box-content">
            <YearKeywords :data="yearKeywordsData" />
          </div>
        </div>
        <div class="sc-ri-box" v-if="paperNumAndRefData.status">
          <div class="sc-box-top">
            <span class="active">被引趋势图谱</span>
          </div>
          <div class="sc-box-content">
            <PaperNumAndRef :data="paperNumAndRefData" />
          </div>
        </div>

        <!-- <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">奖励信息</span>
          </div>
          <div class="sc-box-content">
            <OrgReward :data="OrgrewardData" :mark="orgId" />
          </div>
        </div>-->
        <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">成果统计图谱</span>
          </div>
          <div class="sc-box-content">
            <OutcomeStatistics :data="activityData" />
          </div>
        </div>
        <div class="tabs">
          <Tabs :animated="false" type="card" @on-click="handleTabChange">
            <TabPane :label="'中文期刊论文' + '(' + orgData.cnJournalPaperNum + ') '">
              <ChinesePaper :loading="loading" :data="ChinesePaperData" />
            </TabPane>
            <TabPane :label="'英文期刊论文'+ '(' + orgData.enJournalPaperNum + ') '">
              <EnglishPaper :loading="loading" :data="EnglishPaperData" />
            </TabPane>
            <TabPane :label="'会议论文' + '(' + orgData.conferencePaperNum + ') '">
              <MeetingPaper :loading="loading" :data="confPaperData" />
            </TabPane>
            <TabPane :label="'专利' + '(' + orgData.patentNum + ') '">
              <Patent :loading="loading" :data="patentData" />
            </TabPane>
            <TabPane :label="'标准' + '(' + orgData.criterionNum + ') '">
              <Standard :loading="loading" :data="criteriontData" @handle-details="handleDetails" />
            </TabPane>
            <TabPane :label="'专著' + '(' + orgData.monographNum + ') '">
              <Monograph :loading="loading" :data="monographData" />
            </TabPane>
            <TabPane label="奖励">
              <OrgReward :loading="loading" :data="OrgrewardData" :mark="orgId" />
            </TabPane>
            <TabPane :label="'项目' + '(' + orgData.projectNum + ') '">
              <ObjList :loading="loading" :data="projectData" @handle-details="handleDetails" />
            </TabPane>
            <!-- <TabPane label="重大科研任务" disabled></TabPane> -->
          </Tabs>
          <div class="sc-page" v-if="!loading">
            <span>检索到{{total}}篇</span>
            <Page
              :current.sync="currentPage"
              :total="total"
              @on-change="changePage"
              @on-page-size-change="changeSizePage"
              show-elevator
              show-sizer
            />
          </div>
        </div>
      </div>
      <!-- 机构合作网络挖掘 -->
      <div class="sc-right">
        <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">机构合作网络挖掘</span>
          </div>
          <div class="sc-box-content">
            <div class="sc-input">
              <label for="name">机构：</label>
              <input
                v-model="query_EQ_name"
                @change="handleFocus"
                @focus="handleFocus"
                @keyup.enter="getData"
                type="text"
                placeholder="输入格式：“机构名称"
              />
              <div class="filterSearch" v-show="tipIsShow">
                <div class="mask" @click.stop="handleClickQuery('close')"></div>
                <div class="sc-content">
                  <ul v-if="queryData.length!==0">
                    <li
                      v-for="(item,k) in queryData"
                      :key="k+'q'"
                      @click="handleClickQuery(item)"
                    >{{item.name}}</li>
                  </ul>
                  <!-- <ul v-else>
                    <li>暂无数据...</li>
                  </ul>-->
                </div>
              </div>
              <div class="sc-but">
                <i-button type="primary" size="small" @click="handleCooperation">查询</i-button>
                <i-button type="primary" size="small" @click="handleReset">重置</i-button>
              </div>
            </div>
            <div class="sc-person">
              <!-- <p @click="modal1 = true" style="cursor: pointer;">{{cooperator.name}}</p> -->
              <Modal v-model="modal1" title="合作详情" @on-ok="ok" @on-cancel="cancel" width="1000px">
                <Tabs :animated="false" @on-click="handleCooperationTab">
                  <TabPane label="中文期刊论文">
                    <CooperationChinesePaper :loading="loading" :data="CooperationOrgChinesePaper" />
                  </TabPane>
                  <TabPane label="英文期刊论文">
                    <CooperationEnglishPaper :loading="loading" :data="CooperationOrgEnglishPaper" />
                  </TabPane>
                  <TabPane label="会议论文">
                    <CooperationMeetingPaper :loading="loading" :data="CooperationOrgConfPaper" />
                  </TabPane>
                  <TabPane label="专利">
                    <CooperationPatent :loading="loading" :data="CooperationOrgPetent" />
                  </TabPane>
                  <TabPane label="标准">
                    <CooperationStandard :loading="loading" :data="CooperationOrgCriterion" />
                  </TabPane>
                  <TabPane label="专著">
                    <CooperationMonograph :loading="loading" :data="CooperationOrgMonograph" />
                  </TabPane>
                  <TabPane label="项目">
                    <CooperationObjList :loading="loading" :data="CooperationOrgProject" />
                  </TabPane>
                  <!-- <TabPane label="重大科研任务" disabled></TabPane> -->
                </Tabs>
                <div class="sc-page" v-if="!loading">
                  <span>检索到{{CooperationTotal}}篇</span>
                  <Page
                    :total="CooperationTotal"
                    @on-change="changePage"
                    @on-page-size-change="changeSizePage"
                    show-elevator
                    show-sizer
                  />
                </div>
              </Modal>
            </div>
          </div>
        </div>
        <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">机构影响力</span>
          </div>
          <div class="sc-box-content">
            <OrgInfluence :data="influenceGraphData" />
          </div>
        </div>
        <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">合作关系网络图谱</span>
          </div>
          <div class="sc-box-content">
            <CooperationNetwork :data="coopOrgsData" />
            <!-- <Relation :data="relationship" /> -->
          </div>
        </div>
        <div class="sc-ri-box" v-if="researchNetStatus">
          <div class="sc-box-top">
            <span class="active">期刊学会关系网络图谱</span>
          </div>
          <div class="sc-box-content">
            <StudyRelationship :data="studyRelationshipData" />
          </div>
        </div>
        <div class="sc-ri-box" v-if="JournalRankingStatus">
          <div class="sc-box-top">
            <span class="active">发表期刊排序图谱</span>
          </div>
          <div class="sc-box-content">
            <JournalRanking :data="JournalRankingData" :links="orgLinks" />
          </div>
        </div>
        <div class="sc-ri-box" v-if="wordCloudStatus">
          <div class="sc-box-top">
            <span class="active">高频词云图谱</span>
          </div>
          <div class="sc-box-content">
            <WordCloud :data="wordCloud" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "../../../api/index.js";
import OrgPerson from "./modules/OrgPerson"; //人才计划
import TalentPlan from "./modules/TalentPlan";
import River from "./modules/River"; //学术成果图谱
import OutcomeStatistics from "./modules/OutcomeStatistics"; //成果统计
import OrgReward from "./modules/OrgReward"; //奖励信息

import ObjList from "./modules/tab/ObjList"; //项目
import Task from "./modules/tab/Task"; //重大任务
import ChinesePaper from "./modules/tab/ChinesePaper"; //中文期刊论文
import EnglishPaper from "./modules/tab/EnglishPaper"; //英文期刊论文
import Patent from "./modules/tab/Patent"; //专利列表
import MeetingPaper from "./modules/tab/MeetingPaper"; //会议论文
import Monograph from "./modules/tab/Monograph"; //专著
import Standard from "./modules/tab/Standard"; //标准

import OrgInfluence from "./modules/OrgInfluence"; // 机构影响力
import CooperationNetwork from "./modules/CooperationNetwork"; //合作关系网络图
import StudyRelationship from "./modules/StudyRelationship"; //科研关系网络图
import JournalRanking from "./modules/JournalRanking"; //发表期刊排序图
import WordCloud from "./modules/WordCloud"; //高频词云
import Columnar from "./modules/Columnar"; //研究兴趣流图
import YearKeywords from "./modules/YearKeywords"; // 历年研究兴趣图
import PaperNumAndRef from "./modules/PaperNumAndRef"; // 被引趋势图

// 合作网络挖掘
import CooperationObjList from "../Modules/CooperationObjList"; //项目
import CooperationChinesePaper from "../Modules/CooperationChinesePaper"; //中文期刊论文
import CooperationEnglishPaper from "../Modules/CooperationEnglishPaper"; //英文期刊论文
import CooperationMeetingPaper from "../Modules/CooperationMeetingPaper"; //会议论文
import CooperationPatent from "../Modules/CooperationPatent"; //专利列表
import CooperationStandard from "../Modules/CooperationStandard"; //标准
import CooperationMonograph from "../Modules/CooperationMonograph"; //专著

import JournalImg from "../../../assets/icon/Journal.png"; // 期刊icon
import instituteImg from "../../../assets/icon/institute.png"; // 学会icon
import organImg from "../../../assets/icon/organ2.png"; // 机构icon

export default {
  name: "sc-details",
  components: {
    OrgPerson,
    TalentPlan,
    River,
    OutcomeStatistics,
    OrgReward,

    ObjList,
    Task,
    ChinesePaper,
    EnglishPaper,
    MeetingPaper,
    Standard,
    Patent,
    Monograph,
    // ThesisPaperh,
    OrgInfluence,
    CooperationNetwork,
    StudyRelationship,
    JournalRanking,
    WordCloud,
    Columnar,
    YearKeywords,
    PaperNumAndRef,

    CooperationObjList,
    CooperationChinesePaper,
    CooperationEnglishPaper,
    CooperationMeetingPaper,
    CooperationPatent,
    CooperationStandard,
    CooperationMonograph
  },
  data() {
    return {
      temp: 1,
      organizationId: "",
      organizationId2: "",
      orgData: {}, //机构详情
      limit: 10,
      currentPage: 1,
      type: "paper",
      // project 项目
      // paper 论文
      // criterion 标准
      // monograph 专著
      // patent 专利
      // task 任务
      wordCloud: [],
      wordCloudStatus: null,
      JournalRankingData: [],
      JournalRankingStatus: null,
      query_EQ_name: "",
      tipIsShow: false,
      queryData: [],
      orgId: "",
      startYear: "2000",
      endYear: "2019",
      achievementsContent: {}, //学术成果图谱
      activityData: {}, //成果统计图谱
      histogramData: {}, //人员组成统计
      coopOrgsData: {}, //机构合作网络
      influenceGraphData: [], // 机构影响力
      researchDirectionData: {}, //机构内人才研究方向
      offset: 0,
      skip: 0,
      current: 1,
      total: 0,
      pageShow: true,
      markTab: 0, //tab标志位
      personOrgData: {}, //机构下的人员
      paperOrgData: {}, //机构下的论文
      rewardOrgData: {}, //机构下的奖励
      loading: true, //加载动画

      relationship: [], //人员关联网络
      personownData: [], //人员与成果、项目、奖励、事件等的关联网络
      personownLinks: [],
      change: 1,
      modal1: false,
      mark: 1,
      meetingData: [],
      ChinesePaperData: {}, // 中文论文期刊
      EnglishPaperData: [], // 英文期刊论文
      confPaperData: {}, //  会议论文
      patentData: [], // 专利
      criteriontData: [], // 标准
      studyRelationshipData: {},
      researchNetStatus: "",
      taskOrgData: {},
      OrgrewardData: [], // 奖励信息
      OrgAcademicianData: {}, // 院士信息
      outstandingListData: {}, // 重要人才计划
      columnarData: [],
      projectData: [], // 项目列表
      cooperator: [],
      orgChinesePaperData: [],
      orgTotal: 0,
      monographData: [], // 专著
      thesisPaperhData: [], // 学位论文
      orgLinks: [],
      markTabs: 0,
      yearKeywordsData: [],
      paperNumAndRefData: [],

      //挖掘
      CooperationOrgProject: [],
      CooperationOrgChinesePaper: [],
      CooperationOrgEnglishPaper: [],
      CooperationOrgConfPaper: [],
      CooperationOrgPetent: [],
      CooperationOrgCriterion: [],
      CooperationOrgMonograph: [],
      CooperationTotal: 0
    };
  },
  watch: {
    query_EQ_name(newVal) {
      this.query_EQ_name = newVal;
      this.handleQuery();
    }
  },
  created() {
    this.organizationId = this.$route.query.orgId;
  },
  mounted() {
    this.organizationId = this.$route.query.orgId;
    this.getData();
    this.getAllData();
    this.getResultStatistics(); // 成果统计
    //this.getOrgreward(); // 奖励信息
    this.getOrgAcademician(); // 院士信息
    this.getOutstandingList(); // 重要人才计划
    this.getinterests(); // 研究兴趣流图
    this.handleChinesePaper(); // 项目列表
    this.cooperationGraph(); // 合作网络关系图
    this.handleYearKeywords(); // 历年研究兴趣图
    this.handlePaperNumAndRef(); // 被引趋势图
    this.handleOrgInfluenceGraph();
  },
  methods: {
    // 机构跳转
    handleDetails(id) {
      this.organizationId = id;
      window.history.pushState(
        "",
        "",
        "/organdetails?orgId=" + this.organizationId
      );
      this.getAllData();
      this.getResultStatistics(); // 成果统计
      //this.getOrgreward(); // 奖励信息
      this.getOrgAcademician(); // 院士信息
      this.getOutstandingList(); // 重要人才计划
      this.getinterests(); // 研究兴趣流图
      this.handleChinesePaper(); // 项目列表
      this.cooperationGraph(); // 合作网络关系图
      this.handleYearKeywords(); // 历年研究兴趣图
      this.handlePaperNumAndRef(); // 被引趋势图
      this.handleOrgInfluenceGraph();
    },
    ok() {},
    cancel() {},
    handleFocus() {
      this.tipIsShow = true;
    },
    // 下拉查询
    handleClickQuery(item) {
      this.tipIsShow = false;
      if (this.query_EQ_name !== "close") {
        this.cooperator = item;
        this.query_EQ_name = item.name;
        this.organizationId2 = item.organizationId;
      }
    },
    handleCooperation() {
      this.modal1 = true;
      this.handleCooperationOrgChinesePaper();
    },
    // 查询机构合作网络挖掘
    handleQuery() {
      if (this.query_EQ_name) {
        this.$axios
          .get("/manage/orgName", {
            params: { name: this.query_EQ_name }
          })
          .then(res => {
            this.queryData = res.data.data.content;
          });
      } else {
        this.queryData = [];
      }
      // this.getData();
    },
    // 重置
    handleReset() {
      this.organizationId = "";
      this.query_EQ_name = "";
      this.cooperator.name = "";
    },
    //请求详情数据
    getData() {
      this.relationalNetwork();
      this.$axios
        .get("/basic/org", {
          params: { organizationId: this.organizationId }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.orgData = res.data.data.content;
          }
        });
    },

    getAllData() {
      // this.modal1 = true;
      this.tipIsShow = false;
      this.getData();
      //高频词云
      this.$axios
        .post(
          "/org/keywordCloud",
          this.$qs.stringify({
            organizationId: this.organizationId,
            limit: 20
          })
        )
        .then(res => {
          this.wordCloud = res.data.data.content.result;
          this.wordCloudStatus = res.data.data.content.status;
          this.wordCloud.forEach(item => {
            item.value = item.count;
          });
        });
      //发表期刊排序图
      this.$axios
        .post(
          "/org/publishJournal",
          this.$qs.stringify({
            organizationId: this.organizationId,
            limit: this.limit
          })
        )
        .then(res => {
          this.JournalRankingStatus = res.data.data.content.status;
          let content = res.data.data.content.result,
            name = "数量",
            data = [],
            yAxis = [];
          for (const key in content) {
            yAxis.push(key);
            data.push(content[key]);
          }
          this.JournalRankingData = { name, data, yAxis };
        });

      //学术成果图谱
      let myDate = new Date();
      let year = myDate.getFullYear();
      this.$axios
        .post(
          "/org/orgFruit",
          this.$qs.stringify({
            organizationId: this.organizationId,
            year
          })
        )
        .then(res => {
          this.achievementsContent = res.data.data.content;
        });
    },
    // 历年研究兴趣图
    handleYearKeywords() {
      var date = new Date();
      let year = date.getFullYear();
      var data = {
        limit: this.limit,
        organizationId: this.organizationId,
        yearStart: "",
        yearEnd: year
      };
      this.$axios
        .post("/org/yearKeywords", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            let data = res.data.data.content,
              xAxis = [];
            data.forEach(item => {
              xAxis.push(item.year);
            });
            data = data.map(item => {
              return item.keywords;
            });
            this.yearKeywordsData = { xAxis, series: data };
          }
        });
    },
    // 被引趋势图
    handlePaperNumAndRef() {
      var date = new Date();
      let year = date.getFullYear();
      var data = {
        organizationId: this.organizationId,
        yearEnd: year,
        yearStart: ""
      };
      this.$axios
        .post("/org/paperNumAndRef", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.paperNumAndRefData = res.data.data.content;
          }
        });
    },
    // 机构影响力
    handleOrgInfluenceGraph() {
      var data = {
        organizationId: this.organizationId
      };
      this.$axios
        .post("/org/influenceGraph", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.influenceGraphData = res.data.data.content;
          }
        });
    },
    // 合作关系网络图
    cooperationGraph() {
      var data = {
        organizationId: this.organizationId,
        limit: this.limit,
        types: ""
      };
      this.$axios
        .post("/coop/netAnalysis", this.$qs.stringify(data))
        .then(res => {
          this.coopOrgsData = res.data.data.content;
        });
    },

    //科研关系网络图
    relationalNetwork() {
      this.$axios
        .post(
          "/org/researchNet",
          this.$qs.stringify({
            organizationId: this.organizationId,
            limit: this.limit
          })
        )
        .then(res => {
          if (res.data.code == 200) {
            let data = res.data.data.content;
            this.researchNetStatus = res.data.data.content.status;

            let nodes = [];
            nodes.push({
              category: "机构名称",
              name: this.orgData['name'],
              id: this.organizationId,
              symbol: "image://" + organImg,
              symbolSize: 25
              // itemStyle: {
              //   color: "#EE4000"
              // }
            });
            data.journal.forEach(item => {
              nodes.push({
                category: "期刊",
                id: item.id,
                name: item.name,
                symbol: "image://" + JournalImg,
                symbolSize: 20
              });
            });
            data.superior.forEach(item => {
              nodes.push({
                category: "学会",
                id: item.id,
                name: item.name,
                symbol: "image://" + instituteImg,
                symbolSize: 15
              });
            });
            console.log(nodes)
            //  this.orgLinks = res.data.data.content.links;
            let links = [];
            nodes.forEach(item => {
              links.push({
                source: this.organizationId,
                target: item.id
              });
            });
            let categories = [
              {
                name: "机构名称",
                icon: "image://" + organImg
              },
              {
                name: "期刊",
                icon: "image://" + JournalImg
              },
              {
                name: "学会",
                icon: "image://" + instituteImg
              }
            ];
            this.studyRelationshipData = {
              categories,
              data: nodes,
              links
            };
          }
        });
    },
    //奖励tab切换
    handleChange(val) {
      this.temp = val;
      this.change = val;
    },

    //机构下的人员
    getPersonOrgData() {
      API.getPersonOrgData(
        {
          "query_EQ_workExperience.orgId": this.orgId,
          offset: this.offset,
          limit: this.limit
        },
        res => {
          this.personOrgData = res.data.data.content;
          this.total = res.data.count * 1;
          this.loading = false;
        }
      );
    },
    //机构下的论文
    getPaperOrgData() {
      API.getPaperOrgData(
        { orgId: this.orgId, offset: this.offset, limit: this.limit },
        res => {
          this.paperOrgData = res.data.data.map((item, index, orArr) => {
            if (item.keywords) {
              let string = "",
                newArr = [];
              for (let i = 0; i < item.keywords.length; i++) {
                if (item.keywords[i].name) {
                  newArr.push({
                    name: item.keywords[i].name
                  });
                }
              }
              newArr.forEach(ele => {
                string = string + ele.name + "; ";
              });
              orArr[index].keywords = string;
            }
            //更新时间格式
            if (orArr[index].publishDate) {
              orArr[index].publishDate =
                item.publishDate.slice(0, 4) +
                "-" +
                item.publishDate.slice(4, 6) +
                "-" +
                item.publishDate.slice(6, 8);
            }
            return item;
          });
        }
      );
    },
    //机构下的奖励
    getRewardOrgData() {
      API.getRewardOrgData(
        { orgId: this.orgId, offset: this.offset, limit: this.limit },
        res => {
          if (res.data.data) {
            this.rewardOrgData = res.data.data.map(item => {
              item.activity.date =
                item.activity.date.slice(0, 4) +
                " - " +
                item.activity.date.slice(4, 6);
              return item.activity;
            });
          }
        }
      );
    },
    // 判断是否为null
    isNull(tmp) {
      if (!tmp && typeof tmp != "undefined" && tmp != 0) {
        return true;
      } else {
        return false;
      }
    },

    //去除空格
    myTrim(x) {
      return x.replace(/^\s+|\s+$/gm, "");
    },

    // 切换 项目列表 期刊论文 会议论文 标准 专利 专著 重大科研任务 学位论文
    markTabChange(key) {
      let mark = key ? key : this.markTab;
      switch (mark) {
        case 0: // 中文期刊
          this.handleChinesePaper();
          break;
        case 1: // 英文期刊
          this.handleEnglishPaper();
          break;
        case 2: // 会议论文
          this.handleConfPaperList();
          break;
        case 3: // 专利
          this.handlePatent();
          break;
        case 4: //标准
          this.handleCriterion();
          break;
        case 5: // 专著
          this.handleMonograph();
          break;
        case 6: // 奖励
          this.getOrgreward();
          break;
        case 7: // 项目
          this.handleProject();
          break;
        default:
          break;
      }
    },
    //tab 被点击时触发
    handleTabChange(key) {
      this.markTab = key;
      this.skip = 0;
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

    // 项目列表
    handleProject() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        skip: this.skip,
        limit: this.limit,
        type: "project"
      };
      this.$axios.post("/org/fruitList", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.projectData = res.data.data.content.fruitList;
          this.total = res.data.data.content.count;
        }
      });
    },

    // 中文期刊论文
    handleChinesePaper() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        skip: this.skip,
        limit: this.limit,
        type: "cJournalPaper"
      };
      this.$axios.post("/org/fruitList", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.ChinesePaperData = res.data.data.content.fruitList;
          this.total = res.data.data.content.count;
        }
      });
    },
    // 英文期刊论文
    handleEnglishPaper() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        skip: this.skip,
        limit: this.limit,
        type: "eJournalPaper"
      };
      this.$axios.post("/org/fruitList", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.EnglishPaperData = res.data.data.content.fruitList;
          this.total = res.data.data.content.count;
        }
      });
    },
    // 会议论文
    handleConfPaperList() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        skip: this.skip,
        limit: this.limit,
        type: "confPaper"
      };
      this.$axios.post("/org/fruitList", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.confPaperData = res.data.data.content.fruitList;
          this.total = res.data.data.content.count;
        }
      });
    },
    // 专利
    handlePatent() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        skip: this.skip,
        limit: this.limit,
        type: "patent"
      };
      this.$axios.post("/org/fruitList", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.patentData = res.data.data.content.fruitList;
          this.total = res.data.data.content.count;
        }
      });
    },
    // 标准
    handleCriterion() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        skip: this.offset,
        limit: this.limit,
        type: "criterion"
      };
      this.$axios.post("/org/fruitList", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.criteriontData = res.data.data.content.fruitList;
          this.total = res.data.data.content.count;
        }
      });
    },
    // 专著
    handleMonograph() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        skip: this.skip,
        limit: this.limit,
        type: "monograph"
      };
      this.$axios.post("/org/fruitList", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.monographData = res.data.data.content.fruitList;
          this.total = res.data.data.content.count;
        }
      });
    },

    // 成果统计
    getResultStatistics() {
      var id = this.organizationId;
      var data = {
        organizationId: id
      };
      this.$axios
        .post("/org/fruitTypeDistribution", this.$qs.stringify(data))
        .then(res => {
          this.activityData = res.data.data.content;
        });
    },
    // 奖励信息
    getOrgreward() {
      var id = this.organizationId;
      var limit = 10;
      var data = {
        organizationId: id,
        limit: limit
      };
      this.$axios.post("/org/awardList", this.$qs.stringify(data)).then(res => {
        if (res.data.code) {
          this.OrgrewardData = res.data.data.content;
          this.total = this.OrgrewardData.length;
        }
      });
    },
    // 院士信息
    getOrgAcademician() {
      var id = this.organizationId;
      var data = {
        organizationId: id,
        limit: this.limit
      };
      this.$axios
        .post("/org/academicianList", this.$qs.stringify(data))
        .then(res => {
          this.OrgAcademicianData = res.data.data.content;
        });
    },
    // 重要人才计划
    getOutstandingList() {
      var id = this.organizationId;
      var data = {
        organizationId: id,
        limit: this.limit
      };
      this.$axios
        .post("/org/outstandingList", this.$qs.stringify(data))
        .then(res => {
          this.outstandingListData = res.data.data.content;
        });
    },
    // 研究兴趣流图
    getinterests() {
      var year = new Date().getFullYear();
      var id = this.organizationId;
      var limit = 10;
      var data = {
        organizationId: id,
        limit: limit,
        year: year
      };
      this.$axios
        .post("/org/researchInter", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.columnarData = res.data.data.content;
          }
        });
    },

    // 机构合作网络挖掘
    CooperationTabChange(name) {
      let marks = name ? name : this.markTabs;
      switch (marks) {
        case 0: //中文期刊论文
          this.handleCooperationOrgChinesePaper();
          break;
        case 1: // 英文期刊论文
          this.handleCooperationOrgEnglishPaper();
          break;
        case 2: // 会议论文
          this.handleCooperationOrgConfPaper();
          break;
        case 3: // 专利
          this.handleCooperationOrgPetent();
          break;
        case 4: // 标准
          this.handleCooperationOrgCriterion();
          break;
        case 5: // 专著
          this.handleCooperationOrgMonograph();
          break;
        case 6: // 项目
          this.handleCooperationOrgProject();
          break;
        default:
          break;
      }
    },
    handleCooperationTab(name) {
      this.markTabs = name;
      this.offset = 0;
      this.limit = 10;
      this.current = 1;
      this.CooperationTabChange(name);
    },
    // 1.项目
    handleCooperationOrgProject() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        cooperatorId: this.organizationId2,
        skip: this.skip,
        limit: this.limit,
        type: "project"
      };
      this.$axios
        .post("/org/orgCooperator", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.CooperationOrgProject = res.data.data.content.fruitList;
            this.CooperationTotal = res.data.data.content.count;
          }
        });
    },

    // 2.中文期刊
    handleCooperationOrgChinesePaper() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        cooperatorId: this.organizationId2,
        skip: this.skip,
        limit: this.limit,
        type: "cJournalPaper"
      };
      this.$axios
        .post("/org/orgCooperator", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.CooperationOrgChinesePaper = res.data.data.content.fruitList;
            this.CooperationTotal = res.data.data.content.count;
          }
        });
    },
    // 3.英文期刊
    handleCooperationOrgEnglishPaper() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        cooperatorId: this.organizationId2,
        skip: this.skip,
        limit: this.limit,
        type: "eJournalPaper"
      };
      this.$axios
        .post("/org/orgCooperator", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.CooperationOrgEnglishPaper = res.data.data.content.fruitList;
            this.CooperationTotal = res.data.data.content.count;
          }
        });
    },
    // 4.会议论文
    handleCooperationOrgConfPaper() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        cooperatorId: this.organizationId2,
        skip: this.skip,
        limit: this.limit,
        type: "confPaper"
      };
      this.$axios
        .post("/org/orgCooperator", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.CooperationOrgConfPaper = res.data.data.content.fruitList;
            this.CooperationTotal = res.data.data.content.count;
          }
        });
    },
    // 5.专利
    handleCooperationOrgPetent() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        cooperatorId: this.organizationId2,
        skip: this.skip,
        limit: this.limit,
        type: "patent"
      };
      this.$axios
        .post("/org/orgCooperator", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.CooperationOrgPetent = res.data.data.content.fruitList;
            this.CooperationTotal = res.data.data.content.count;
          }
        });
    },
    // 6.标准
    handleCooperationOrgCriterion() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        cooperatorId: this.organizationId2,
        skip: this.skip,
        limit: this.limit,
        type: "criterion"
      };
      this.$axios
        .post("/org/orgCooperator", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.CooperationOrgCriterion = res.data.data.content.fruitList;
            this.CooperationTotal = res.data.data.content.count;
          }
        });
    },
    // 7.专著
    handleCooperationOrgMonograph() {
      this.loading = true;
      var data = {
        organizationId: this.organizationId,
        cooperatorId: this.organizationId2,
        skip: this.skip,
        limit: this.limit,
        type: "monograph"
      };
      this.$axios
        .post("/org/orgCooperator", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.CooperationOrgMonograph = res.data.data.content.fruitList;
            this.CooperationTotal = res.data.data.content.count;
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
// @import "../../../style/talentlist.scss";
@import "../../../style/details.scss";
.tabs {
  /deep/ .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
    font-size: 12px;
    padding: 5px 10px 4px;
  }
  /deep/ .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
    font-size: 12px;
    padding: 5px 10px 4px;
  }
}
.relation .MyRelation .circle .circle-tip {
  width: 130px;
}
.sc-input {
  display: flex;
  align-items: center;
}
.sc-search .sc-input label {
  width: 87px;
}
.ivu-poptip-popper {
  margin-top: 12px;
  left: 0px;
  top: 28px;
  width: 300px;
  .scrollbar {
    overflow-y: auto;
    max-height: 250px;
    ul {
      text-align: left;
      .poptip-body {
        padding: 0;
        // border-bottom: 1px solid #ddd;
        line-height: 2.1;
        cursor: pointer;
        .oName:hover {
          color: #2d8cf0;
        }
      }
    }
  }
}
.ivu-poptip-popper:after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  top: -7px;
  left: 45px;
  border-width: 1px 0 0 1px;
  border-style: solid;
  border-color: #000;
  background: #fff;
  transform: rotate(45deg);
  transition: opacity 0.3s ease-in;
}
.sc-ivu-page span {
  font-weight: 700;
  font-size: 14px;
  color: #989898;
  line-height: 20px;
}
.ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  font-size: 13px !important;
}
.sc-input {
  position: relative;
  display: -webkit-inline-box !important;
  input {
    width: 180px !important;
  }
  .filterSearch {
    position: absolute;
    width: 280px;
    top: 50px;
    left: 10%;
    border-radius: 3px;
    border: 1px solid #ddd;
    background: #fff;
    z-index: 99999;
    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
    }
    ::-webkit-scrollbar {
      width: 4px;
      height: 1px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(112, 111, 111, 0.2);
      border-radius: 10px;
      background: #ededed;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #ccc;
    }

    .sc-content {
      max-height: 300px;
      overflow: hidden;
      overflow-y: auto;
      width: 100%;
      background-color: #fff;
      ::after {
        content: "";
        position: absolute;
        width: 12px;
        height: 12px;
        top: -7px;
        left: 40px;
        border-width: 1px 0 0 1px;
        border-style: solid;
        border-color: #ddd;
        background: #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        -webkit-transition: opacity 0.3s ease-in;
        transition: opacity 0.3s ease-in;
        z-index: -1;
      }
      li {
        line-height: 24px;
        font-size: 13px;
        cursor: pointer;
        margin-left: 10px;
      }
      li:hover {
        color: #1843a3;
      }
    }
  }
}
</style>