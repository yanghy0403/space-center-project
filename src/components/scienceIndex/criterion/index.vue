
<template>
  <div class="sc-query">
    <div class="sc-aside">
      <Aside :data="groupFilter" :query="query" :typeArr="typeArr" @calclick="calClick" @rangYear="rangeClick" />
    </div>
    <div class="sc-section">
      <div class="search">
        <div class="sc-search">
          <div class="sc-left">
            <div class="sc-input">
              <label for="name">标准名称：</label>
              <input
                type="text"
                v-model="mmq_name"
                @keyup.enter="getCriterionList"
                placeholder="请输入关键词..."
              />
            </div>
            <div class="sc-input">
              <label for="name">标准号：</label>
              <input
                type="text"
                v-model="mpq_criterionNo"
                @keyup.enter="getCriterionList"
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
        :data="handleCriterionList"
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
    mmq_name: null,
    mpq_criterionNo: null,
    groupFilter: {},
    handleCriterionList: [],
    mpq_criterionType: null,
    mpq_state: null,
    rqg_year: null,
    rql_year: null,
    tq_year : null,
    loading: true, // 加载刷新动画
    typeArr: [""],
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
      mmq_name1: "航天器发射窗口设计指南",
      mpq_criterionNo1: "GB/T 29078-2012"
  }),
  components: {
    Aside,
    List
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
    this.getCriterionList();
  },
  methods: {
    // 示例数据
    handleSampleData() {
      this.mmq_name = this.mmq_name1;
      this.mpq_criterionNo = this.mpq_criterionNo1;
    },
      //排序控制
      sortClick(val,cur){
          this.sortField = val.value;
          this.cur = val.num;
          this.getCriterionList();
      },
      //年度范围筛选
      rangeClick(val){
          var year =  new Date().getFullYear();
          if(val.type == 'a'){
           this.rqg_year = year-val.value;
           this.rql_year = year
          }
          if(val.type == 'b'){
              this.rql_year = year-val.value;
          }
          this.getCriterionList();
      },
    calClick(val) {
      // this.handleReset();
      switch (val.type) {
        case "标准类型":
          this.mpq_criterionType = val.value.name;
          break;
        case "标准状态":
          this.mpq_state = val.value.name;
          break;
        case "精确年份" :
            this.tq_year = val.value.name;
            break;
        default:
          break;
      }
      this.getCriterionList();
    },
    // 重置按钮
    handleReset() {
      this.offset = 0;
      this.sortField = null;
      this.mmq_name = null;
      this.mpq_criterionNo = null;
      this.currentPage = 1;
      this.cur = '0'; 
      this.delClick();
      this.getCriterionList();
    },
    delClick() {
      this.mpq_criterionType = null;
      this.mpq_state = null;
      this.rqg_year = null;
      this.rql_year = null;
      this.tq_year = null;
    },
    //查询按钮
    relevanceQuery(){
        this.offset = 0;
        this.sortField = '';
        this.getCriterionList();
    },
      //   获取列表数据
    getCriterionList() {
      this.loading = true;
      var data = {
        limit: this.limit,
        offset: this.offset,
        direction:this.direction,
        sortField : this.sortField
      };
      if(this.mmq_name !=null){
          data["mmq_name"] = this.mmq_name;
      }
        if(this.mpq_criterionNo !=null){
            data["mpq_criterionNo"] = this.mpq_criterionNo;
        }
        if(this.mpq_criterionType !=null){
            data["tq_criterionType"] = this.mpq_criterionType;
        }
        if(this.mpq_state !=null){
            data["tq_state"] = this.mpq_state;
        }
        if(this.rqg_year !=null){
            data["rqg_year"] = this.rqg_year;
        }
        if(this.rql_year !=null){
            data["rql_year"] = this.rql_year;
        }
        if(this.tq_year !=null){
            data["tq_year"] = this.tq_year;
        }

      this.$axios
        .post("/basic/criterion", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.handleCriterionList = res.data.data.content;
            this.total = res.data.count * 1;
            this.number = res.data.total;
            this.groupFilter = res.data.filter;
            // console.log(this.total)
          }
        });
    },
    // 分页
    changePage(event) {
      // this.loading = true;
      this.offset = event - 1;
      this.getCriterionList();
    },
    changeSizePage(event) {
      this.loading = true;
      this.limit = event;
      this.getCriterionList();
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
// .sc-search .sc-input label[data-v-43f211a8] {
//   width: 130px;
// }
// .sc-right {
//   text-align: center;
// }
// .sc-right span {
//   cursor: pointer;
//   width: 95px;
//   height: 38px;
//   padding: 10px 26px;
//   line-height: 40px;
//   text-align: center;
//   text-align: center;
//   margin-left: 8px;
//   font-size: 14px;
//   color: #ffffff;
//   border-radius: 18px;
//   -webkit-transition: all 0.2s;
//   transition: all 0.2s;
// }
// .sc-right span:nth-child(1) {
//   background-color: #00daec;
//   box-shadow: 0px 0px 1px #00daec;
// }
// .sc-right span:nth-child(2) {
//   background-color: rgba(153, 153, 153, 1);
//   box-shadow: 0px 0px 1px rgba(153, 153, 153, 1);
// }
</style>