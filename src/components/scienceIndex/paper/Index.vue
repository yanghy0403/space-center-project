
<template>
  <div class="sc-query">
    <div class="sc-aside">
      <Aside
        :data="groupFilter"
        :query="query"
        :typeArr="typeArr"
        @calclick="calClick"
        @rangYear="rangeClick"
        :markTab="markTab"
      />
    </div>
    <div class="sc-section">
      <Tabs :animated="false" type="card" active-key @on-click="handleTabChange">
        <!-- 期刊论文 -->
        <TabPane label="期刊论文" icon="ios-paper-plane">
          <div class="search">
            <div class="sc-search">
              <div class="sc-left">
                <div class="sc-input">
                  <label for="name">论文名称：</label>
                  <input
                    v-model="mmq_name"
                    @keyup.enter="handleQuery"
                    type="text"
                    placeholder="请输入关键词..."
                  />
                </div>
                <div class="sc-input">
                  <label for="name">作者：</label>
                  <input
                    v-model="mpq_author_personName"
                    @keyup.enter="handleQuery"
                    @focus="handleAuthor"
                    type="text"
                    placeholder="请输入关键词..."
                  />
                  <div class="filterSearch" v-show="isAuthorName">
                    <div class="mask" @click.stop="handleAuthorClickQuery('close')"></div>
                    <div class="sc-content">
                      <ul v-if="authorNameData.length!==0">
                        <li
                          v-for="(item,k) in authorNameData"
                          :key="k+'q'"
                          @click="handleAuthorClickQuery(item)"
                        >{{item.name +'：'+ item.organization}}</li>
                      </ul>
                      <ul v-else>
                        <li>暂无数据...</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="sc-input">
                  <label for="name">作者机构：</label>
                  <input
                    v-model=" mpq_organizationName"
                    @keyup.enter="handleOrganizationName"
                    @focus="handleOrganName"
                    type="text"
                    placeholder="请输入关键词..."
                  />
                  <div class="filterSearch" v-show="isOrganizationName">
                    <div class="mask" @click.stop="handleClickQuery('close')"></div>
                    <div class="sc-content">
                      <ul v-if="organizationNameData.length!==0">
                        <li
                          v-for="(item,k) in organizationNameData"
                          :key="k+'q'"
                          @click="handleClickQuery(item)"
                        >{{item.name}}</li>
                      </ul>
                      <ul v-else>
                        <li>暂无数据...</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="sc-input">
                  <label for="name">期刊名称：</label>
                  <input type="text" v-model="mmq_journalName" placeholder="请输入关键词..." />
                </div>
                <div class="sc-input">
                  <label for="name">关键词：</label>
                  <input
                    v-model="mpq_keyword"
                    @keyup.enter="handleQuery"
                    type="text"
                    placeholder="请输入关键词..."
                  />
                </div>
              </div>
            </div>
            <div class="sc-searchBtn">
              <span class="sampleData" @click="handleJournalSampleData">示例数据</span>
              <i-button class="btn" type="info" @click="relevanceQueryJournal">查询</i-button>
              <i-button class="btn" type="info" @click="handleReset('updata')">重置</i-button>
            </div>
          </div>
          <List
            :data="dataList"
            :loading="loading"
            :total="total"
            :number="number"
            :markTab="markTab"
            @updata="calClick"
            @deldata="delClick"
            @sortclick="sortClick"
            :curVal="cur"
          />
          <div class="sc-ivu-page">
            <Page
              :current.sync="currentPage"
              @on-change="changePage"
              @on-page-size-change="changeSizePage"
              :total="total"
              show-elevator
              show-sizer
            />
          </div>
        </TabPane>
        <!-- 会议论文 -->
        <TabPane label="会议论文" icon="ios-paper-plane">
          <div class="search">
            <div class="sc-search">
              <div class="sc-left">
                <div class="sc-input">
                  <label for="name">论文名称：</label>
                  <input
                    v-model="mmq_name"
                    @keyup.enter="handleQueryConference"
                    type="text"
                    placeholder="请输入关键词..."
                  />
                </div>
                <div class="sc-input">
                  <label for="name">作者：</label>
                  <input
                    v-model="mpq_author_personName"
                    @keyup.enter="handleQueryConference"
                    @focus="handleAuthor"
                    type="text"
                    placeholder="请输入关键词..."
                  />
                  <div class="filterSearch" v-if="isAuthorName">
                    <div class="mask" @click.stop="handleAuthorClickQuery('close')"></div>
                    <div class="sc-content">
                      <ul v-if="authorNameData.length!==0">
                        <li
                          v-for="(item,k) in authorNameData"
                          :key="k+'q'"
                          @click="handleAuthorClickQuery(item)"
                        >{{item.name +'：'+ item.organization}}</li>
                      </ul>
                      <ul v-else>
                        <li>暂无数据...</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="sc-input">
                  <label for="name">作者机构：</label>
                  <input
                    v-model="mpq_organizationName"
                    @keyup.enter="handleQueryConference"
                    @focus="handleOrganName"
                    type="text"
                    placeholder="请输入关键词..."
                  />
                  <div class="filterSearch" v-if="isOrganizationName">
                    <div class="mask" @click.stop="handleClickQuery('close')"></div>
                    <div class="sc-content">
                      <ul v-if="organizationNameData.length!==0">
                        <li
                          v-for="(item,k) in organizationNameData"
                          :key="k+'q'"
                          @click="handleClickQuery(item)"
                        >{{item.name}}</li>
                      </ul>
                      <ul v-else>
                        <li>暂无数据...</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="sc-input">
                  <label for="name">会议名称：</label>
                  <input
                    type="text"
                    v-model="mmq_conferenceName"
                    @keyup.enter="handleQueryConference"
                    placeholder="请输入关键词..."
                  />
                </div>
                <div class="sc-input">
                  <label for="name">关键词：</label>
                  <input
                    v-model="mpq_keyword"
                    @keyup.enter="handleQueryConference"
                    type="text"
                    placeholder="请输入关键词..."
                  />
                </div>
              </div>
            </div>
            <div class="sc-searchBtn">
              <span class="sampleData" @click="handleConferenceSampleData">示例数据</span>
              <Button class="btn" type="info" @click.stop="relevanceQueryConference">查询</Button>
              <Button class="btn" type="info" @click="handleResets('updata')">重置</Button>
            </div>
          </div>

          <List
            :data="dataList"
            :loading="loading"
            :total="total"
            :number="number"
            @updata="calClick"
            @deldata="delClick"
            @sortclick="sortClick"
            :markTab="markTab"
            :curVal="cur"
          />
          <div class="sc-ivu-page">
            <Page
              :current.sync="currentPage"
              @on-change="changePages"
              @on-page-size-change="changeSizePages"
              :total="total"
              show-elevator
              show-sizer
            />
          </div>
        </TabPane>
        <!-- <TabPane label="学位论文" disabled>标签三的内容</TabPane> -->
      </Tabs>
    </div>
  </div>
