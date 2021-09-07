<template>
  <div class="sc_warp">
    <section>
      <div class="sc-top-box">
        <!-- <div class="sc-title">检索到&nbsp;{{number?number:0}}&nbsp;个标准</div>
        <Dropdown trigger="click" >
          <a href="javascript:void(0)">
            排序条件
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native ="sortFieldClick('')" id="no">相关度</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('publishDate')" id="publishDate">发布日期</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('implementDate')" id="implementDate">实施日期</DropdownItem>
          </DropdownMenu>
        </Dropdown>-->
        <div class="sc-header">
          <div class="sc-sort">
            <span>排序条件：</span>
            <ul>
              <li :class="{activeColor:cur == 0}" @click="sortFieldClick('','0')" id="不传值">相关度</li>
              <li :class="{activeColor:cur == 1}" @click="sortFieldClick('publishDate','1')" id="publishDate">发布日期</li>
              <li :class="{activeColor:cur == 2}" @click="sortFieldClick('implementDate','2')" id="implementDate">实施日期</li>
            </ul>
          </div>
          <div class="totals">
            <span>检索到&nbsp;{{number?number:0}}&nbsp;个标准</span>
          </div>
        </div>
      </div>
      <transition name="show">
        <ul class="sc-loading-ul sc-list" v-if="!loading">
          <li v-for="(item) in data" :key="item.criterionId">
            <Row>
              <i-col span="24">
                <h3>
                  <a
                    v-html="item.name"
                    href="javascript:void(0);"
                    @click="setPath(item.chineseTitle?item.chineseTitle:'未知','/criteriondetails',item.criterionId)"
                  ></a>
                </h3>
              </i-col>
            </Row>
            <Row>
              <i-col span="8">
                <label>标准类型:</label>
                <span>{{item.criterionType == 'null'?'未知':item.criterionType}}</span>
              </i-col>
              <i-col span="8">
                <label>标准号:</label>
                <span>{{item.criterionNo == 'null'?'未知':item.criterionNo}}</span>
              </i-col>
              <i-col span="8">
                <label>标准状态:</label>
                <span>{{item.state == 'null'?'未知':item.state}}</span>
              </i-col>
            </Row>
            <Row>
              <i-col span="8">
                <label>实施日期:</label>
                <span>{{item.implementDate == 'null'?'未知':item.implementDate}}</span>
              </i-col>
              <i-col span="8">
                <label>发布日期:</label>
                <span>{{item.publishDate == 'null'?'未知':item.publishDate}}</span>
              </i-col>
            </Row>
            <Row>
              <i-col span="24">
                <label>发布机构:</label>
                <span class="publishAgency">{{item.publishOrg.organizationName}}</span>
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
      cur:null
    };
  },
  props: ["data", "total", "number", "loading","curVal"],
  watch: {
    data(news, old) {
      this.handleCriterionlist(news);
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
    this.handleCriterionlist(this.data);
    // console.log(this.data);
  },
  methods: {
    handleCriterionlist(news) {},
    //导航坐标
    setPath(name, path, criterionId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "标准详情（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.handleRouter(path, criterionId);
    },
    // //路由跳转
    handleRouter(path, criterionId) {
      this.$router.push({ path, query: { criterionId } });
      // this.$store.state.variable.backTop(); //后返回顶部
    },
    sortFieldClick(val,cur) {
      if(val == "") {
        this.cur = 0;
      }else if (val == "publishDate") {
        this.cur =1;
      }else if (val== "implementDate") {
        this.cur = 2;
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
      width: 700px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      // line-height: 32px;
      a {
        cursor: pointer;
        color: #1843a3;
      }
    }
    h3 a:hover {
      text-decoration: underline;
    }
    label {
      font-size: 13px;
      margin-right: 10px;
    }
    span {
      font-size: 13px;
    }
    .ivu-row {
      line-height: 24px;
    }
    .publishAgency {
      margin-right: 10px;
    }
  }
}
</style>