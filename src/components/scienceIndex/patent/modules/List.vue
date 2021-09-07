<template>
  <div class="sc_warp">
    <section>
      <div class="sc-top-box">
        <!-- <div class="sc-title">检索到&nbsp;{{number?number:0}}&nbsp;个专利</div>
        <Dropdown trigger="click" >
          <a href="javascript:void(0)">
            排序条件
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem  @click.native="sortFieldClick('')" id="不传值">相关度</DropdownItem>
            <DropdownItem  @click.native="sortFieldClick('applyDate.keyword')" id="applyDate">申请日期</DropdownItem>
            <DropdownItem  @click.native="sortFieldClick('year')" id="publishDate">公开日期(无值)</DropdownItem>
          </DropdownMenu>
        </Dropdown>-->
        <div class="sc-header">
          <div class="sc-sort">
            <span>排序条件：</span>
            <ul>
              <li :class="{activeColor:cur == 0}" @click="sortFieldClick('','0')" id="不传值">相关度</li>
              <li :class="{activeColor:cur == 1}" @click="sortFieldClick('applyDate.keyword','1')" id="applyDate">申请日期</li>
              <li :class="{activeColor:cur == 2}" @click="sortFieldClick('year','2')" id="awardDate">公告日</li>
            </ul>
          </div>
          <div class="totals">
            <span>检索到&nbsp;{{number?number:0}}&nbsp;个专利</span>
          </div>
        </div>
      </div>
      <transition name="show">
        <ul class="sc-loading-ul sc-list" v-if="!loading">
          <li v-for="(item) in data" :key="item.patentId">
            <h3>
              <a
                v-html="item.chineseTitle"
                href="javascript:void(0);"
                @click="setPath(item.chineseTitle?item.chineseTitle:'未知','/patentdetails',item.patentId)"
              ></a>
            </h3>
            <Row>
              <i-col span="24">
                <label>发明人：</label>
                <span
                  class="mmq_invent"
                  v-for="(subItem,i) in item.authors"
                  :key="i"
                  @click="authorSetpath(subItem.personName,'/persondetails',subItem.personId)"
                >{{subItem.personName}}</span>
              </i-col>
            </Row>
            <Row>
              <i-col span="12">
                <label>申请人：</label>
                <span
                  class="applicant"
                  @click="organSetpath(item.organization.organizationName,'/organdetails',item.organization.organizationId)"
                >{{item.organization.organizationName}}</span>
              </i-col>
              <i-col span="12">
                <label>申请日期：</label>
                <span>{{item.applyDate}}</span>
              </i-col>
            </Row>
            <Row>
              <i-col span="8">
                <label>申请号：</label>
                <span>{{item.patentNo}}</span>
              </i-col>
              <i-col span="8">
                <label>公开号：</label>
                <span>{{item.publish_num}}</span>
              </i-col>

              <i-col span="8">
                <label>公告日：</label>
                <span>{{item.awardDate}}</span>
              </i-col>
            </Row>
            <Row>
              <i-col span="8">
                <label>专利类型：</label>
                <span>{{item.patentType == 'null'?'未知':item.patentType}}</span>
              </i-col>
              <i-col span="8">
                <label>专利状态：</label>
                <span>{{item.patentStatus == 'null'?'未知':item.patentStatus}}</span>
              </i-col>
              <i-col span="8">
                <label>主分类号：</label>
                <span>{{item.mainClassNum}}</span>
              </i-col>
            </Row>
            <Row>
              <i-col span="24">
                <label>摘要：</label>
                <span>{{item.abstract?item.abstract:'未知'}}</span>
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
  name: "patent",
  data() {
    return {
      cur:null,
    };
  },
  props: ["data", "total", "number", "loading","curVal"],
  watch: {
    data(news, old) {
      this.handlePatentList(news);
    },
    loading(news) {
      this.loading = news;
    },
    curVal(newVal) {
      this.cur = newVal;
    }
  },
  created() {},
  mounted() {
    this.handlePatentList(this.data);
    // console.log(this.data);
  },
  methods: {
    handlePatentList(news) {},
    //导航坐标
    setPath(name, path, patentId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "专利详情（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.handleRouter(path, patentId);
    },
    // //路由跳转
    handleRouter(path, patentId) {
      this.$router.push({ path, query: { patentId } });
      // this.$store.state.variable.backTop(); //后返回顶部
    },
    sortFieldClick(val,cur) {
      if (val == "") {
        this.cur = 0;
      } else if (val == "applyDate.keyword") {
        this.cur = 1;
      } else if (val == "year") {
        this.cur = 2;
      }
      this.$emit("sortclick", { value: val,num: cur });
    },
    // 作者跳转
    authorSetpath(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研人员" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
    // 申请人跳转
    organSetpath(name, path, orgId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研机构" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId } });
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
    .ivu-row {
      line-height: 26px;
    }
    h3 {
      font-size: 15px;
      width: 700px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      a {
        color: #1843a3;
        cursor: pointer;
      }
      a:hover {
        text-decoration: underline;
      }
    }

    label,
    span {
      font-size: 13px;
    }
    .mmq_invent {
      margin-right: 8px;
      cursor: pointer;
    }
    .applicant {
      cursor: pointer;
    }
    .mmq_invent:hover,
    .applicant:hover {
      color: #1843a3;
      text-decoration: underline;
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