</template>

<script>
import Aside from "./modules/Aside";
import List from "./modules/List";

// import API from "../../../api/index.js";

export default {
  data: () => ({
    offset: 0,
    limit: 10,
    total: 0,
    number: 0,
    cur: null,
    currentPage: 1,
    direction: "desc",
    sortField: null,
    mmq_name: null, // 	论文名称
    mpq_author_personName: null, // 作者
    mpq_organizationName: null, // 作者机构
    mmq_conferenceName: null, // 会议名称
    mmq_journalName: null, // 期刊名称
    mpq_keyword: null, // 关键词
    mpq_conferenceName: null, // 会议名称
    mpq_journalName: null, // 期刊名称
    mpq_include: null, //收录范围
    mpq_subject_rankName: null, //研究领域
    mpq_language: null, //语言
    tq_year: null,
    rqg_year: null,
    rql_year: null,
    groupFilter: {},
    dataList: [],
    loading: true, // 加载刷新动画
    markTab: 0, //tab标志位
    mark: 1,
    pageShow: true,
    isAuthorName: false,
    isOrganizationName: false,
    authorNameData: [], // 作者实时查询
    organizationNameData: [], // 作者虎沟实时查询
    typeArr: ["论文类型", "期刊名称", "会议名称", "收录范围", "语言"],
    query: [
      {
        oneNavName: "基础知识查询",
        towNavName: "科研人员画像",
        path: "/person"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "科研机构画像",
        path: "/organ"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "项目查询",
        path: "/project"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "期刊查询",
        path: "/journal"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "会议查询",
        path: "/conference"
      },
      // {
      //   oneNavName: "基础知识查询",
      //   towNavName: "重大科研任务",
      //   path: "/taskdetails"
      // },
      { oneNavName: "基础知识查询", towNavName: "论文查询", path: "/paper" },
      { oneNavName: "基础知识查询", towNavName: "专利查询", path: "/patent" },
      {
        oneNavName: "基础知识查询",
        towNavName: "标准查询",
        path: "/criterion"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "专著查询",
        path: "/monograph"
      },
      {
        oneNavName: "基础知识查询",
        towNavName: "仪器设备推荐",
        path: "/device"
      }
    ],
    mmq_name1: "星箭力学环境分析与试验技术研究进展",
    mpq_organizationName1: "中国空间技术研究院",
    mpq_author_personName1: "马兴瑞",
    mmq_journalName1: "宇航学报",

    mmq_name2: "The hydrosphere State (hydros) Satellite mission: an Earth system pathfinder for global mapping of soil moisture and land freeze/thaw",
    mpq_organizationName2: "Massachusetts Institute of Technology",
    mpq_author_personName2:"D. Entekhabi",
    mmq_conferenceName2:"International Geoscience and Remote Sensing Symposium"
  }),
  components: {
    Aside,
    List
  },
  watch: {
    mpq_author_personName(news) {
      this.mpq_author_personName = news;
      this.handleAuthorName();
    },
    mpq_organizationName(vals) {
      this.mpq_organizationName = vals;
      this.handleOrganSearchData();
    }
  },
  created() {
    this.loading = true;
    // this.getData();
    //返回重置导航坐标
    let PositionArr = this.$store.state.variable.position.slice(0, 2);
    this.$store.commit("setPosition", PositionArr);
    this.$store.commit("setPositionIsShow", true);
    this.$store.commit("emptyFilterArr");
  },
  mounted() {
    this.handleQuery();
  },
  methods: {
    // 示例数据
    handleJournalSampleData() {
      this.mmq_name = this.mmq_name1;
      this.mpq_organizationName = this.mpq_organizationName1;
      this.mpq_author_personName = this.mpq_author_personName1;
      this.mmq_journalName =this.mmq_journalName1
    },
    handleConferenceSampleData() {
      this.mmq_name = this.mmq_name2;
      this.mpq_organizationName = this.mpq_organizationName2;
      this.mpq_author_personName = this.mpq_author_personName2;
      this.mmq_conferenceName =this.mmq_conferenceName2
    },
    //年度范围筛选
    rangeClick(val) {
      var year = new Date().getFullYear();
      if (val.type == "a") {
        this.rqg_year = year - val.value;
        this.rql_year = year;
      }
      if (val.type == "b") {
        this.rql_year = year - val.value;
      }
      this.tongQuery();
    },
    //排序控制
    sortClick(val,cur) {
      this.sortField = val.value;
      this.cur = val.num;
      this.tongQuery();
    },
    // 作者数据实时查询
    handleAuthorName() {
      if (this.mpq_author_personName) {
        this.$axios
          .get("/manage/personName", {
            params: { name: this.mpq_author_personName }
          })
          .then(res => {
            if (res.data.code == 200) {
              this.authorNameData = res.data.data.content;
            }
          });
      } else {
        this.authorNameData = [];
      }
    },
    handleAuthor() {
      this.isAuthorName = true;
    },
    handleOrganName() {
      this.isOrganizationName = true;
    },
    handleAuthorClickQuery(item) {
      if (item !== "close") {
        this.mpq_author_personName = item.name;
      }
      this.isAuthorName = false;
    },
    // 作者机构实时查询
    handleOrganSearchData() {
      if (this.mpq_organizationName) {
        this.$axios
          .get("/manage/orgName", {
            params: { name: this.mpq_organizationName }
          })
          .then(res => {
            if (res.data.code == 200) {
              this.organizationNameData = res.data.data.content;
            }
          });
      }
    },
    handleClickQuery(item) {
      if (item !== "close") {
        this.mpq_organizationName = item.name;
      }
      this.isOrganizationName = false;
    },
    calClick(val) {
      switch (val.type) {
        case "期刊":
          this.mpq_journalName = val.value.name;
          break;
        case "会议":
          this.mpq_conferenceName = val.value.name;
          break;
        case "收录范围":
          this.mpq_include = val.value.name;
          break;
        case "国内国际发表":
          this.mpq_language = val.value.name;
          break;
        case "学科领域":
          this.mpq_subject_rankName = val.value.name;
          break;
        case "精确年份":
          this.tq_year = val.value.name;
          break;
        default:
          break;
      }
      if (this.mpq_type == "journal") {
        this.handleQuery();
      }
      if (this.mpq_type == "conference") {
        this.handleQueryConference();
      }
    },
    delClick() {
      this.mpq_journalName = null;
      this.mpq_conferenceName = null;
      this.mpq_include = null;
      this.mpq_language = null;
      this.mpq_subject_rankName = null;
      this.tq_year = null;
      this.rqg_year = null;
      this.rql_year = null;
    },

    // 期刊重置
    handleReset() {
      this.isAuthorName = false;
      this.isOrganizationName = false;
      this.offset = 0;
      this.sortField = null;
      this.mmq_name = null;
      this.mpq_author_personName = null;
      this.mpq_organizationName = null;
      this.mmq_journalName = null;
      this.mmq_conferenceName = null;
      this.mpq_keyword = null;
      this.currentPage = 1;
      this.cur = '0';
      this.delClick();
      if (this.mpq_type == "journal") {
        this.handleQuery();
      }
      if (this.mpq_type == "conference") {
        this.handleQueryConference();
      }
    },
    // 会议重置
    handleResets() {
      this.isAuthorName = false;
      this.isOrganizationName = false;
      this.offset = 0;
      this.sortField = null;
      this.mmq_name = null;
      this.mpq_author_personName = null;
      this.mpq_organizationName = null;
      this.mmq_journalName = null;
      this.mmq_conferenceName = null;
      this.mpq_keyword = null;
      this.currentPage = 1;
      this.cur = '0';
      this.delClick();
      if (this.mpq_type == "journal") {
        this.handleQuery();
      }
      if (this.mpq_type == "conference") {
        this.handleQueryConference();
      }
    },
    //清空参数值
    emptyData() {
      this.isAuthorName = false;
      this.isOrganizationName = false;
      this.offset = 0;
      this.sortField = null;
      this.mmq_name = null;
      this.mpq_author_personName = null;
      this.mpq_organizationName = null;
      this.mmq_journalName = null;
      this.mmq_conferenceName = null;
      this.mpq_keyword = null;
      this.delClick();
    },
    // 获取数据期刊论文列表
    handleQuery() {
      this.mpq_type = "journal";
      this.tongQuery();
    },
    handleQueryConference() {
      this.mpq_type = "conference";
      this.tongQuery();
    },
    //查询按钮调用
      relevanceQueryJournal() {
          this.offset = 0;
          this.mpq_type = "journal";
          this.sortField = '';
          this.tongQuery();
      },
      relevanceQueryConference() {
          this.offset = 0;
          this.mpq_type = "conference";
          this.sortField = '';
          this.tongQuery();
      },
    //通用
    tongQuery() {
      this.loading = true;
      //默认排序
      if (this.mmq_name == null && this.mpq_author_personName == null && this.mpq_organizationName == null &&
          this.mpq_keyword == null && this.sortField == null) {
        if(this.mpq_type == 'journal' && this.mmq_journalName == null)
            this.sortField = "language.keyword&referenceNum";
        if(this.mpq_type == 'conference' && this.mmq_conferenceName == null)
            this.sortField = "language.keyword&referenceNum";
      }
      //基础数据
      var data = {
        direction: this.direction,
        sortField: this.sortField,
        offset: this.offset,
        limit: this.limit
      };
      //输入数据
      if (this.mmq_name != null) {
        //论文名
        data["mmq_name"] = this.mmq_name;
      }
      if (this.mpq_type != null) {
        //论文类型
        data["tq_type"] = this.mpq_type;
      }
      if (this.mpq_author_personName != null) {
        // 作者
        data["mpq_author.personName"] = this.mpq_author_personName;
      }
      if (this.mpq_organizationName != null) {
        //作者机构
        data["mpq_organization.organizationName"] = this.mpq_organizationName;
      }
      if (this.mmq_journalName != null) {
          //期刊名
          data["mmq_journal.journalName"] = this.mmq_journalName;
      }
      if (this.mmq_conferenceName != null) {
          //会议名
          data["mmq_conference.conferenceName"] = this.mmq_conferenceName;
      }
      if (this.mpq_keyword != null) {
        //关键词
        data["mpq_keyword"] = this.mpq_keyword;
      }
        //左侧筛选字段
      if (this.mpq_journalName != null) {
        //期刊名
        data["tq_journal.journalName"] = this.mpq_journalName;
      }
      if (this.mpq_conferenceName != null) {
        //会议名
        data["tq_conference.conferenceName"] = this.mpq_conferenceName;
      }
      if (this.mpq_include != null) {
        //收录范围
        data["tq_include"] = this.mpq_include;
      }
      if (this.mpq_language != null) {
        //国际国内
        data["mpq_language"] = this.mpq_language;
      }
      if (this.mpq_subject_rankName != null) {
        //研究领域
        data["tq_subject.rankName"] = this.mpq_subject_rankName;
      }
      if (this.tq_year != null) {
        //年份
        data["tq_year"] = this.tq_year;
      }
      if (this.rql_year != null) {
        //年份范围
        data["rql_year"] = this.rql_year;
      }
      if (this.rqg_year != null) {
        //年份范围
        data["rqg_year"] = this.rqg_year;
      }
      this.$axios.post("/basic/paper", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.dataList = res.data.data.content;
          this.total = res.data.count * 1;
          this.number = res.data.total;
          this.groupFilter = res.data.filter;
        }
      });
    },
    markTabChange(key) {
      let mark = key ? key : this.markTab;
      this.emptyData();
      switch (mark) {
        case 0: // 期刊
          this.handleQuery();
          this.pageShow = true;
          break;
        case 1: // 会议
          this.handleQueryConference();
          this.pageShow = true;
          break;
        default:
          break;
      }
    },
    // tab 被点击时触发
    handleTabChange(key) {
      this.paperContent = [];
      this.personRewardData = [];
      this.markTab = key;
      this.offset = 0;
      this.limit = 10;
      this.current = 1;
      this.markTabChange(key);
    },

    // 分页
    changePage(event) {
      // this.loading = true;
      this.offset = event - 1;
      this.handleQuery(); //请求数据
    },
    changeSizePage(event) {
      // this.loading = true;
      this.limit = event;
      this.handleQuery();
    },
    changePages(event) {
      // this.loading = true;
      this.offset = event - 1;
      this.handleQueryConference();
    },
    changeSizePages(event) {
      // this.loading = true;
      this.limit = event;
      this.handleQueryConference();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/details.scss";
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
  .scrollbar {
    ul {
      text-align: center;
      padding: 10px 0;
    }
  }
  li {
    cursor: pointer;
  }
  li:hover {
    color: #00daec;
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
  border-color: #e5e5e5;
  background: #fff;
  transform: rotate(45deg);
  transition: opacity 0.3s ease-in;
}
.sc-search .sc-right {
  margin: 50px 20px 0px 0px;
}
.sc-loading-ul li {
  padding-left: 10px;
}
.ivu-tabs-tabpane {
  border: none !important;
}
.ivu-tabs-no-animation > .ivu-tabs-content {
  background: #ebeef5 !important;
}
.sc-section {
  /deep/ .ivu-tabs-content {
    background: #ebeef5 !important;
  }
}
.ivu-tabs-nav .ivu-tabs-tab {
  width: 200px;
}
.sc-input {
  position: relative;
  .filterSearch {
    position: absolute;
    width: 280px;
    top: 40px;
    left: 22%;
    border-radius: 3px;
    border: 1px solid #ddd;
    background: #fff;
    z-index: 99;
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
    /* 滚动条滑块 */
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
        line-height: 25px;
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