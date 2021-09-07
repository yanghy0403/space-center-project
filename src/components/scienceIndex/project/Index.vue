<template>
  <div class="sc-query">
    <div class="sc-aside">
      <Aside :data="groupFilter" :query="query" :typeArr="typeArr" @calclick="calClick" />
    </div>
    <div class="sc-section">
      <div class="search">
        <div class="sc-search">
          <div class="sc-left">
            <div class="sc-input">
              <label for="name">项目名称：</label>
              <input
                type="text"
                v-model="mmq_name"
                @keyup.enter="getProjectList"
                placeholder="请输入关键词..."
              />
            </div>
            <div class="sc-input">
              <label for="name">依托单位：</label>
              <input
                type="text"
                v-model="mpq_organizationName"
                @focus="handleOrganization"
                @keyup.enter="getProjectList"
                placeholder="请输入关键词..."
              />
              <div class="filterSearch" v-if="isOrganization">
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
              <label for="name">项目负责人：</label>
              <input
                type="text"
                v-model="mpq_chargePersonName"
                @focus="handleChargePerson"
                @keyup.enter="getProjectList"
                placeholder="请输入关键词..."
              />
              <div class="filterSearch" v-if="isPersonName">
                <div class="mask" @click.stop="handlePersonClickQuery('close')"></div>
                <div class="sc-content">
                  <ul v-if="personNameData.length!==0">
                    <li
                      v-for="(item,k) in personNameData"
                      :key="k+'q'"
                      @click="handlePersonClickQuery(item)"
                    >{{item.name + '：' + item.organization}}</li>
                  </ul>
                  <ul v-else>
                    <li>暂无数据...</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="sc-input">
              <label for="name">关键词：</label>
              <input
                type="text"
                v-model="mmq_chineseKeyword"
                @keyup.enter="getProjectList"
                placeholder="请输入关键词..."
              />
            </div>
          </div>
        </div>
        <div class="sc-searchBtn">
          <span class="sampleData" @click="handleSampleData">示例数据</span>
          <i-button class="btn" type="info" @click="relevanceQuery">查询</i-button>
          <i-button class="btn" type="info" @click="handleReset('updata')">重置</i-button>
        </div>
      </div>

      <List
        :data="projectData"
        :loading="loading"
        :total="total"
        :number="number"
        @updata="calClick"
        @deldata="delClick"
        @sortclick="sortClick"
        :curVal="cur"
      />
      <div class="sc-ivu-page" v-show="!loading">
        <Page
          :current.sync="currentPage"
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
          :total="total"
          show-elevator
          show-sizer
        />
      </div>
    </div>
  </div>
</template>

<script>
import Aside from "./modules/Aside";
import List from "./modules/List";

// import API from "../../../api/index.js";

