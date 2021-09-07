<template>
  <div>
    <div class="sc-details">
      <div class="sc-left">
        <div class="sc-le-top">
          <!-- <img class="img1" :src="personData.avatar" /> -->
          <img :src="personData.picture" alt class="img1" />
          <ul>
            <li>
              <img src="../../../assets/images/01.png" />
              <div>
                <label>姓名：</label>
                <span>{{personData.name?personData.name:'未知'}}</span>
              </div>
            </li>
            <li>
              <img src="../../../assets/images/02.png" />
              <div>
                <label>职称：</label>
                <span
                  v-for="(list,index) in personData.currentTitle"
                  :key="index + 'c'"
                >{{list.title?list.title:'未知'}}</span>
              </div>

              <!-- <span>职称：{{personData.isAcademician===1?'院士':'未知'}}</span> -->
            </li>
            <li>
              <img src="../../../assets/images/03.png" />
              <div>
                <label>职务：</label>
                <span
                  v-for="(list,index) in personData.currentPosition"
                  :key="index + 'c'"
                >{{list.title?list.title:'未知'}}</span>
              </div>
            </li>
            <li>
              <img src="../../../assets/images/04.png" />
              <div>
                <label>单位：</label>
                <span
                  v-for="list in personData.currentOrganization"
                  :key="list.organizationId"
                >{{list.organizationName?list.organizationName:'未知'}}</span>
              </div>
            </li>
            <li>
              <img src="../../../assets/images/05.png" alt />
              <div>
                <label>研究领域：</label>
                <span style="margin-right: 8px;" v-for="(list,index) in subjectData" :key="index + 'y'">{{list.rankName + '；'}}</span>
              </div>
            </li>
            <li>
              <img src="../../../assets/images/06.png" alt />
              <div>
                <label>影响力分数：</label>
                <span>{{personData.influence}}</span>
              </div>
            </li>
            <li class="statistics">
              <div>
                <label>论文数：</label>
                <span>{{personData.total}}</span>
              </div>
              <div>
                <label>被引数：</label>
                <span>{{personData.referenceNum}}</span>
              </div>
              <div>
                <label>专利：</label>
                <span>{{personData.patentNum}}</span>
              </div>
              <div>
                <label>专著：</label>
                <span>{{personData.monographNum}}</span>
              </div>
            </li>
          </ul>
          <div class="sc-tu"></div>
        </div>
        <div class="sc-ri-box" v-if="personData.briefDescription">
          <div class="sc-box-top">
            <span class="active">个人简介</span>
          </div>
          <div class="sc-box-content">
            <Profile :data="personData.briefDescription" />
          </div>
        </div>
        <div class="sc-ri-box" v-if="personData.socialTitle">
          <div class="sc-box-top">
            <span class="active">社会任职</span>
          </div>
          <div class="sc-box-content">
            <TakeOffice :data="personData.socialTitle" />
          </div>
        </div>
        <div class="sc-ri-box" v-if="AchievementRewardData.length">
          <div class="sc-box-top">
            <span @click="handleRewardChange(1)" :class="[rewardChange===1?'active':'']">成果奖励</span>
            <!-- <span @click="handleRewardChange(2)" :class="[rewardChange===2?'active':'']">个人奖励</span> -->
          </div>
          <div class="sc-box-content">
            <Reward :data="AchievementRewardData" :change="rewardChange===1" />
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
        <div class="sc-ri-box" v-if="yearKeywordsData.status">
          <div class="sc-box-top">
            <span class="active">历年研究兴趣图</span>
          </div>
          <div class="sc-box-content">
            <YearKeywords :data="yearKeywordsData" />
          </div>
        </div>
        <div class="sc-ri-box" v-show="activityData.status">
          <div class="sc-box-top">
            <span class="active">被引用量变化图谱</span>
          </div>
          <div class="sc-box-content">
            <Activity :data="activityData" />
          </div>
        </div>
        <!-- <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">学习任职关系图</span>
          </div>
          <div class="sc-box-content">
          <Studying :data="ExperienceData"/>
          </div>
        </div>-->
        <!-- <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">学术历程</span>
          </div>
          <div
            class="sc-box-content skillBox"
            v-if="personData.education || personData.overSeaExperience || personData.workExperience || personData.postdoctor"
          >
            <table>
              <thead>
                <tr style="border-bottom:1px solid #ccc;color:#2d8cf0;font-size:13px;">
                  <td style="width: 10%;">开始时间</td>
                  <td style="width: 10%;">结束时间</td>
                  <td style="width: 25%;">专业/研究方向/职务或角色</td>
                  <td style="width: 20%;">学位/职称</td>
                  <td style="width: 25%;">机构</td>
                  <td style="width: 10%;">国家</td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,index) in personData.education"
                  :key="index + 'h'"
                  style="font-size: 12px;"
                >
                  <td>{{item.startDate == "00000000"?'未知时间':item.startDate}}</td>
                  <td>{{item.endDate == "00000000"?'未知时间':item.endDate}}</td>
                  <td>{{item.major}}</td>
                  <td>{{item.degree}}</td>
                  <td>{{item.organization}}</td>
                  <td></td>
                </tr>
                <tr
                  v-for="(item,index) in personData.overSeaExperience"
                  :key="index + 'o'"
                  style="font-size: 12px;"
                >
                  <td>{{item.startDate== "00000000"?'未知时间':item.startDate}}</td>
                  <td>{{item.endDate== "00000000"?'未知时间':item.endDate}}</td>
                  <td>{{item.major}}</td>
                  <td>{{item.title}}</td>
                  <td>{{item.organization}}</td>
                  <td></td>
                </tr>
                <tr
                  v-for="(item,k) in personData.workExperience"
                  :key="k+'z'"
                  style="font-size: 12px;"
                >
                  <td>{{item.startDate== "00000000"?'未知时间':item.startDate}}</td>
                  <td>{{item.endDate== "00000000"?'未知时间':item.endDate}}</td>
                  <td>{{item.organizationName }}</td>
                  <td>{{item.organizationName || item.title}}</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr
                  v-for="(item,index) in personData.postdoctor"
                  :key="index +'b'"
                  style="font-size: 12px;"
                >
                  <td>{{item.startDate== "00000000"?'未知时间':item.startDate}}</td>
                  <td>{{item.endDate== "00000000"?'未知时间':item.endDate}}</td>
                  <td>{{item.major}}</td>
                  <td>{{item.organization}}</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="sc-box-content no-data" v-else>暂无数据</div>
        </div>-->
        <div class="tabs">
          <Tabs :animated="false" type="card" @on-click="handleTabChange">
            <TabPane :index="50" :label="'中文期刊论文' + '(' + personData.cnJournalPaperNum + ') '">
              <ChinesePaper
                :data="chinesePaperData"
                :loading="loading"
                @handle-details="handleDetails"
              />
            </TabPane>
            <TabPane :label="'英文期刊论文'+ '(' + personData.enJournalPaperNum + ') '">
              <EnglishPaper
                :data="EnglishPaperData"
                :loading="loading"
                @handle-details="handleDetails"
              />
            </TabPane>
            <TabPane :label="'会议论文' + '(' + personData.conferencePaperNum + ') '">
              <MeetingPaper
                :data="ConfPaperData"
                :loading="loading"
                @handle-details="handleDetails"
              />
            </TabPane>
            <TabPane :label="'标准' + '(' + personData.criterionNum + ') '">
              <Standard :data="criterionData" :loading="loading" />
            </TabPane>
            <TabPane :index="300" :label="'专利' + '(' + personData.patentNum + ') '">
              <Patent :data="patentData" :loading="loading" @handle-details="handleDetails" />
            </TabPane>
            <TabPane :label="'专著' + '(' + personData.monographNum + ') '">
              <Monograph :data="monographData" :loading="loading" @handle-details="handleDetails" />
            </TabPane>
            <TabPane :label="'项目' + '(' + personData.projectNum + ') '">
              <ObjList
                :data="personProjectData"
                :loading="loading"
                @handle-details="handleDetails"
              />
            </TabPane>
          </Tabs>
          <div class="sc-page" v-show="!loading">
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
      <div class="sc-right">
        <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">人才合作网络挖掘</span>
          </div>
          <div class="sc-box-content">
            <div class="sc-input">
              <label>姓名：</label>
              <input
                v-model="query_EQ_name"
                @focus="handleFocus"
                @keyup.enter="getData"
                type="text"
                placeholder="输入格式：“人员姓名：机构名称”"
              />
              <div class="filterSearch" v-show="tipIsShow">
                <div class="mask" @click.stop="handleClickQuery('close')"></div>
                <div class="sc-content">
                  <ul v-if="personContent.length!==0">
                    <li
                      v-for="(item,k) in personContent"
                      :key="k+'q'"
                      @click="handleClickQuery(item)"
                    >{{item.name + '：' + item.organization}}</li>
                  </ul>
                </div>
              </div>
              <div class="sc-but">
                <i-button type="primary" size="small" @click="handleCooperation">查询</i-button>
                <i-button type="primary" size="small" @click="handleReset('updata')">重置</i-button>
              </div>
            </div>
            <div class="sc-person">
              <!-- <p
                @click="modal1 = true"
                style="cursor: pointer;"
              >{{cooperator.name}}{{cooperator.organization}}</p>-->
              <Modal v-model="modal1" title="合作详情" @on-ok="ok" @on-cancel="cancel" width="1000px">
                <Tabs :animated="false" @on-click="handleCooperationTab">
                  <TabPane label="中文期刊论文">
                    <CooperationChinesePaper
                      :loading="loading"
                      :data="CooperationOrgChinesePaperData"
                    />
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
            <span class="active">个人影响力</span>
          </div>
          <div class="sc-box-content">
            <PersonalInfluence :data="InfluenceGraphData" />
          </div>
        </div>
        <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">合作人员图谱</span>
          </div>
          <div class="sc-box-content">
            <Relation :data="relationship" />
          </div>
        </div>

        <div class="sc-ri-box">
          <div class="sc-box-top">
            <span class="active">相关学者推荐</span>
          </div>
          <div class="sc-box-content">
            <CooperationList :data="cooperationListData" @handle-details="handleDetails" />
          </div>
        </div>
        <div class="sc-ri-box" v-if="JournalRankingData.status">
          <div class="sc-box-top">
            <span class="active">发表期刊分布图</span>
          </div>
          <div class="sc-box-content">
            <JournalRanking :data="JournalRankingData" />
          </div>
        </div>
        <div class="sc-ri-box" v-if="wordCloudStatus">
          <div class="sc-box-top">
            <span class="active">高频词云</span>
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

