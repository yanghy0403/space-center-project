<template>
  <div class="sc_warp">
    <section>
      <div class="sc-top-box">
        <!-- <div class="sc-title">检索到&nbsp;{{number?number:0}}&nbsp;个专著</div>
        <Dropdown trigger="click" >
          <a href="javascript:void(0)">
            排序条件
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list" >
            <DropdownItem  @click.native ="sortFieldClick('')"  id="不传值">相关度</DropdownItem>
            <DropdownItem @click.native="sortFieldClick('year')" id="year">发布日期</DropdownItem>
          </DropdownMenu>
        </Dropdown> -->
        <div class="sc-header">
          <div class="sc-sort">
            <span>排序条件：</span>
            <ul>
              <li :class="{activeColor:cur == 0}" @click="sortFieldClick('','0')" id="不传值">相关度</li>
              <li :class="{activeColor:cur == 1}" @click="sortFieldClick('year','1')" id="year">发布日期</li>
            </ul>
          </div>
          <div class="totals">
            <span>检索到&nbsp;{{number}}&nbsp;个专著</span>
          </div>
        </div>
      </div>
      <transition name="show">
        <ul class="sc-loading-ul sc-list"  v-if="!loading">
          <li v-for="(item) in data" :key="item.monographId">
            <h3>
              <a
                v-html="item.name"
                href="javascript:void(0);"
                @click="setPath(item.name?item.name:'未知','/monographdetails',item.monographId)"
              ></a>
            </h3>
            <Row>
              <i-col span="24">
                <label>作者:</label>
                <span
                  class="personName"
                  v-for="(subItem,i) in item.author"
                  :key="i"
                  @click="authorSetPath(subItem.personName,'/persondetails',subItem.personId)"
                >{{subItem.personName}}</span>
              </i-col>
            </Row>
            <Row>
              <i-col span="24">
                <label>作者机构:</label>
                <span
                  class="organName"
                  v-for="(subItem,index) in item.organizationAuthor"
                  :key="index"
                  @click="organSetpath(subItem.organizationName,'/organdetails',subItem.organizationId)"
                >{{subItem.organizationName}}</span>
              </i-col>
            </Row>
            <!-- <Row>
              <i-col span="8">
                <label>语言:</label>
                <span>{{item.language == "chinese"?'中文':item.language}}</span>
              </i-col>
              <i-col span="8">
                <label>出版时间:</label>
                <span>{{item.year == 'null'?'未知':item.year}}</span>
              </i-col>
              <i-col span="8">
                <label>出版社:</label>
                <span></span>
              </i-col>
            </Row> -->
            <Row>
              <i-col span="24">
                <label>资助项目：</label>
                <span class="fundProject" v-for="(subItem,i) in item.fundProject" :key="i+1" @click="handleProjectSetpath(subItem.projectName,'/projectdetails',subItem.projectId)">{{subItem.projectName}}</span>
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
  props: ["data", "total" ,"number","loading","curVal"],
  watch: {
    data(news, old) {
      this.handleMonographList(news);
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
    this.handleMonographList(this.data);
  },
  methods: {
    handleMonographList(news) {},
    //导航坐标
    setPath(name, path, monographId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "专著详情（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { monographId } });
    },
    authorSetPath(name, path, personId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研人员详情（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { personId } });
    },
      sortFieldClick(val,cur){
        if(val == "") {
          this.cur = 0;
        }else if(val == "year") {
          this.cur = 1;
        }
          this.$emit("sortclick",{value:val,num:cur});
      },
      // 机构跳转
      organSetpath(name,path,orgId) {
        let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研机构（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId } });
      },
      // 项目跳转
      handleProjectSetpath(name,path,projectId) {
        let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "科研机构（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { projectId } });
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
      a {
        color: #1843a3;
        cursor: pointer;
      }
      a:hover {
        text-decoration: underline;
      }
    }
    label {
      margin-right: 10px;
      font-size: 13px;
    }
    span {
      font-size: 13px;
    }
    .personName,
    .organName,.fundProject {
      margin-right: 8px;
      cursor: pointer;
    }
    .personName:hover,
    .organName:hover,.fundProject:hover {
      color: #1843a3;
      text-decoration: underline;
    }
    .ivu-row {
      line-height: 24px;
    }
  }
}
</style>