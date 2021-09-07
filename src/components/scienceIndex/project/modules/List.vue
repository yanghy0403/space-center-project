<template>
  <div class="sc_warp">
    <section>
      <div class="sc-top-box">
        <!-- <div class="sc-title">检索到&nbsp;{{number?number:0}}&nbsp;个项目</div>
        <Dropdown trigger="click" >
          <a href="javascript:void(0)">
            排序条件
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native ="sortFieldClick('')" id="">相关度</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('year')" id="year">批准年度</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('startTime')" id="startTime">项目开始时间</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('entTime')" id="entTime">项目结束时间</DropdownItem>
          </DropdownMenu>
        </Dropdown>-->
        <div class="sc-header">
          <div class="sc-sort">
            <span>排序条件：</span>
            <ul>
              <li :class="{activeColor:cur == 0}" @click="sortFieldClick('','0')" id="不传值">相关度</li>
              <li :class="{activeColor:cur == 1}" @click="sortFieldClick('year','1')" id="year">批准年度</li>
              <li
                :class="{activeColor:cur == 2}"
                @click="sortFieldClick('startTime','2')"
                id="startTime"
              >项目开始时间</li>
              <li :class="{activeColor:cur == 3}" @click="sortFieldClick('entTime','3')" id="entTime">项目结束时间</li>
              <!-- <li
                :class="{activeColor:cur == 4}"
                @click="sortFieldClick('resultsTotal')"
                id="resultsTotal"
              >成果总数</li> -->
            </ul>
          </div>
          <div class="totals">
            <span>检索到&nbsp;{{number?number:0}}&nbsp;个项目</span>
          </div>
        </div>
      </div>
      <transition name="show">
        <ul class="sc-loading-ul sc-list" v-if="!loading">
          <li v-for="(item) in data" :key="item.projectId">
            <h3>
              <a
                v-html="item.name"
                href="javascript:void(0);"
                @click="setPath(item.name?item.name:'未知','/projectdetails',item.projectId)"
              ></a>
            </h3>
            <Row>
              <i-col span="8">
                <label>批准年度:</label>
                <span>{{item.year}}</span>
              </i-col>
              <i-col span="8">
                <label>学科领域:</label>
                <span>{{item.projectNature}}</span>
              </i-col>
              <i-col span="8">
                <label>项目类型:</label>
                <span>{{item.type == 'null'?'未知':item.type}}</span>
              </i-col>
            </Row>
            <Row>
              <i-col span="8">
                <label>负责人:</label>
                <span
                  class="chargePersonName"
                  @click="changePersonSetPath(item.charge.personName,'/persondetails',item.charge.personId)"
                >{{item.charge.personName}}</span>
              </i-col>
              <i-col span="12">
                <label>依托单位:</label>
                <span
                  class="organizationName"
                  v-for="subItem in item.organization"
                  :key="subItem.organizationId"
                  @click="orgSetPath(subItem.organizationName,'/organdetails',subItem.organizationId)"
                >{{subItem.organizationName}}</span>
              </i-col>
            </Row>
            <Row>
              <i-col span="24">
                <label>关键字:</label>
                <span
                  class="KeywordData"
                  v-for="(subItem,i) in item.chineseKeywordData"
                  :key="i"
                >{{subItem.value + '；'}}</span>
              </i-col>
            </Row>
            <Row class="btm">
              <i-col span="24">
                <label style="float: left;">研究成果:</label>
                <div class="Research_results">
                  <span>
                    期刊论文
                    <label>{{item.journalPaperNum}}</label>
                  </span>
                  <span>
                    会议论文
                    <label>{{item.conferencePaperNum}}</label>
                  </span>
                  <span>
                    著作
                    <label>{{item.monographNum}}</label>
                  </span>
                  <span>
                    奖励
                    <label>{{item.rewardNum}}</label>
                  </span>
                  <span>
                    专利
                    <label>{{item.patentNum}}</label>
                  </span>
                </div>
              </i-col>
            </Row>
          </li>
        </ul>
      </transition>
      <div class="loading-height" v-if="loading">
        <Spin fix>
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
        <div v-if="!loading&&data.length===0" class="sc-box-content no-data border-bottom">暂无数据</div>
      </div>
    </section>
  </div>
</template>

<script>
// 项目
import API from "../../../../api/index.js";
export default {
  name: "patent",
  data() {
    return {
      startTimeData: "",
      entTimeData: "",
      keyWord: [],
      cur:null
    };
  },
  props: ["data", "loading", "total", "number","curVal"],
  watch: {
    data(news, old) {
      this.handlePatentList(news);
    },
    loading(newVal, oldVal) {
      this.loading = newVal;
    },
    curVal(news) {
      this.cur = news;
    }
  },
  created() {},
  mounted() {
    this.handlePatentList(this.data);
    // console.log(this.data);
  },
  methods: {
    handlePatentList(news) {
      for (var i = 0; i < news.length; i++) {
        let chineseKeywordData = [];
        let chineseKeyword = news[i].chineseKeyword;
        let englishKeyword = news[i].englishKeyword;
        for (var j = 0; j < chineseKeyword.length; j++) {
          let temp = {};
          temp = {
            value: chineseKeyword[j]
          };
          chineseKeywordData.push(temp);
        }
        for (var k = 0; k < englishKeyword.length; k++) {
          let obj = {};
          obj = {
            value: englishKeyword[k]
          };
          chineseKeywordData.push(obj);
        }
        news[i].chineseKeywordData = chineseKeywordData;
      }
    },
    //导航坐标
    setPath(name, path, projectId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "项目详情（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      // this.handleRouter(path, projectId);
      this.$router.push({ path, query: { projectId } });
    },
    // 负责人
    changePersonSetPath(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研人员画像（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      // this.handleRouter(path, projectId);
      this.$router.push({ path, query: { personId } });
    },
    // 依托单位
    orgSetPath(name, path, orgId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研机构画像（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      // this.handleRouter(path, projectId);
      this.$router.push({ path, query: { orgId } });
    },
    sortFieldClick(val,cur) {
      if (val == "") {
        this.cur = 0;
      } else if (val == "year") {
        this.cur = 1;
      } else if (val == "startTime") {
        this.cur = 2;
      } else if (val == "entTime") {
        this.cur = 3;
      }
      this.$emit("sortclick", { value: val,num:cur });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../style/listStyle.scss";
.sc-top-box {
  position: relative;
  /deep/ .ivu-dropdown {
    bottom: 10px;
    right: 20px;
    .ivu-dropdown-rel {
      a {
        font-size: 15px;
        color: #1843a3;
      }
    }
  }
}
.sc-loading-ul {
  li {
    border-bottom: 1px solid #ccc;
    h3 {
      font-size: 15px;
      a {
        cursor: pointer;
        color: #1843a3;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    .ivu-row {
      line-height: 24px;
    }
    label {
      margin-right: 10px;
      color: #666;
      font-size: 13px;
    }
    span {
      color: #666;
      font-size: 13px;
    }

    .chargePersonName,
    .organizationName {
      cursor: pointer;
    }
    .chargePersonName:hover,
    .organizationName:hover {
      color: #1843a3;
      text-decoration: underline;
    }
    .Research_results {
      span {
        margin-right: 30px;
        font-size: 12px;
        label {
          padding: 1px 10px;
          // border: 1px solid #ccc;
          background: #f3f3f3;
          border-radius: 5px;
          font-size: 12px;
          margin-left: 5px;
        }
      }
    }
  }
}
.noData {
  width: 100%;
  li {
    text-align: center;
    font-size: 16px;
    height: 100px;
    line-height: 100px;
  }
}
</style>