import Profile from "./modules/Profile"; //个人简介
import TakeOffice from "./modules/TakeOffice"; //社会任职
import Reward from "./modules/Reward"; //成果奖励
import River from "./modules/River"; //学术成果图谱
import Activity from "./modules/Activity"; //被引用量变化图谱
import Columnar from "./modules/Columnar"; //研究兴趣流图
import Radar from "./modules/Radar"; //雷达

import ObjList from "./modules/tab/ObjList";
import ChinesePaper from "./modules/tab/ChinesePaper";
import MeetingPaper from "./modules/tab/MeetingPaper";
import Standard from "./modules/tab/Standard";
import Patent from "./modules/tab/Patent";
import Monograph from "./modules/tab/Monograph";
// import ThesisPaper from "./modules/tab/ThesisPaper";

import Relation from "./modules/Relation"; //人员关联网络
import CooperationList from "./modules/CooperationList"; //合作者
import JournalRanking from "./modules/JournalRanking"; //发表期刊排序图
import WordCloud from "./modules/WordCloud"; //高频词云
import PersonalInfluence from "./modules/PersonalInfluence"; // 个人影响力
//import Studying from "./modules/Studying" // 学习任职图
import EnglishPaper from "./modules/tab/EnglishPaper";
import YearKeywords from "./modules/YearKeywords"; // 历年研究兴趣图（关键词）

