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
              <label for="name">人员姓名：</label>
              <input
                id="myInput "
                v-model="mpq_name"
                @focus="handleFocus"
                @keyup.enter="handleQuery"
                type="text"
                placeholder="请输入关键词..."
              />
              <!-- <div class="filterSearch" v-show="tipIsShow">
                <div class="mask" @click.stop="handleClickQuery('close')"></div>
                <div class="sc-content">
                  <ul v-if="personNameData.length!==0">
                    <li
                      v-for="(item,k) in personNameData"
                      :key="k+'q'"
                      @click="handleClickQuery(item)"
                    >{{item.name + '：' + item.organization}}</li>
                  </ul>
                </div>
              </div> -->
            </div>
            <div class="sc-input">
              <label for="name">机构名称：</label>
              <input
                id="myInput "
                v-model="mpq_organization"
                @focus="handleOrgan"
                @keyup.enter="handleQuery"
                type="text"
                placeholder="请输入关键词..."
              />
              <div class="filterSearch" v-show="isOrganization">
                <div class="mask" @click.stop="handleorgClickQuery('close')"></div>
                <div class="sc-content">
                  <ul v-if="organizationNameData.length!==0">
                    <li
                      v-for="(item,k) in organizationNameData"
                      :key="k+'q'"
                      @click="handleorgClickQuery(item)"
                    >{{item.name}}</li>
                  </ul>
                  <!-- <ul v-else>
                    <li>暂无数据...</li>
                  </ul>-->
                </div>
              </div>
            </div>
            <div class="sc-input">
              <label for="name">研究领域：</label>
              <input
                id="myInput "
                type="text"
                placeholder="请输入关键词..."
                v-model="mpq_subject_rankName"
                @focus="handleResearchArea"
                @keyup.enter="handleQuery"
              />
              <div class="filterSearch" v-if="isResearchArea">
                <div class="mask" @click.stop="handleAreaClickQuery('close')"></div>
                <div class="sc-content">
                  <ul v-if="filedNamedata.length!==0">
                    <li
                      v-for="(item,k) in filedNamedata"
                      :key="k+'q'"
                      @click="handleAreaClickQuery(item)"
                    >{{item.rankName}}</li>
                  </ul>
                  <!-- <ul v-else>
                    <li>暂无数据...</li>
                  </ul>-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sc-searchBtn">
          <span class="sampleData" @click="handleSampleData">示例数据</span>
          <i-button class="btn" type="info" @click="relevanceQuery">查询</i-button>
          <i-button class="btn" type="info" @click="handleReset('updata')">重置</i-button>
        </div>
      </div>

      <!-- <router-view/> -->
      <List
        :data="contentData"
        :loading="loading"
        :total="total"
        :number="number"
        @updata="calClick"
        @deldata="delClick"
        @sortclick="sortClick"
        :topshow="true"
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
import List from "./modules/List";
import Aside from "./modules/Aside";
import API from "../../../api/index.js";
export default {
  name: "sc-warp",
  components: {
    Aside,
    List
  },
  data() {
    return {
      offset: 0,
      limit: 10,
      total: 0,
      number: 0,
      cur: null,
      currentPage: 1,
      direction: "desc",
      sortField: null,
      mpq_name: null,
      mpq_organization: null,
      mpq_subject_rankName: null,
      mpq_currentOrganization_type: null,
      mpq_currentTitle_title: null,
      mpq_language: null,
      contentData: [],
      groupFilter: {},
      tipIsShow: false,
      isOrganization: false,
      isResearchArea: false,
      personNameData: [], // 人员实时查询
      organizationNameData: [], // 机构实时查询
      filedNamedata: [], // 研究领域
      listData: [
        { name: "青科奖" },
        { name: "青年托举" },
        { name: "优青项目" },
        { name: "中国科学院院士" },
        { name: "青年女科学家" },
        { name: "杰青项目" },
        { name: "千人计划" },
        { name: "中国工程院院士" }
      ],
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
      typeArr: ["学科领域", "机构", "职称"],
      loading: true, //加载动画
      // 示例数据
      mpq_name1: '万卫星',
      mpq_organization1: '中国科学院地质与地球物理研究所',
    };
  },
  watch: {
    mpq_name(newVal) {
      this.mpq_name = newVal;
      this.handlePersonSearchData();
    },
    mpq_organization(vals) {
      this.mpq_organization = vals;
      this.handleOrganSearchData();
    },
    mpq_subject_rankName(news) {
      this.mpq_subject_rankName = news;
      this.hanleFiledName();
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
    this.loading = false;
    this.handleQuery();
    this.getpersoninfo();
  },
  methods: {
    // 示例数据
    handleSampleData() {
      this.mpq_name = this.mpq_name1;
      this.mpq_organization = this.mpq_organization1;
    },
    //排序控制
    sortClick(val,cur) {
      this.sortField = val.value;
      this.cur = val.num;
      this.handleQuery();
    },
    // 人员数据实时查询
    // handlePersonSearchData() {
    //   if (this.mpq_name) {
    //     this.$axios
    //       .get("/manage/personName", { params: { name: this.mpq_name } })
    //       .then(res => {
    //         if (res.data.code == 200) {
    //           this.personNameData = res.data.data.content;
    //         }
    //       });
    //   } else {
    //     this.personNameData = [];
    //   }
    // },
    // 机构实时查询
    handleOrganSearchData() {
      if (this.mpq_organization) {
        this.$axios
          .get("/manage/orgName", {
            params: { name: this.mpq_organization }
          })
          .then(res => {
            if (res.data.code == 200) {
              this.organizationNameData = res.data.data.content;
            }
          });
      }
    },
    // 研究领域
    hanleFiledName() {
      this.$axios
        .get("/manage/filedName", {
          params: { name: this.mpq_subject_rankName }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.filedNamedata = res.data.data.content;
          }
        });
    },
    handleFocus() {
      this.tipIsShow = true;
    },
    handleOrgan() {
      if(mpq_name.length > 0) {
       this.isOrganization = true;
      }
    },
    handleResearchArea() {
      this.isResearchArea = true;
    },
    blurfns() {
      this.tipIsShow = false;
      this.isOrganization = false;
      this.isResearchArea = false;
    },
    // 下拉查询
    handleClickQuery(item) {
      this.tipIsShow = false;
      if (item !== "close") {
        this.mpq_name = item.name;
      }
    },
    handleorgClickQuery(item) {
      this.isOrganization = false;
      if (item !== "close") {
        this.mpq_organization = item.name;
      }
    },
    handleAreaClickQuery(item) {
      this.isResearchArea = false;
      if (item !== "close") {
        this.mpq_subject_rankName = item.rankName;
      }
    },
    //查询按钮
    relevanceQuery(){
        this.offset = 0;
        this.sortField = '';
        this.handleQuery();
    },
    // 查询
    handleQuery() {
      this.loading = true;
      //默认排序判断
      if (this.mpq_name == null && this.mpq_organization == null && this.sortField == null) {
        this.sortField = "language.keyword&influence";
      }
      //基本字段
      var data = {
        direction: this.direction,
        limit: this.limit,
        offset: this.offset,
        sortField: this.sortField
      };
      if (this.mpq_name != null) {
        //人员姓名
        data["mpq_name"] = this.mpq_name;
      }
      if (this.mpq_organization != null) {
        // 机构名称
        data["mpq_organization"] = this.mpq_organization;
      }
      if (this.mpq_subject_rankName != null) {
        // 研究领域
        data["tq_subject.rankName"] = this.mpq_subject_rankName;
      }
      if (this.mpq_currentOrganization_type != null) {
        // 筛选机构类型
        data[
          "tq_currentOrganization.type"
        ] = this.mpq_currentOrganization_type;
      }
      if (this.mpq_currentTitle_title != null) {
        // 职称
        data["tq_currentTitle.title"] = this.mpq_currentTitle_title;
      }
      if(this.mpq_language !=null){
          //语言
          data["tq_language"] = this.mpq_language;
      }
      this.$axios.post("/basic/person", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.number = res.data.total;
          this.total = res.data.count * 1;
          this.contentData = res.data.data.content;
          this.groupFilter = res.data.filter;
        }
      });
    },
    // 重置
    handleReset() {
      this.offset = 0;
      this.sortField = null;
      this.mpq_name = null;
      this.mpq_organization = null;
      this.mpq_subject_rankName = null;
      this.mpq_name1 = '万卫星';
      this.mpq_organization1 = '中国科学院地质与地球物理研究所';
      this.delClick();
      this.handleQuery();
      this.currentPage = 1;
      this.cur = '2';
    },
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
    //侧栏删除回调
    delClick() {
      this.mpq_currentOrganization_type = null;
      this.mpq_currentTitle_title = null;
      this.mpq_language = null;
    },
    //侧栏回调函数
    calClick(val) {
      switch (val.type) {
        case "研究领域":
          this.mpq_subject_rankName = val.value.name;
          break;
        case "机构类型":
          this.mpq_currentOrganization_type = val.value.name;
          break;
        case "职称":
          this.mpq_currentTitle_title = val.value.name;
          break;
      case "国际国内":
          this.mpq_language = val.value.name;
          break;
        default:
          break;
      }
      this.handleQuery();
    },

    //详情跳转过来的参数
    getpersoninfo() {
      if (this.$route.params) {
        this.contentData = this.$route.params.id;
      }
    }
  }
};

// 真实数据
</script>
<style lang="scss" scope>
.searchBtn {
  text-align: right;
  margin-right: 50px;
  margin-top: 15px;
  .kong {
    margin: 0 30px;
  }
}
.ivu-poptip-popper {
  margin-top: 12px;
  left: 0px;
  top: 28px;
  .scrollbar {
    overflow-y: auto;
    max-height: 250px;
    ul {
      text-align: left;
      .poptip-body {
        padding: 0 20px;
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
  border-color: #999;
  background: #fff;
  transform: rotate(45deg);
  transition: opacity 0.3s ease-in;
}
.sc-input {
  position: relative;
  .filterSearch {
    position: absolute;
    width: 280px;
    top: 40px;
    left: 18%;
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
.sampleData {
  cursor: pointer;
}
</style>
