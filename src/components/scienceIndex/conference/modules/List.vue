<template>
  <div class="sc_warp">
    <section>
      <div class="sc-top-box">
        <!-- <div class="sc-title">检索到&nbsp;{{number?number:0}}&nbsp;个会议</div>
        <Dropdown trigger="click" >
          <a href="javascript:void(0)">
            排序条件
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem id="不传值">相关度</DropdownItem>
            <DropdownItem id="startDate(字段没值)">开会时间</DropdownItem>
          </DropdownMenu>
        </Dropdown>-->
        <div class="sc-header">
          <div class="sc-sort">
            <span>排序条件：</span>
            <ul>
              <li :class="{activeColor:cur == 0}" id="不传值">相关度</li>
              <!-- <li id="startDate(字段没值)">开会时间</li> -->
            </ul>
          </div>
          <div class="totals">
            <span>检索到&nbsp;{{number?number:0}}&nbsp;个会议</span>
          </div>
        </div>
      </div>
      <transition name="show">
        <ul class="sc-loading-ul sc-list" v-if="!loading">
          <li v-for="item in data" :key="item.conferenceId">
            <h3>
              <a
                v-html="item.name"
                href="javascript:void(0);"
                @click="setPath(item.name?item.name:'未知','/conferencedetails',item.conferenceId)"
              ></a>
            </h3>
            <Row>
              <i-col span="6">
                <label>会议地点：</label>
                <span>{{item.place1}}&nbsp;{{item.place2}}</span>
              </i-col>
              <i-col span="6">
                <label>时间：</label>
                <span>{{item.date == 'null'?'未知':item.date}}</span>
              </i-col>
              <i-col span="6">
                <label>主办单位：</label>
                <span>{{item.patentNo == 'null'?'未知':item.patentNo}}</span>
              </i-col>
              <i-col span="6">
                <label>网址：</label>
                <span @click="jumpUrl(item.url)">{{item.url == 'null'?'未知':item.url}}</span>
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
  name: "conference",
  data() {
    return {
      cur:null,
    };
  },
  props: ["data", "total", "number", "loading"],
  watch: {
    data(news, old) {
      this.handlePatentList(news);
    },
    loading(news) {
      this.loading = news;
    }
  },
  created() {},
  mounted() {
    this.handlePatentList(this.data);
  },
  methods: {
    handlePatentList(news) {},
    //导航坐标
    setPath(name, path, conferenceId) {
      let positionArr = this.$store.state.variable.position.slice(0, 2);
      positionArr.push({
        pathName: "会议（" + name + "）",
        routerName: "/"
      });
      this.$store.commit("setPosition", positionArr);
      this.$router.push({ path, query: { conferenceId } });
    },
    // 网址跳转
    jumpUrl(e) {
      window.location.href = e;
    },
        sortFieldClick(val) {
      if(val == "") {
        this.cur = 0;
      }
      this.$emit("sortclick", { value: val });
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
      line-height: 32px;
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
    .ivu-row {
      line-height: 32px;
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