// 合作网络挖掘
import CooperationObjList from "../Modules/CooperationObjList";
import CooperationChinesePaper from "../Modules/CooperationChinesePaper";
import CooperationEnglishPaper from "../Modules/CooperationEnglishPaper";
import CooperationMeetingPaper from "../Modules/CooperationMeetingPaper";
import CooperationPatent from "../Modules/CooperationPatent";
import CooperationStandard from "../Modules/CooperationStandard";
import CooperationMonograph from "../Modules/CooperationMonograph";

// 小图标
import person1 from "../../../assets/icon/person1.png";
import person2 from "../../../assets/icon/person2.png";
import person3 from "../../../assets/icon/person3.png";

export default {
  name: "sc-details",
  components: {
    Radar,
    Profile,
    TakeOffice,
    Reward,
    River,
    Columnar,
    Activity,
    ObjList,
    ChinesePaper,
    MeetingPaper,
    Standard,
    Patent,
    PersonalInfluence,
    // ThesisPaper,

    Relation,
    CooperationList,
    JournalRanking,
    WordCloud,
    // Studying,
    Monograph,
    EnglishPaper,
    CooperationObjList,
    CooperationChinesePaper,
    CooperationEnglishPaper,
    CooperationMeetingPaper,
    CooperationPatent,
    CooperationStandard,
    CooperationMonograph,
    YearKeywords
  },
  data: () => ({
    loading: true,
    id: 0,
    personId: "", //人员唯一 ID
    workExperience: [], //个人经历
    personData: {}, //人员信息
    paperTotal: 10, //论文数量
    paperContent: [],
    skip: 0,
    offset: 0,
    limit: 10,
    total: 0,
    rewardChange: 1,
    subjectData: [],
    pageSizeOpts: [5, 10, 15, 20, 25, 30, 35, 40],
    relationship: [], //人员关联网络
    relationshipArr: {}, //人员关联网络
    achievementsContent: {}, //学术成果图谱
    yearKeywordsData: [],
    statisticsContent: [], //研究兴趣图谱
    statisticsType: [], //研究兴趣图谱
    InfluenceGraphData: [], // 个人影响力
    activityData: {},
    personownData: [], //人员与成果、项目、奖励、事件等的关联网络
    AchievementRewardData: [],
    personownLinks: [], //
    query_EQ_chineseName: "", //姓名
    tipIsShow: false,
    personContent: [],
    contentData: [], //所有数据缓存
    personProjectData: [], // 项目列表
    chinesePaperData: [], //中文期刊论文
    EnglishPaperData: [], // 英文期刊
    ConfPaperData: [], // 会议论文
    thesisPaperData: [], // 学位论文
    criterionData: [], // 标准
    patentData: [], // 专利
    monographData: [], // 专著
    pageShow: true,
    markTab: 0, //tab标志位
    beginYear: 2010,
    endYear: 0,
    profile:
      "中国科学院院士，现任哈尔滨工业大学（深圳）教授。1963年毕业于中国科学技术大学地球物理系空间物理专业，1980-1982，1994年先后到美国、德国做访问学者；1988年中国科学院空间科学与应用研究中心研究员；1990年国务院第四批博士生导师；1988-2006年，先后任国际TIP.SOLTIP CAWSES/space weather委员、中国召集人；1993-2002年先后建立我国日球物理数值开放实验室、中科院空间天气学重点实验室主任（2005年晋升为国家重点实验室）。2002年前先后获国家自然科学二等奖（第一获奖人）等国家和部委奖6项；2007年获何梁何利基金科学与技术进步奖——地球科学奖；1993提出国家大科学工程——“子午工程”科学构想，任总体组、工作组组长和科技委主任；2002年提出“国际空间天气子午圈计划”建议, 后批准为科技部重大国际合作项目；1995年起先后主持“八五”、“九五”和“十一五”国家重大基金项目，自2002年至今任国家基金委地学部“日地空间环境和空间天气”优先发展领域学科指导小组组长，先后负责主持我国空间天气保障能力、空间科学、数字空间等中科院咨委会批准的学科发展战略研究。",
    wordCloud: [],
    mark: 1,
    marks: true,
    meetingData: [],
    heZuoChange: 1,
    servingData: [],
    chengGuoRewardData: {},
    cooperationListData: [],
    JournalRankingData: [],
    columnarData: [],
    sum: 1,
    topN: 10, //默认显示的关键词个数
    query_EQ_chineseName: "", //姓名
    query_EQ_workExperienceOrgName: "", //研究机构
    query_EQ_outstandingName: "", //人才类型
    query_EQ_workExperienceProvince: "", //地域分布
    field: "", //研究领域
    institutionstype: "", //机构类别
    thetitle: "", //职称
    sortField: "a", //排序字段
    query_EQ_personId: "", //查询人员id
    //左侧条件
    group_EQ_workExperienceOrgName: "", //机构名
    group_EQ_workExperienceProvince: "", //职称
    group_EQ_outstandingName: "", //学科领域名字
    cooperator: {}, //合作者相关信息
    modal1: false,
    clicktype: "project", //点击的数据类型默认显示project
    // paperNums: [],
    ExperienceData: [],
    // 人才合作网络弹框Tab
    cooperationTotal: 0,
    chainsesJouralData: [],
    conferencePaperData: [],
    cooperationCriterionData: [],
    patentDataList: [],
    monographDataList: [],
    chainsesJouralEnglishData: [],
    query_EQ_name: "",
    personId2: "",
    markTabs: 0,
    CooperationTotal: 0,
    wordCloudStatus: null, // 判断高云词频显示隐藏

    //挖掘
    CooperationOrgProject: [],
    CooperationOrgChinesePaperData: [],
    CooperationOrgEnglishPaper: [],
    CooperationOrgConfPaper: [],
    CooperationOrgPetent: [],
    CooperationOrgCriterion: [],
    CooperationOrgMonograph: []
  }),
  watch: {
    query_EQ_name(newVal) {
      this.query_EQ_name = newVal;
      this.handleenter();
    }
  },
  created() {
    this.loading = true;
    this.personId = this.$route.query.personId;
    // this.id = this.$route.query.id;

    let date = new Date();
    this.endYear = date.getFullYear();
    // this.getAllData();
  },
  mounted() {
    // this.personId = this.$route.query.id;

    this.handleChinesePaper();
    this.getpersoninfo();
    this.getfrequency();
    this.getjournal();
    this.getcooperation();
    this.getacademic();
    this.getamount();
    // this.getjournalpaper();
    this.getinterests();
    // this.getSocialoffice();
    this.getWorkingpersonnel();
    this.getAchievementReward(); // 人员奖励
    //this.getpaperNums(); //论文数
    this.getInfluenceGraph(); // 个人影响力
    this.handleYearKeywords(); // 历年研究兴趣图（关键词）
      this.handleSubject();

  },
  methods: {
    // 相关学者推荐
    handleDetails(id) {
      this.personId = id;
      window.history.pushState(
        "",
        "",
        "/persondetails?personId=" + this.personId
      );

      this.handleChinesePaper();
      this.getpersoninfo();
      this.getfrequency();
      this.getjournal();
      this.getcooperation();
      this.getacademic();
      this.getamount();
      this.getinterests();
      this.getWorkingpersonnel();
      this.getAchievementReward(); // 人员奖励
      //this.getpaperNums(); //论文数
      this.getInfluenceGraph(); // 个人影响力
      this.handleYearKeywords(); // 历年研究兴趣图（关键词）
      this.handleSubject();
    },

    // 获取人员详细信息  学术历程（公用一个接口）
    getpersoninfo() {
      var id = this.personId;
      var url = `/basic/person`;
      this.$axios.get(url, { params: { personId: id } }).then(res => {
        if (res.data.code == 200) {
          this.personData = res.data.data.content;
        }
      });
    },
    // 学科邻域
    handleSubject() {
      this.$axios.get("/person/subject",{params: {personId: this.personId}}).then(res => {
        if(res.data.code == 200) {
          this.subjectData = res.data.data.content;
        }
      })
    },
    // getpaperNums() {
    //   var id = this.personId;
    //   this.$axios
    //     .post("/person/staticNumber", { params: { personId: id } })
    //     .then(res => {
    //       this.paperNums = res.data.data.content;
    //     });
    // },
    // 获取个人简介
    // 获取社会任职
    // 获取成果奖励
    getAchievementReward() {
      var limit = 10;
      var id = this.personId;
      var data = {
        personId: id,
        limit: limit
      };
      this.$axios
        .post("/person/awardList", this.$qs.stringify(data))
        .then(res => {
          this.AchievementRewardData = res.data.data.content;
        });
    },
    // 获取学术成果图谱
    getacademic() {
      var year = new Date().getFullYear();
      var id = this.personId;
      var data = {
        year: year,
        personId: id
      };
      this.$axios.post("/person/fruit", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.achievementsContent = res.data.data.content;
        }
      });
    },
    // 历年研究兴趣图（关键词）
    handleYearKeywords() {
      var date = new Date();
      let year = date.getFullYear();
      var data = {
        limit: this.limit,
        personId: this.personId,
        yearEnd: year,
        yearStart: ""
      };
      this.$axios
        .post("/person/yearKeywords", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.yearKeywordsData = res.data.data.content;
          }
        });
    },
    // 被引用量变化图谱
    getamount() {
      var year = new Date().getFullYear();
      var id = this.personId;
      var data = {
        year: year,
        personId: id
      };
      this.$axios
        .post("/person/referenceChange", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.activityData = res.data.data.content;
          }
        });
    },
    // 研究兴趣流图
    getinterests() {
      var year = new Date().getFullYear();
      var id = this.personId;
      var topN = this.topN;
      // var limit = 5;
      var year = 2019;
      var data = {
        personId: id,
        topN: topN,
        year: year
      };
      this.$axios
        .post("/person/researchInter", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.columnarData = res.data.data.content;
          }
        });
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
          this.handleConfPaper();
          break;
        case 3: // 标准
          this.handleCriterion();
          break;
        case 4: //专利
          this.handlePatent();
          break;
        case 5: // 专著
          this.handleMonograph();
          break;
        case 6:
          this.handleProject();
          break;
        default:
          break;
      }
    },
    //tab 被点击时触发
    handleTabChange(key) {
      this.markTab = key;
      this.offset = 0;
      this.limit = 10;
      this.current = 1;
      this.markTabChange(key);
    },
    // tab切换页数
    changePage(event) {
      this.offset = event - 1;
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
        personId: this.personId,
        skip: this.offset,
        limit: this.limit,
        type: "project"
      };
      this.$axios
        .post("/person/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.personProjectData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count * 1;
          }
        });
    },
    // 中文期刊论文
    handleChinesePaper() {
      this.loading = true;
      var data = {
        personId: this.personId,
        skip: this.offset,
        limit: this.limit,
        type: "cJournalPaper"
      };
      this.$axios
        .post("/person/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.chinesePaperData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count * 1;
          }
        });
    },
    // 英文期刊
    handleEnglishPaper() {
      this.loading = true;
      var data = {
        personId: this.personId,
        skip: this.offset,
        limit: this.limit,
        type: "eJournalPaper"
      };
      this.$axios
        .post("/person/fruitList", this.$qs.stringify(data))
        .then(res => {
          this.loading = false;
          this.EnglishPaperData = res.data.data.content.fruitList;
          this.total = res.data.data.content.count;
        });
    },
    // 会议论文
    handleConfPaper() {
      this.loading = true;
      var data = {
        personId: this.personId,
        skip: this.offset,
        limit: this.limit,
        type: "confPaper"
      };
      this.$axios
        .post("/person/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.ConfPaperData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count * 1;
          }
        });
    },
    // 标准
    handleCriterion() {
      this.loading = true;
      var data = {
        personId: this.personId,
        skip: this.offset,
        limit: this.limit,
        type: "criterion"
      };
      this.$axios
        .post("/person/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.criterionData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count * 1;
          }
        });
    },

    // 专利
    handlePatent() {
      this.loading = true;
      var data = {
        personId: this.personId,
        skip: this.offset,
        limit: this.limit,
        type: "patent"
      };
      this.$axios
        .post("/person/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.patentData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count * 1;
          }
        });
    },

    // 专著
    handleMonograph() {
      this.loading = true;
      var data = {
        personId: this.personId,
        skip: this.offset,
        limit: this.limit,
        type: "monograph"
      };
      this.$axios
        .post("/person/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.monographData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count * 1;
          }
        });
    },
    // 重大科研任务
    // 学位论文
    getpaperPaper() {
      var id = this.personId;
      var type = "thesisPaper";
      var data = {
        personId: id,
        skip: this.offset,
        limit: this.limit,
        type: type
      };
      this.$axios
        .post("/person/fruitList", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.thesisPaperData = res.data.data.content.fruitList;
            this.total = res.data.data.content.count * 1;
          }
        });
    },

    // 人才合作网络挖掘

    //  同单位合作人员  其他单位合作人员
    getWorkingpersonnel() {
      var data = {
        limit: this.limit,
        personId: this.personId,
        types: ""
      };
      this.$axios.post("/coop/network", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          let data = res.data.data.content;
          let links = res.data.data.content.links;
          let nodesData = [];
          data.nodes.forEach(item => {
            if(item.group == '0') {
              nodesData.push({
                category: "人员名称",
                personId: item.personId,
                label: item.label,
                organizationName: item.organization,
                symbol: "image://" + person1,
                symbolSize: 25
              });
            }else if(item.group == '1') {
              nodesData.push({
                category: "同单位合作人员",
                personId: item.personId,
                label: item.label,
                organizationName: item.organization,
                value: item.count,
                symbol: "image://" + person2,
                symbolSize: 25
              });
            }else if(item.group == '2') {
              nodesData.push({
                category: "不同单位合作人员",
                personId: item.personId,
                label: item.label,
                organizationName: item.organization,
                value: item.count,
                symbol: "image://" + person3,
                symbolSize: 25
              });
            }
          });
          let linksList = [];
          let temp = {};
          for (let i = 1; i < nodesData.length; i++) {
            temp.source = 0;
            temp.target = i;
            temp.value = nodesData[i].value;
            temp.lineStyle = {
              normal: {
                width: 1
              }
            };
            linksList.push(temp);
            temp = {};
          }
          let categories = [
            {
              name: "人员名称",
              icon: "image://" + person1
            },
            {
              name: "同单位合作人员",
              icon: "image://" + person2
            },
            {
              name: "不同单位合作人员",
              icon: "image://" + person3
            }
          ];
          this.relationship = {
            categories,
            data: nodesData,
            links: linksList
          };
        }
      });
    },
    // 个人影响力
    getInfluenceGraph() {
      var id = this.personId;
      var data = {
        personId: id
      };
      this.$axios
        .post("/person/influenceGraph", this.$qs.stringify(data))
        .then(res => {
          this.InfluenceGraphData = res.data.data.content;
        });
    },
    //合作者
    getcooperation() {
      var limit = this.limit;
      var id = this.personId;
      var data = {
        limit: limit,
        personId: id
      };
      this.$axios
        .post("/person/coRecommend", this.$qs.stringify(data))
        .then(res => {
          this.cooperationListData = res.data.data.content;
        });
    },
    //发布期刊
    getjournal() {
      var limit = this.limit;
      var id = this.personId;
      var data = {
        limit: limit,
        personId: id
      };
      this.$axios
        .post("/person/publishJournal", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.JournalRankingData = res.data.data.content;
          }
        });
    },
    //高频词云
    getfrequency() {
      var limit = this.limit;
      var id = this.personId;
      var data = {
        limit: 20,
        personId: id
      };
      this.$axios
        .post("/person/keywordCloud", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.wordCloudStatus = res.data.data.content.status;
            this.wordCloud = res.data.data.content.result.map(item => {
              item.value = item.count;
              return item;
            });
          }
        });
    },

    //合作关系图谱
    getrelationship() {
      var limit = 10;
      var id = this.personId;
      //  var type = ''
    },
    //奖励tab切换
    handleRewardChange(val) {
      this.rewardChange = val;
    },

    handleFocus() {
      this.tipIsShow = true;
    },

    //人才合作网络挖掘查询
    handleenter() {
      if (this.query_EQ_name) {
        this.$axios
          .get("/manage/personName", {
            params: { name: this.query_EQ_name }
          })
          .then(res => {
            this.personContent = res.data.data.content;
          });
      } else {
        this.personContent = [];
      }
    },
    // 下拉查询
    handleClickQuery(item) {
      this.tipIsShow = false;
      if (item !== "close") {
        this.cooperator = item;
        this.personId2 = item.personId;
        this.query_EQ_name = item.name + '：' + item.organization;
      } 
    },
    handleCooperation() {
      this.modal1 = true;
      this.handleCooperationOrgChinesePaper();
    },
    // 重置
    handleReset() {
      this.query_EQ_name = "";
      this.tipIsShow = false;
      this.personContent = [];
    },

    // 判断是否为null
    isNull(tmp) {
      if (!tmp && typeof tmp != "undefined" && tmp != 0) {
        return true;
      } else {
        return false;
      }
    },
    handleSelect(val) {},
    //获取全部数据
    // getAllData() {
    //   API.getTalentDetailsData(this.personId, res => {
    //     this.handleData(res.data.data.person);
    //   });
    //   API.getPersonnelAssociationData(this.personId, res => {
    //     this.relationship = res.data.data;
    //   });

    //   //获取人员与成果、项目、奖励、事件等的关联网络数据
    //   API.getPersonownData(this.personId, res => {
    //     let nodes = res.data.data.nodes,
    //       content = [];
    //     for (let index = 0; index < nodes.length; index++) {
    //       content.push({
    //         name: nodes[index].nodeName,
    //         symbolSize: 20,
    //         nID: nodes[index].nodeId,
    //         id: index
    //       });
    //     }
    //     this.personownData = content.slice(0, 20);
    //     this.personownLinks = res.data.data.links;
    //   });
    //   this.getTalentPaperData();
    // },

    //人才画像 人才获得的论文
    // getTalentPaperData() {
    //   API.getTalentPaperData(
    //     { personId: this.personId, offset: this.offset, limit: this.limit },
    //     res => {
    //       var data = res.data.data.content;
    //       data.forEach(item => {
    //         if (item.keywords) {
    //           let string = "",
    //             newArr = [];
    //           for (let i = 0; i < item.keywords.length; i++) {
    //             if (item.keywords[i].keyword) {
    //               newArr.push({
    //                 name: item.keywords[i].keyword
    //               });
    //             }
    //           }
    //           newArr.forEach(ele => {
    //             string = string + ele.name + "; ";
    //           });
    //           item.keywords = string;
    //         }
    //         //更新时间格式
    //         if (item.publishDate) {
    //           item.publishDate =
    //             item.publishDate.slice(0, 4) +
    //             "-" +
    //             item.publishDate.slice(4, 6);
    //         }
    //       });

    //       this.paperContent = data;
    //       this.paperTotal = res.data.count;
    //     }
    //   );
    // },

    // 人才合作网络挖掘 弹框数据
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
        personId: this.personId,
        cooperatorId: this.personId2,
        skip: this.skip,
        limit: this.limit,
        type: "project"
      };
      this.$axios
        .post("/person/personCooperator", this.$qs.stringify(data))
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
        personId: this.personId,
        cooperatorId: this.personId2,
        skip: this.skip,
        limit: this.limit,
        type: "cJournalPaper"
      };
      this.$axios
        .post("/person/personCooperator", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.CooperationOrgChinesePaperData =
              res.data.data.content.fruitList;
            this.CooperationTotal = res.data.data.content.count;
          }
        });
    },
    // 3.英文期刊
    handleCooperationOrgEnglishPaper() {
      this.loading = true;
      var data = {
        personId: this.personId,
        cooperatorId: this.personId2,
        skip: this.skip,
        limit: this.limit,
        type: "eJournalPaper"
      };
      this.$axios
        .post("/person/personCooperator", this.$qs.stringify(data))
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
        personId: this.personId,
        cooperatorId: this.personId2,
        skip: this.skip,
        limit: this.limit,
        type: "confPaper"
      };
      this.$axios
        .post("/person/personCooperator", this.$qs.stringify(data))
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
        personId: this.personId,
        cooperatorId: this.personId2,
        skip: this.skip,
        limit: this.limit,
        type: "patent"
      };
      this.$axios
        .post("/person/personCooperator", this.$qs.stringify(data))
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
        personId: this.personId,
        cooperatorId: this.personId2,
        skip: this.skip,
        limit: this.limit,
        type: "criterion"
      };
      this.$axios
        .post("/person/personCooperator", this.$qs.stringify(data))
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
        personId: this.personId,
        cooperatorId: this.personId2,
        skip: this.skip,
        limit: this.limit,
        type: "monograph"
      };
      this.$axios
        .post("/person/personCooperator", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.CooperationOrgMonograph = res.data.data.content.fruitList;
            this.CooperationTotal = res.data.data.content.count;
          }
        });
    },

    //去除空格
    myTrim(x) {
      return x.replace(/^\s+|\s+$/gm, "");
    },
    //从工作经历表中选择startDate最大的日期
    getMax(arr) {
      if (arr) {
        let max = arr[0];
        arr.forEach(item => {
          max = max.startDate * 1 > item.startDate * 1 ? max : item;
        });
        return max;
      } else {
        return { title: null, orgName: null };
      }
    },

    //点击查询相关人员
    handleQuery() {
      var personId = this.personId;
      var personId2 = this.cooperator.personId;
      var types = ["project", "paper", "criterion", " patent", "monograph"];

      var data = {
        personId: personId,
        personId2: personId2,
        types: types
      };
      this.$axios
        .post("/coop/personLine", this.$qs.stringify(data))
        .then(res => {});
    },
    ok() {},
    cancel() {}
    //同合作人员
  }
};
</script>
<style lang="scss" scoped>
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
.sc-details .sc-left div.sc-le-top ul {
  width: auto;
}
.sc-details .sc-left div.sc-le-top ul li {
  width: 600px;
}
.sc-details .sc-left div.sc-le-top ul li:not(:nth-child(4)) > p > span {
  color: #000;
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
.noData {
  text-align: center;
}
.skillBox span {
  margin-right: 20px;
}
.WorkStudy {
  width: 100%;
}
.statistics {
  div {
    float: left;
    margin-right: 20px;
    label {
      margin-right: 0 !important;
    }
    span {
      border-radius: 3px;
      // padding: 1px 15px;
      color: #1843a3;
      margin-left: 0 !important;
    }
  }
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