export default {
  data: () => ({
    direction: "desc",
    sortField: "resultsTotal",
    offset: 0,
    limit: 10,
    total: 0,
    number: 0,
    cur: null,
    currentPage: 1, // 当前页码
    mmq_name: null,
    mmq_chineseKeyword: null,
    mmq_englishKeyword: null,
    mpq_chargePersonName: null,
    mpq_organizationName: null,
    mpq_source: null,
    mpq_type: null,
    mpq_projectNature: null,
    mpq_year: null,
    projectData: [],
    groupFilter: {},
    loading: true, // 加载刷新动画
    isOrganization: false,
    isPersonName: false,
    organizationNameData: [], // 机构查询
    personNameData: [], // 项目负责人
    typeArr: ["项目来源", "项目类别", "年度"],
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
    // 示例数据
    mmq_name1: "黄海及邻区壳幔结构及深浅构造关系的综合地球物理研究",
    mpq_organizationName1: "中国科学院地质与地球物理研究所",
    mpq_chargePersonName1:"郝天珧"
  }),
  components: {
    Aside,
    List
  },
  watch: {
    mpq_organizationName(news) {
      this.mpq_organizationName = news;
      this.handleOrganSearchData();
    },
    mpq_chargePersonName(vals) {
      this.mpq_chargePersonName = vals;
      this.handlePersonSearchData();
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
    this.getProjectList();
  },
  methods: {
    // 示例数据
    handleSampleData() {
      this.mmq_name = this.mmq_name1;
      this.mpq_organizationName = this.mpq_organizationName1;
      this.mpq_chargePersonName = this.mpq_chargePersonName1;
    },
    //排序控制
    sortClick(val, cur) {
      this.sortField = val.value;
      this.cur = val.num;
      this.getProjectList();
    },
    // 机构实时查询
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
    // 人员数据实时查询
    handlePersonSearchData() {
      if (this.mpq_chargePersonName) {
        this.$axios
          .get("/manage/personName", {
            params: { name: this.mpq_chargePersonName }
          })
          .then(res => {
            if (res.data.code == 200) {
              this.personNameData = res.data.data.content;
            }
          });
      } else {
        this.personNameData = [];
      }
    },
    handleOrganization() {
      this.isOrganization = true;
    },
    handleChargePerson() {
      this.isPersonName = true;
    },
    handleClickQuery(item) {
      if (item !== "close") {
        this.mpq_organizationName = item.name;
      }
      this.isOrganization = false;
    },
    handlePersonClickQuery(item) {
      if (item !== "close") {
        this.mpq_chargePersonName = item.name;
      }
      this.isPersonName = false;
    },
    //查询按钮
    relevanceQuery() {
      this.offset = 0;
      this.sortField = "";
      this.getProjectList();
    },
    //   获取项目列表
    getProjectList() {
      this.loading = true;
      // if (
      //   this.mmq_name =
      //     null &&
      //     this.mpq_organizationName == null &&
      //     this.mpq_chargePersonName == null &&
      //     this.mmq_chineseKeyword &&
      //     this.sortField == null
      // ) {
      //   this.sortField = ;
      // }
      //基础请求字段
      var data = {
        limit: this.limit,
        offset: this.offset,
        direction: this.direction,
        sortField: this.sortField
      };
      //输入请求字段

      if (this.mmq_name != null) {
        // 项目名称
        data["mmq_name"] = this.mmq_name;
      }
      if (this.mmq_chineseKeyword != null) {
        // 项目关键词（中文）
        data["mmq_chineseKeyword"] = this.mmq_chineseKeyword;
      }
      if (this.mmq_englishKeyword != null) {
        // 项目关键词（英文）
        data["mmq_englishKeyword"] = this.mmq_englishKeyword;
      }
      if (this.mpq_chargePersonName != null) {
        // 项目负责人
        data["mpq_charge.personName"] = this.mpq_chargePersonName;
      }
      if (this.mpq_organizationName != null) {
        // 承担单位
        data["mpq_organization.organizationName"] = this.mpq_organizationName;
      }
      //左侧筛选字段
      if (this.mpq_source != null) {
        // 项目来源
        data["tq_source"] = this.mpq_source;
      }
      if (this.mpq_type != null) {
        // 项目类别
        data["tq_type"] = this.mpq_type;
      }
      if (this.mpq_projectNature != null) {
        // 学科领域
        data["tq_projectNature"] = this.mpq_projectNature;
      }
      if (this.mpq_year != null) {
        // 项目年份
        data["tq_year"] = this.mpq_year;
      }
      this.$axios.post("/basic/project", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.projectData = res.data.data.content;
          this.total = res.data.count * 1;
          this.number = res.data.total;
          this.groupFilter = res.data.filter;
        }
      });
    },

    calClick(val) {
      switch (val.type) {
        case "项目来源":
          this.mpq_source = val.value.name;
          break;
        case "项目类别":
          this.mpq_type = val.value.name;
          break;
        case "学科领域":
          this.mpq_projectNature = val.value.name;
          break;
        case "年份":
          this.mpq_year = val.value.name;
          break;
        default:
          break;
      }
      this.getProjectList();
    },
    delClick() {
      this.mpq_source = null;
      this.mpq_type = null;
      this.mpq_projectNature = null;
      this.mpq_year = null;
    },

    // 检索重置
    handleReset() {
      this.offset = 0;
      this.sortField = "resultsTotal";
      this.mmq_name = null;
      this.mmq_chineseKeyword = null;
      this.mpq_chargePersonName = null;
      this.mpq_organizationName = null;
      this.currentPage = 1;
      this.cur = "0";
      this.delClick();
      this.getProjectList();
    },
    // 获取数据期刊项目列表

    // 分页
    changePage(event) {
      this.offset = event - 1;
      this.getProjectList();
    },
    changeSizePage(event) {
      this.limit = event;
      this.getProjectList();
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "../../../style/details.scss";
.sc-search .sc-input label {
  width: 80px;
  display: inline-block;
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