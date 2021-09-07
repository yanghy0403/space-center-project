
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
              <label for="name">会议名称：</label>
              <input
                type="text"
                v-model="mmq_name"
                @keyup.enter="getConferenceList"
                placeholder="请输入关键词..."
              />
            </div>
            <div class="sc-input">
              <label for="name">会议年度：</label>
              <input
                type="text"
                v-model="tq_date"
                @keyup.enter="getConferenceList"
                placeholder="请输入关键词..."
              />
            </div>
            <div class="sc-input">
              <label for="name">会议地点：</label>
              <input
                type="text"
                v-model="mpq_place1"
                @keyup.enter="getConferenceList"
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
        :data="conferenceData"
        :loading="loading"
        :total="total"
        :number="number"
        @updata="calClick"
        @deldata="delClick"
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
  data() {
    return {
      limit: 10,
      offset: 0,
      direction: "desc",
      sortField: null,
      mmq_name: null,
      tq_date: null,
      mpq_place1: null,
      total: 0,
      number: 0,
      currentPage: 1,
      conferenceData: [],
      groupFilter: {},
      loading: true, // 加载刷新动画
      typeArr: ["国家"],
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
      mmq_name1: "第三届中国卫星导航学术年会—S08卫星导航模型与方法",
    };
  },
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
    this.getConferenceList();
  },
  methods: {
    // 示例数据
    handleSampleData() {
      this.mmq_name = this.mmq_name1;
    },
    //查询按钮
    relevanceQuery(){
        this.offset = 0;
        this.sortField = '';
        this.getConferenceList();
    },
    //   获取列表数据
    getConferenceList() {
      this.loading = true;
      //基础字段
      var data = {
        limit: this.limit,
        offset: this.offset,
        direction:this.direction,
        sortField:this.sortField,
      };
      //输入字段
      if(this.mmq_name !=null ){   //会议名
          data["mmq_name"] = this.mmq_name;
      }
      if(this.tq_date !=null ){   //时间
          data["tq_date"] = this.tq_date;
      }
      if(this.mpq_place1 !=null ){   //开会地址 - 国家
          data["tq_place1"] = this.mpq_place1;
      }
      this.$axios
        .post("/basic/conference", this.$qs.stringify(data))
        .then(res => {
          if (res.data.code == 200) {
            this.loading = false;
            this.conferenceData = res.data.data.content;
            this.total = res.data.count * 1;
            this.number = res.data.total;
            this.groupFilter = res.data.filter;
          }
        });
    },

    calClick(val) {
      if (val.type == "国家") {
        this.mpq_place1 = val.value.name;
      }
    },
    // 重置按钮
    handleReset() {
      this.offset = 0;
      this.sortField = null,
      this.mmq_name = null;
      this.tq_date = null;
      this.currentPage = 1;
      this.delClick();
      this.getConferenceList();
    },
    delClick() {
        this.mpq_place1 = null;
    },

    // 分页
    changePage(event) {
      // this.loading = true;
      this.offset = event - 1;
      this.getConferenceList();
    },
    changeSizePage(event) {
      this.loading = true;
      this.limit = event;
      this.getConferenceList();
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
</style>