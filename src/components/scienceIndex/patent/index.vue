
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
              <label for="name">专利名称：</label>
              <input
                type="text"
                v-model="mmq_chineseTitle"
                @keyup.enter="getPatentList"
                placeholder="请输入关键词..."
              />
            </div>
            <div class="sc-input">
              <label for="name">申请号：</label>
              <input
                type="text"
                v-model="mmq_patentNo"
                @keyup.enter="getPatentList"
                placeholder="请输入关键词..."
              />
            </div>
            <div class="sc-input">
              <label for="name">申请人：</label>
              <input
                type="text"
                v-model="mpq_applicant"
                @keyup.enter="getPatentList"
                @focus="handleApplicant"
                placeholder="请输入关键词..."
              />
              <div class="filterSearch" v-if="isApplicant">
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
              <label for="name">发明人：</label>
              <input
                type="text"
                v-model="mpq_invent"
                @keyup.enter="getPatentList"
                @focus="handleInvent"
                placeholder="请输入关键词..."
              />
              <div class="filterSearch" v-if="isInvent">
                <div class="mask" @click.stop="handleInventClickQuery('close')"></div>
                <div class="sc-content">
                  <ul v-if="inventData.length!==0">
                    <li
                      v-for="(item,k) in inventData"
                      :key="k+'q'"
                      @click="handleInventClickQuery(item)"
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
        :data="handlePatentList"
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
    direction: "desc", //排序
    sortField: null,
    offset: 0,
    limit: 10,
    total: 0,
    number: 0,
    cur: null,
    currentPage: 1,
    mmq_patentNo: null,
    mpq_invent: null,
    mmq_chineseTitle: null,
    mpq_applicant: null,
    mpq_patentStatus: null,
    mpq_patentType: null,
    groupFilter: {},
    handlePatentList: [],
    loading: true, // 加载刷新动画
    personNameData: [], // 申请人
    isApplicant: false,
    isInvent: false,
    inventData: [], // 发明人
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
      mmq_chineseTitle1: "一种全数字无人机飞行器探测拦截装置的固定安装装置",
      mmq_patentNo1: "201820536731.1",
      mpq_applicant1: "广西一致科技有限公司",
      mpq_invent1: "秦林骏"
  }),
  components: {
    Aside,
    List
  },
  watch: {
    mpq_applicant(news) {
      this.mpq_applicant = news;
      this.handleApplicantSearchData();
    },
    mpq_invent (vals) {
      this.mpq_invent = vals;
      this.handleInventSearchData();
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
    this.getPatentList();
  },
  methods: {
    // 示例数据
    handleSampleData() {
      this.mmq_chineseTitle = this.mmq_chineseTitle1;
      this.mmq_patentNo = this.mmq_patentNo1;
      this.mpq_applicant = this.mpq_applicant1;
      this.mpq_invent = this.mpq_invent1
    },
      //排序控制
      sortClick(val,cur){
          this.sortField = val.value;
          this.cur = val.num;
          this.getPatentList();
      },
    calClick(val) {
      // this.handleReset();
      switch (val.type) {
        case "专利类型":
          this.mpq_patentType = val.value.name;
          break;
        case "专利状态":
          this.mpq_patentStatus = val.value.name;
          break;
        default:
          break;
      }
      this.getPatentList();
    },
    // 重置按钮
    handleReset() {
      this.offset = 0;
      this.sortField = null;
      this.mmq_chineseTitle = null;
      this.mpq_applicant = null;
      this.mpq_invent = null;
      this.mmq_patentNo = null;
      this.currentPage = 1;
      this.cur = '0';
      this.delClick();
      this.getPatentList();
    },
    delClick() {
      this.mpq_patentStatus = null;
      this.mpq_patentType = null;
    },
    // 申请人数据实时查询
    handleApplicantSearchData() {
      if (this.mpq_applicant) {
        this.$axios
          .get("/manage/personName", {
            params: { name: this.mpq_applicant }
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
    handleApplicant() {
      this.isApplicant = true;
    },
    handleInvent () {
    this.isInvent = true;
    },
    
    handlePersonClickQuery(item) {
      if(item !== "close") {
        this.mpq_applicant = item.name;
      }
      this.isApplicant = false;
    },
    // 发明人数据查询
    handleInventSearchData() {
      if (this.mpq_invent) {
        this.$axios
          .get("/manage/personName", {
            params: { name: this.mpq_invent }
          })
          .then(res => {
            if (res.data.code == 200) {
              this.inventData = res.data.data.content;
            }
          });
      } else {
        this.inventData = [];
      }
    },
    handleInventClickQuery(item) {
      if(item !== "close") {
        this.mpq_invent = item.name;
      }
      this.isInvent = false;
    },
    //查询按钮
    relevanceQuery(){
        this.offset = 0;
        this.sortField = '';
        this.getPatentList();
    },
    //   获取列表数据
    getPatentList() {
      this.loading = true;
      //基础数据
      var data = {
          limit: this.limit,
          offset: this.offset,
          direction: "desc",
          sortField: this.sortField
      }
      //输入条件
      if(this.mmq_chineseTitle != null) {
          data["mmq_chineseTitle"] = this.mmq_chineseTitle;
      }
      if(this.mmq_patentNo != null) {
          data["mmq_patentNo"] = this.mmq_patentNo;
      }
      if(this.mpq_applicant != null){
          data["mpq_organization.organizationName"] = this.mpq_applicant;   //申请人
      }
      if(this.mpq_invent != null){
          data["mpq_authors.personName"] = this.mpq_invent;    //发明人
      }
      //筛选条件
      if(this.mpq_patentStatus != null) {
          data["tq_patentStatus"] = this.mpq_patentStatus;
      }
      if(this.mpq_patentType != null) {
          data["tq_patentType"] = this.mpq_patentType;
      }
      this.$axios.post("/basic/patent", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.handlePatentList = res.data.data.content;
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
      this.getPatentList();
    },
    changeSizePage(event) {
      // this.loading = true;
      this.limit = event;
      this.getPatentList();
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