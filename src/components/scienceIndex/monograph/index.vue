
<template>
  <div class="sc-query">
    <div class="sc-aside">
      <Aside
        :data="groupFilter"
        :query="query"
        :typeArr="typeArr"
        @calclick="calClick"
        @ran="rangeClick"
      />
    </div>
    <div class="sc-section">
      <div class="search">
        <div class="sc-search">
          <div class="sc-left">
            <div class="sc-input">
              <label for="name">书名：</label>
              <input
                type="text"
                v-model="mmq_name"
                @keyup.enter="getMonographList"
                placeholder="请输入关键词..."
              />
            </div>
            <div class="sc-input">
              <label for="name">作者：</label>
              <input
                type="text"
                v-model="mpq_author_personName"
                @focus="handleFocus"
                @keyup.enter="getMonographList"
                placeholder="请输入关键词..."
              />
              <div class="filterSearch" v-if="tipIsShow">
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
          </div>
        </div>
        <div class="sc-searchBtn">
          <span class="sampleData" @click="handleSampleData">示例数据</span>
          <i-button class="btn" type="info" @click="relevanceQuery">查询</i-button>
          <i-button class="btn" type="info" @click="handleReset('updata')">重置</i-button>
        </div>
      </div>

      <List
        :data="handleMonographList"
        :loading="loading"
        :total="total"
        :number="number"
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
    sortField: null,
    offset: 0,
    limit: 10,
    total: 0,
    number: 0,
    cur: null,
    currentPage: 1,
    mmq_name: null,
    mpq_author_personName: null,
    tq_author_personName: null,
    mpq_area: null,
    mpq_conferenceName: null,
    mpq_learnName: null,
    mpq_publisher_organizationName: null,
    tq_year: null,
    rql_year: null,
    groupFilter: {},
    handleMonographList: [],
    loading: true, // 加载刷新动画
    personNameData: [],
    tipIsShow: false,
    typeArr: ["学科领域", "机构类型", "地区（省）"],
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
    mmq_name1: "基于卫星跟踪卫星编队的卫星重力反演理论与方法",
    // mpq_author_personName1: "钟敏 郑伟 刘成恕 许厚泽"
  }),
  components: {
    Aside,
    List
  },
  watch: {
    mpq_author_personName(news) {
      this.mpq_author_personName = news;
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
    this.getMonographList();
  },
  methods: {
    // 示例数据
    handleSampleData() {
      this.mmq_name = this.mmq_name1;
      // this.mpq_author_personName = this.mpq_author_personName1;
    },
    //排序控制
    sortClick(val,cur) {
      this.sortField = val.value;
      this.cur = val.num;
      this.getMonographList();
    },
    //年度范围筛选
    rangeClick(val) {
      var data = new Date();
      this.rql_year = data.getFullYear() - val.value;
      this.getMonographList();
    },
    calClick(val) {
      switch (val.type) {
        case "领域":
          this.mpq_area = val.value.name;
          break;
        case "作者":
          this.tq_author_personName = val.value.name;
          break;
        case "出版社":
          this.mpq_publisher_organizationName = val.value.name;
          break;
        case "学会":
          this.mpq_learnName = val.value.name;
          break;
        case "会议":
          this.mpq_conferenceName = val.value.name;
          break;
        case "精确年份":
          this.tq_year = val.value.name;
          break;
        default:
          break;
      }
      this.getMonographList();
    },
    // 人员数据实时查询
    handlePersonSearchData() {
      if (this.mpq_author_personName) {
        this.$axios
          .get("/manage/personName", {
            params: { name: this.mpq_author_personName }
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
    handleFocus() {
      this.tipIsShow = true;
    },
    handlePersonClickQuery(item) {
      if (item !== "close") {
        this.mpq_author_personName = item.name;
      }
      this.tipIsShow = false;
    },
    // 重置按钮
    handleReset() {
      this.offset = 0;
      this.mmq_name = null;
      this.mpq_author_personName = null;
      this.tipIsShow = false;
      this.sortField = null;
      this.currentPage = 1;
      this.cur = '1';
      this.delClick();
      this.getMonographList();
    },
    delClick() {
      this.tq_author_personName = null;
      this.mpq_area = null;
      this.mpq_conferenceName = null;
      this.mpq_learnName = null;
      this.mpq_publisher_organizationName = null;
      this.tq_year = null;
      this.rql_year = null;
    },
    //查询按钮
    relevanceQuery(){
        this.offset = 0;
        this.sortField = '';
        this.getMonographList();
    },
    //   获取列表数据
    getMonographList() {
      this.loading = true;
      //默认加载 按 发布时间排序
      if (this.mmq_name == null && this.mpq_author_personName == null && this.sortField == null) {
        this.sortField = "year";
      }
      //定义基本参数
      var data = {
        limit: this.limit,
        offset: this.offset,
        direction: this.direction,
        sortField: this.sortField
      };
      //输入筛选
      if (this.mmq_name != null) {
        data["mmq_name"] = this.mmq_name;
      }
      if (this.mpq_author_personName != null) {
        data["mpq_author.personName"] = this.mpq_author_personName;
      }
      //过滤筛选
        //作者
      if (this.tq_author_personName != null) {
          data["tq_author.personName"] = this.tq_author_personName;
      }
      if (this.mpq_area != null) {
        //领域
        data["tq_area"] = this.mpq_area;
      }
      if (this.mpq_conferenceName != null) {
        //会议
        data["tq_conference.name"] = this.mpq_conferenceName;
      }
      if (this.mpq_learnName != null) {
        //学会
        data["tq_learn.name"] = this.mpq_learnName;
      }
      if (this.mpq_publisher_organizationName != null) {
        //出版社
        data[
          "tq_publisher.organizationName"
        ] = this.mpq_publisher_organizationName;
      }
      if (this.tq_year != null) {
        //年份
        data["tq_year"] = this.tq_year;
      }
      if (this.rql_year != null) {
        //年份范围
        data["rql_year"] = this.rql_year;
      }
      this.$axios
        .post("/basic/monograph", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.handleMonographList = res.data.data.content;
            this.total = res.data.count * 1;
            this.number = res.data.total;
            this.groupFilter = res.data.filter;
          }
        });
    },
    // 分页
    changePage(event) {
      // this.loading = true;
      this.offset = event - 1;
      this.getMonographList();
    },
    changeSizePage(event) {
      this.loading = true;
      this.limit = event;
      this.getMonographList();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../style/details.scss";
.sc-input {
  width: 360px;
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