
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
              <label for="name">期刊名称：</label>
              <input
                type="text"
                v-model="mmq_name"
                @keyup.enter="getJournalList"
                placeholder="请输入关键词..."
              />
            </div>
            <div class="sc-input">
              <label for="name">主办机构：</label>
              <input
                type="text"
                v-model="mpq_organizationName"
                @keyup.enter="getJournalList"
                @focus="handleFocus"
                placeholder="请输入关键词..."
              />
              <div class="filterSearch" v-if="tipIsShow">
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
              <label for="name">国际刊号：</label>
              <input
                type="text"
                v-model="mpq_cn"
                @keyup.enter="getJournalList"
                placeholder="请输入关键词..."
              />
            </div>
            <div class="sc-input">
              <label for="name">国内刊号：</label>
              <input
                type="text"
                v-model="mpq_issn"
                @keyup.enter="getJournalList"
                placeholder="请输入关键词..."
              />
            </div>
          </div>
        </div>
        <div class="sc-searchBtn">
          <span class="sampleData" @click="handleSampleData">示例数据</span>
          <Button class="btn" type="info" @click="relevanceQuery">查询</Button>
          <Button class="btn" type="info" @click="handleReset('updata')">重置</Button>
        </div>
      </div>

      <List
        :data="journalData"
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
          :total="total"
          :page-size="limit"
          :current.sync="currentPage"
          @on-change="changePage"
          @on-page-size-change="changeSizePage"
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
    limit: 12,
    offset: 0,
    sortField: 'weight&name.keyword',
    total: 0,
    number: 0,
    cur: null,
    currentPage: 1,
    mpq_cn: null,
    mpq_issn: null,
    mmq_name: null,
    mpq_organizationName: null,
    mpq_status: null,
    mpq_publishCycle: null,
    mpq_impactFactor_fullImpact: null,
    groupFilter: {},
    journalData: {},
    loading: true, // 加载刷新动画
    tipIsShow: false,
    organizationNameData: [], // 主办单位
    typeArr: ["出版周期", "出版状态", "检索级别"],
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
      mmq_name1: "航天器环境工程",
      mpq_organizationName1: "北京卫星环境工程研究所"

  }),
  components: {
    Aside,
    List
  },
  watch: {
    mpq_organizationName(news) {
      this.mpq_organizationName = news;
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
    this.getJournalList();
  },
  methods: {
    // 示例数据
    handleSampleData() {
      this.mmq_name = this.mmq_name1;
      this.mpq_organizationName = this.mpq_organizationName1;
    },
    //排序控制
    sortClick(val,cur) {
      this.sortField = val.value;
      this.cur = val.num;
      this.getJournalList();
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
    handleFocus() {
      this.tipIsShow = true;
    },
    handleClickQuery(item) {
      if (item !== "close") {
        this.mpq_organizationName = item.name;
      }
      this.tipIsShow = false;
    },
    // 检索重置
    handleReset() {
      (this.offset = 0), (this.sortField = 'weight&name.keyword'), (this.mmq_name = null);
      this.mpq_organizationName = null;
      this.mpq_cn = null;
      this.mpq_issn = null;
      this.currentPage = 1;
      this.cur = '0';
      this.delClick();
      this.getJournalList();
    },
    //查询按钮
    relevanceQuery(){
        this.offset = 0;
        this.sortField = 'weight&name.keyword';
        this.getJournalList();
    },
    //   获取列表数据
    getJournalList() {
      this.loading = true;
      //基础字段
      var data = {
        limit: this.limit,
        offset: this.offset,
        direction: this.direction,
        sortField:this.sortField
      };
      //输入字段
      if (this.mmq_name != null) {
        // 期刊名字
        data["mmq_name"] = this.mmq_name;
        if(this.sortField == 'weight&name.keyword'){
           data["sortField"] = null;
        }
      }
      if (this.mpq_organizationName != null) {
        // 主办单位
        data["mpq_organization.organizationName"] = this.mpq_organizationName;
      }
      if (this.mpq_cn != null) {
        // 国际刊号
        data["mpq_cn"] = this.mpq_cn;
      }
      if (this.mpq_issn != null) {
        // 国内刊号
        data["mpq_issn"] = this.mpq_issn;
      }
      //左侧筛选字段
      if (this.mpq_status != null) {
        // 出版状态
        data["tq_status"] = this.mpq_status;
      }
      if (this.mpq_publishCycle != null) {
        // 出版周期
        data["tq_publishCycle"] = this.mpq_publishCycle;
      }
      if (this.mpq_impactFactor_fullImpact != null) {
        // 检索级别
        data["tq_impactFactor.fullImpact"] = this.mpq_impactFactor_fullImpact;
      }
      this.$axios.post("/basic/journal", this.$qs.stringify(data)).then(res => {
        if (res.data.code == 200) {
          this.loading = false;
          this.journalData = res.data.data.content;
          this.total = res.data.count * 1;
          this.number = res.data.total;
          this.groupFilter = res.data.filter;
        }
      });
    },

    calClick(val) {
      switch (val.type) {
        case "出版周期":
          this.mpq_publishCycle = val.value.name;
          break;
        case "出版状态":
          this.mpq_status = val.value.name;
          break;
        case "综合因子":
          this.mpq_impactFactor_fullImpact = val.value.name;
          break;
        default:
          break;
      }
      this.getJournalList();
    },

    delClick() {
      this.mpq_publishCycle = null;
      this.mpq_status = null;
      this.mpq_impactFactor_fullImpact = null;
    },

    // 分页
    changePage(event) {
      this.offset = event - 1;
      this.getJournalList();
    },
    changeSizePage(event) {
      // this.loading = true;
      this.limit = event;
      this.getJournalList();
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
    left: 23%;
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