<template>
  <div class="sc_warp">
    <section>
      <div class="sc-top-box">
        <!-- <div class="sc-title">检索到&nbsp;{{number?number:0}}&nbsp;片论文</div>
        <Dropdown trigger="click" >
          <a href="javascript:void(0)">
            排序条件
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native ="sortFieldClick('')" id="">相关度</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('year')" id="year">发表日期</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('referenceNum')" id="referenceNum">被引频次</DropdownItem>
          </DropdownMenu>
        </Dropdown>-->
        <div class="sc-header">
          <div class="sc-sort">
            <span>排序条件：</span>
            <ul>
              <li :class="{activeColor:cur == 0}" @click="sortFieldClick('','0')" id="不传值">相关度</li>
              <li :class="{activeColor:cur == 1}" @click="sortFieldClick('year','1')" id="year">发表日期</li>
              <li :class="{activeColor:cur == 2}" @click="sortFieldClick('referenceNum','2')" id="referenceNum">被引频次</li>
            </ul>
          </div>
          <div class="totals">
            <span>检索到&nbsp;{{number?number:0}}&nbsp;片论文</span>
          </div>
        </div>
      </div>
      <transition name="show">
        <ul class="sc-loading-ul sc-list" v-if="!loading">
          <li v-for="item in data" :key="item.paperId">
            <Row>
              <i-col span="20">
                <h3>
                  <a
                    class="paperNameHeader"
                    v-html="item.name"
                    href="javascript:void(0);"
                    @click="setPath(item.name?item.name:'未知','/paperdetails',item.paperId)"
                  ></a>
                </h3>
              </i-col>
              <i-col span="4">
                <div style="color: #1843A3;">
                  <label>被引用数：</label>
                  <span>{{item.referenceNum}}</span>
                </div>
              </i-col>
            </Row>
            <Row>
              <i-col span="24">
                <div class="m_left personName">
                  <label>作者：</label>
                  <span
                    v-for="subItem in item.author"
                    :key="subItem.personId"
                    @click="personSetPath(subItem.personName?subItem.personName:'未知','/persondetails',subItem.personId)"
                  >{{subItem.personName}}</span>
                </div>
              </i-col>
            </Row>
            <row>
              <i-col span="24">
                <div class="m_left orgName">
                  <label>作者机构：</label>
                  <span
                    v-for="subItem in item.organization"
                    :key="subItem.organizationId"
                    @click.stop="orgSetPath(subItem.organizationName?subItem.organizationName:'未知','/organdetails',subItem.organizationId)"
                  >{{subItem.organizationName}}</span>
                </div>
              </i-col>
            </row>
            <Row>
              <i-col span="12" v-if="markTab == 0">
                <div class="m_left">
                  <label style="float: left;">期刊名称：</label>
                  <span
                    class="journalName"
                    @click="handleJournalSetpath(item.journal.journalName,'/journaldetails',item.journal.journalId)"
                  >{{item.journal.journalName}}</span>
                </div>
              </i-col>
              <i-col span="12" v-else-if="markTab == 1">
                <div class="m_left">
                  <label>会议名称：</label>
                  <span>{{item.conference.conferenceName}}</span>
                </div>
              </i-col>
              <i-col span="12">
                <div class="m_left">
                  <label>发表时间：</label>
                  <span>{{item.year}}</span>
                </div>
              </i-col>
            </Row>
            <Row>
              <i-col span="24">
                <label>关键词：</label>
                <span v-for="(subItem,i) in item.keyWordData" :key="i">{{subItem.value + "；"}}</span>
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
import API from "../../../../api/index.js";
export default {
  name: "paper",
  data: () => {
    return {
      cur:null
    };
  },
  props: ["data", "total", "loading", "markTab", "number","curVal"],
  //  computed:{
  //    filterArr() {

  //    }
  //  },
  watch: {
    data(news, old) {
      this.handleDataList(news);
    },
    loading(newVal) {
      this.loading = newVal;
    },
    markTab(val) {
      this.markTab = val;
    },
    curVal(news) {
      this.cur = news;
    }
  },
  created() {
    this.handleDataList(this.data);
  },
  methods: {
    handleDataList(news) {
      this.data = news;
      for (let i = 0; i < this.data.length; i++) {
        let keyWordData = [];
        let keyword = this.data[i].keyword;
        for (let j = 0; j < keyword.length; j++) {
          let temp = {};
          temp = {
            value: keyword[j]
          };
          keyWordData.push(temp);
        }
        this.data[i].keyWordData = keyWordData;
      }
    },
    //导航坐标
    setPath(name, path, paperId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "论文（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { paperId } });
    },
    // 作者跳转
    personSetPath(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "人员画像（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
    // 机构跳转
    orgSetPath(name, path, id, mark) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);

      positionArr.push({
        pathName: "个人画像（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId: id } });
    },
    // 期刊跳转
    handleJournalSetpath(name, path, journalId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "期刊（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { journalId } });
    },
    //排序
    sortFieldClick(val,cur) {
      if(val == "") {
        this.cur = 0;
      } else if (val == "year") {
        this.cur = 1;
      } else if(val == "referenceNum") {
        this.cur = 2;
      }
      this.$emit("sortclick", { value: val,num: cur });
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
      width: 600px;
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      white-space: nowrap;
      a {
        color: #1843a3;
        cursor: pointer;
      }
    }
    h3:hover {
      text-decoration: underline;
    }
    .ivu-row {
      line-height: 26px;
    }
    .personName span,
    .orgName span {
      cursor: pointer;
      margin-right: 10px;
    }
    .personName span:hover,
    .orgName span:hover,
    .journalName:hover {
      color: #1843a3;
      text-decoration: underline;
    }
    label {
      font-size: 13px;
    }
    span {
      font-size: 13px;
    }
    .paperNameHeader {
      height: 32px;
      line-height: 32px;
    }
    .journalName {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis; //文本溢出显示省略号
      white-space: nowrap;
      width: 300px;
      cursor: pointer;
    }
  }
}

.noData {
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
}
</style>