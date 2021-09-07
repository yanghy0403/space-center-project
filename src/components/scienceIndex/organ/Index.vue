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
              <label for="name" style="width:90px;">机构名称：</label>
              <div class="ivu-input-wrapper">
                <input
                  style="width: 670px;"
                  v-model="mpq_name"
                  @focus="handleFocus"
                  @keyup.enter="getData"
                  type="text"
                  placeholder="请输入关键词..."
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
                    <ul v-else>
                      <li>暂无数据...</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sc-searchBtn">
          <span class="sampleData" @click="handleSampleData">示例数据</span>
          <Button class="btn" type="info" @click="relevanceQuery">查询</Button>
          <Button class="btn" type="info" @click="handleReset">重置</Button>
        </div>
      </div>

      <List
        :data="contentData"
        :loading="loading"
        :total="total"
        :number="number"
        @update="calClick"
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
// import API from "../../../api/index.js";
import List from "./modules/List";
export default {
  name: "sc-warp",
  components: {
    Aside,
    // TalentList
    List
  },
  watch: {
    mpq_name(newVal) {
      this.mpq_name = newVal;
      this.handleQuery();
    }
  },
  data: () => ({
    direction: "desc", //排序
    sortField: null,
    offset: 0,
    limit: 10,
    cur: null,
    currentPage: 1, // 当前页数
    mpq_name: null, //机构名称
    mpq_province: null, //机构省份
    mpq_type: null, //机构类型
    mpq_language: null, //语言
    queryData: [],
    contentData: [],
    typeArr: ["机构类型", "地区(省)"],
    loading: true, //加载动画
    tipIsShow: false,
    total: 0, //控制条数
    number: 0, //展示条数
    groupFilter: {},
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
    mpq_name1: "中国科学院国家空间科学中心",
  }),
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
    this.getData();
  },
  methods: {
    // 示例数据
    handleSampleData() {
      this.mpq_name = this.mpq_name1;
    },
    //排序控制
    sortClick(val,cur) {
      this.sortField = val.value;
      this.cur = val.num;
      this.getData();
    },
    handleFocus() {
      this.tipIsShow = true;
    },
    // 下拉查询
    handleClickQuery(item) {
      if (item !== "close") {
        this.mpq_name = item.name;
      }
      this.tipIsShow = false;
    },
    // 查询
    handleQuery() {
      if (this.mpq_name) {
        this.$axios
          .get("/manage/orgName", {
            params: { name: this.mpq_name }
          })
          .then(res => {
            this.queryData = res.data.data.content;
          });
      } else {
        this.queryData = [];
      }
    },
    // 重置
    handleReset() {
      this.offset = 0;
      this.sortField = null;
      this.mpq_name = null; //机构名称
      this.currentPage = 1;
      this.cur = '2';
      this.delClick();
      this.getData();
    },
    changePage(event) {
      this.offset = event - 1;
      this.getData(); //请求数据
    },
    changeSizePage(event) {
      this.limit = event;
      this.getData();
    },
    //侧栏删除回调
    delClick() {
      this.mpq_province = null;
      this.mpq_type = null;
      this.mpq_language = null;
    },
    //侧栏回调函数
    calClick(val) {
      switch (val.type) {
        case "机构类型":
          this.mpq_type = val.value.name;
          break;
        case "地区（省）":
          this.mpq_province = val.value.name;
          break;
        case "国内国际机构":
          this.mpq_language = val.value.name;
          break;
        default:
          break;
      }
      this.getData();
    },
    //查询按钮
    relevanceQuery() {
      this.offset = 0;
      this.sortField = "";
      this.getData();
    },
    //查询请求
    getData() {
      this.loading = true;
      this.tipIsShow = false;
      if (this.mpq_name == null && this.sortField == null) {
        this.sortField = "language.keyword&influence";
      }
      //基本字段
      var data = {
        direction: this.direction,
        sortField: this.sortField,
        offset: this.offset,
        limit: this.limit
      };
      //输入字段
      if (this.mpq_name != null) {
        // 机构名称
        data["mpq_name"] = this.mpq_name;
      }
      //左侧筛选字段
      if (this.mpq_province != null) {
        // 地区
        data["mpq_province"] = this.mpq_province;
      }
      if (this.mpq_type != null) {
        // 机构类型
        data["mpq_type"] = this.mpq_type;
      }
      if (this.mpq_language != null) {
        //国际国内
        data["mpq_language"] = this.mpq_language;
      }
      this.$axios.post("/basic/org", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.contentData = res.data.data.content;
          this.total = res.data.count * 1;
          this.number = res.data.total;
          this.groupFilter = res.data.filter;
          this.loading = false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../style/details.scss";

.sc-search .sc-input {
  display: flex;
  align-items: center;
  width: 100%;
}
.sc-input {
  position: relative;
  .filterSearch {
    position: absolute;
    width: 500px;
    top: 40px;
    left: 0%;
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
</style>