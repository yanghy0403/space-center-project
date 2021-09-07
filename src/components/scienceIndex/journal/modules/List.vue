<template>
  <div class="sc_warp">
    <section>
      <div class="sc-top-box">
        <!-- <div class="sc-title">检索到&nbsp;{{number?number:0}}&nbsp;个期刊</div>
        <Dropdown trigger="click" >
          <a href="javascript:void(0)">
            排序条件
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem @click.native ="sortFieldClick('')" id="不传值">相关度</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('impactFactor.fullImpact')" id="impactFactor.fullImpact">综合因子</DropdownItem>
            <DropdownItem @click.native ="sortFieldClick('impactFactor.complexImpact')" id="impactFactor.complexImpact">复合因子</DropdownItem>
          </DropdownMenu>
        </Dropdown>-->
        <div class="sc-header">
          <div class="sc-sort">
            <span>排序条件：</span>
            <ul>
              <li :class="{activeColor:cur == 0}" @click="sortFieldClick('weight&name.keyword','0')" id="不传值">相关度</li>
              <li
                :class="{activeColor:cur == 1}"
                @click="sortFieldClick('impactFactor.fullImpact','1')"
                id="impactFactor.fullImpact"
              >综合因子</li>
              <li
                :class="{activeColor:cur == 2}"
                @click="sortFieldClick('impactFactor.complexImpact','2')"
                id="impactFactor.complexImpact"
              >复合因子</li>
            </ul>
          </div>
          <div class="totals">
            <span>检索到&nbsp;{{number?number:0}}&nbsp;个期刊</span>
          </div>
        </div>
      </div>
      <transition name="show">
        <ul class="cs_journalList" v-if="!loading">
          <li v-for="item in data" :key="item.journalId">
            <div class="sc_journalContainer">
              <!-- <img src="http://10.0.88.77/journal/中国法学.jpg" alt /> -->
              <img
                :src="item.titlePage == ''?'http://10.0.88.77/journal/中国法学.jpg':item.titlePage"
                alt
              />
            </div>
            <div class="sc_journalText">
              <div>
                <h2>
                  <a
                    v-html="item.name"
                    @click="setPath(item.name?item.name:'未知','/journaldetails',item.journalId)"
                    href="javascript:void(0);"
                  ></a>
                </h2>
              </div>
              <div class="lineH">
                <label>英文名称:</label>
                <span class="englishName">{{item.englishName == 'null'?'未知':item.englishName}}</span>
              </div>
              <div class="lineH">
                <label style="float:left;">主办机构:</label>
                <div class="organization">
                  <span
                  v-for="(subItem,i) in item.organization" :key="i"
                  @click.stop="setPathOrg(subItem.organizationName,'/organdetails',subItem.organizationId)"
                >{{subItem.organizationName}}</span>
                </div>
                
              </div>
              <div class="lineH">
                <label>综合影响因子:</label>
                <span>{{item.impactFactor.fullImpact == 'null'?'未知':item.impactFactor.fullImpact}}</span>
              </div>
              <div class="lineH">
                <label>ISSN:</label>
                <span>{{item.issn == 'null'?'未知':item.issn}}</span>
              </div>
              <div class="lineH">
                <label>CN:</label>
                <span>{{item.cn == 'null'?'未知':item.cn}}</span>
              </div>
            </div>
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
      organizationName: "",
      organizationId: "",
      cur:null
    };
  },
  props: ["data", "total", "number", "loading", "curVal"],
  watch: {
    data(news, old) {
      this.handlePatentList(news);
    },
    loading(news) {
      this.loading = news;
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
      // for (var i = 0; i < news.length; i++) {
      //   var organization = news[i].organization;
      //   for (var j = 0; j < organization.length; j++) {
      //     this.organizationName = organization[0].organizationName;
      //     this.organizationId = organization[0].organizationId;
      //   }
      // }
    },
    // 期刊跳转详情
    setPath(name, path, journalId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "期刊（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { journalId } });
    },
    // 机构跳转
    setPathOrg(name, path, id, mark) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      if (mark) {
        positionArr.push({
          pathName: "个人画像（" + name + "）",
          routerName: "/"
        });
      } else {
        positionArr.push({
          pathName: "机构画像（" + name + "）",
          routerName: "/"
        });
      }
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { orgId: id } });
    },
    sortFieldClick(val, cur) {
      if (val == "") {
        this.cur = 0;
      } else if (val == "impactFactor.fullImpact") {
        this.cur = 1;
      } else if (val == "impactFactor.complexImpact") {
        this.cur = 2;
      }
      this.$emit("sortclick", { value: val, num: cur });
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
.cs_journalList {
  width: 100%;
  height: 100%;
  overflow: hidden;
  li {
    float: left;
    width: 48%;
    margin: 10px 0px 10px 10px;
    .sc_journalContainer {
      img {
        width: 120px;
        height: 150px;
        float: left;
        border: 1px solid #ccc;
        padding: 2px;
        margin-right: 10px;
      }
    }
    .sc_journalText {
      overflow: hidden;
      h2 {
        font-size: 14px;
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis; //文本溢出显示省略号
        white-space: nowrap; //文本不会换行（单行文本溢出）

        a {
          cursor: pointer;
          color: #1843a3;
        }
      }
      h2:hover {
        text-decoration: underline;
      }
      .lineH {
        line-height: 24px;
      }
      label {
        font-size: 13px;
        margin-right: 8px;
        color: #666;
      }
      span {
        font-size: 13px;
      }
      .englishName {
        width: 200px;
        display: inline-block;
        line-height: 20px;
        height: 15px;
        overflow: hidden;
        text-overflow: ellipsis; //文本溢出显示省略号
        white-space: nowrap; //文本不会换行（单行文本溢出）
      }
      .organization {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 200px;
        // display: inline-block;
        // height: 13px;
        // line-height: 16px;
        // margin-right: 10px;
        cursor: pointer;
      }
      .organization:hover {
        color: #1843a3;
        text-decoration: underline;
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